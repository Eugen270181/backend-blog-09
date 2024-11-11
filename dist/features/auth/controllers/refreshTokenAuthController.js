"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenAuthController = void 0;
const authServices_1 = require("../services/authServices");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const resultStatus_1 = require("../../../common/types/enum/resultStatus");
const refreshTokenAuthController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized);
    const result = await authServices_1.authServices.refreshTokens(refreshToken);
    if (result.status === resultStatus_1.ResultStatus.Success) {
        res.cookie("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            secure: true,
        });
        return res.status(httpStatus_1.HttpStatus.Success).send({ accessToken: result.data.accessToken });
    }
    return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized);
};
exports.refreshTokenAuthController = refreshTokenAuthController;
//# sourceMappingURL=refreshTokenAuthController.js.map