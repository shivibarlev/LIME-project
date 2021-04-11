const db = require("../../models");
const User = db.user;



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