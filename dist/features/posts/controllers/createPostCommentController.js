"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostCommentController = void 0;
const commentsServices_1 = require("../../comments/services/commentsServices");
const postsRepository_1 = require("../repository/postsRepository");
const commentsQueryRepository_1 = require("../../comments/repositories/commentsQueryRepository");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const createPostCommentController = async (req, res) => {
    const userId = req.user?.userId;
    const postId = req.params.id;
    const foundPost = await postsRepository_1.postsRepository.findPostById(postId);
    if (!foundPost)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound);
    const { content } = req.body;
    const newCommentId = await commentsServices_1.commentsServices.createComment({ content }, postId, userId);
    const newComment = await commentsQueryRepository_1.commentsQueryRepository.findCommentAndMap(newCommentId);
    if (!newComment)
        return res.sendStatus(httpStatus_1.HttpStatus.InternalServerError);
    return res.status(httpStatus_1.HttpStatus.Created).send(newComment);
};
exports.createPostCommentController = createPostCommentController;
//# sourceMappingURL=createPostCommentController.js.map