"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const usersValidators_1 = require("./middlewares/usersValidators");
const adminMiddleware_1 = require("../../common/middleware/adminMiddleware");
const getUsersController_1 = require("./controllers/getUsersController");
const createUserController_1 = require("./controllers/createUserController");
const delUserController_1 = require("./controllers/delUserController");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/', getUsersController_1.getUsersController);
exports.usersRouter.post('/', adminMiddleware_1.adminMiddleware, ...usersValidators_1.usersValidators, createUserController_1.createUserController);
exports.usersRouter.delete('/:id', adminMiddleware_1.adminMiddleware, delUserController_1.delUserController);
// не забудьте добавить роут в апп
//# sourceMappingURL=users.router.js.map