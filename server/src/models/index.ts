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

    todoPage: require('./todo/todoPage')(sequelize, Sequelize),
    group: require('./todo/group')(sequelize, Sequelize),
    todo: require('./todo/todo')(sequelize, Sequelize),

    notes: require('./notes/notes')(sequelize, Sequelize),
    
    notifications: require('./notifications/notifications')(sequelize, Sequelize),
}

db.stats.belongsTo(db.users, {
    foreignKey: 'userId',
    onDelete: 'cascade'
})

db.users.hasMany(db.todoPage, {
    foreignKey: 'userId',
    onDelete: 'cascade'
})


db.todoPage.hasMany(db.group, {
    foreignKey: 'selectedPageId',
    onDelete: 'cascade'
})

db.group.hasMany(db.todo, {
    foreignKey: 'groupId',
    onDelete: 'cascade'
})

db.users.hasMany(db.notes, {
    foreignKey: 'userId',
    onDelete: 'cascade'
})

db.users.hasMany(db.notifications, {
    foreignKey: 'userId',
    onDelete: 'cascade'
})


export default db