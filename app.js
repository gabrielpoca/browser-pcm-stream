var express = require("express");
var BinaryServer = require('binaryjs').BinaryServer;
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

binaryServer = BinaryServer({port: 9001});

binaryServer.on('connection', function(client) {
  console.log("new connection");
  var bufferLeft = [], bufferRight = [], bufferSize = 0, ended = 0;

  client.on('stream', function(stream, meta) {
    console.log('new stream');

    if ( meta == "length" ) {
      stream.on('data', function(data) {
        bufferSize += data;
      });
    } else  {
      if ( meta == "left" ) var buffer =  bufferLeft;
      else var buffer =  bufferRight;

      stream.on('data', function(data) {
        buffer.push(data);
      })
    }

    stream.on('end', function() {
      ended += 1;
      if(ended == 3) saveFile(bufferLeft, bufferRight, bufferSize);
    });
  });
});

function saveFile(bufferLeft, bufferRight, bufferSize) {
  console.log("save to file");
  console.log("bufferSize: "+bufferSize);
  console.log("Length: "+bufferRight.length);

  mergedLeft = mergeBuffers(bufferLeft, bufferSize);
  mergedRight = mergeBuffers(bufferRight, bufferSize);
  interleaved = interleave(mergedLeft, mergedRight);

  // create the buffer and view to create the .WAV file
  var buffer = new ArrayBuffer(44 + interleaved.length * 2);
  var view = new DataView(buffer);

  // write the WAV container, check spec at: https://ccrma.stanford.edu/courses/422/projects/WaveFormat/
  // RIFF chunk descriptor
  writeUTFBytes(view, 0, 'RIFF');
  view.setUint32(4, 44 + interleaved.length * 2, true);
  writeUTFBytes(view, 8, 'WAVE');
  // FMT sub-chunk
  writeUTFBytes(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  // stereo (2 channels)
  view.setUint16(22, 2, true);
  view.setUint32(24, 44100, true);
  view.setUint32(28, 44100 * 4, true);
  view.setUint16(32, 4, true);
  view.setUint16(34, 16, true);
  // data sub-chunk
  writeUTFBytes(view, 36, 'data');
  view.setUint32(40, interleaved.length * 2, true);

  // write the PCM samples
  var lng = interleaved.length;
  var index = 44;
  var volume = 1;
  for (var i = 0; i < lng; i++){
    view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
    index += 2;
  }

  buffer = new Buffer( new Uint8Array(buffer) );
  fs.writeFile("demo.wav", buffer, function(e) {
    if (e) { console.log(e) }
    else { console.log("Saved") }
  });
}

function mergeBuffers(channelBuffer, recordingLength){
  var result = new Float32Array(recordingLength);
  var offset = 0;
  var lng = channelBuffer.length;
  for (var i = 0; i < lng; i++){
    var buffer = channelBuffer[i];
    result.set(buffer, offset);
    offset += buffer.length;
  }
  return result;
}

function interleave(leftChannel, rightChannel){
  var length = leftChannel.length + rightChannel.length;
  var result = new Float32Array(length);

  var inputIndex = 0;

  for (var index = 0; index < length; ){
    result[index++] = leftChannel[inputIndex];
    result[index++] = rightChannel[inputIndex];
    inputIndex++;
  }
  return result;
}

function writeUTFBytes(view, offset, string){ 
  var lng = string.length;
  for (var i = 0; i < lng; i++){
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
