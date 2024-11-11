"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenMiddleware = void 0;
const httpStatus_1 = require("../types/enum/httpStatus");
const authServices_1 = require("../../features/auth/services/authServices");
const resultStatus_1 = require("../types/enum/resultStatus");
const accessTokenMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized);
    const result = await authServices_1.authServices.checkAccessToken(authHeader);
    if (result.status === resultStatus_1.ResultStatus.Success) {
        req.user = { userId: result.data.userId };
        return next();
    }
    return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized);
};
exports.accessTokenMiddleware = accessTokenMiddleware;
//# sourceMappingURL=accessTokenMiddleware.js.map