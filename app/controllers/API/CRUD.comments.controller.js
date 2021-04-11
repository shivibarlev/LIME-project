const db = require("../../models");
const Comment = db.comment;


exports.getAlertComments = async (req, res) => {
    res.body.comments = await Comment.findAll({where: {alert_id: req.body.alert_id}});
    return res;
};