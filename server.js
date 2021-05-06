const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require('morgan');
const app = express();

//added this comment for test


var corsOptions = {
  origin: "http://localhost:8081"
};

var regRoute = require('./app/routes/main.routes');

const path = __dirname + '/app/views/';

app.use(express.static(path));
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});



app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});
app.get('/profile', function (req,res) {
  res.sendFile(path + "profile");
});

//app.use('/register', regRoute);

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/api.routes')(app);
//require('./app/routes/main.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

  db.alert.create({
    name: "User added to admin account",
    summary: "Signature ID 'BI Win user added to admins group'****",
    event_ID: "1",
    source_IP: "10.10.10.10",
    dest_IP: "10.10.10.10",
    source_user: "123456789",
    dest_user: "shivi",
    event_count: "5",
    sig_ID: "11-111111",
    rule: "BI Win user added to admins group object = smslogin",
    status: 'Triggered',
    priority: 'Critical',
  });

  db.alert.create({
    name: "User added to admin account",
    summary: "Signature ID 'BI Win user added to admins group'****",
    event_ID: "2",
    source_IP: "10.10.10.10",
    dest_IP: "10.10.10.10",
    source_user: "123456789",
    dest_user: "shivi",
    event_count: "5",
    sig_ID: "11-111111",
    rule: "BI Win user added to admins group object = smslogin",
    status: 'Triggered',
    priority: 'Critical',
  });

  db.alert.create({
    name: "User added to admin account",
    summary: "Signature ID 'BI Win user added to admins group'****",
    event_ID: "3",
    source_IP: "10.10.10.10",
    dest_IP: "10.10.10.10",
    source_user: "123456789",
    dest_user: "shivi",
    event_count: "5",
    sig_ID: "11-111111",
    rule: "BI Win user added to admins group object = smslogin",
    status: 'Triggered',
    priority: 'Critical',
  });
}