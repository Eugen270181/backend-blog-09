"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultClass = void 0;
const resultStatus_1 = require("../types/enum/resultStatus");
class ResultClass {
    constructor(status, data) {
        this.status = status !== null && status !== void 0 ? status : resultStatus_1.ResultStatus.BadRequest;
        this.data = data !== null && data !== void 0 ? data : null;
        this.errors = { errorsMessages: [] }; // Инициализируем массив ошибок
    }
    // Метод для добавления ошибки в массив errorsMessages
    addError(message, field) {
        this.errors ? this.errors.errorsMessages.push({ message, field }) : null;
    }
}
exports.ResultClass = ResultClass;
//# sourceMappingURL=result.class.js.map