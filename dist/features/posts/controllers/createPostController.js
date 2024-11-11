"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostController = void 0;
const postsServices_1 = require("../services/postsServices");
const postsQueryRepository_1 = require("../repository/postsQueryRepository");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const createPostController = async (req, res) => {
    const newPostId = await postsServices_1.postsServices.createPost(req.body);
    const newPost = await postsQueryRepository_1.postsQueryRepository.findPostAndMap(newPostId);
    if (!newPost)
        return res.sendStatus(httpStatus_1.HttpStatus.InternalServerError);
    return res.status(httpStatus_1.HttpStatus.Created).send(newPost);
};
exports.createPostController = createPostController;
//# sourceMappingURL=createPostController.js.map