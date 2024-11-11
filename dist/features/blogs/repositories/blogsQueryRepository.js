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
        const { _id } = blog, blogForOutput = __rest(blog, ["_id"]); //деструктуризация
        return Object.assign({ id: blog._id.toString() }, blogForOutput);
    },
};
//# sourceMappingURL=blogsQueryRepository.js.map