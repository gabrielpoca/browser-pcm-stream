[![Stories in Ready](https://badge.waffle.io/gabrielpoca/browser-pcm-stream.png?label=ready&title=Ready)](https://waffle.io/gabrielpoca/browser-pcm-stream)
It streams pcm chunks from the browser's mic into a node server through websockets. Those chunks are piped into node-wav FileWriter.

To start run:

    node app.js

Then go to `http://localhost:3700` and make a recording. It should create a wav file in your project's folder.
