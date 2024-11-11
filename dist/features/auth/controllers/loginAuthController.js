"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAuthController = void 0;
const authServices_1 = require("../services/authServices");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const resultStatus_1 = require("../../../common/types/enum/resultStatus");
//import cookieParser from "cookie-parser";
const loginAuthController = async (req, res) => {
    var _a, _b;
    const result = await authServices_1.authServices.loginUser(req.body, (_a = req.ip) !== null && _a !== void 0 ? _a : 'unknown', (_b = req.headers["user-agent"]) !== null && _b !== void 0 ? _b : 'unknown');
    if (result.status === resultStatus_1.ResultStatus.Unauthorized)
        return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized);
    if (result.status === resultStatus_1.ResultStatus.CancelledAction)
        return res.sendStatus(httpStatus_1.HttpStatus.InternalServerError);
    res.cookie("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        secure: true,
    });
    return res.status(httpStatus_1.HttpStatus.Success).send({ accessToken: result.data.accessToken });
};
exports.loginAuthController = loginAuthController;
//# sourceMappingURL=loginAuthController.js.map