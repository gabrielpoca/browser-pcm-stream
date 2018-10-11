// From https://github.com/gabrielpoca/browser-pcm-stream
(function(window) {

  var setupNewStream = function(){
      window.Stream = client.createStream();

      //Will handle response from BE ( new filename )
      Stream.on('data', function(data){ 
        window.library.add(data);
        window.wavesurfer.load(data);
      });

  }

//https://browser-pcm-stream.dop/
  var client = new BinaryClient('wss://browser-pcm-stream.dop/ws');

  client.on('open', function() {

    var constraints = { audio: true, video:false }

    navigator.mediaDevices.getUserMedia(constraints).then(success).catch(function(err) {
      //TODO disable the record button if getUserMedia() fails
      console.error("getUserMedia fail",err);
      // recordButton.disabled = false;
      // stopButton.disabled = true;
      // pauseButton.disabled = true
    });

    var recording = false;

    window.startRecording = function() {
      setupNewStream();
      //window.wavesurfer.load();
      recording = true;
    }

    window.stopRecording = function() {
      recording = false;
      window.Stream.end();
    }

    window.toggleRecording = function() {
      if(recording)
        stopRecording();
      else
        startRecording();
    }

    function success(e) {
      audioContext = window.AudioContext || window.webkitAudioContext;
      context = new audioContext();

      // the sample rate is in context.sampleRate
      audioInput = context.createMediaStreamSource(e);

      var bufferSize = 2048;
      recorder = context.createScriptProcessor(bufferSize, 1, 1);

      recorder.onaudioprocess = function(e){
        if(!recording) return;
        console.log ('recording');
        var left = e.inputBuffer.getChannelData(0);
        window.Stream.write(convertoFloat32ToInt16(left));
      }

      audioInput.connect(recorder)
      recorder.connect(context.destination); 
    }

    function convertoFloat32ToInt16(buffer) {
      var l = buffer.length;
      var buf = new Int16Array(l)

      while (l--) {
        buf[l] = buffer[l]*0xFFFF;    //convert to 16 bit
      }
      return buf.buffer
    }
  });
})(this);
