"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBlogPostsController = void 0;
const postsQueryRepository_1 = require("../../posts/repository/postsQueryRepository");
const querySortSanitizer_1 = require("../../../common/module/querySortSanitizer");
const blogsRepository_1 = require("../repositories/blogsRepository");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const findBlogPostsController = async (req, res) => {
    const blogId = req.params.id;
    const foundBlog = await blogsRepository_1.blogsRepository.findBlogById(blogId);
    if (!foundBlog)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound);
    const sanitizedSortQuery = (0, querySortSanitizer_1.querySortSanitizer)(req.query);
    const getPosts = await postsQueryRepository_1.postsQueryRepository.getPostsAndMap(sanitizedSortQuery, blogId);
    return res.status(httpStatus_1.HttpStatus.Success).send(getPosts);
};
exports.findBlogPostsController = findBlogPostsController;
//# sourceMappingURL=findBlogPostsController.js.map