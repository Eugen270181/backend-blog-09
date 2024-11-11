"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
        const { _id, postId } = comment, commentForOutPut = __rest(comment, ["_id", "postId"]); //деструктуризация
        return Object.assign({ id: comment._id.toString() }, commentForOutPut);
    },
};
//# sourceMappingURL=commentsQueryRepository.js.map