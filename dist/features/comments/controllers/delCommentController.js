"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delCommentController = void 0;
const commentsServices_1 = require("../services/commentsServices");
const resultStatus_1 = require("../../../common/types/enum/resultStatus");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const delCommentController = async (req, res) => {
    const userId = req.user?.userId;
    const commentId = req.params.id;
    const deleteResult = await commentsServices_1.commentsServices.deleteComment(commentId, userId);
    if (deleteResult === resultStatus_1.ResultStatus.NotFound)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound);
    if (deleteResult === resultStatus_1.ResultStatus.Forbidden)
        return res.sendStatus(httpStatus_1.HttpStatus.Forbidden);
    if (deleteResult === resultStatus_1.ResultStatus.CancelledAction)
        return res.sendStatus(httpStatus_1.HttpStatus.InternalServerError);
    return res.sendStatus(httpStatus_1.HttpStatus.NoContent);
};
exports.delCommentController = delCommentController;
//# sourceMappingURL=delCommentController.js.map