// // const AdminJSExpress = require('@adminjs/express')
// // const bcrypt = require('bcrypt')
// // const MongoStore = require('connect-mongo')

// // const User = require('./models/userModel')

// // const AdminRouter = (adminJs) => {
// //     const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
// //         authenticate: async (email, password) => {
// //             const user = await User.findOne({ email })
// //             if (user) {
// //                 const matched = await bcrypt.compare(password, user.encryptedPassword)
// //                 if (matched) {
// //                     return user
// //                 }
// //             }
// //             return false
// //         },
// //         cookiePassword: 'some-ssecret-password-used-to-secure-cookie',
// //     }, null, {
// //         resave: false,
// //         saveUninitialized: true,
// //         store: MongoStore.create({ mongoUrl: 'mongodb+srv://rusdrinkflair:pas123@cluster0.tah5zka.mongodb.net/gamejs-admin?retryWrites=true&w=majority&appName=Cluster0' })
// //     })
// //     return router
// // }


// // module.exports = AdminRouter
// const AdminJSExpress = require('@adminjs/express')
// // const bcrypt = require('bcrypt')
// const MongoStore = require('connect-mongo')

// // const User = require('./models/userModel')

// const AdminRouter = (adminJs) => {
//     const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
//         authenticate: async (email, password) => {
//             // Проверяем, что email и пароль совпадают с заданными
//             if (email === 'admin@example.com' && password === '123123') {
//                 // Если данные совпадают, можно вернуть фиктивного пользователя
//                 // const user = await User.findOne({ email }) // Здесь можно вернуть реального пользователя, если нужно
//                 return { email: 'admin@example.com' } // В случае чего можно вернуть объект с фиктивным email
//             }
//             return false
//         },
//         cookiePassword: 'some-ssecret-password-used-to-secure-cookie',
//     }, null, {
//         resave: false,
//         saveUninitialized: true,
//         store: MongoStore.create({ mongoUrl: 'mongodb+srv://rusdrinkflair:pas123@cluster0.tah5zka.mongodb.net/gamejs-admin?retryWrites=true&w=majority&appName=Cluster0' })
//     })
//     return router
// }

// module.exports = AdminRouter
