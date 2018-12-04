var express = require('express');
var fs = require('fs');
const path = require('path');
var zip = require('express-easy-zip');
var multer = require('multer');
var upload = multer();

var port = 3000;

var multer  = require('multer')
const STORAGE_DIR = "uploads";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, STORAGE_DIR)
    },
    filename: function (req, file, cb) {
        cb(null,  req.body.filename + ".wav")
  }
})

var upload = multer({ storage: storage })

var bodyParser = require('body-parser');

const dirPath = __dirname + "/uploads";

console.log('#start express#');
var app = express();
app.use(express.static(__dirname + '/public'))
require('http').createServer(app).listen(port)

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
  //  console.log(req.file);
   res.status(201);
   res.send('Wav file has been received server-side');

});

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

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}