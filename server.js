// // import express from 'express'
// // import AdminJS from 'adminjs'
// // import AdminJSExpress from '@adminjs/express'
// // import { Sequelize, DataTypes } from 'sequelize'
// // import AdminJSSequelize from '@adminjs/sequelize'
// // import uploadFeature from '@adminjs/upload'
// // import session from 'express-session'
// // import dotenv from 'dotenv'
// // import cors from 'cors'
// // import path from 'path'
// // import { fileURLToPath } from 'url'
// // import fs from 'fs'

// // dotenv.config()

// // // __dirname в ESM
// // const __filename = fileURLToPath(import.meta.url)
// // const __dirname = path.dirname(__filename)

// // // Инициализация Sequelize
// // const sequelize = new Sequelize({
// //     host: process.env.DB_HOST || 'localhost',
// //     port: process.env.DB_PORT || 3306,
// //     username: process.env.DB_USER || 'root',
// //     password: process.env.DB_PASSWORD || '',
// //     database: process.env.DB_NAME || 'marketpro',
// //     dialect: 'mysql',
// //     logging: (sql, timing) => {
// //         console.log(`[SQL] ${sql}`)
// //         if (timing) console.log(`[Execution time: ${timing}ms]`)
// //     },
// //     benchmark: true,
// //     dialectOptions: {
// //         connectTimeout: 60000,
// //     },
// //     pool: {
// //         max: 5,
// //         min: 0,
// //         acquire: 30000,
// //         idle: 10000,
// //     },
// // })

// // // Регистрация адаптера
// // AdminJS.registerAdapter(AdminJSSequelize)

// // // Пример модели
// // const Product = sequelize.define('Product', {
// //     name: DataTypes.STRING,
// //     description: DataTypes.TEXT,
// //     image: DataTypes.STRING,
// // })

// // // Инициализация AdminJS
// // const admin = new AdminJS({
// //     databases: [sequelize],
// //     rootPath: '/admin',
// //     resources: [
// //         {
// //             resource: Product,
// //             options: { properties: { description: { type: 'richtext' } } },
// //             features: [
// //                 uploadFeature({
// //                     provider: {
// //                         local: {
// //                             bucket: path.join(__dirname, 'uploads'),
// //                         },
// //                     },
// //                     properties: {
// //                         key: 'image',
// //                         file: 'uploadImage',
// //                     },
// //                     uploadPath: (record, filename) => `products/${record.id}/${filename}`,
// //                 }),
// //             ],
// //         },
// //     ],
// // })

// // // Создание роутера и express-приложения
// // const app = express()
// // app.use(cors())
// // app.use(express.static('uploads'))

// // const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
// //     authenticate: async (email, password) => {
// //         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
// //             return { email }
// //         }
// //         return null
// //     },
// //     cookieName: 'adminjs',
// //     cookiePassword: process.env.COOKIE_SECRET || 'secret',
// // }, null, {
// //     resave: false,
// //     saveUninitialized: true,
// //     secret: process.env.COOKIE_SECRET || 'secret',
// // })

// // app.use(admin.options.rootPath, adminRouter)

// // // Синхронизация и запуск сервера
// // const start = async () => {
// //     try {
// //         await sequelize.authenticate()
// //         await sequelize.sync({ alter: true })
// //         app.listen(3000, () => console.log('AdminJS is under http://localhost:3000/admin'))
// //     } catch (err) {
// //         console.error(err)
// //     }
// // }

// // start()




// // import AdminJS from 'adminjs';
// // import express from 'express';
// // import AdminJSExpress from '@adminjs/express';
// // import { Sequelize } from 'sequelize';
// // import AdminJSSequelize from '@adminjs/sequelize';
// // import uploadFileProvider from '@adminjs/upload';

// // import path from 'path';
// // import { fileURLToPath } from 'url';
// // import { dirname } from 'path';
// // import fs from 'fs';
// // import Product from './models/product.js';

// // // Регистрируем адаптер для Sequelize
// // AdminJS.registerAdapter({
// //     Resource: AdminJSSequelize.Resource,
// //     Database: AdminJSSequelize.Database,
// // });

// // const app = express();

// // // Получаем __dirname в ES модулях
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = dirname(__filename);

// // // Папка для загрузок
// // const uploadDir = path.join(__dirname, 'public', 'uploads');
// // if (!fs.existsSync(uploadDir)) {
// //     fs.mkdirSync(uploadDir, { recursive: true });
// // }

