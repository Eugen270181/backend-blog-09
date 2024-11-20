"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putBlogController = void 0;
const blogsServices_1 = require("../services/blogsServices");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const putBlogController = async (req, res) => {
    const updateResult = await blogsServices_1.blogsServices.updateBlog(req.body, req.params.id);
    if (!updateResult)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound);
    return res.sendStatus(httpStatus_1.HttpStatus.NoContent);
};
exports.putBlogController = putBlogController;
//# sourceMappingURL=updateBlogController.js.map