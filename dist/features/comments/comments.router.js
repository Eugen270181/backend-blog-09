"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const express_1 = require("express");
const commentValidators_1 = require("./middlewares/commentValidators");
const delCommentController_1 = require("./controllers/delCommentController");
const updateCommentController_1 = require("./controllers/updateCommentController");
const accessTokenMiddleware_1 = require("../../common/middleware/accessTokenMiddleware");
const findCommentController_1 = require("./controllers/findCommentController");
exports.commentsRouter = (0, express_1.Router)();
exports.commentsRouter.get('/:id', findCommentController_1.findCommentController);
exports.commentsRouter.put('/:id', accessTokenMiddleware_1.accessTokenMiddleware, ...commentValidators_1.commentValidators, updateCommentController_1.updateCommentController);
exports.commentsRouter.delete('/:id', accessTokenMiddleware_1.accessTokenMiddleware, delCommentController_1.delCommentController);
// не забудьте добавить роут в апп
//# sourceMappingURL=comments.router.js.map