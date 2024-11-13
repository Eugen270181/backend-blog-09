"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepository = void 0;
const db_1 = require("../../../common/module/db/db");
const mongodb_1 = require("mongodb");
exports.usersRepository = {
    async createUser(user) {
        const result = await db_1.db.getCollections().usersCollection.insertOne(user);
        return result.insertedId.toString(); // return _id -objectId
    },
    async getUserById(id) {
        const isIdValid = mongodb_1.ObjectId.isValid(id);
        if (!isIdValid)
            return null;
        return db_1.db.getCollections().usersCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
    },
    async findByLoginOrEmail(inputLogin) {
        const search = { $or: [
                { login: inputLogin }, // поля логина
                { email: inputLogin } // или электронная почта
            ] };
        return db_1.db.getCollections().usersCollection.findOne(search);
    },
    async findUserByLogin(login) {
        return db_1.db.getCollections().usersCollection.findOne({ login });
    },
    async findUserByEmail(email) {
        return db_1.db.getCollections().usersCollection.findOne({ email });
    },
    async findUserByRegConfirmCode(code) {
        return db_1.db.getCollections().usersCollection.findOne({ 'emailConfirmation.confirmationCode': code });
    },
    async updateConfirmation(_id) {
        const result = await db_1.db.getCollections().usersCollection
            .updateOne({ _id }, { $set: { 'emailConfirmation.isConfirmed': true } });
        return result.modifiedCount === 1;
    },
    async setConfirmationCode(_id, code, date) {
        const result = await db_1.db.getCollections().usersCollection
            .updateOne({ _id }, { $set: { 'emailConfirmation.confirmationCode': code, 'emailConfirmation.expirationDate': date } });
        return result.modifiedCount === 1;
    },
    async deleteUser(id) {
        const result = await db_1.db.getCollections().usersCollection.deleteOne({ _id: id });
        return result.deletedCount > 0;
    },
};
//# sourceMappingURL=usersRepository.js.map