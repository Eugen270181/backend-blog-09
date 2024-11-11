"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDBTestingController = void 0;
const db_1 = require("../../../common/module/db/db");
const httpStatus_1 = require("../../../common/types/enum/httpStatus");
const clearDBTestingController = async (req, res) => {
    await db_1.db.drop();
    res.sendStatus(httpStatus_1.HttpStatus.NoContent);
};
exports.clearDBTestingController = clearDBTestingController;
//# sourceMappingURL=clearDBTestingController.js.map