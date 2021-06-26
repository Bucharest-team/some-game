import express from 'express';

import { logger } from './middlewares';
import router from './router';
import { sequelize } from './db/models/database';
import { Topic } from './db/models/topic';

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Успешное подключение к базе данных.');

        await Topic.sync();
        const result = await Topic.create({
            title: 'title',
            author: 'author'
        });

        console.log('result', result);

        await sequelize.sync();
    } catch (err) {
        console.error('Не удается подключиться к базе данных:', err);
    }
})();

const server = express()
    .disable('x-powered-by')
    .use(logger)
    .use(router);

export { server };
