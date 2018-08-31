var express = require('express');
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var wav = require('wav');

var port = 8080;
var binaryPort = 9001;
var app = express();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

console.log('#start express#');


app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
  res.render('index');
});

app.listen(port);

console.log('recording server open on port ' + port);

binaryServer = BinaryServer({port: binaryPort});

binaryServer.on('connection', function(client) {
  console.log('new connection');

  let filename = "wav/"+guid() + '_'+Date.now()+".wav";
  

  var fileWriter = new wav.FileWriter(filename, {
    channels: 1,
    sampleRate: 48000,
    bitDepth: 16
  });

  console.log('filewriter ready for :' + filename);

  client.on('stream', function(stream, meta) {
    console.log('new stream at '+ Date.now());
    stream.pipe(fileWriter);

    stream.on('end', function() {
      fileWriter.end();
      console.log('wrote to file ' + filename);
    });
  });
});
