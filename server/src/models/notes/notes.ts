module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define(
        'notes',
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
            headline: {
                type: Sequelize.STRING,
                allowNull: false
            },
            mainText: {
                type: Sequelize.TEXT('medium'),
                allowNull: false
            },
            image: {
                type: Sequelize.STRING,
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