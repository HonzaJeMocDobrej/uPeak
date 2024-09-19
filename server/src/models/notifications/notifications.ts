module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define(
        'notifications',
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
            value: {
                type: Sequelize.STRING,
            },
            page: {
                type: Sequelize.STRING,
            },
            isShown: {
                type: Sequelize.BOOLEAN
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