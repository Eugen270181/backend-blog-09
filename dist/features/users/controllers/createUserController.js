"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = void 0;
const usersServices_1 = require("../services/usersServices");
const usersQueryRepository_1 = require("../repositories/usersQueryRepository");
const resultStatus_1 = require("../../../common/types/enum/resultStatus");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const createUserController = async (req, res) => {
    const newUserResult = await usersServices_1.usersServices.createUser(req.body);
    if (newUserResult.status === resultStatus_1.ResultStatus.BadRequest) {
        return res.status(httpStatus_1.HttpStatus.BadRequest).send(newUserResult.errors);
    }
    const newUser = await usersQueryRepository_1.usersQueryRepository.getMapUser(newUserResult.data);
    if (!newUser)
        return res.sendStatus(httpStatus_1.HttpStatus.InternalServerError);
    return res.status(httpStatus_1.HttpStatus.Created).send(newUser);
};
exports.createUserController = createUserController;
//# sourceMappingURL=createUserController.js.map