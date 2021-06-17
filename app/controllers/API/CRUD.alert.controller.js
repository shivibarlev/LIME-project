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
    ).catch(function(err) {
        // print the error details
        console.log(err, message);
    })
};

exports.getAlerts = async (req, res) => {
    //let alerts = await Alert.findAll({where: {status: req.body.status}});
    let alerts = await Alert.findAll();
    res.json(alerts);
    return res;
};

exports.acknowledge = (req, res) => {
    let alert = Alert.find({where: {event_ID: req.body.event_ID}});
    alert.status = 'Acknowledged';
};

exports.resolve = (req, res) => {
    let alert = Alert.find({where: {event_ID: req.body.event_ID}});
    alert.status = 'Resolved';
};



