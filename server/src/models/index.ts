import { dbConfig } from "../config/db";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: {
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
        max: dbConfig.pool.max,
        min: dbConfig.pool.min
    }
})

let db = {
    Sequelize,
    sequelize,
    users: require('./user')(sequelize, Sequelize)
}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.users = require('./user')(sequelize, Sequelize)

export default db