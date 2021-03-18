const { authJwt } = require("../middleware");
const controller = require("../controllers/api.controller");

module.exports = function(app) {

    app.get("/api/alerts-comments", controller.getAlertComments);
    app.get("/api/alert-KB", controller.getAlertKB);

    app.post("/api/addAlert", controller.addAlert);
    app.post("/api/addUser", [authJwt.verifyToken, authJwt.isModerator],controller.addUser);
    app.post("/api/addKB",[authJwt.verifyToken, authJwt.isModerator], controller.addKB);
};