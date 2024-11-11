"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("../../settings/config");
exports.db = {
    client: {},
    getDbName() {
        return this.client.db(config_1.appConfig.DB_NAME);
    },
    async run(url) {
        try {
            this.client = new mongodb_1.MongoClient(url);
            await this.client.connect();
            await this.getDbName().command({ ping: 1 });
            console.log("Connected successfully to mongo server");
        }
        catch (e) {
            console.error("Can't connect to mongo server", e);
            await this.stop();
        }
    },
    async stop() {
        await this.client.close();
        console.log("Connection successful closed");
    },
    async drop() {
        try {
            //await this.getDbName().dropDatabase()
            const collections = await this.getDbName().listCollections().toArray();
            for (const collection of collections) {
                const collectionName = collection.name;
                //await this.getDbName().collection(collectionName).drop();
                await this.getDbName().collection(collectionName).deleteMany({});
            }
        }
        catch (e) {
            console.error('Error in drop db:', e);
            await this.stop();
        }
    },
    getCollections() {
        return {
            usersCollection: this.getDbName().collection(config_1.appConfig.USERS_COLLECTION_NAME),
            blogsCollection: this.getDbName().collection(config_1.appConfig.BLOGS_COLLECTION_NAME),
            postsCollection: this.getDbName().collection(config_1.appConfig.POSTS_COLLECTION_NAME),
            commentsCollection: this.getDbName().collection(config_1.appConfig.COMMENTS_COLLECTION_NAME),
            requestsLogCollection: this.getDbName().collection(config_1.appConfig.REQUESTS_COLLECTION_NAME),
            sessionsCollection: this.getDbName().collection(config_1.appConfig.SESSIONS_COLLECTION_NAME),
            //...all collections
        };
    },
};
//# sourceMappingURL=db.js.map