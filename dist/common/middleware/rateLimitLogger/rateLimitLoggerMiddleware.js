"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitLoggerMiddleware = void 0;
const db_1 = require("../../module/db/db");
const rateLimitLoggerMiddleware = async (req, res, next) => {
    const ip = req.ip ?? "unknown";
    const url = req.originalUrl;
    const now = new Date();
    const startTimeReqCounter = new Date(now.getTime() - 10000);
    try {
        // Подсчет запросов за последние 10 секунд
        const requestCount = await db_1.db.getCollections().requestsLogCollection.countDocuments({
            ip: ip,
            url: url,
            date: { $gte: startTimeReqCounter },
        });
        console.log(requestCount);
        if (requestCount >= 5)
            return res.status(429).send({ message: 'Превышено количество запросов. Попробуйте позже.' });
        // Сохранение запроса в базе данных
        await db_1.db.getCollections().requestsLogCollection.insertOne({ ip, url, date: now });
        //await db.getCollections().requestsLogCollection.deleteMany({ ip, url, date: { $lt: startTimeReqCounter } });
        next(); // Передаем управление дальше
    }
    catch (error) {
        console.error('Ошибка при выполнении rateLimiter:', error);
        res.status(500).send('Ошибка сервера');
    }
};
exports.rateLimitLoggerMiddleware = rateLimitLoggerMiddleware;
//# sourceMappingURL=rateLimitLoggerMiddleware.js.map