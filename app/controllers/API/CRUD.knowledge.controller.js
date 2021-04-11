const db = require("../../models");
const KB = db.knowledge;


exports.getAlertKB = async (req, res) => {
    res.body.KB = await KB.findOne({where: {alert_id: req.body.alert_id}});
    return res;
};


exports.addKB = (req, res) => {
    KB.create(
        {
            alert_id: req.body.alert_id,
            owner_id: req.body.owner_id,
            description: req.body.description,
        }
    )
};