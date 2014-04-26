var express = require("express");
var fs = require('fs');

var port = 3700;
var app = express();
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'))

app.get("/", function(req, res){
  res.render("index");
});

app.listen(port);
