"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delSecurityDeviceController = void 0;
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const resultStatus_1 = require("../../../common/types/enum/resultStatus");
const authServices_1 = require("../../auth/services/authServices");
const securityServices_1 = require("../services/securityServices");
const securityRepository_1 = require("../repository/securityRepository");
//TODO
const delSecurityDeviceController = async (req, res) => {
    const sid = req.params.id;
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized); //нет RT
    const checkRT = await authServices_1.authServices.checkRefreshToken(refreshToken);
    if (checkRT.status !== resultStatus_1.ResultStatus.Success)
        return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized); // RT не валиден
    const userId = checkRT.data.userId;
    const foundSession = await securityRepository_1.securityRepository.findSessionById(sid);
    if (!foundSession)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound); //не найдена сессия - sid = deviceId
    if (foundSession.userId !== userId)
        return res.sendStatus(httpStatus_1.HttpStatus.Forbidden); //userId из входного RT - !owner foundSession
    const deleteResult = await securityServices_1.securityServices.deleteSession(foundSession._id);
    return res.sendStatus(httpStatus_1.HttpStatus.NoContent);
};
exports.delSecurityDeviceController = delSecurityDeviceController;
//# sourceMappingURL=delSecurityDeviceController.js.map