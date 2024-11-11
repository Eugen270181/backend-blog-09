"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPostController = void 0;
const postsServices_1 = require("../services/postsServices");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const putPostController = async (req, res) => {
    const postId = req.params.id;
    const updateResult = await postsServices_1.postsServices.updatePost(req.body, postId);
    if (!updateResult)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound);
    return res.sendStatus(httpStatus_1.HttpStatus.NoContent);
};
exports.putPostController = putPostController;
//# sourceMappingURL=putPostController.js.map