import AdminJS from 'adminjs'
import uploadFeature from '@adminjs/upload'
import { before, after } from './uhook.js'

const carOptions = {
    properties: {
        ownerId: { isVisible: false },
        picture: { isVisible: false },
        mimeType: { isVisible: { delete: false } },
    },
    actions: {
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
    },
}

const carFeatures = [
    uploadFeature({
        provider: { local: { bucket: 'public' } },
        properties: {
            key: 'picture.key',
            file: 'upload File',
            bucket: 'picture.bucket',
            mimeType: 'picture.mimeType',
        },
        validation: {
            mimeTypes: ['image/png', 'image/jpeg'],
        },
        uploadPath: (record, filename) => `${filename}`,
    }),
    uploadFeature({
        provider: { local: { bucket: 'public' } },
        properties: {
            key: 'images.path',
            filePath: 'images.file',
            file: 'Images',
            filesToDelete: 'images.toDelete',
            bucket: 'images.bucket',
            mimeType: 'images.mimeType',
        },
        multiple: true,
        validation: {
            mimeTypes: ['image/png', 'image/jpeg'],
        },
        uploadPath: (record, filename) => `${filename}`,
    }),
]

export { carOptions, carFeatures }
