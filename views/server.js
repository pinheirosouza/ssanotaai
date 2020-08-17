const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
console.log("Tentando rodar esa parada na porta ", port)

app.use(express.static(__dirname + '/dist/ssanotaai'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname)));


const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
