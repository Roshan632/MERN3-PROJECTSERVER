// import { Sequelize } from 'sequelize-typescript'
// import { envConfig } from '../config/config.js'

// // const sequelize = new Sequelize(envConfig.connectionString, {
// //   dialect: 'postgres',
// //   dialectOptions: {
// //     ssl: {
// //       require: true,
// //       rejectUnauthorized: false
// //     }
// //   }
// // })

// const sequelize = new Sequelize(envConfig.connectionString as string,{
//     models : [__dirname + '/models']
// })

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established with the postgres database with supabase successfully!!!')
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error)
//   })

//   sequelize.sync({force : false}).then(()=>{
//     console.log("local changes injected to database successfully")
// })

// export default sequelize

import { Sequelize } from 'sequelize-typescript'
import { envConfig } from '../config/config'

const sequelize = new Sequelize(envConfig.connectionString as string, {
    models: [__dirname + '/models']
})

try {
    sequelize.authenticate()
        .then(() => {
            console.log(" Connected !!! 😀 ")
        })
        .catch(err => {
            console.log(" ERROR 😝 : ", err)
        })
} catch (error) {
    console.log(error)
}

sequelize.sync({ force: false }).then(() => {
    console.log(" synced !! ")
})

export default sequelize