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
            notesStreak: {
                type: Sequelize.SMALLINT,
                defaultValue: 0,
                allowNull: false
            },
            pomodoroStreak: {
                type: Sequelize.SMALLINT,
                defaultValue: 0,
                allowNull: false
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