var express = require('express');
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var wav = require('wav');

var port = 3000;
var binaryPort = 9001;
var app = express();

const STORAGE_DIR = "public/";

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function getFileWriter(filename){
    var fileWriter = new wav.FileWriter(filename, {
    channels: 1,
    sampleRate: 48000,
    bitDepth: 16
  });
  console.log('filewriter ready for :' + filename);
  return fileWriter ;
}

console.log('#start express#');


app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
  res.render('index');
});

require('http').createServer(app).listen(port)

app.on('error', function(err){
    console.error('on error handler');
    console.error(err);
});
app.on('clientError', function(err){
    console.error('on clientError handler');
    console.error(err);
});
process.on('uncaughtException', function(err) {
    console.error('process.on handler');
    console.error(err);
});


console.log('recording server open on port ' + port);

binaryServer = BinaryServer({port: binaryPort});

console.log('WS open on port ' + binaryPort);

binaryServer.on('connection', function(client) {
  console.log('new connection');

  client.on('stream', function(stream, meta) {
    
    let filename = STORAGE_DIR + "wav/"+ Date.now() + '_' +guid() +".wav";
    var fileWriter = getFileWriter(filename);
    console.log('new stream at '+ Date.now() + ' will be saved in '+filename);
    stream.pipe(fileWriter);

    stream.on('end', function() {
      fileWriter.end();
      console.log('wrote to file ' + filename);
      stream.write(filename.replace(STORAGE_DIR,""));
    });
  });
});

binaryServer.on('error', function(error){
  console.log("binaryServer error :",error);
});
