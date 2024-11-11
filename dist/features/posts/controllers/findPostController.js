"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPostController = void 0;
const postsQueryRepository_1 = require("../repository/postsQueryRepository");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const findPostController = async (req, res) => {
    const foundPost = await postsQueryRepository_1.postsQueryRepository.findPostAndMap(req.params.id);
    if (!foundPost)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound);
    return res.status(httpStatus_1.HttpStatus.Success).send(foundPost);
};
exports.findPostController = findPostController;
//# sourceMappingURL=findPostController.js.map