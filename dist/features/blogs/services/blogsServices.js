"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsServices = void 0;
const blogsRepository_1 = require("../repositories/blogsRepository");
const bson_1 = require("bson");
exports.blogsServices = {
    async createBlog(blog) {
        const { name, description, websiteUrl } = blog;
        const newBlog = {
            ...{ name, description, websiteUrl },
            createdAt: new Date().toISOString(),
            isMembership: false
        };
        return blogsRepository_1.blogsRepository.createBlog(newBlog);
    },
    async deleteBlog(id) {
        const isIdValid = bson_1.ObjectId.isValid(id);
        if (!isIdValid)
            return false;
        return blogsRepository_1.blogsRepository.deleteBlog(new bson_1.ObjectId(id));
    },
    async updateBlog(blog, id) {
        const isIdValid = bson_1.ObjectId.isValid(id);
        if (!isIdValid)
            return false;
        return blogsRepository_1.blogsRepository.updateBlog(blog, id);
    },
};
//# sourceMappingURL=blogsServices.js.map