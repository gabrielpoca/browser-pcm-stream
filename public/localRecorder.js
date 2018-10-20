//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var trashButton = document.getElementById("trashButton");
var micIcon = document.getElementById("mic-icon");

//add events to those buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
trashButton.addEventListener("click", discardRecording);


function discardRecording(){
	console.log("Discard recording");
	stopButton.className = "far fa-stop-circle fa-3x";
	document.getElementById("audioComponent")
	while( recordingsList.firstChild ){
	  recordingsList.removeChild( recordingsList.firstChild );
	}
}

function startRecording() {
	console.log("recordButton clicked");

	/*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/
    
    var constraints = { audio: true, video:false }
    stopButton.className = "far fa-stop-circle fa-3x";
    micIcon.className = micIcon.className += " button-glow"

 	/*
    	Disable the record button until we get a success or fail from getUserMedia() 
	*/

	recordButton.disabled = true;
	stopButton.disabled = false;

	/*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		/*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device

		*/
		audioContext = new AudioContext();

		//update the format 
		console.log("Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz");

		/*  assign to gumStream for later use  */
		gumStream = stream;
		
		/* use the stream */
		input = audioContext.createMediaStreamSource(stream);

		/* 
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
		rec = new Recorder(input,{numChannels:1})

		//start the recording process
		rec.record();

		//var Oscilloscope = require('oscilloscope')
//		var audioContext = new window.AudioContext()

		// create source from html5 audio element
		//var source = audioContext.createMediaElementSource(audioElement)

		// attach oscilloscope
		var scope = new Oscilloscope(input);

		// start default animation loop
		scope.animate(document.getElementById("waveform").getContext("2d"));


	
		console.log("Recording started");

	}).catch(function(err) {
	  	//enable the record button if getUserMedia() fails
    	recordButton.disabled = false;
    	stopButton.disabled = true;
	});
}


function stopRecording() {
	console.log("stopButton clicked");

	if ( ! stopButton.disabled ){
		//disable the stop button, enable the record too allow for new recordings
		stopButton.disabled = true;
		recordButton.disabled = false;
		//stopButton.src = 'assets/images/round-keyboard_arrow_right-24px.svg';
		stopButton.className = "fas fa-play-circle fa-3x";
		micIcon.className = "fas fa-microphone-alt fa-2x"


		//tell the recorder to stop the recording
		rec.stop();

		//stop microphone access
		gumStream.getAudioTracks()[0].stop();

		//create the wav blob and pass it on to createDownloadLink
		rec.exportWAV(createDownloadLink);
	}
	else if (document.getElementById("audioComponent")) {
		document.getElementById("audioComponent").play();
	}
}

function createDownloadLink(blob) {
	
	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');

	//name of .wav file to use during upload and download (without extendion)
	var filename = new Date().toISOString();

	//add controls to the <audio> element
	au.controls = false;
	au.id = "audioComponent";
	au.src = url;

	//save to disk link
	link.href = url;
	link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
	link.innerHTML = "Save to disk";

	//add the new audio element to li
	li.appendChild(au);
	
	//add the filename to the li
	//li.appendChild(document.createTextNode(filename+".wav "))

	//add the save to disk link to li
	//li.appendChild(link);
	
	var xhr=new XMLHttpRequest();
	xhr.onload=function(e) {
	  if(this.readyState === 4) {
	      console.log("Server returned: ",e.target.responseText);
	  }
	  };

	  var fd=new FormData();
	  fd.append("audio_data",blob, filename);
	  fd.append("filename", filename);
	  xhr.open("POST","upload",true);
	  xhr.send(fd);


	//add the li element to the ol
	while( recordingsList.firstChild ){
	  recordingsList.removeChild( recordingsList.firstChild );
	}
	recordingsList.appendChild(li);
}