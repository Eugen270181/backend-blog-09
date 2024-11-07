import {db} from "../../../common/module/db/db"
import {ObjectId, WithId} from "mongodb"
import {SortQueryFilterType} from "../../../common/types/sortQueryFilter.type";
import {SecurityOutputModel} from "../types/output/securityOutput.model";
import {SecurityDbModel} from "../types/securityDb.model";

export const securityQueryRepository = {
    async findSessionById(id: string) {
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return null
        return db.getCollections().sessionsCollection.findOne({ _id: new ObjectId(id) })
    },
    async getActiveSessionsAndMap(userId?:string):Promise<SecurityOutputModel[]> { // используем этот метод если проверили валидность и существование в бд значения blogid
        const timeNow = Date.now();
        const filter = {expDate:{$gt:timeNow}, ...(userId && { userId })}

        try {
            const sessions = await db.getCollections().sessionsCollection.find(filter).toArray()

            return sessions.map(this.map)
        }
        catch(e){
            console.log(e)
            throw new Error(JSON.stringify(e))
        }
    },
    map(session:WithId<SecurityDbModel>):SecurityOutputModel {
        const { ip, title, lastActiveDate, deviceId} = session;//деструктуризация
        return { ip, title, lastActiveDate:lastActiveDate.toString(), deviceId}
    }
}