"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const db_1 = require("../../../common/module/db/db");
const mongodb_1 = require("mongodb");
exports.blogsRepository = {
    async createBlog(blog) {
        const result = await db_1.db.getCollections().blogsCollection.insertOne(blog);
        return result.insertedId.toString(); // return _id -objectId
    },
    async findBlogById(id) {
        const isIdValid = mongodb_1.ObjectId.isValid(id);
        if (!isIdValid)
            return null;
        return db_1.db.getCollections().blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
    },
    async deleteBlog(id) {
        const result = await db_1.db.getCollections().blogsCollection.deleteOne({ _id: id });
        return result.deletedCount > 0;
    },
    async updateBlog(blog, id) {
        const { name, description, websiteUrl } = blog;
        const filter = { _id: new mongodb_1.ObjectId(id) };
        const updater = { $set: { ...{ name, description, websiteUrl } } };
        const result = await db_1.db.getCollections().blogsCollection.updateOne(filter, updater);
        return result.modifiedCount > 0;
    },
};
//# sourceMappingURL=blogsRepository.js.map