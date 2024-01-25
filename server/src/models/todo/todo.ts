module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define(
        'todo',
        {
            userId: {
                type: Sequelize.UUID,
                allowNull: false
            },
            selectedDayObj: {
                type: Sequelize.JSON,
                allowNull: false
            },
            groupObj: {
                type: Sequelize.JSON,
                allowNull: false
            },
            todoObj: {
                type: Sequelize.JSON,
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