"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regConfirmAuthValidators = void 0;
const bodyValidatorsMiddleware_1 = require("../../../common/middleware/bodyValidatorsMiddleware");
const inputValidationMiddleware_1 = require("../../../common/middleware/inputValidationMiddleware");
exports.regConfirmAuthValidators = [
    bodyValidatorsMiddleware_1.codeRegConfirmValidator,
    inputValidationMiddleware_1.inputValidationMiddleware,
];
//# sourceMappingURL=regConfirmAuthValidators.js.map