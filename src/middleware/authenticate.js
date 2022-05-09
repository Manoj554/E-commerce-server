import jwt from 'jsonwebtoken';
import userModel from '../models/sellerUser.js';

export const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            const findUser = await userModel.findById(decode.id);
            if (findUser) {
                req.user = findUser;
                req.id = findUser._id;
                next();
            } else {
                return res.status(401).json({ msg: 'User not found' });
            }

        } catch (error) {
            return res.status(401).json({ msg: 'Authorization Required' });
        }
    } else {
        return res.status(401).json({ msg: 'Please Login to Continue' });
    }
}