// // const sequelize = new Sequelize({
// //     host: process.env.DB_HOST || 'localhost',
// //     port: process.env.DB_PORT || 3306,
// //     username: process.env.DB_USER || 'root',
// //     password: process.env.DB_PASSWORD || '',
// //     database: process.env.DB_NAME || 'marketpro',
// //     dialect: 'mysql',
// //     logging: (sql, timing) => {
// //         console.log(`[SQL] ${sql}`);
// //         if (timing) console.log(`[Execution time: ${timing}ms]`);
// //     },
// // });

// // // Конфигурация загрузки файлов
// // const uploadOptions = {
// //     provider: new uploadFileProvider.FileProvider({
// //         bucket: uploadDir,
// //         opts: {
// //             baseUrl: '/uploads',
// //         },
// //     }),
// //     properties: {
// //         key: 'product_img',
// //         filePath: 'filePath',
// //         filesToDelete: 'filesToDelete',
// //         mimeType: 'mimeType',
// //     },
// //     multiple: true,
// //     validation: {
// //         mimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
// //     }
// // };

// // const adminJs = new AdminJS({
// //     databases: [sequelize],
// //     rootPath: '/admin',
// //     resources: [
// //         {
// //             resource: Product,
// //             options: {
// //                 properties: {
// //                     product_img: {
// //                         type: 'mixed',
// //                         isArray: true,
// //                     },
// //                 },
// //             },
// //             features: [
// //                 uploadFileFeature(uploadOptions)
// //             ],
// //         },
// //     ],
// // });
// // // Настройка AdminJS
// // // const adminJs = new AdminJS({
// // //     databases: [sequelize],
// // //     rootPath: '/admin',
// // //     resources: [
// // //         {
// // //             resource: Product,
// // //             options: {
// // //                 properties: {
// // //                     product_img: {
// // //                         type: 'mixed',
// // //                         isArray: true,
// // //                     },
// // //                 },
// // //             },
// // //             features: [
// // //                 {
// // //                     name: 'uploadFiles',
// // //                     options: {
// // //                         provider: uploadProvider,
// // //                         properties: {
// // //                             key: 'product_img',
// // //                             filePath: 'filePath',
// // //                             filesToDelete: 'filesToDelete',
// // //                             mimeType: 'mimeType',
// // //                         },
// // //                         multiple: true,
// // //                         validation: {
// // //                             mimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
// // //                         },
// // //                     },
// // //                 },
// // //             ],
// // //         },
// // //     ],
// // // });

// // // Создаем роутер
// // const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
// //     authenticate: async (email, password) => {
// //         // Здесь должна быть ваша логика аутентификации
// //         return { email: 'admin@example.com' };
// //     },
// //     cookiePassword: 'some-secret-password-used-to-secure-cookie',
// // });

// // app.use(adminJs.options.rootPath, router);
// // app.use('/uploads', express.static(uploadDir));

// // app.listen(3000, () => {
// //     console.log('AdminJS is running on http://localhost:3000/admin');
// //     console.log('Uploads are served from http://localhost:3000/uploads');
// // });




// // import AdminJS from 'adminjs';
// // import express from 'express';
// // import AdminJSExpress from '@adminjs/express';
// // import { Sequelize } from 'sequelize';
// // import AdminJSSequelize from '@adminjs/sequelize';
// // import path from 'path';
// // import fs from 'fs';
// // import uploadFeature from '@adminjs/upload';
// // import * as url from 'url';
// // import { ComponentLoader } from 'adminjs'

// // const componentLoader = new ComponentLoader()
// // import Product from './models/product.js';
// // import File from './models/file.js';

// // // Получение __dirname для ES-модулей
// // const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// // // Создание нужной директории до инициализации uploadFeature
// // const uploadFilesDir = path.join(__dirname, 'uploads', 'files');
// // if (!fs.existsSync(uploadFilesDir)) {
// //     fs.mkdirSync(uploadFilesDir, { recursive: true });
// // }

// // // Настройки локального провайдера
// // const localProvider = {
// //     bucket: 'uploads/files',
// //     baseUrl: '/files',
// // };

// // // Инициализация Express
// // const app = express();

// // // Статическая отдача файлов
// // app.use('/files', express.static(path.join(__dirname, 'uploads', 'files')));
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // Подключение адаптера Sequelize
// // AdminJS.registerAdapter({
// //     Resource: AdminJSSequelize.Resource,
// //     Database: AdminJSSequelize.Database,
// // });

