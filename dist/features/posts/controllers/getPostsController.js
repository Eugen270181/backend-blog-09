"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsController = void 0;
const postsQueryRepository_1 = require("../repository/postsQueryRepository");
const querySortSanitizer_1 = require("../../../common/module/querySortSanitizer");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const getPostsController = async (req, res) => {
    const sanitizedSortQuery = (0, querySortSanitizer_1.querySortSanitizer)(req.query);
    const foundPosts = await postsQueryRepository_1.postsQueryRepository.getPostsAndMap(sanitizedSortQuery);
    return res.status(httpStatus_1.HttpStatus.Success).send(foundPosts);
};
exports.getPostsController = getPostsController;
//# sourceMappingURL=getPostsController.js.map