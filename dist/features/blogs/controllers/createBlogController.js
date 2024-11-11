"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogController = void 0;
const blogsServices_1 = require("../services/blogsServices");
const blogsQueryRepository_1 = require("../repositories/blogsQueryRepository");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const createBlogController = async (req, res) => {
    const newBlogId = await blogsServices_1.blogsServices.createBlog(req.body);
    const newBlog = await blogsQueryRepository_1.blogsQueryRepository.findBlogAndMap(newBlogId);
    if (!newBlog)
        return res.sendStatus(httpStatus_1.HttpStatus.InternalServerError);
    return res.status(httpStatus_1.HttpStatus.Created).send(newBlog);
};
exports.createBlogController = createBlogController;
//# sourceMappingURL=createBlogController.js.map