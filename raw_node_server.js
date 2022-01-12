// Run this file in terminal using > node raw_node_server.js

const http = require('http');

const todos = [
  { id: 1, text: 'todo one' },
  { id: 2, text: 'todo two' },
  { id: 3, text: 'todo three' },
];

const server = http.createServer(function (req, res) {

  const { method, url } = req;
  let body = [];

  // send data to server
  /**
   * Th .on() method is what we use in Node in order to configure what happens on 
   * specific event occurrences. It is provided by the Node Event emitter: 
   * https://nodejs.dev/learn/the-nodejs-event-emitter
   * 
   * on is used to add a callback function that's going to be executed when the event 
   * is triggered.
   * 
   * Data is just the data in the request body
   * Buffer is just the raw data.
   * End is just ending the process.
   */
  req.on('data', chunk => {
    body.push(chunk);

  }).on('end', () => {
    body = Buffer.concat(body).toString();

    let status = 404;
    const response = {
      success: false,
      data: null,
      error: null
    }

    if (method === 'GET' && url === '/todos') {
      status = 200;
      response.success = true;
      response.data = todos;
    } else if (method === 'POST' && url === '/todos') {
      const { id, text } = JSON.parse(body);

      if (!id || !text) {
        status = 400;
        response.error = 'Bad Request! Enter required details';
      } else {
        todos.push({ id, text });
        status = 201;
        response.success = true;
        response.data = todos;
      }
    }

    // res.statusCode = 404;
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('X-Powered-By', 'Node.js');
    res.writeHead(404, {
      'Content-Type': 'application/json',
      'X-Powered-By': 'Node.js'
    });

    // res.write('Hello from the server');
    res.end(
      JSON.stringify(response)
    );

  })

  // console.log(req.headers.auth);
});

const PORT = 5000;

server.listen(PORT, function () {
  console.log(`Server is running on port: ${PORT}`);
});
