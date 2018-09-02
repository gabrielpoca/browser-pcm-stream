(function(window) {
	console.log( "Load Library");
	var audioFilesInMemory = [];

	var library = {
		add: function(fileName){
			console.log( "add " + fileName + " to Library");
			audioFilesInMemory.push(fileName);
		},
		list: function(){
			audioFilesInMemory.forEach(function(item, index, array) {
  				console.log(item, index);
			});
		}
	};

    window.library = library;
})(this);