"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delSecurityDevicesController = void 0;
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
//TODO
const delSecurityDevicesController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(httpStatus_1.HttpStatus.Unauthorized);
};
exports.delSecurityDevicesController = delSecurityDevicesController;
//# sourceMappingURL=delSecurityDevicesController.js.map