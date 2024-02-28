module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define(
        'stats',
        {
            userId: {
                type: Sequelize.UUID,
                allowNull: false
            },
            todoStreak: {
                type: Sequelize.SMALLINT,
                defaultValue: 0,
                allowNull: false
            },
            todoStart: {
                type: Sequelize.STRING,
            },
            todoLastLogin: {
                type: Sequelize.STRING,
            },
            notesStreak: {
                type: Sequelize.SMALLINT,
                defaultValue: 0,
                allowNull: false
            },
            notesStart: {
                type: Sequelize.STRING,
            },
            notesLastLogin: {
                type: Sequelize.STRING,
            },
            pomodoroStreak: {
                type: Sequelize.SMALLINT,
                defaultValue: 0,
                allowNull: false
            },
            pomodoroStart: {
                type: Sequelize.STRING,
            },
            pomodoroLastLogin: {
                type: Sequelize.STRING,
            },
            todoTotal: {
                type: Sequelize.SMALLINT,
                defaultValue: 0,
                allowNull: false
            },
            notesTotal: {
                type: Sequelize.SMALLINT,
                defaultValue: 0,
                allowNull: false
            },
            pomodoroTotal: {
                type: Sequelize.SMALLINT,
                defaultValue: 0,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        },
        {
            timestamps: true
        }
    )
}