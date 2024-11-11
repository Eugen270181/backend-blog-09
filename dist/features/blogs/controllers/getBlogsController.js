"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogsController = void 0;
const blogsQueryRepository_1 = require("../repositories/blogsQueryRepository");
const querySortSanitizer_1 = require("../../../common/module/querySortSanitizer");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const getBlogsController = async (req, res) => {
    const sanitizedSortQuery = (0, querySortSanitizer_1.querySortSanitizer)(req.query);
    const searchNameTerm = req.query.searchNameTerm;
    const blogsQueryFilter = Object.assign({ searchNameTerm }, sanitizedSortQuery);
    const foundBlogs = await blogsQueryRepository_1.blogsQueryRepository.getBlogsAndMap(blogsQueryFilter);
    return res.status(httpStatus_1.HttpStatus.Success).send(foundBlogs);
};
exports.getBlogsController = getBlogsController;
//# sourceMappingURL=getBlogsController.js.map