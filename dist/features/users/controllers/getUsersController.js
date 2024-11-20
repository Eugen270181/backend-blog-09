"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersController = void 0;
const usersQueryRepository_1 = require("../repositories/usersQueryRepository");
const querySortSanitizer_1 = require("../../../common/module/querySortSanitizer");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const getUsersController = async (req, res) => {
    const sanitizedSortQuery = (0, querySortSanitizer_1.querySortSanitizer)(req.query);
    const searchLoginTerm = req.query.searchLoginTerm;
    const searchEmailTerm = req.query.searchEmailTerm;
    const usersQueryFilter = { searchLoginTerm, searchEmailTerm, ...sanitizedSortQuery };
    const foundUsers = await usersQueryRepository_1.usersQueryRepository.getMapUsers(usersQueryFilter);
    return res.status(httpStatus_1.HttpStatus.Success).send(foundUsers);
};
exports.getUsersController = getUsersController;
//# sourceMappingURL=getUsersController.js.map