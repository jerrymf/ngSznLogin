var express = require("express");
var app = express();

/* serves main page */
app.get("/", function(req, res) {
    res.sendfile('demo/index.html');
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res){
    console.log('static file request : ' + req.params[0]);
    res.sendfile( __dirname + req.params[0]);
});

// chytac chyb
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

var port = process.env.PORT || 6696;
    app.listen(port, function() {
    console.log("Listening on " + port);
});