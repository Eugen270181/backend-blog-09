"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const createPostController_1 = require("./controllers/createPostController");
const getPostsController_1 = require("./controllers/getPostsController");
const findPostController_1 = require("./controllers/findPostController");
const delPostController_1 = require("./controllers/delPostController");
const putPostController_1 = require("./controllers/putPostController");
const postValidators_1 = require("./middlewares/postValidators");
const adminMiddleware_1 = require("../../common/middleware/adminMiddleware");
const findPostCommentsController_1 = require("./controllers/findPostCommentsController");
const accessTokenMiddleware_1 = require("../../common/middleware/accessTokenMiddleware");
const commentValidators_1 = require("../comments/middlewares/commentValidators");
const createPostCommentController_1 = require("./controllers/createPostCommentController");
const querySortSanitizerMiddleware_1 = require("../../common/middleware/querySortSanitizerMiddleware");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', ...querySortSanitizerMiddleware_1.querySortSanitizers, getPostsController_1.getPostsController);
exports.postsRouter.get('/:id', findPostController_1.findPostController);
exports.postsRouter.get('/:id/comments', ...querySortSanitizerMiddleware_1.querySortSanitizers, findPostCommentsController_1.findPostCommentsController); //new - task-06
exports.postsRouter.post('/:id/comments', accessTokenMiddleware_1.accessTokenMiddleware, ...commentValidators_1.commentValidators, createPostCommentController_1.createPostCommentController); //new - task-06
exports.postsRouter.post('/', adminMiddleware_1.adminMiddleware, ...postValidators_1.postValidators, createPostController_1.createPostController);
exports.postsRouter.delete('/:id', adminMiddleware_1.adminMiddleware, delPostController_1.delPostController);
exports.postsRouter.put('/:id', adminMiddleware_1.adminMiddleware, ...postValidators_1.postValidators, putPostController_1.putPostController);
// не забудьте добавить роут в апп
//# sourceMappingURL=posts.router.js.map