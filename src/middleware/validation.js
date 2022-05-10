import { check, validationResult } from "express-validator";

export const validateSignup = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').notEmpty().withMessage('Email is required'),
    check('phoneNumber').notEmpty().withMessage('Phone is required'),
    check('password').notEmpty().withMessage('Password is required'),
    check('cpassword').notEmpty().withMessage('Confirm your password'),
    check('name').isLength({ min: 3, max: 30 }).withMessage('Please provide valid name'),
    check('email').isEmail().withMessage('Please provide valid email'),
    check('phoneNumber').isMobilePhone().isLength({ min: 10, max: 10 }).withMessage('Please provide valid phone number'),
    check('password').isStrongPassword({ minLength: 8, minSymbols: 1, minUppercase: 1 }).withMessage('Password should be min 8 character long and should be contain altleast one (number, special character, uppercase)')
];

export const validateSignin = [
    check('user').notEmpty().withMessage('Please provide email or phone number'),
    check('password').notEmpty().withMessage('Password is required'),
];

export const validateAddCategory = [
    check('categoryName').notEmpty().withMessage('Please enter category name'),
];

export const validateAddProduct = [
    check('productName').notEmpty().withMessage('Product name is required'),
    check('category').notEmpty().withMessage('Category is required'),
    check('retailPrice').notEmpty().withMessage('Retail price is required'),
    check('offeredPrice').notEmpty().withMessage('Offered price is required'),
    check('quantity').notEmpty().withMessage('Quantity is required'),
    check('productImage').notEmpty().withMessage('Product Image is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('productName').isLength({ min: 3 }).withMessage('Please provide valid productName'),
    check('retailPrice').isNumeric().withMessage('Provide valid reatil price'),
    check('offeredPrice').isNumeric().withMessage('Provide valid offered price'),
    check('quantity').isNumeric().withMessage('Provide valid qualtity'),

];

export const validateAddAddress = [
    check('name').notEmpty().withMessage('Name is required'),
    check('phone').notEmpty().withMessage('Phone is required'),
    check('address').notEmpty().withMessage('Address field is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('pincode').notEmpty().withMessage('Pincode is required'),
    check('phone').isMobilePhone().isLength({ min: 10, max: 10 }).withMessage('Please provide valid phone number'),
    check('pincode').isNumeric().isLength({ min: 6, max: 6 }).withMessage('Please provide proper pincode'),
];

export const isValidate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({
            msg: errors.array()[0].msg
        });
    }
    next();
}