// // // Настройка Sequelize
// // const sequelize = new Sequelize({
// //     host: process.env.DB_HOST || 'localhost',
// //     port: process.env.DB_PORT || 3306,
// //     username: process.env.DB_USER || 'root',
// //     password: process.env.DB_PASSWORD || '',
// //     database: process.env.DB_NAME || 'marketpro',
// //     dialect: 'mysql',
// //     logging: (sql, timing) => {
// //         console.log(`[SQL] ${sql}`);
// //         if (timing) console.log(`[Execution time: ${timing}ms]`);
// //     },
// // });
// // const products = {
// //     resource: Product,
// //     options: {
// //         properties: {
// //             s3Key: { type: 'string', isArray: true },
// //             bucket: { type: 'string', isArray: true },
// //             mime: { type: 'string', isArray: true },
// //             comment: { type: 'textarea', isSortable: false },
// //             product_img: { type: 'json', isArray: true },  // Для хранения путей к изображениям
// //         },
// //     },
// //     features: [
// //         uploadFeature({
// //             provider: { local: localProvider },
// //             multiple: true,
// //             validation: {
// //                 mimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
// //             },
// //             properties: {
// //                 key: 's3Key',
// //                 mimeType: 'mime',
// //                 bucket: 'bucket',
// //             },
// //             uploadPath: (record, filename) => {
// //                 const filePath = `${record.id}-${Date.now()}-${filename}`;
// //                 // Добавляем новый путь к изображению в массив
// //                 if (record.product_img) {
// //                     record.product_img.push(filePath);
// //                 } else {
// //                     record.product_img = [filePath];
// //                 }
// //                 return filePath;
// //             },
// //         }),
// //     ],
// // };

// // // Инициализация AdminJS
// // const adminJs = new AdminJS({
// //     databases: [sequelize],
// //     rootPath: '/admin',
// //     resources: [products],
// //     componentLoader
// // });

// // // Аутентификация AdminJS
// // const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
// //     authenticate: async (email, password) => {
// //         return { email: 'admin@example.com' }; // можно заменить на реальную проверку
// //     },
// //     cookiePassword: 'some-secret-password-used-to-secure-cookie',
// // });

// // app.use(adminJs.options.rootPath, router);

// // // Запуск сервера
// // app.listen(3000, () => {
// //     console.log('✅ AdminJS is running at http://localhost:3000/admin');
// //     console.log('✅ Uploads are served from http://localhost:3000/files');
// // });


// // import express from 'express';
// // import AdminJS from 'adminjs';
// // import AdminJSExpress from '@adminjs/express';
// // import { Sequelize, DataTypes } from 'sequelize';
// // import AdminJSSequelize from '@adminjs/sequelize';
// // import uploadFeature from '@adminjs/upload';
// // import fs from 'fs';
// // import path from 'path';
// // import * as url from 'url';
// // import { ComponentLoader } from 'adminjs';

// // import Product from './models/product.js';
// // import File from './models/file.js'; // если используется
// // import { before, after } from './adminOptions/uhook.js';

// // // === Инициализация ===
// // const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
// // const app = express();

// // // === Создание директорий, если не существует ===
// // const uploadFilesDir = path.join(__dirname, 'uploads', 'files');
// // if (!fs.existsSync(uploadFilesDir)) {
// //     fs.mkdirSync(uploadFilesDir, { recursive: true });
// // }

// // // === Статическая отдача файлов ===
// // app.use('/files', express.static(uploadFilesDir));
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // === Инициализация Sequelize ===
// // const sequelize = new Sequelize({
// //     host: process.env.DB_HOST || 'localhost',
// //     port: process.env.DB_PORT || 3306,
// //     username: process.env.DB_USER || 'root',
// //     password: process.env.DB_PASSWORD || '',
// //     database: process.env.DB_NAME || 'marketpro',
// //     dialect: 'mysql',
// //     logging: false,
// // });

// // // === Регистрация адаптера ===
// // AdminJS.registerAdapter({
// //     Resource: AdminJSSequelize.Resource,
// //     Database: AdminJSSequelize.Database,
// // });

// // // === Подключение компонент ===
// // const componentLoader = new ComponentLoader();
// // const ProductImageShow = componentLoader.add('ProductImageShow', path.join(__dirname, './adminOptions/components/ProductImageShow.jsx'));
// // const ProductImageEdit = componentLoader.add('ProductImageEdit', path.join(__dirname, './adminOptions/components/ProductImageEdit.jsx'));

