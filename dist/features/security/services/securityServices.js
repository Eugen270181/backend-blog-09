"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityServices = void 0;
const bson_1 = require("bson");
const securityRepository_1 = require("../repository/securityRepository");
exports.securityServices = {
    async createSession(sessionObject) {
        return securityRepository_1.securityRepository.createSession(sessionObject);
    },
    async deleteSession(_id) {
        const isIdValid = bson_1.ObjectId.isValid(_id);
        if (!isIdValid)
            return false;
        return securityRepository_1.securityRepository.deleteSession(_id);
    },
    async deleteOtherSessions(userId, _id) {
        const isIdValid = bson_1.ObjectId.isValid(_id);
        if (!isIdValid)
            return false;
        return securityRepository_1.securityRepository.deleteOtherSessions(userId, _id);
    },
    async updateSession(lastActiveDate, expDate, _id) {
        return securityRepository_1.securityRepository.updateSession(lastActiveDate, expDate, _id);
    },
};
//# sourceMappingURL=securityServices.js.map