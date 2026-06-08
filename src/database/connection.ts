import { Sequelize } from 'sequelize-typescript'
import { envConfig } from '../config/config.js'

const sequelize = new Sequelize(envConfig.connectionString, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established with the postgres database with supabase successfully!!!')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

export default sequelize
