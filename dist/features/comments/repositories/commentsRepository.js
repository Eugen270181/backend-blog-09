"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRepository = void 0;
const db_1 = require("../../../common/module/db/db");
const mongodb_1 = require("mongodb");
exports.commentsRepository = {
    async createComment(comment) {
        const result = await db_1.db.getCollections().commentsCollection.insertOne(comment);
        return result.insertedId.toString(); // return _id -objectId
    },
    async findCommentById(id) {
        const isIdValid = mongodb_1.ObjectId.isValid(id);
        if (!isIdValid)
            return null;
        return db_1.db.getCollections().commentsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
    },
    async deleteComment(id) {
        const result = await db_1.db.getCollections().commentsCollection.deleteOne({ _id: id });
        return result.deletedCount > 0;
    },
    async updateComment(comment, id) {
        const filter = { _id: new mongodb_1.ObjectId(id) };
        const updater = { $set: Object.assign({}, comment) };
        const result = await db_1.db.getCollections().commentsCollection.updateOne(filter, updater);
        return result.modifiedCount > 0;
    },
};
//# sourceMappingURL=commentsRepository.js.map