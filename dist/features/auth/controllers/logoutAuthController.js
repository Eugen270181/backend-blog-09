"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutAuthController = void 0;
const authServices_1 = require("../services/authServices");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const logoutAuthController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized);
    const isLogout = await authServices_1.authServices.logoutUser(refreshToken);
    if (!isLogout)
        return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized);
    return res.sendStatus(httpStatus_1.HttpStatus.NoContent);
};
exports.logoutAuthController = logoutAuthController;
//# sourceMappingURL=logoutAuthController.js.map