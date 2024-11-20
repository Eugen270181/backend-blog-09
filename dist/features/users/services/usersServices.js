"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersServices = void 0;
const usersRepository_1 = require("../repositories/usersRepository");
const bson_1 = require("bson");
const hashServices_1 = require("../../../common/adapters/hashServices");
const result_class_1 = require("../../../common/classes/result.class");
const resultStatus_1 = require("../../../common/types/enum/resultStatus");
exports.usersServices = {
    async createUser(user) {
        const result = new result_class_1.ResultClass();
        const { login, password, email } = user;
        if (await usersRepository_1.usersRepository.findUserByLogin(login)) {
            result.addError("not unique field!", "login");
            return result;
        }
        if (await usersRepository_1.usersRepository.findUserByEmail(email)) {
            result.addError("not unique field!", "email");
            return result;
        }
        const newUser = {
            ...{ login, email },
            passwordHash: await hashServices_1.hashServices.getHash(password),
            createdAt: new Date(),
            emailConfirmation: {
                confirmationCode: '',
                expirationDate: new Date(),
                isConfirmed: true
            }
        };
        const newUserId = await usersRepository_1.usersRepository.createUser(newUser);
        result.status = resultStatus_1.ResultStatus.Created;
        result.data = newUserId;
        return result;
    },
    async deleteUser(id) {
        const isIdValid = bson_1.ObjectId.isValid(id);
        if (!isIdValid)
            return false;
        return usersRepository_1.usersRepository.deleteUser(new bson_1.ObjectId(id));
    }
};
//# sourceMappingURL=usersServices.js.map