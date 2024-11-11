"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delPostController = void 0;
const postsServices_1 = require("../services/postsServices");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const delPostController = async (req, res) => {
    const postId = req.params.id;
    const deleteResult = await postsServices_1.postsServices.deletePost(postId);
    if (!deleteResult)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound);
    return res.sendStatus(httpStatus_1.HttpStatus.NoContent);
};
exports.delPostController = delPostController;
//# sourceMappingURL=delPostController.js.map