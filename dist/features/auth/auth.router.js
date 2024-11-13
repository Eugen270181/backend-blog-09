"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const loginAuthController_1 = require("./controllers/loginAuthController");
const loginAuthValidators_1 = require("./middlewares/loginAuthValidators");
const getMeController_1 = require("./controllers/getMeController");
const accessTokenMiddleware_1 = require("../../common/middleware/accessTokenMiddleware");
const registrationAuthValidators_1 = require("./middlewares/registrationAuthValidators");
const paths_1 = require("../../common/settings/paths");
const registrationAuthController_1 = require("./controllers/registrationAuthController");
const regConfirmAuthController_1 = require("./controllers/regConfirmAuthController");
const regConfirmAuthValidators_1 = require("./middlewares/regConfirmAuthValidators");
const regEmailResendingValidators_1 = require("./middlewares/regEmailResendingValidators");
const emailResendingAuthController_1 = require("./controllers/emailResendingAuthController");
const refreshTokenAuthController_1 = require("./controllers/refreshTokenAuthController");
const logoutAuthController_1 = require("./controllers/logoutAuthController");
const rateLimitLoggerMiddleware_1 = require("../../common/middleware/rateLimitLogger/rateLimitLoggerMiddleware");
exports.authRouter = (0, express_1.Router)();
//testingRouter.use(adminMiddleware)
//login(reqirements - Returns JWT accessToken (expired after 10 seconds) in body and JWT refreshToken in cookie (http-only, secure) (expired after 20 seconds)
exports.authRouter.post(paths_1.routersPaths.inAuth.login, rateLimitLoggerMiddleware_1.rateLimitLoggerMiddleware, loginAuthValidators_1.loginAuthValidators, loginAuthController_1.loginAuthController);
exports.authRouter.get(paths_1.routersPaths.inAuth.me, accessTokenMiddleware_1.accessTokenMiddleware, getMeController_1.getMeController);
exports.authRouter.post(paths_1.routersPaths.inAuth.registration, rateLimitLoggerMiddleware_1.rateLimitLoggerMiddleware, registrationAuthValidators_1.registrationAuthValidators, registrationAuthController_1.registrationAuthController);
exports.authRouter.post(paths_1.routersPaths.inAuth.registrationConfirmation, rateLimitLoggerMiddleware_1.rateLimitLoggerMiddleware, regConfirmAuthValidators_1.regConfirmAuthValidators, regConfirmAuthController_1.regConfirmAuthController);
exports.authRouter.post(paths_1.routersPaths.inAuth.registrationEmailResending, rateLimitLoggerMiddleware_1.rateLimitLoggerMiddleware, regEmailResendingValidators_1.emailResendingAuthValidators, emailResendingAuthController_1.emailResendingAuthController);
//logout(reqirements - In cookie client must send correct refreshToken that will be revoked.)
exports.authRouter.post(paths_1.routersPaths.inAuth.logout, logoutAuthController_1.logoutAuthController);
//refresh-token(reqirements - Generate a new pair of access and refresh tokens (in cookie client must send correct refreshToken that will be revoked after refreshing)
exports.authRouter.post(paths_1.routersPaths.inAuth.refreshToken, refreshTokenAuthController_1.refreshTokenAuthController);
//# sourceMappingURL=auth.router.js.map