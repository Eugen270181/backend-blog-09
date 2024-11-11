"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersQueryRepository = void 0;
const db_1 = require("../../../common/module/db/db");
const mongodb_1 = require("mongodb");
exports.usersQueryRepository = {
    async getUserById(id) {
        const isIdValid = mongodb_1.ObjectId.isValid(id);
        if (!isIdValid)
            return null;
        return db_1.db.getCollections().usersCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
    },
    async getMapUser(id) {
        const user = await this.getUserById(id);
        return user ? this.mapUser(user) : null;
    },
    async getMapMe(id) {
        const user = await this.getUserById(id);
        if (!user)
            return {};
        return this.mapMe(user);
    },
    async getMapUsers(query) {
        const searchLogin = query.searchLoginTerm ? { login: { $regex: query.searchLoginTerm, $options: 'i' } } : {};
        const searchEmail = query.searchEmailTerm ? { email: { $regex: query.searchEmailTerm, $options: 'i' } } : {};
        const search = { $or: [searchLogin, searchEmail] };
        try {
            const users = await db_1.db.getCollections().usersCollection
                .find(search)
                .sort(query.sortBy, query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray();
            const totalCount = await db_1.db.getCollections().usersCollection.countDocuments(search);
            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount,
                items: users.map(this.mapUser)
            };
        }
        catch (e) {
            console.log(e);
            throw new Error(JSON.stringify(e));
        }
    },
    mapUser(user) {
        const { _id, createdAt, login, email } = user; //деструктуризация
        return { id: user._id.toString(), createdAt: user.createdAt.toISOString(), login, email };
    },
    mapMe(user) {
        const { _id, email, login } = user; //деструктуризация
        return { email, login, userId: _id.toString() };
    },
};
//# sourceMappingURL=usersQueryRepository.js.map