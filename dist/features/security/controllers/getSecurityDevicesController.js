"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecurityDevicesController = void 0;
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const authServices_1 = require("../../auth/services/authServices");
const resultStatus_1 = require("../../../common/types/enum/resultStatus");
const securityQueryRepository_1 = require("../repository/securityQueryRepository");
//TODO
const getSecurityDevicesController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized);
    const checkRT = await authServices_1.authServices.checkRefreshToken(refreshToken);
    if (checkRT.status !== resultStatus_1.ResultStatus.Success)
        return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized);
    const sessions = await securityQueryRepository_1.securityQueryRepository.getActiveSessionsAndMap(checkRT.data.userId);
    return res.status(httpStatus_1.HttpStatus.Success).send(sessions);
};
exports.getSecurityDevicesController = getSecurityDevicesController;
//# sourceMappingURL=getSecurityDevicesController.js.map