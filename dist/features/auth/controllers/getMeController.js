"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeController = void 0;
const usersQueryRepository_1 = require("../../users/repositories/usersQueryRepository");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const getMeController = async (req, res) => {
    const userId = req.user?.userId;
    const meViewObject = await usersQueryRepository_1.usersQueryRepository.getMapMe(userId);
    return res.status(httpStatus_1.HttpStatus.Success).send(meViewObject);
};
exports.getMeController = getMeController;
//# sourceMappingURL=getMeController.js.map