module.exports = (sequelize, Sequelize) => {
    const Alert = sequelize.define("alerts", {
        name: {
            type: Sequelize.STRING
        },
        summary: {
            type: Sequelize.STRING
        },
        event_ID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        source_IP: {
            type: Sequelize.INTEGER
        },
        dest_IP: {
            type: Sequelize.INTEGER
        },
        source_user: {
            type: Sequelize.INTEGER
        },
        dest_user: {
            type: Sequelize.STRING
        },
        event_count: {
            type: Sequelize.INTEGER
        },
        sig_ID: {
            type: Sequelize.INTEGER
        },
        rule: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'Triggered',
            validate: {
                isIn: [['Triggered', 'Acknowledged', 'Resolved']]
            }
        },
        priority: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['Critical', 'Severe', 'Warning']]
            }
        }
    });

    return Alert;
};