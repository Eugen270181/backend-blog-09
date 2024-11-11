"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailResendingAuthValidators = void 0;
const bodyValidatorsMiddleware_1 = require("../../../common/middleware/bodyValidatorsMiddleware");
const inputValidationMiddleware_1 = require("../../../common/middleware/inputValidationMiddleware");
exports.emailResendingAuthValidators = [
    bodyValidatorsMiddleware_1.emailResendingValidator,
    inputValidationMiddleware_1.inputValidationMiddleware,
];
//# sourceMappingURL=regEmailResendingValidators.js.map