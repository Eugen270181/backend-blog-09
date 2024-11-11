"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogPostController = void 0;
const blogsQueryRepository_1 = require("../repositories/blogsQueryRepository");
const postsQueryRepository_1 = require("../../posts/repository/postsQueryRepository");
const postsServices_1 = require("../../posts/services/postsServices");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const createBlogPostController = async (req, res) => {
    const blogId = req.params.id;
    const foundBlog = await blogsQueryRepository_1.blogsQueryRepository.findBlogById(blogId);
    if (!foundBlog)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound);
    const newPostId = await postsServices_1.postsServices.createPost(Object.assign(Object.assign({}, req.body), { blogId }));
    const newPost = await postsQueryRepository_1.postsQueryRepository.findPostAndMap(newPostId);
    if (!newPost)
        return res.sendStatus(httpStatus_1.HttpStatus.InternalServerError);
    return res.status(httpStatus_1.HttpStatus.Created).send(newPost);
};
exports.createBlogPostController = createBlogPostController;
//# sourceMappingURL=createBlogPostController.js.map