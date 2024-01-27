module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define(
        'group',
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            selectedPageId: {
                type: Sequelize.UUID,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            color: {
                type: Sequelize.STRING,
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