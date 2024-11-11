"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersValidators = void 0;
const bodyValidatorsMiddleware_1 = require("../../../common/middleware/bodyValidatorsMiddleware");
const inputValidationMiddleware_1 = require("../../../common/middleware/inputValidationMiddleware");
exports.usersValidators = [
    bodyValidatorsMiddleware_1.loginValidator,
    bodyValidatorsMiddleware_1.passwordValidator,
    bodyValidatorsMiddleware_1.emailValidator,
    inputValidationMiddleware_1.inputValidationMiddleware,
];
//# sourceMappingURL=usersValidators.js.map