const path = __dirname + '/app/views/';


exports.getHome = (req, res) =>
{
    res.sendFile(path + "index.html");
}

exports.getRegister = (req, res) =>
{
    console.log(path + "/register");
    res.sendFile("/app/views/register");
}