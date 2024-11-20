"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityQueryRepository = void 0;
const db_1 = require("../../../common/module/db/db");
exports.securityQueryRepository = {
    async getActiveSessionsAndMap(userId) {
        const dateNow = new Date();
        const filter = { "expDate": { $gt: dateNow }, ...(userId && { userId }) };
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
        const { ip, title, lastActiveDate, _id } = session; //деструктуризация
        return { deviceId: _id.toString(), ip, lastActiveDate: lastActiveDate.toISOString(), title };
    }
};
//# sourceMappingURL=securityQueryRepository.js.map