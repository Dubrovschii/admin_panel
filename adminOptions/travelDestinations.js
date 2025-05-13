import uploadFeature from '@adminjs/upload';
import path from 'path';
import { Components } from './componentLoader.js';
export const TravelDestinationsOptions = {
    listProperties: ['name', 'address', 'images', 'price'],
    properties: {
        images: {
            type: 'mixed',
        },
        createdAt: {
            isVisible: { edit: false, list: false }
        },
        updatedAt: {
            isVisible: { edit: false, list: false }
        }
    },
    parent: {
        name: 'travel',
        icon: 'Eye',
    },
};

export const TravelDestinationsFeatures = (componentLoader) => [
    uploadFeature({
        componentLoader,
        provider: {
            local: {
                bucket: path.resolve('public', 'uploads'),
                opts: {
                    baseUrl: '/uploads'
                }
            }
        },
        properties: {
            key: 'images.path',
            file: 'images.file',
            filesToDelete: 'images.toDelete',
            bucket: 'images.bucket',
            mimeType: 'images.mimeType',
        },
        multiple: true,
        validation: {
            mimeTypes: ['image/png', 'image/jpeg', 'image/webp']
        },
        uploadPath: (record, filename) => {
            return `travels/${record.id()}/${Date.now()}-${filename}`;
        },
    })
];
// export const TravelDestinationsFeatures = (componentLoader) => [
//     uploadFeature({
//         componentLoader,
//         provider: {
//             local: {
//                 bucket: path.resolve('public', 'uploads'),
//                 opts: {
//                     baseUrl: '/uploads'
//                 }
//             }
//         },
//         properties: {
//             key: 'images.path',
//             file: 'images.file',
//             filesToDelete: 'images.toDelete',
//             bucket: 'images.bucket',
//             mimeType: 'images.mimeType',
//         },
//         multiple: true,
//         validation: {
//             mimeTypes: ['image/png', 'image/jpeg', 'image/webp']
//         },
//         uploadPath: (record, filename) => {
//             return `travels/${record.id()}/${Date.now()}-${filename}`;
//         },
//     })
// ];