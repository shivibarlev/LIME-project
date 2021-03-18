module.exports = (sequelize, Sequelize) => {
    const Knowledge = sequelize.define("knowledge", {
        alert_id: {
            type: Sequelize.INTEGER
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