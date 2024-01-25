module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define(
        'notes',
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false
            },
            headline: {
                type: Sequelize.STRING,
                allowNull: false
            },
            mainText: {
                type: Sequelize.TEXT('medium'),
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