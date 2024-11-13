"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const hashServices_1 = require("../../../common/adapters/hashServices");
const usersRepository_1 = require("../../users/repositories/usersRepository");
const result_class_1 = require("../../../common/classes/result.class");
const resultStatus_1 = require("../../../common/types/enum/resultStatus");
const jwtServices_1 = require("../../../common/adapters/jwtServices");
const nodemailerServices_1 = require("../../../common/adapters/nodemailerServices");
const user_class_1 = require("../../users/classes/user.class");
const add_1 = require("date-fns/add");
const config_1 = require("../../../common/settings/config");
const securityRepository_1 = require("../../security/repository/securityRepository");
const mongodb_1 = require("mongodb");
const crypto_1 = require("crypto");
const securityServices_1 = require("../../security/services/securityServices");
function parseDuration(duration) {
    const units = {
        s: 'seconds',
        m: 'minutes',
        h: 'hours',
        d: 'days',
        M: 'months',
        y: 'years',
    };
    let durationObject = { seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0 };
    const regex = /(\d+)([smhdMy])/g;
    let match;
    while ((match = regex.exec(duration)) !== null) {
        const value = parseInt(match[1], 10);
        const unit = units[match[2]];
        if (unit) {
            durationObject[unit] += value;
        }
    }
    return durationObject;
}
exports.authServices = {
    //Рефрештокен кодировать с учетом userId и deviceId, а вернуть помимо токенов еще и дату их создания
    async generateTokens(userId, deviceId) {
        var _a;
        const result = new result_class_1.ResultClass();
        //генеирруем токены для пользователя и его deviceid
        const accessToken = await jwtServices_1.jwtServices.createToken(userId, config_1.appConfig.AT_SECRET, config_1.appConfig.AT_TIME);
        const refreshToken = await jwtServices_1.jwtServices.createToken(userId, config_1.appConfig.RT_SECRET, config_1.appConfig.RT_TIME, deviceId);
        //записываем дату создания RT по user в соответ объект соотв коллекции бд
        const jwtPayload = await jwtServices_1.jwtServices.decodeToken(refreshToken);
        if (!jwtPayload) {
            result.status = resultStatus_1.ResultStatus.CancelledAction;
            result.addError('Sorry, something wrong with creation|decode refreshToken, try login later', 'refreshToken');
            return result;
        }
        if (!jwtPayload.hasOwnProperty("userId") || !jwtPayload.hasOwnProperty("deviceId")
            || !jwtPayload.hasOwnProperty("iat")) {
            result.status = resultStatus_1.ResultStatus.CancelledAction;
            result.addError('Sorry, something wrong with creation|decode refreshToken, try login later', 'refreshToken');
            return result;
        }
        const lastActiveDate = new Date(((_a = jwtPayload.iat) !== null && _a !== void 0 ? _a : 0) * 1000);
        result.status = resultStatus_1.ResultStatus.Success;
        result.data = { accessToken, refreshToken, lastActiveDate };
        return result;
    },
    async loginUser(login, ip, title) {
        let result = new result_class_1.ResultClass();
        const { loginOrEmail, password } = login;
        const user = await this.checkUserCredentials(loginOrEmail, password);
        //если логин или пароль не верны или не существуют
        if (user.status !== resultStatus_1.ResultStatus.Success) {
            result.status = resultStatus_1.ResultStatus.Unauthorized;
            result.addError('Wrong credentials', 'loginOrEmail|password');
            return result;
        }
        //если данные для входа валидны, то генеирруем deviceId и токены RT и AT, кодируя в RT payload {userId,deviceId}
        const _id = new mongodb_1.ObjectId();
        const deviceId = _id.toString();
        const userId = user.data._id.toString();
        //если данные для входа валидны, то генеирруем токены для пользователя и его deviceId
        result = await this.generateTokens(userId, deviceId);
        //создать новую сессию если генерация токенов прошла успешно
        if (result.data) {
            const lastActiveDate = result.data.lastActiveDate;
            const expDate = (0, add_1.add)(lastActiveDate, parseDuration(config_1.appConfig.RT_TIME));
            const newSession = { _id, ip, title, userId, lastActiveDate, expDate };
            const sid = await securityServices_1.securityServices.createSession(newSession);
        }
        return result;
    },
    async logoutUser(refreshToken) {
        const currentSession = await this.checkRefreshToken(refreshToken);
        if (!currentSession.data)
            return false;
        return securityServices_1.securityServices.deleteSession(currentSession.data._id);
    },
    async registerUser(user) {
        const { login, password, email } = user;
        const result = new result_class_1.ResultClass();
        if (await usersRepository_1.usersRepository.findUserByLogin(login)) {
            result.addError("not unique field!", "login");
            return result;
        }
        if (await usersRepository_1.usersRepository.findUserByEmail(email)) {
            result.addError("not unique field!", "email");
            return result;
        }
        const passwordHash = await hashServices_1.hashServices.getHash(password);
        const newUser = new user_class_1.User(login, email, passwordHash); //create user from constructor of User Class, not from admin - usersServices.createUser
        await usersRepository_1.usersRepository.createUser(newUser);
        nodemailerServices_1.nodemailerServices
            .sendEmail(newUser.email, newUser.emailConfirmation.confirmationCode)
            .catch((er) => console.error('error in send email:', er));
        result.status = resultStatus_1.ResultStatus.Success;
        return result;
    },
    async checkAccessToken(authHeader) {
        const [type, token] = authHeader.split(" ");
        const result = new result_class_1.ResultClass();
        const jwtPayload = await jwtServices_1.jwtServices.verifyToken(token, config_1.appConfig.AT_SECRET);
        if (jwtPayload) {
            if (!jwtPayload.hasOwnProperty("userId"))
                throw new Error(`incorrect jwt! ${JSON.stringify(jwtPayload)}`);
            const userId = jwtPayload.userId;
            const user = await usersRepository_1.usersRepository.getUserById(userId);
            if (user) {
                result.data = { userId };
                result.status = resultStatus_1.ResultStatus.Success;
            }
        }
        return result;
    },
    async checkRefreshToken(refreshToken) {
        var _a;
        const result = new result_class_1.ResultClass();
        const jwtPayload = await jwtServices_1.jwtServices.verifyToken(refreshToken, config_1.appConfig.RT_SECRET);
        if (jwtPayload) {
            if (!jwtPayload.hasOwnProperty("userId") || !jwtPayload.hasOwnProperty("deviceId"))
                throw new Error(`incorrect jwt! ${JSON.stringify(jwtPayload)}`);
            const userId = jwtPayload.userId;
            const deviceId = jwtPayload.deviceId;
            const lastActiveDate = new Date(((_a = jwtPayload.iat) !== null && _a !== void 0 ? _a : 0) * 1000);
            const activeSession = await securityRepository_1.securityRepository.findActiveSession({ userId, deviceId, lastActiveDate });
            if (activeSession) {
                result.data = activeSession;
                result.status = resultStatus_1.ResultStatus.Success;
            }
        }
        return result;
    },
    async refreshTokens(refreshToken) {
        const result = new result_class_1.ResultClass();
        const foundSession = (await this.checkRefreshToken(refreshToken)).data;
        if (!foundSession)
            return result;
        //генерируем новую пару токенов обновляем запись сессии по полю lastActiveDate и expDate
        const newTokens = await this.generateTokens(foundSession.userId, foundSession._id.toString());
        //создать новую сессию если генерация токенов прошла успешно
        if (newTokens.data) {
            const newLastActiveDate = newTokens.data.lastActiveDate;
            const newExpDate = (0, add_1.add)(newLastActiveDate, parseDuration(config_1.appConfig.RT_TIME));
            const isSessionUpdated = await securityServices_1.securityServices.updateSession(newLastActiveDate, newExpDate, foundSession._id);
            if (isSessionUpdated) {
                result.data = newTokens.data;
                result.status = resultStatus_1.ResultStatus.Success;
            }
            else {
                result.status = resultStatus_1.ResultStatus.CancelledAction;
                result.addError('Sorry, something wrong with update date of new session, try again', 'refreshToken');
            }
        }
        return result;
    },
    async checkUserCredentials(loginOrEmail, password) {
        const result = new result_class_1.ResultClass();
        const user = await usersRepository_1.usersRepository.findByLoginOrEmail(loginOrEmail);
        // Проверка на наличие пользователя
        if (!user) {
            result.status = resultStatus_1.ResultStatus.NotFound;
            result.addError('User not found', 'loginOrEmail');
            return result;
        }
        // Проверка пароля
        const isPassCorrect = await hashServices_1.hashServices.checkHash(password, user.passwordHash);
        if (!isPassCorrect) {
            result.addError('Wrong Password', 'password');
            return result;
        }
        return {
            status: resultStatus_1.ResultStatus.Success,
            data: user
        };
    },
    async confirmEmail(code) {
        const result = new result_class_1.ResultClass();
        const user = await usersRepository_1.usersRepository.findUserByRegConfirmCode(code);
        if (!user) {
            result.addError('confirmation code is incorrect', 'code');
            return result;
        }
        if (user.emailConfirmation.isConfirmed) {
            result.addError('confirmation code already been applied', 'code');
            return result;
        }
        if (user.emailConfirmation.expirationDate < new Date()) {
            result.addError('confirmation code is expired', 'code');
            return result;
        }
        const isUpdateConfirmation = await usersRepository_1.usersRepository.updateConfirmation(user._id);
        if (!isUpdateConfirmation) {
            result.addError('Something wrong with activate your account, try later', 'code');
            return result;
        }
        result.status = resultStatus_1.ResultStatus.Success;
        return result;
    },
    async resendEmail(email) {
        const result = new result_class_1.ResultClass();
        const user = await usersRepository_1.usersRepository.findUserByEmail(email);
        if (!user) {
            result.addError("Users account with this Email not found!", "email");
            return result;
        }
        if (user.emailConfirmation.isConfirmed) {
            result.addError('Users account with this email already activated!', 'email');
            return result;
        }
        const newConfirmationCode = (0, crypto_1.randomUUID)();
        const newConfirmationDate = (0, add_1.add)(new Date(), parseDuration(config_1.appConfig.EMAIL_TIME));
        const isUpdateConfirmationCode = await usersRepository_1.usersRepository.setConfirmationCode(user._id, newConfirmationCode, newConfirmationDate);
        if (!isUpdateConfirmationCode) {
            result.addError('Something wrong with activate your account, try later', 'email');
            return result;
        }
        nodemailerServices_1.nodemailerServices
            .sendEmail(email, newConfirmationCode)
            .catch((er) => console.error('error in send email:', er));
        result.status = resultStatus_1.ResultStatus.Success;
        return result;
    },
};
//# sourceMappingURL=authServices.js.map