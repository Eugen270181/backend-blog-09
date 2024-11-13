const request = require("supertest")
//import request from "supertest";
import {initApp} from "../../src/initApp";
import {MongoMemoryServer} from "mongodb-memory-server";

import {db} from "../../src/common/module/db/db";

import {routersPaths} from "../../src/common/settings/paths";
import {ADMIN_LOGIN, ADMIN_PASS} from "../../src/common/middleware/adminMiddleware";
import {createUser} from "./utils/createUsers";
import {testingDtosCreator} from "./utils/testingDtosCreator";

describe('BLOGS_TESTS', ()=>{
    const app=initApp()

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await db.run(mongoServer.getUri());
        //await db.run(appConfig.MONGO_URL);
    })

    //beforeEach(async () => {
    //    await db.drop();
    //})
    afterAll(async () => {
        await db.stop();

    })

    afterAll(done => {
        done()
    })

    it('shouldn`t create blog without authorization: STATUS 401', async () => {
        await request(app)
            .post(routersPaths.blogs)
            .send({ })
            .expect(401);
    });
})