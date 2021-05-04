const { authJwt } = require("../middleware");

const User = require("../controllers/API/CRUD.user.controller");
const Alert = require("../controllers/API/CRUD.alert.controller");
const Comment = require("../controllers/API/CRUD.comments.controller");
const KB = require("../controllers/API/CRUD.knowledge.controller");
const Role = require("../controllers/API/CRUD.role.controller");

module.exports = function(app) {

    app.get("/api/alerts-comments",[authJwt.verifyToken, authJwt.isAdmin], Comment.getAlertComments);
    app.get("/api/alert-KB",[authJwt.verifyToken], KB.getAlertKB);


    //app.post("/api/addAlert",[authJwt.verifyToken, authJwt.isAdmin], Alert.addAlert);
    app.post("/api/addUser", [authJwt.verifyToken, authJwt.isAdmin], User.addUser);
    app.post("/api/addKB",[authJwt.verifyToken, authJwt.isAdmin], KB.addKB);
    app.post("/api/acknowledge",[authJwt.verifyToken], Alert.acknowledge);

};