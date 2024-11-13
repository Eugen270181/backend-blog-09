"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delSecurityDevicesController = void 0;
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const authServices_1 = require("../../auth/services/authServices");
const resultStatus_1 = require("../../../common/types/enum/resultStatus");
const securityServices_1 = require("../services/securityServices");
//TODO
const delSecurityDevicesController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized); //нет RT
    const checkRT = await authServices_1.authServices.checkRefreshToken(refreshToken);
    if (checkRT.status !== resultStatus_1.ResultStatus.Success)
        return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized); // RT не валиден
    const userId = checkRT.data.userId;
    const currentSessionId = checkRT.data._id;
    const deleteResult = await securityServices_1.securityServices.deleteOtherSessions(userId, currentSessionId);
    return res.sendStatus(httpStatus_1.HttpStatus.NoContent);
};
exports.delSecurityDevicesController = delSecurityDevicesController;
//# sourceMappingURL=delSecurityDevicesController.js.map