// // // === Upload-компоненты по умолчанию ===
// // // const COMPONENTS = {
// // //     edit: componentLoader.add('Edit', '@adminjs/upload/build/features/upload-file/components/Edit'),
// // //     list: componentLoader.add('List', '@adminjs/upload/build/features/upload-file/components/List'),
// // //     show: componentLoader.add('Show', '@adminjs/upload/build/features/upload-file/components/Show'),
// // // };
// // const COMPONENTS = {
// //     edit: async () => {
// //         const componentPath = await import('@adminjs/upload/build/features/upload-file/components/Edit');
// //         return componentPath.default;
// //     },
// //     list: async () => {
// //         const componentPath = await import('@adminjs/upload/build/features/upload-file/components/List');
// //         return componentPath.default;
// //     },
// //     show: async () => {
// //         const componentPath = await import('@adminjs/upload/build/features/upload-file/components/Show');
// //         return componentPath.default;
// //     }
// // };


// // // === Локальный провайдер ===
// // const localProvider = {
// //     bucket: 'uploads/files',
// //     baseUrl: '/files',
// // };

// // // === Настройка ресурса ===
// // const products = {
// //     resource: Product,
// //     options: {
// //         properties: {
// //             ownerId: { isVisible: false },
// //             picture: { isVisible: false },
// //             mimeType: { isVisible: { delete: false } },
// //             uploadFile: {
// //                 components: {
// //                     edit: COMPONENTS.Edit,
// //                     show: COMPONENTS.Show,
// //                     list: COMPONENTS.List,
// //                 },
// //             },
// //         },
// //         actions: {
// //             new: { before, after },
// //             edit: {
// //                 isAccessible: ({ currentAdmin, record }) =>
// //                     currentAdmin && (currentAdmin.role === 'admin' || currentAdmin._id === record.param('ownerId')),
// //             },
// //             delete: {
// //                 isAccessible: ({ currentAdmin, record }) =>
// //                     currentAdmin && (currentAdmin.role === 'admin' || currentAdmin._id === record.param('ownerId')),
// //             },
// //         },
// //     },
// //     features: [
// //         uploadFeature({
// //             provider: { local: localProvider },
// //             multiple: true,
// //             properties: {
// //                 file: 'uploadFile',
// //                 key: 'product_img',
// //             },
// //             uploadPath: (record, filename) => `product-${record.id}-${Date.now()}-${filename}`,
// //             validation: {
// //                 mimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
// //             },
// //         }),
// //     ],
// // };

// // // === Инициализация AdminJS ===
// // const adminJs = new AdminJS({
// //     databases: [sequelize],
// //     rootPath: '/admin',
// //     resources: [products],
// //     componentLoader,
// // });

// // // === Аутентификация (заглушка) ===
// // const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
// //     authenticate: async (email, password) => {
// //         // 💡 здесь нужно подключить реальную авторизацию
// //         if (email === 'admin@example.com' && password === 'password') {
// //             return { email, role: 'admin', _id: '1' };
// //         }
// //         return null;
// //     },
// //     cookiePassword: 'some-secret-password-used-to-secure-cookie',
// // });

// // app.use(adminJs.options.rootPath, router);

// // // === Запуск ===
// // const start = async () => {
// //     try {
// //         await sequelize.authenticate();
// //         await sequelize.sync(); // можно sync({ alter: true }) на dev
// //         app.listen(3000, () => {
// //             console.log('✅ AdminJS is running at http://localhost:3000/admin');
// //             console.log('✅ Uploads are served from http://localhost:3000/files');
// //         });
// //     } catch (err) {
// //         console.error('❌ Failed to start server:', err);
// //     }
// // };

// // start();




// // Импортирование необходимых библиотек
// import express from 'express';
// import AdminJS from 'adminjs';
// import AdminJSExpress from '@adminjs/express';
// import { Sequelize } from 'sequelize';
// import AdminJSSequelize from '@adminjs/sequelize';
// import uploadFeature from '@adminjs/upload';
// import path from 'path';
// import fs from 'fs';
// import { ComponentLoader } from 'adminjs';
// import Product from './models/product.js';

// import * as url from 'url';
// // === Инициализация ===

// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
// const app = express();

// // === Создание директорий, если не существует ===
// const uploadFilesDir = path.join(__dirname, 'uploads', 'files');
// if (!fs.existsSync(uploadFilesDir)) {
//     fs.mkdirSync(uploadFilesDir, { recursive: true });
// }

// // === Статическая отдача файлов ===
// app.use('/files', express.static(uploadFilesDir));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // === Инициализация Sequelize ===
// const sequelize = new Sequelize({
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT || 3306,
//     username: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_NAME || 'marketpro',
//     dialect: 'mysql',
//     logging: false,
// });

// // === Регистрация адаптера ===
// AdminJS.registerAdapter({
//     Resource: AdminJSSequelize.Resource,
//     Database: AdminJSSequelize.Database,
// });

