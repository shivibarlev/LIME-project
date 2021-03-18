const db = require("../models");

const Role = db.role;
const User = db.user;
const Alert = db.alert;
const Comment = db.comment;
const KB = db.knowledge;


exports.getAlertComments = async (req, res) => {
        res.body.comments = await Comment.findAll({where: {alert_id: req.body.alert_id}});
        return res;
    };


exports.getAlertKB = async (req, res) => {
    res.body.KB = await KB.findOne({where: {alert_id: req.body.alert_id}});
    return res;
};

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


exports.addUser = (req, res) => {
    User.create(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            f_name: req.body.f_name,
            l_name: req.body.l_name
        }
    )
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