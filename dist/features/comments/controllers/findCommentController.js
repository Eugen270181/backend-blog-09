"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCommentController = void 0;
const commentsQueryRepository_1 = require("../repositories/commentsQueryRepository");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const findCommentController = async (req, res) => {
    const commentId = req.params.id;
    const foundComment = await commentsQueryRepository_1.commentsQueryRepository.findCommentAndMap(commentId);
    if (!foundComment)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound);
    return res.status(httpStatus_1.HttpStatus.Success).send(foundComment);
};
exports.findCommentController = findCommentController;
//# sourceMappingURL=findCommentController.js.map