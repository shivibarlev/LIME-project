const db = require("../../models");
const Alert = db.alert;



exports.addAlert = (req, res) => {
    Alert.create(
        {
            name: req.body.name,
            summary: req.body.summary,
            event_ID: req.body.event_ID,
            source_IP: req.body.source_IP,
            dest_IP: req.body.dest_IP,
            source_user: req.body.source_user,
            dest_user: req.body.dest_user,
            event_count: req.body.event_count,
            sig_ID:req.body.sig_ID,
            rule: req.body.rule,
            status: 'Triggered',
            priority: req.body.priority
        }
    )
};

exports.getAlerts = (req, res) => {
    res.body.alerts = Alert.findAll({where: {status: req.body.status}})
    return res;
};