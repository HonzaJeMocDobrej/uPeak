module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define(
        'pomodoro',
        {
            userId: {
                type: Sequelize.UUID,
                allowNull: false
            },
            todoStreak: {
                type: Sequelize.SMALLINT,
                allowNull: false
            },
            notesStreak: {
                type: Sequelize.SMALLINT,
                allowNull: false
            },
            pomodoroStreak: {
                type: Sequelize.SMALLINT,
                allowNull: false
            },
            todoTotal: {
                type: Sequelize.SMALLINT,
                allowNull: false
            },
            notesTotal: {
                type: Sequelize.SMALLINT,
                allowNull: false
            },
            pomodoroTotal: {
                type: Sequelize.SMALLINT,
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