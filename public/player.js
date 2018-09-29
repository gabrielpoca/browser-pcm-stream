(function(window) {



	var wavesurfer = WaveSurfer.create({
	    container: '#waveform',
	    waveColor: 'violet',
	    progressColor: 'purple'
	});

	wavesurfer.on('interaction', function () {
	    console.log("wave clicked");;
	});

	window.wavesurfer = wavesurfer;
	console.log("Loaded player.js")

	window.listenRecording = function() {
		window.wavesurfer.playPause();
	};

	window.discardRecording = function() {
		window.wavesurfer.load();
	};
	
})(this);