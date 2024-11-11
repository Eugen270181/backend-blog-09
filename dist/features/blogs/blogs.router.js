"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const createBlogController_1 = require("./controllers/createBlogController");
const getBlogsController_1 = require("./controllers/getBlogsController");
const findBlogController_1 = require("./controllers/findBlogController");
const delBlogController_1 = require("./controllers/delBlogController");
const putBlogController_1 = require("./controllers/putBlogController");
const blogValidators_1 = require("./middlewares/blogValidators");
const adminMiddleware_1 = require("../../common/middleware/adminMiddleware");
const findBlogPostsController_1 = require("./controllers/findBlogPostsController");
const createBlogPostController_1 = require("./controllers/createBlogPostController");
const postValidators_1 = require("../posts/middlewares/postValidators");
const querySortSanitizerMiddleware_1 = require("../../common/middleware/querySortSanitizerMiddleware");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', ...querySortSanitizerMiddleware_1.querySortSanitizers, getBlogsController_1.getBlogsController);
exports.blogsRouter.get('/:id', findBlogController_1.findBlogController);
exports.blogsRouter.get('/:id/posts', ...querySortSanitizerMiddleware_1.querySortSanitizers, findBlogPostsController_1.findBlogPostsController); //new - task-04
exports.blogsRouter.post('/:id/posts', adminMiddleware_1.adminMiddleware, ...postValidators_1.blogPostValidators, createBlogPostController_1.createBlogPostController); //new - task-04
exports.blogsRouter.post('/', adminMiddleware_1.adminMiddleware, ...blogValidators_1.blogValidators, createBlogController_1.createBlogController);
exports.blogsRouter.delete('/:id', adminMiddleware_1.adminMiddleware, delBlogController_1.delBlogController);
exports.blogsRouter.put('/:id', adminMiddleware_1.adminMiddleware, ...blogValidators_1.blogValidators, putBlogController_1.putBlogController);
// не забудьте добавить роут в апп
//# sourceMappingURL=blogs.router.js.map