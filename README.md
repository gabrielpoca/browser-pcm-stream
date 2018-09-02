It streams pcm chunks from the browser's mic into a node server through websockets. Those chunks are piped into node-wav FileWriter.

To start run:

    node app.js

Then go to `http://localhost:3700` and make a recording. It should create a wav file in your project's folder.

## Docker :

	docker build -t aclaval/pcm-stream .
    docker run -p 8080:8080 -p 9001:9001 -d aclaval/pcm-stream
    docker exec -it <containerId> /bin/bash

    docker run -d \
  --name nginx-auto-ssl \
  --restart on-failure \
  -p 80:80 \
  -p 443:443 \
  -p 8080:8080 \
  -e ALLOWED_DOMAINS=amazonaws.com \
  -e SITES='ec2-54-165-99-225.compute-1.amazonaws.com=localhost:9001;ec2-54-165-99-225.compute-1.amazonaws.com=localhost:8080' \
  valian/docker-nginx-auto-ssl

https://webaudiodemos.appspot.com/AudioRecorder/js/recorderjs/recorder.js
https://html5demos.com/geo/


https://webaudiodemos.appspot.com/AudioRecorder/js/recorderjs/recorderWorker.js

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio