"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationAuthController = void 0;
const authServices_1 = require("../services/authServices");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const resultStatus_1 = require("../../../common/types/enum/resultStatus");
const registrationAuthController = async (req, res) => {
    const result = await authServices_1.authServices.registerUser(req.body);
    if (result.status === resultStatus_1.ResultStatus.BadRequest)
        return res.status(httpStatus_1.HttpStatus.BadRequest).send(result.errors);
    return res.sendStatus(httpStatus_1.HttpStatus.NoContent);
};
exports.registrationAuthController = registrationAuthController;
//# sourceMappingURL=registrationAuthController.js.map