"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityRepository = void 0;
const db_1 = require("../../../common/module/db/db");
const mongodb_1 = require("mongodb");
exports.securityRepository = {
    async findSessionById(_id) {
        const isIdValid = mongodb_1.ObjectId.isValid(id);
        if (!isIdValid)
            return null;
        return db_1.db.getCollections().sessionsCollection.findOne({ _id });
    },
    async findActiveSession(sessionFilter) {
        return db_1.db.getCollections().sessionsCollection.findOne(sessionFilter);
    },
    async createSession(sessionObject) {
        const result = await db_1.db.getCollections().sessionsCollection.insertOne(sessionObject);
        return result.insertedId.toString();
    },
    async updateSession(lastActiveDate, expDate, id) {
        const filter = { _id: new mongodb_1.ObjectId(id) };
        const updater = { $set: { lastActiveDate, expDate } };
        const result = await db_1.db.getCollections().sessionsCollection.updateOne(filter, updater);
        return result.modifiedCount > 0;
    },
    async deleteSession(_id) {
        const result = await db_1.db.getCollections().sessionsCollection.deleteOne({ _id });
        return result.deletedCount > 0;
    },
};
//# sourceMappingURL=securityRepository.js.map