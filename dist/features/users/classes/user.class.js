"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto_1 = require("crypto");
const add_1 = require("date-fns/add");
class User {
    constructor(login, email, hash) {
        this.login = login;
        this.email = email;
        this.passwordHash = hash;
        this.createdAt = new Date();
        this.iatRTSec = 0;
        this.emailConfirmation = {
            expirationDate: (0, add_1.add)(new Date(), { hours: 1, minutes: 30 }),
            confirmationCode: (0, crypto_1.randomUUID)(),
            isConfirmed: false
        };
    }
}
exports.User = User;
//# sourceMappingURL=user.class.js.map