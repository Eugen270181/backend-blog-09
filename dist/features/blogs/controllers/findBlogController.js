"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBlogController = void 0;
const blogsQueryRepository_1 = require("../repositories/blogsQueryRepository");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const findBlogController = async (req, res) => {
    const blogId = req.params.id;
    const foundBlog = await blogsQueryRepository_1.blogsQueryRepository.findBlogAndMap(blogId);
    if (!foundBlog)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound);
    return res.status(httpStatus_1.HttpStatus.Success).send(foundBlog);
};
exports.findBlogController = findBlogController;
//# sourceMappingURL=findBlogController.js.map