"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delBlogController = void 0;
const blogsServices_1 = require("../services/blogsServices");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const delBlogController = async (req, res) => {
    const blogId = req.params.id;
    const deleteResult = await blogsServices_1.blogsServices.deleteBlog(blogId);
    if (!deleteResult)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound);
    return res.sendStatus(httpStatus_1.HttpStatus.NoContent);
};
exports.delBlogController = delBlogController;
//# sourceMappingURL=delBlogController.js.map