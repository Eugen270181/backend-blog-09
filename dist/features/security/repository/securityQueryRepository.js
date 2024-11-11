"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityQueryRepository = void 0;
const db_1 = require("../../../common/module/db/db");
const mongodb_1 = require("mongodb");
exports.securityQueryRepository = {
    async findSessionById(id) {
        const isIdValid = mongodb_1.ObjectId.isValid(id);
        if (!isIdValid)
            return null;
        return db_1.db.getCollections().sessionsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
    },
    async getActiveSessionsAndMap(userId) {
        const timeNow = Date.now();
        const filter = Object.assign({ expDate: { $gt: timeNow } }, (userId && { userId }));
        try {
            const sessions = await db_1.db.getCollections().sessionsCollection.find(filter).toArray();
            return sessions.map(this.map);
        }
        catch (e) {
            console.log(e);
            throw new Error(JSON.stringify(e));
        }
    },
    map(session) {
        const { ip, title, lastActiveDate, deviceId } = session; //деструктуризация
        return { ip, title, lastActiveDate: lastActiveDate.toString(), deviceId };
    }
};
//# sourceMappingURL=securityQueryRepository.js.map