It streams pcm chunks from the browser's mic into a node server through websockets. Those chunks are piped into node-wav FileWriter.

To start run:

    node app.js

Then go to `http://localhost:3700` and make a recording. It should create a wav file in your project's folder.

## Docker :

    docker run -p 8080:8080 -p 9001:9001 -d aclaval/pcm-stream
    docker exec -it <containerId> /bin/bash
