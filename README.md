It streams pcm chunks from the browser's mic into a node server through websockets. Those chunks are piped into node-wav FileWriter.

To start the app:

    node app.js

Then go to `http://localhost:3000/` and make a recording. File are saved in wav format under /upload

## Docker :

sudo docker run -p 3000:3000  -e SENDGRID_API_KEY="SEND-GrID-API-KEY" -e SUBSCRIPTION_DESTINATION="Email.for.notification@mail.com" -d aclaval/browser-pcm-stream:DockerTagName



## Install docker on raw ubuntu ( 16.04 )

sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates
sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt-get update
sudo apt-get install -y linux-image-extra-$(uname -r) linux-image-extra-virtual
sudo apt-get install -y docker-engine
sudo service docker start


## Notes

https://webaudiodemos.appspot.com/AudioRecorder/js/recorderjs/recorder.js
https://html5demos.com/geo/


https://webaudiodemos.appspot.com/AudioRecorder/js/recorderjs/recorderWorker.js

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio

https://addpipe.com/blog/using-recorder-js-to-capture-wav-audio-in-your-html5-web-site/

rawgit https://rawgit.com/
