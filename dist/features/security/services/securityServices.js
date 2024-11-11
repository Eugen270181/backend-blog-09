"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityServices = void 0;
const bson_1 = require("bson");
const securityRepository_1 = require("../repository/securityRepository");
exports.securityServices = {
    async createSession(sessionObject) {
        return securityRepository_1.securityRepository.createSession(sessionObject);
    },
    async deleteSession(_id) {
        const isIdValid = bson_1.ObjectId.isValid(id);
        if (!isIdValid)
            return false;
        return blogsRepository.updateBlog(blog, id);
    },
    async updateBlog(blog, id) {
        const isIdValid = bson_1.ObjectId.isValid(id);
        if (!isIdValid)
            return false;
        return blogsRepository.updateBlog(blog, id);
    },
};
//# sourceMappingURL=securityServices.js.map