import {db} from "../../../common/module/db/db"
import {ObjectId, WithId} from "mongodb"
import {SessionFindType} from "../../../common/types/sessionFind.type";
import {SecurityDbModel} from "../types/securityDb.model";


export const securityRepository = {
    async findSessionById(id: string) {
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return null
        return db.getCollections().sessionsCollection.findOne({ _id: new ObjectId(id) })
    },
    async findActiveSession(sessionFilter:SessionFindType) {
        return db.getCollections().sessionsCollection.findOne(sessionFilter);
    },
    async createSession(sessionObject:SecurityDbModel) {
        const result = await db.getCollections().sessionsCollection.insertOne(sessionObject)
        return result.insertedId.toString()
    },
    async updateSession(lastActiveDate:number, expDate:number, id: string) {
        const filter = { _id: new ObjectId(id) }
        const updater = { $set: { lastActiveDate, expDate } }
        const result = await db.getCollections().sessionsCollection.updateOne( filter, updater );
        return result.modifiedCount > 0;
    },
    async deleteSession(_id:ObjectId){
        const result = await db.getCollections().sessionsCollection.deleteOne({ _id });
        return result.deletedCount > 0
    },

}