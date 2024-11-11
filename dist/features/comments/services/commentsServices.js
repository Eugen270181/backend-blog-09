"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsServices = void 0;
const commentsRepository_1 = require("../repositories/commentsRepository");
const bson_1 = require("bson");
const usersRepository_1 = require("../../users/repositories/usersRepository");
const resultStatus_1 = require("../../../common/types/enum/resultStatus");
exports.commentsServices = {
    async createComment(commentInput, postId, userId) {
        const user = await usersRepository_1.usersRepository.getUserById(userId);
        const { content } = commentInput;
        const newComment = {
            content,
            commentatorInfo: { userId: user._id.toString(), userLogin: user.login },
            createdAt: new Date().toISOString(),
            postId
        };
        return commentsRepository_1.commentsRepository.createComment(newComment);
    },
    async deleteComment(id, userId) {
        const isIdValid = bson_1.ObjectId.isValid(id);
        if (!isIdValid)
            return resultStatus_1.ResultStatus.NotFound;
        const comment = await commentsRepository_1.commentsRepository.findCommentById(id);
        if (!comment)
            return resultStatus_1.ResultStatus.NotFound;
        if (comment.commentatorInfo.userId !== userId)
            return resultStatus_1.ResultStatus.Forbidden;
        const isDeleted = await commentsRepository_1.commentsRepository.deleteComment(new bson_1.ObjectId(id));
        return isDeleted ? resultStatus_1.ResultStatus.NoContent : resultStatus_1.ResultStatus.CancelledAction;
    },
    async updateComment(commentInput, id, userId) {
        const isIdValid = bson_1.ObjectId.isValid(id);
        if (!isIdValid)
            return resultStatus_1.ResultStatus.NotFound;
        const comment = await commentsRepository_1.commentsRepository.findCommentById(id);
        if (!comment)
            return resultStatus_1.ResultStatus.NotFound;
        if (comment.commentatorInfo.userId !== userId)
            return resultStatus_1.ResultStatus.Forbidden;
        const { content } = commentInput;
        const isUpdated = await commentsRepository_1.commentsRepository.updateComment({ content }, id);
        return isUpdated ? resultStatus_1.ResultStatus.NoContent : resultStatus_1.ResultStatus.CancelledAction;
    },
};
//# sourceMappingURL=commentsServices.js.map