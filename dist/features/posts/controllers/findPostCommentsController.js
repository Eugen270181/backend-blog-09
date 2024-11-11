"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPostCommentsController = void 0;
const commentsQueryRepository_1 = require("../../comments/repositories/commentsQueryRepository");
const querySortSanitizer_1 = require("../../../common/module/querySortSanitizer");
const postsRepository_1 = require("../repository/postsRepository");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const findPostCommentsController = async (req, res) => {
    const postId = req.params.id;
    const foundPost = await postsRepository_1.postsRepository.findPostById(postId);
    if (!foundPost)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound);
    const sanitizedSortQuery = (0, querySortSanitizer_1.querySortSanitizer)(req.query);
    const foundComments = await commentsQueryRepository_1.commentsQueryRepository.getCommentsAndMap(sanitizedSortQuery, postId);
    return res.status(httpStatus_1.HttpStatus.Success).send(foundComments);
};
exports.findPostCommentsController = findPostCommentsController;
//# sourceMappingURL=findPostCommentsController.js.map