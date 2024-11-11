"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delUserController = void 0;
const usersServices_1 = require("../services/usersServices");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const delUserController = async (req, res) => {
    const userId = req.params.id;
    const deleteResult = await usersServices_1.usersServices.deleteUser(userId);
    if (!deleteResult)
        return res.sendStatus(httpStatus_1.HttpStatus.NotFound);
    return res.sendStatus(httpStatus_1.HttpStatus.NoContent);
};
exports.delUserController = delUserController;
//# sourceMappingURL=delUserController.js.map