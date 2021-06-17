module.exports = (sequelize, Sequelize) => {
    const Knowledge = sequelize.define("knowledge", {
        alert_id: {
            type: Sequelize.INTEGER,
            unique: true
        },
        owner_id: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        }
    });

    return Knowledge;
};