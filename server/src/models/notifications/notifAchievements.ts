module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define(
        'notifAchievements',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false
            },
            notesCreatedCount: {
                type: Sequelize.SMALLINT,
                defaultValue: 0,
            },
            pomodoroWholeSessionsCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            todosCreatedCount: {
                type: Sequelize.MEDIUMINT,
                defaultValue: 0,
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
            isNotificationRead: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            }
        },
        {
            timestamps: true
        }
    )
}