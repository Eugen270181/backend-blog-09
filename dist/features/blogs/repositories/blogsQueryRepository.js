"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsQueryRepository = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../../../common/module/db/db");
exports.blogsQueryRepository = {
    async findBlogById(id) {
        const isIdValid = mongodb_1.ObjectId.isValid(id);
        if (!isIdValid)
            return null;
        return db_1.db.getCollections().blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
    },
    async findBlogAndMap(id) {
        const blog = await this.findBlogById(id);
        return blog ? this.map(blog) : null;
    },
    async getBlogsAndMap(query) {
        const search = query.searchNameTerm ? { name: { $regex: query.searchNameTerm, $options: 'i' } } : {};
        try {
            const blogs = await db_1.db.getCollections().blogsCollection
                .find(search)
                .sort(query.sortBy, query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray();
            const totalCount = await db_1.db.getCollections().blogsCollection.countDocuments(search);
            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount,
                items: blogs.map(this.map)
            };
        }
        catch (e) {
            console.log(e);
            throw new Error(JSON.stringify(e));
        }
    },
    map(blog) {
        const { _id, ...blogForOutput } = blog; //деструктуризация
        return { id: blog._id.toString(), ...blogForOutput };
    },
};
//# sourceMappingURL=blogsQueryRepository.js.map