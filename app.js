var express = require('express');
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
const path = require('path');
var wav = require('wav');
var zip = require('express-easy-zip');
var multer = require('multer');
var upload = multer();

var port = 3000;
var binaryPort = 9001;
var app = express();

var multer  = require('multer')

const STORAGE_DIR = "uploads";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, STORAGE_DIR)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+".wav")
  }
})

var upload = multer({ storage: storage })

var bodyParser = require('body-parser');

const dirPath = __dirname + "/uploads";


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


app.use(zip());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
//app.use(upload.array()); 

app.get('/', function(req, res){
  res.render('index');
});

app.get('/zip', function(req, res, next) {

  res.zip({
    files: [
        {   
            name: 'wav-file.zip',
            mode: 0755,
            date: new Date(),
            type: 'file' },
        { path: dirPath, name: 'wav' }    
    ],
      filename: 'all-wav.zip'
  });
});

app.get('/purge', function(req, res, next){
  fs.readdir(dirPath, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(dirPath, file), err => {
      if (err) throw err;
    });
  }
  });
  res.status(204);
  res.send('Deleted all');
  next();
});

app.post('/upload', upload.single('audio_data'),function(req,res, next) {
   console.log(req.body);
   console.log(req.file);
   res.status(201);
   res.send('All good');

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


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
