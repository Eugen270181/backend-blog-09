"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const db_1 = require("../../../common/module/db/db");
const mongodb_1 = require("mongodb");
exports.postsRepository = {
    async createPost(post) {
        const result = await db_1.db.getCollections().postsCollection.insertOne(post);
        return result.insertedId.toString(); // return _id -objectId
    },
    async findPostById(id) {
        const isIdValid = mongodb_1.ObjectId.isValid(id);
        if (!isIdValid)
            return null;
        return db_1.db.getCollections().postsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
    },
    async deletePost(id) {
        const result = await db_1.db.getCollections().postsCollection.deleteOne({ _id: id });
        return result.deletedCount > 0;
    },
    async updatePost(post, id) {
        const filter = { _id: new mongodb_1.ObjectId(id) };
        const updater = { $set: Object.assign({}, post) };
        const result = await db_1.db.getCollections().postsCollection.updateOne(filter, updater);
        return result.modifiedCount > 0;
    },
};
//# sourceMappingURL=postsRepository.js.map