"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailResendingValidator = exports.codeRegConfirmValidator = exports.loginOrEmailValidator = exports.passwordValidator = exports.emailValidator = exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
const usersRepository_1 = require("../../features/users/repositories/usersRepository");
const uniqueLoginValidator = async (login) => {
    const user = await usersRepository_1.usersRepository.findUserByLogin(login);
    if (user)
        throw new Error("login already exist");
    return true;
};
const uniqueEmailValidator = async (email) => {
    const user = await usersRepository_1.usersRepository.findUserByEmail(email);
    if (user)
        throw new Error("email already exist");
    return true;
};
const EmailValidator = async (email) => {
    const user = await usersRepository_1.usersRepository.findUserByEmail(email);
    if (!user)
        throw new Error("Users account with this Email not found!");
    if (user.emailConfirmation.isConfirmed)
        throw new Error("Users account with this email already activated!");
    return true;
};
const checkRegConfirmCode = async (code) => {
    const user = await usersRepository_1.usersRepository.findUserByRegConfirmCode(code);
    if (!user)
        throw new Error("Don't found this confirmation code");
    if (user.emailConfirmation.isConfirmed)
        throw new Error("This User already confirmed");
    if (user.emailConfirmation.expirationDate < new Date())
        throw new Error("This code already expired");
    return true;
};
exports.loginValidator = (0, express_validator_1.body)('login').isString().withMessage('Login must be a string')
    .trim().isLength({ min: 3, max: 10 }).withMessage('Login must be between 3 and 10 characters long')
    .matches(/^[a-zA-Z0-9_-]*$/).withMessage('Login must contain only letters, numbers, underscores, and hyphens')
    .custom(uniqueLoginValidator);
exports.emailValidator = (0, express_validator_1.body)('email').isString().withMessage('Email must be a string')
    .trim().isEmail().withMessage('Email must be a valid email address')
    .custom(uniqueEmailValidator);
exports.passwordValidator = (0, express_validator_1.body)('password').isString().withMessage('Password must be a string')
    .trim().isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 and 20 characters long');
exports.loginOrEmailValidator = (0, express_validator_1.body)('loginOrEmail').isString().withMessage('not string');
exports.codeRegConfirmValidator = (0, express_validator_1.body)('code').isUUID(4).withMessage('Code is not UUID format').trim()
    .custom(checkRegConfirmCode);
exports.emailResendingValidator = (0, express_validator_1.body)('email').isString().withMessage('Email must be a string')
    .trim().isEmail().withMessage('Email must be a valid email address').custom(EmailValidator);
//# sourceMappingURL=bodyValidatorsMiddleware.js.map