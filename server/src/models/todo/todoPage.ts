module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define(
        'todoPage',
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
            dayNum: {
                type: Sequelize.TINYINT,
                allowNull: false
            },
            dayName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            monthNum: {
                type: Sequelize.TINYINT,
                allowNull: false
            },
            monthName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            year: {
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