// // === Подключение компонент ===
// const componentLoader = new ComponentLoader();
// const ProductImageShow = componentLoader.add('ProductImageShow', path.join(__dirname, './adminOptions/components/ProductImageShow.jsx'));
// const ProductImageEdit = componentLoader.add('ProductImageEdit', path.join(__dirname, './adminOptions/components/ProductImageEdit.jsx'));
// // Подключение компонента ProductImageEdit

// // === Upload-компоненты по умолчанию ===
// const COMPONENTS = {
//     edit: ProductImageEdit,  // Используем компонент напрямую
//     show: ProductImageShow,  // Используем компонент напрямую
//     list: async () => {
//         const componentPath = await import('@adminjs/upload/build/features/upload-file/components/List');
//         return componentPath.default;
//     }
// };

// // === Настройка ресурса ===
// // const products = {
// //     resource: Product,
// //     options: {
// //         properties: {
// //             ownerId: { isVisible: false },
// //             picture: { isVisible: false },
// //             mimeType: { isVisible: { delete: false } },
// //             uploadFile: {
// //                 components: {
// //                     edit: COMPONENTS.edit,
// //                     show: COMPONENTS.show,
// //                     list: COMPONENTS.list,
// //                 },
// //             },
// //         },
// //     },
// // };

// const products = {
//     resource: Product,
//     options: {
//         properties: {
//             ownerId: { isVisible: false },
//             picture: { isVisible: false },
//             mimeType: { isVisible: { delete: false } },
//             uploadFile: {
//                 components: {
//                     edit: COMPONENTS.edit,
//                     show: COMPONENTS.show,
//                     list: COMPONENTS.list,
//                 },
//             },
//         },
//     },
// };
// // === Инициализация AdminJS ===
// const adminJs = new AdminJS({
//     databases: [sequelize],
//     rootPath: '/admin',
//     resources: [products],
//     componentLoader,
// });

// // === Аутентификация (заглушка) ===
// const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
//     authenticate: async (email, password) => {
//         if (email === 'admin@example.com' && password === 'password') {
//             return { email, role: 'admin', _id: '1' };
//         }
//         return null;
//     },
//     cookiePassword: 'some-secret-password-used-to-secure-cookie',
// });

// app.use(adminJs.options.rootPath, router);

// // === Запуск ===
// const start = async () => {
//     try {
//         await sequelize.authenticate();
//         await sequelize.sync(); // можно sync({ alter: true }) на dev
//         app.listen(3000, () => {
//             console.log('✅ AdminJS is running at http://localhost:3000/admin');
//             console.log('✅ Uploads are served from http://localhost:3000/files');
//         });
//     } catch (err) {
//         console.error('❌ Failed to start server:', err);
//     }
// };

// start();




// import AdminJS from 'adminjs';
// import AdminJSSequelize from '@adminjs/sequelize';
// import AdminJSExpress from '@adminjs/express'; // <-- ОБЯЗАТЕЛЕН
// import { AdminJSOptions } from './adminOptions/index.js';
// import { Sequelize } from 'sequelize';
// import express from 'express';
// import dotenv from 'dotenv';

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
//     ...AdminJSOptions,
//     rootPath: '/admin',
//     assets: {
//         styles: ['/custom.css'],
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
//                     secure: process.env.NODE_ENV === 'production',
//                 },
//                 name: 'adminjs',
//             }
//         );

//         app.use(adminJs.options.rootPath, adminRouter);

//         app.listen(3001, () => {
//             console.log('Server is running on http://localhost:3001');
//             console.log('AdminJS is running at http://localhost:3001/admin');
//         });

//     } catch (error) {
//         console.error('Failed to start server:', error);
//         process.exit(1);
//     }
// };

// startServer();

import AdminJS from 'adminjs';
import AdminJSSequelize from '@adminjs/sequelize';
import AdminJSExpress from '@adminjs/express'; // <-- ОБЯЗАТЕЛЕН
import { AdminJSOptions } from './adminOptions/index.js';  // Импорт по умолчанию
import { Sequelize } from 'sequelize';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import * as url from 'url';
import { ComponentLoader } from 'adminjs';
import { componentLoader, Components } from './adminOptions/componentLoader.js';

// // === Инициализация ===

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
        adminJs.watch()
        app.use(adminJs.options.rootPath, adminRouter);
        app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
        app.listen(3011, () => {
            console.log('Server is running on http://localhost:3011');
            console.log('AdminJS is running at http://localhost:3011/admin');
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
