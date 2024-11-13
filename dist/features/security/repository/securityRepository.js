"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityRepository = void 0;
const db_1 = require("../../../common/module/db/db");
const mongodb_1 = require("mongodb");
exports.securityRepository = {
    async findSessionById(deviceId) {
        const isIdValid = mongodb_1.ObjectId.isValid(deviceId);
        if (!isIdValid)
            return null;
        const _id = new mongodb_1.ObjectId(deviceId);
        return db_1.db.getCollections().sessionsCollection.findOne({ _id });
    },
    async findActiveSession(sessionFilter) {
        const { userId, deviceId, lastActiveDate } = sessionFilter;
        const isIdValid = mongodb_1.ObjectId.isValid(deviceId);
        if (!isIdValid)
            return null;
        const _id = new mongodb_1.ObjectId(deviceId);
        return db_1.db.getCollections().sessionsCollection.findOne({ userId, _id, lastActiveDate });
    },
    async createSession(sessionObject) {
        const result = await db_1.db.getCollections().sessionsCollection.insertOne(sessionObject);
        return result.insertedId.toString();
    },
    async updateSession(lastActiveDate, expDate, _id) {
        const filter = { _id };
        const updater = { $set: { lastActiveDate, expDate } };
        const result = await db_1.db.getCollections().sessionsCollection.updateOne(filter, updater);
        return result.modifiedCount > 0;
    },
    async deleteSession(_id) {
        const result = await db_1.db.getCollections().sessionsCollection.deleteOne({ _id });
        return result.deletedCount > 0;
    },
    async deleteOtherSessions(userId, _id) {
        const filter = { userId, _id: { $ne: _id } };
        const result = await db_1.db.getCollections().sessionsCollection.deleteMany(filter);
        return result.deletedCount > 0;
    },
};
//# sourceMappingURL=securityRepository.js.map