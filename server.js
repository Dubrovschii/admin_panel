import AdminJS from 'adminjs';
import AdminJSSequelize from '@adminjs/sequelize';
import AdminJSExpress from '@adminjs/express';
import { AdminJSOptions } from './adminOptions/index.js';
import { Sequelize } from 'sequelize';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import * as url from 'url';
import { componentLoader } from './adminOptions/componentLoader.js';

// === Инициализация ===
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config();
const app = express();

// Подключение адаптера
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

// Настройка AdminJS
const adminJs = new AdminJS({
    componentLoader,
    ...AdminJSOptions,
    rootPath: '/admin',
});

// Учетные данные администратора
const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
};

// Функция аутентификации
const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
};

// Функция запуска сервера
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established');

        // Сборка роутера AdminJS с авторизацией
        const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
            adminJs,
            {
                authenticate,
                cookiePassword: process.env.COOKIE_SECRET || 'super-secret-cookie',
            },
            null,
            {
                resave: false,
                saveUninitialized: false,
                secret: process.env.SESSION_SECRET || 'super-secret',
                cookie: {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                },
                name: 'adminjs',
            }
        );

        // ===== Порядок имеет значение =====
        // 1. Общая статика (включая /custom.css)
        app.use(express.static(path.join(__dirname, 'public')));

        // 2. Статика для загрузок (если используешь)
        app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

        // 3. AdminJS роутер
        app.use(adminJs.options.rootPath, adminRouter);

        // Порт Render.com или локальный
        const port = process.env.PORT || 3000;

        // Запуск сервера
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
            console.log(`🔧 AdminJS available at http://localhost:${port}/admin`);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
