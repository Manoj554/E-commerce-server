import userModel from "../../models/user.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { name, email, phoneNumber, password, cpassword } = req.body;

    try {
        const findUser = await userModel.findOne({ $or: [{ email }, { phoneNumber }] });
        if (findUser) {
            return res.status(403).json({ msg: 'You are already registered' });
        }
        if (password !== cpassword) {
            return res.status(400).json({ msg: 'Password are not matched' });
        }

        const hash_passwword = await bcrypt.hash(password, 12);
        const newUser = await userModel.create({ name, email, phoneNumber, hash_passwword });
        res.status(201).json({ user: newUser, msg: 'user successfully created' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error, msg: 'Internal server error' });
    }
}

export const signin = async (req, res) => {
    const { user, password } = req.body;
    let findUser;

    try {
        if (validator.isMobilePhone(user)) {
            findUser = await userModel.findOne({ phoneNumber: user });
        } else {
            findUser = await userModel.findOne({ email: user });
        }

        if (!findUser) {
            return res.status(403).json({ msg: 'Invalid email or phone' });
        }

        const isPasswordMatched = await bcrypt.compare(password, findUser.hash_passwword);

        if (!isPasswordMatched) {
            return res.status(403).json({ msg: 'Invalid user or password' });
        }

        const token = jwt.sign({ id: findUser._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '2h' });

        res.cookie('token', token, {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,
            path: '/',
        });

        const userData = {
            name: findUser.name,
            email: findUser.email,
            phone: findUser.phoneNumber,
            token
        }
        res.status(200).json({ user: userData, msg: 'login successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, msg: 'Internal server error' });
    }
}

export const getUserInfo = (req, res) => {
    const { name, email, phoneNumber } = req.user;
    const user = { name, email, phoneNumber };
    res.status(200).json({ user, msg: 'user found' });
}

export const signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ msg: 'successfully loggedout' });
}