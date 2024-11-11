"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsServices = void 0;
const mongodb_1 = require("mongodb");
const blogsRepository_1 = require("../../blogs/repositories/blogsRepository");
const postsRepository_1 = require("../repository/postsRepository");
exports.postsServices = {
    async createPost(post) {
        const { title, shortDescription, content, blogId } = post;
        const newPost = Object.assign({ title, shortDescription, content, blogId }, { blogName: (await blogsRepository_1.blogsRepository.findBlogById(post.blogId)).name, createdAt: new Date().toISOString() });
        return postsRepository_1.postsRepository.createPost(newPost); // return _id -objectId
    },
    async deletePost(id) {
        const isIdValid = mongodb_1.ObjectId.isValid(id);
        if (!isIdValid)
            return false;
        return postsRepository_1.postsRepository.deletePost(new mongodb_1.ObjectId(id));
    },
    async updatePost(post, id) {
        const isIdValid = mongodb_1.ObjectId.isValid(id);
        if (!isIdValid)
            return false;
        const { title, shortDescription, content, blogId } = post;
        const blog = await blogsRepository_1.blogsRepository.findBlogById(post.blogId);
        if (!blog)
            return false;
        const updateObject = Object.assign({ title, shortDescription, content, blogId }, { blogName: blog.name });
        return postsRepository_1.postsRepository.updatePost(updateObject, id);
    },
};
//# sourceMappingURL=postsServices.js.map