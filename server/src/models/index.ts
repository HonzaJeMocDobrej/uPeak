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
    stats: require('./stats/stats')(sequelize, Sequelize),
    todo: require('./todo/todo')(sequelize, Sequelize),
    notes: require('./notes/notes')(sequelize, Sequelize),
}

db.stats.belongsTo(db.users, {
    foreignKey: 'userId',
    onDelete: 'cascade'
})

db.users.hasMany(db.todo, {
    foreignKey: 'userId',
    onDelete: 'cascade'
})

db.todo.belongsTo(db.users)

db.users.hasMany(db.notes, {
    foreignKey: 'userId',
    onDelete: 'cascade'
})

db.notes.belongsTo(db.users)


export default db