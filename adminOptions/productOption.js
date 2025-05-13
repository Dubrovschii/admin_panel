// import uploadFeature from '@adminjs/upload';
// import { ComponentLoader } from 'adminjs';

// const componentLoader = new ComponentLoader(); // ✅ создаём экземпляр

// const productFeatures = [
//     uploadFeature({
//         provider: {
//             local: {
//                 bucket: 'public/uploads',
//             },
//         },
//         properties: {
//             key: 'product_img',  // Массив путей
//             file: 'uploadFile',
//             mimeType: 'mimeType',
//             bucket: 'bucket',
//             size: 'size',
//             filename: 'filename',
//         },
//         componentLoader, // ✅ передаём экземпляр
//         uploadPath: (record, filename) => {
//             console.log('record:', record?.params);
//             const path = `products/${record.id}/${filename}`;

//             // Обновляем массив путей
//             if (record.product_img) {
//                 record.product_img.push(path);  // Добавляем путь к новому файлу
//             } else {
//                 record.product_img = [path];  // Если нет изображений, создаём массив
//             }

//             return path;
//         },
//         isArray: true,  // Указываем, что это массив
//     })

// ];
// export default {productFeatures}




// import path from 'path';



// import AdminJS from 'adminjs';
// import { before, after } from './uhook.js';
// import uploadFeature from '@adminjs/upload';

// const validation = {
//     mimeTypes: ['image/jpeg', 'image/png'],
// };

// const actions = {
//     new: {
//         before: before,
//         after: after,
//     },
//     edit: {
//         isAccessible: ({ currentAdmin, record }) => {
//             return currentAdmin && (currentAdmin.role === 'admin' || currentAdmin._id === record.param('ownerId'));
//         },
//     },
//     delete: {
//         isAccessible: ({ currentAdmin, record }) => {
//             return currentAdmin && (currentAdmin.role === 'admin' || currentAdmin._id === record.param('ownerId'));
//         },
//     },
// };

// export const productOptions = {
//     properties: {
//         ownerId: { isVisible: false },
//         picture: { isVisible: false },
//         mimeType: { isVisible: { delete: false } },
//     },
//     actions: actions,
// };

// export const productFeatures = [
//     uploadFeature({
//         provider: { local: { bucket: 'public' } },
//         properties: {
//             key: 'picture.key',
//             file: 'uploadFile',
//             bucket: 'picture.bucket',
//             mimeType: 'picture.mimeType',
//         },
//         validation: validation,
//         uploadPath: (record, filename) => {
//             const path = `${record.id}/${Date.now()}_${filename}`;
//             console.log('Uploading to path:', path);
//             return path;
//         },
//     }),
//     uploadFeature({
//         provider: { local: { bucket: 'public' } },
//         properties: {
//             key: 'images.path',
//             filePath: 'images.file',
//             file: 'Images',
//             filesToDelete: 'images.toDelete',
//             bucket: 'images.bucket',
//             mimeType: 'images.mimeType',
//         },
//         multiple: true,
//         validation: validation,
//         uploadPath: (record, filename) => {
//             const path = `${record.id}/${Date.now()}_${filename}`;
//             console.log('Uploading to path:', path);
//             return path;
//         },
//     }),
// ];
import uploadFeature from '@adminjs/upload';
import { before, after } from './uhook.js';

// Ограничения по типу файлов
const validation = {
    mimeTypes: ['image/jpeg', 'image/png'],
};

// Действия для продукта
const actions = {
    new: {
        before,
        after,
    },
    edit: {
        isAccessible: ({ currentAdmin, record }) =>
            currentAdmin && (currentAdmin.role === 'admin' || currentAdmin._id === record.param('ownerId')),
    },
    delete: {
        isAccessible: ({ currentAdmin, record }) =>
            currentAdmin && (currentAdmin.role === 'admin' || currentAdmin._id === record.param('ownerId')),
    },
};

// Опции для модели Product
export const productOptions = {
    properties: {
        ownerId: { isVisible: false },
        picture: { isVisible: false },
        mimeType: { isVisible: { delete: false } },
    },
    actions,
};

// Фичи с загрузкой изображений
export const productFeatures = [
    // Основное изображение продукта (одиночное)
    uploadFeature({
        provider: { local: { bucket: 'public' } },
        properties: {
            key: 'picture.key',
            file: 'uploadFile', // поле загрузки
            bucket: 'picture.bucket',
            mimeType: 'picture.mimeType',
        },
        validation,
        uploadPath: (record, filename) => {
            const path = `${record.id}/main_${Date.now()}_${filename}`;
            console.log('Uploading single image to:', path);
            return path;
        },
    }),

    // Дополнительные изображения (множественные)
    uploadFeature({
        provider: { local: { bucket: 'public' } },
        properties: {
            key: 'images.path',
            file: 'Images', // поле формы
            filePath: 'images.file',
            filesToDelete: 'images.toDelete',
            bucket: 'images.bucket',
            mimeType: 'images.mimeType',
        },
        multiple: true,
        validation,
        uploadPath: (record, filename) => {
            const path = `${record.id}/gallery_${Date.now()}_${filename}`;
            console.log('Uploading gallery image to:', path);
            return path;
        },
    }),
];

// import AdminJS from 'adminjs';
// import { before, after } from './uhook.js';
// import uploadFeature from '@adminjs/upload';
// import { ComponentLoader } from 'adminjs';

// const validation = {
//     mimeTypes: ['image/jpeg', 'image/png'],
// };

// const actions = {
//     new: {
//         before: before,
//         after: after,
//     },
//     edit: {
//         isAccessible: ({ currentAdmin, record }) => {
//             return currentAdmin && (currentAdmin.role === 'admin' || currentAdmin._id === record.param('ownerId'));
//         },
//     },
//     delete: {
//         isAccessible: ({ currentAdmin, record }) => {
//             return currentAdmin && (currentAdmin.role === 'admin' || currentAdmin._id === record.param('ownerId'));
//         },
//     },
// };
// export const productOptions = {
//     properties: {
//         ownerId: { isVisible: false },
//         picture: { isVisible: false },
//         mimeType: { isVisible: { delete: false } },
//     },
//     actions: actions,
// };
// ;
// export const productFeatures = [
//     ComponentLoader,
//     uploadFeature({
//         provider: { local: { bucket: 'public' } },
//         properties: {
//             key: 'picture.key',
//             file: 'uploadFile',
//             bucket: 'picture.bucket',
//             mimeType: 'picture.mimeType',
//         },
//         validation: validation,
//         uploadPath: (record, filename) => {
//             const path = `${record.id}/${Date.now()}_${filename}`;
//             console.log('Uploading to path:', path);
//             return path;
//         },
//     }),
//     uploadFeature({
//         provider: { local: { bucket: 'public' } },
//         properties: {
//             key: 'images.path',
//             filePath: 'images.file',
//             file: 'Images',
//             filesToDelete: 'images.toDelete',
//             bucket: 'images.bucket',
//             mimeType: 'images.mimeType',
//         },
//         multiple: true,
//         validation: validation,
//         uploadPath: (record, filename) => {
//             const path = `${record.id}/${Date.now()}_${filename}`;
//             console.log('Uploading to path:', path);
//             return path;
//         },
//     }),
// ];;




// // export default { productOptions, productFeatures }
// module.exports = { productOptions, productFeatures };
