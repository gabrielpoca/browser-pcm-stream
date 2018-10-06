It streams pcm chunks from the browser's mic into a node server through websockets. Those chunks are piped into node-wav FileWriter.

To start the app:

    node app.js

Then go to `http://localhost:8080/` and make a recording. 

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
  -e SITES='pioupiou.pw=localhost:9001;pioupiou.pw=localhost:8080' \
  valian/docker-nginx-auto-ssl


docker run -d \
  --name nginx-auto-ssl \
  --restart on-failure \
  -p 80:80 \
  -p 443:443 \
  -e ALLOWED_DOMAINS=example.com \
  -e SITES='pioupiou.pw=localhost:8080;*.pioupiou.pw=localhost:8080' \
  -e DIFFIE_HELLMAN=true \
  -e FORCE_HTTPS=true \
  -v ssl-data:/etc/resty-auto-ssl \
  valian/docker-nginx-auto-ssl



## docker on raw ubuntu

sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates
sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt-get update
sudo apt-get install -y linux-image-extra-$(uname -r) linux-image-extra-virtual
sudo apt-get install -y docker-engine
sudo service docker start

https://webaudiodemos.appspot.com/AudioRecorder/js/recorderjs/recorder.js
https://html5demos.com/geo/


https://webaudiodemos.appspot.com/AudioRecorder/js/recorderjs/recorderWorker.js

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio


The more resilient way is to spin up your instance via autoscaling and attach a load balancer to that autoscaling group. Add your domain to Route 53 and create an alias record pointing to the load balancer.

https://addpipe.com/blog/using-recorder-js-to-capture-wav-audio-in-your-html5-web-site/

rawgit https://rawgit.com/