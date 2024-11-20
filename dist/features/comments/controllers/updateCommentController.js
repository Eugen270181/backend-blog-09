"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentController = void 0;
const commentsServices_1 = require("../services/commentsServices");
const resultStatus_1 = require("../../../common/types/enum/resultStatus");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const updateCommentController = async (req, res) => {
    const userId = req.user?.userId;
    const commentId = req.params.id;
    const { content } = req.body;
    const updateResult = await commentsServices_1.commentsServices.updateComment({ content }, commentId, userId);
    if (updateResult === resultStatus_1.ResultStatus.NotFound)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound);
    if (updateResult === resultStatus_1.ResultStatus.Forbidden)
        return res.sendStatus(httpStatus_1.HttpStatus.Forbidden);
    if (updateResult === resultStatus_1.ResultStatus.CancelledAction)
        return res.sendStatus(httpStatus_1.HttpStatus.InternalServerError);
    return res.sendStatus(httpStatus_1.HttpStatus.NoContent);
};
exports.updateCommentController = updateCommentController;
//# sourceMappingURL=updateCommentController.js.map