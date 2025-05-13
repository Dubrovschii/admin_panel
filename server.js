// import AdminJS from 'adminjs';
// import AdminJSSequelize from '@adminjs/sequelize';
// import AdminJSExpress from '@adminjs/express'; // <-- ОБЯЗАТЕЛЕН
// import { AdminJSOptions } from './adminOptions/index.js';  // Импорт по умолчанию
// import { Sequelize } from 'sequelize';
// import express from 'express';
// import dotenv from 'dotenv';
// import path from 'path';
// import * as url from 'url';
// import { ComponentLoader } from 'adminjs';
// import { componentLoader, Components } from './adminOptions/componentLoader.js';

// // // === Инициализация ===

// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// dotenv.config();
// const app = express();

// AdminJS.registerAdapter(AdminJSSequelize);

// // Настройка Sequelize
// const sequelize = new Sequelize({
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT || 3306,
//     username: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_NAME || 'marketpro',
//     dialect: 'mysql',
//     logging: false,
// });

// const adminJs = new AdminJS({
//     componentLoader,
//     ...AdminJSOptions,
//     rootPath: '/admin',
//     assets: {
//         styles: ['/custom.css'],  // Подключение кастомных стилей
//     },
// });

// // Учетные данные администратора
// const DEFAULT_ADMIN = {
//     email: 'admin@example.com',
//     password: 'password',
// };

// // Аутентификация
// const authenticate = async (email, password) => {
//     if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//         return Promise.resolve(DEFAULT_ADMIN);
//     }
//     return null;
// };

// // Запуск сервера
// const startServer = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database connection established');

//         const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
//             adminJs,
//             { authenticate, cookiePassword: process.env.COOKIE_SECRET || 'super-secret-cookie' },
//             null,
//             {
//                 resave: false,
//                 saveUninitialized: false,
//                 secret: process.env.SESSION_SECRET || 'super-secret',
//                 cookie: {
//                     httpOnly: true,
//                     secure: process.env.NODE_ENV === 'production', // включить secure cookie для продакшн
//                 },
//                 name: 'adminjs',
//             }
//         );
//         adminJs.watch()
//         app.use(adminJs.options.rootPath, adminRouter);
//         app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
//         app.listen(3011, () => {
//             console.log('Server is running on http://localhost:3011');
//             console.log('AdminJS is running at http://localhost:3011/admin');
//         });

//     } catch (error) {
//         console.error('Failed to start server:', error);
//         process.exit(1);
//     }
// };

// startServer();

import AdminJS from 'adminjs';
import AdminJSSequelize from '@adminjs/sequelize';
import AdminJSExpress from '@adminjs/express'; // ОБЯЗАТЕЛЕН
import { AdminJSOptions } from './adminOptions/index.js';  // Импорт по умолчанию
import { Sequelize } from 'sequelize';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import * as url from 'url';
import { componentLoader, Components } from './adminOptions/componentLoader.js';

// === Инициализация ===
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config();
const app = express();

AdminJS.registerAdapter(AdminJSSequelize);

// Настройка Sequelize
const sequelize = new Sequelize({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'marketpro',
    dialect: 'mysql',
    logging: false,
});

const adminJs = new AdminJS({
    componentLoader,
    ...AdminJSOptions,
    rootPath: '/admin',
    assets: {
        styles: ['/custom.css'],  // Подключение кастомных стилей
    },
});

// Учетные данные администратора
const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
};

// Аутентификация
const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
};

// Запуск сервера
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established');

        const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
            adminJs,
            { authenticate, cookiePassword: process.env.COOKIE_SECRET || 'super-secret-cookie' },
            null,
            {
                resave: false,
                saveUninitialized: false,
                secret: process.env.SESSION_SECRET || 'super-secret',
                cookie: {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // включить secure cookie для продакшн
                },
                name: 'adminjs',
            }
        );

        adminJs.watch(); // Наблюдать за изменениями

        // Используем порт, предоставленный Render.com
        const port = process.env.PORT || 3000;

        // Роуты
        app.use(adminJs.options.rootPath, adminRouter);
        app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

        // Запуск сервера
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
            console.log(`AdminJS is running at http://localhost:${port}/admin`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

