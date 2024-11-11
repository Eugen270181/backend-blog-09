"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./common/module/db/db");
const config_1 = require("./common/settings/config");
const initApp_1 = require("./initApp");
const paths_1 = require("./common/settings/paths");
const app = (0, initApp_1.initApp)();
app.get(paths_1.routersPaths.common, (req, res) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({ version: '1.0' });
});
const startApp = async () => {
    await db_1.db.run(config_1.appConfig.MONGO_URL);
    app.listen(config_1.appConfig.PORT, () => {
        console.log(`Example app listening on port ${config_1.appConfig.PORT}`);
    });
    return app;
};
startApp();
//# sourceMappingURL=index.js.map