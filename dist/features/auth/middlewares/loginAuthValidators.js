"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAuthValidators = void 0;
const bodyValidatorsMiddleware_1 = require("../../../common/middleware/bodyValidatorsMiddleware");
const inputValidationMiddleware_1 = require("../../../common/middleware/inputValidationMiddleware");
exports.loginAuthValidators = [
    bodyValidatorsMiddleware_1.loginOrEmailValidator,
    inputValidationMiddleware_1.inputValidationMiddleware,
];
//# sourceMappingURL=loginAuthValidators.js.map