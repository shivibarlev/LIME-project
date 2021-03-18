module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        alert_id: {
            type: Sequelize.INTEGER
        },
        comment_owner: {
            type: Sequelize.INTEGER
        },
        content: {
            type: Sequelize.STRING
        }
    });

    return Comment;
};