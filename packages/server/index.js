const http = require('http');

const host = '0.0.0.0';
const port = 3001;

const requestListener = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify({ status: 'ok', time: new Date(), newField: 'hello world' }));
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
