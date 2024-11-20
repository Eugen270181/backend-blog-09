"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsQueryRepository = void 0;
const db_1 = require("../../../common/module/db/db");
const mongodb_1 = require("mongodb");
exports.commentsQueryRepository = {
    async findCommentById(id) {
        const isIdValid = mongodb_1.ObjectId.isValid(id);
        if (!isIdValid)
            return null;
        return db_1.db.getCollections().commentsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
    },
    async findCommentAndMap(id) {
        const comment = await this.findCommentById(id);
        return comment ? this.map(comment) : null;
    },
    async getCommentsAndMap(query, postId) {
        const search = postId ? { postId: postId } : {};
        try {
            const comments = await db_1.db.getCollections().commentsCollection
                .find(search)
                .sort(query.sortBy, query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray();
            const totalCount = await db_1.db.getCollections().commentsCollection.countDocuments(search);
            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount,
                items: comments.map(this.map)
            };
        }
        catch (e) {
            console.log(e);
            throw new Error(JSON.stringify(e));
        }
    },
    map(comment) {
        const { _id, postId, ...commentForOutPut } = comment; //деструктуризация
        return { id: comment._id.toString(), ...commentForOutPut };
    },
};
//# sourceMappingURL=commentsQueryRepository.js.map