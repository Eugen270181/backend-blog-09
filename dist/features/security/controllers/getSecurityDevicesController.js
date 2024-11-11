"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecurityDevicesController = void 0;
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const authServices_1 = require("../../auth/services/authServices");
//TODO
const getSecurityDevicesController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized);
    const isLogout = await authServices_1.authServices.logoutUser(refreshToken);
    if (!isLogout)
        return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized);
    return res.sendStatus(httpStatus_1.HttpStatus.NoContent);
};
exports.getSecurityDevicesController = getSecurityDevicesController;
//# sourceMappingURL=getSecurityDevicesController.js.map