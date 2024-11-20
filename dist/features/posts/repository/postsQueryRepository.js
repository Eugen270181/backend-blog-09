"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsQueryRepository = void 0;
const db_1 = require("../../../common/module/db/db");
const mongodb_1 = require("mongodb");
exports.postsQueryRepository = {
    async findPostById(id) {
        const isIdValid = mongodb_1.ObjectId.isValid(id);
        if (!isIdValid)
            return null;
        return db_1.db.getCollections().postsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
    },
    async findPostAndMap(id) {
        const post = await this.findPostById(id);
        return post ? this.map(post) : null;
    },
    async getPostsAndMap(query, blogId) {
        const filter = blogId ? { blogId } : {};
        //const search = query.searchNameTerm ? {title:{$regex:query.searchNameTerm,$options:'i'}}:{}
        try {
            const posts = await db_1.db.getCollections().postsCollection
                .find(filter)
                .sort(query.sortBy, query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray();
            const totalCount = await db_1.db.getCollections().postsCollection.countDocuments(filter);
            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount,
                items: posts.map(this.map)
            };
        }
        catch (e) {
            console.log(e);
            throw new Error(JSON.stringify(e));
        }
    },
    map(post) {
        const { _id, ...postForOutput } = post; //деструктуризация
        return { id: post._id.toString(), ...postForOutput };
    },
};
//# sourceMappingURL=postsQueryRepository.js.map