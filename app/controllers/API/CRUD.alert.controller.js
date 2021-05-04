const db = require("../../models");
const Alert = db.alert;



exports.addAlert = (message) => {
    Alert.create(
        {
            name: message.name,
            summary: message.summary,
            event_ID: message.event_ID,
            source_IP: message.source_IP,
            dest_IP: message.dest_IP,
            source_user: message.source_user,
            dest_user: message.dest_user,
            event_count: message.event_count,
            sig_ID: message.sig_ID,
            rule: message.rule,
            status: 'Triggered',
            priority: message.priority
        }
    )
};

exports.getAlerts = (req, res) => {
    res.body.alerts = Alert.findAll({where: {status: req.body.status}})
    return res;
};

