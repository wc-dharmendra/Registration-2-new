require('dotenv').config();
const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

// console.log({ dev });

const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3001;

app.prepare().then(() => {
  const server = express();
  server.use(cors());
  // Add any custom routes or middleware if needed

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // const httpsOptions = {
  //   key: fs.readFileSync('./private-key.pem'),
  //   cert: fs.readFileSync('./certificate.pem'),
  //   // key: fs.readFileSync('./private-key.pem'),I THINK EXTENSION SHOULD BE .KEY NEED TO CHECK
  //   // cert: fs.readFileSync('./certificate.pem'), I THINK EXTENSION SHOULD BE .CRT NEED TO CHECK
  // };

  http.createServer(server).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
