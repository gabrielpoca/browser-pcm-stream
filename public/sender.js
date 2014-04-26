(function(window) {
  client = new BinaryClient('ws://localhost:9001');
  client.on('open', function() {
    window.LeftStream = client.createStream("left");
    window.RightStream = client.createStream("right");
    window.LengthStream = client.createStream("length");
  });
})(this);
