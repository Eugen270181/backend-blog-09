"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityRouter = void 0;
const express_1 = require("express");
const paths_1 = require("../../common/settings/paths");
const getSecurityDevicesController_1 = require("./controllers/getSecurityDevicesController");
const delSecurityDevicesController_1 = require("./controllers/delSecurityDevicesController");
const delSecurityDeviceController_1 = require("./controllers/delSecurityDeviceController");
exports.securityRouter = (0, express_1.Router)();
exports.securityRouter.get(paths_1.routersPaths.inSecurity, getSecurityDevicesController_1.getSecurityDevicesController);
exports.securityRouter.delete(paths_1.routersPaths.inSecurity, delSecurityDevicesController_1.delSecurityDevicesController);
exports.securityRouter.delete(paths_1.routersPaths.inSecurity + '/:id', delSecurityDeviceController_1.delSecurityDeviceController);
//# sourceMappingURL=security.router.js.map