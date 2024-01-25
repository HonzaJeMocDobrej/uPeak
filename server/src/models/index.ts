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
    users: require('./user')(sequelize, Sequelize),
    pomodoro: require('./pomodoro/pomodoro')(sequelize, Sequelize),
    todo: require('./todo/todo')(sequelize, Sequelize),
}

db.pomodoro.belongsTo(db.users, {
    foreignKey: 'userId',
    onDelete: 'cascade'
})

db.todo.belongsTo(db.users, {
    foreignKey: 'userId',
    onDelete: 'cascade'
})


export default db