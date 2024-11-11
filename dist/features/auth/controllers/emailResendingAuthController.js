"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailResendingAuthController = void 0;
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const authServices_1 = require("../services/authServices");
const resultStatus_1 = require("../../../common/types/enum/resultStatus");
const emailResendingAuthController = async (req, res) => {
    const { email } = req.body;
    const result = await authServices_1.authServices.resendEmail(email);
    if (result.status === resultStatus_1.ResultStatus.BadRequest)
        return res.status(httpStatus_1.HttpStatus.BadRequest).send(result.errors);
    return res.sendStatus(httpStatus_1.HttpStatus.NoContent);
};
exports.emailResendingAuthController = emailResendingAuthController;
//# sourceMappingURL=emailResendingAuthController.js.map