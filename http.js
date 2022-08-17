const http = require('http');
const server = http.createServer();
const fsPromise = require('fs').promises;
const path = require('path');


server.on('request', async (req, res) => {

    const { method, url } = req; 
    res.writeHead(200, { 'Content-Type': 'application/json' });  

    const filePath = path.join(__dirname, 'reservas.json');
    const reservas = await fsPromise.readFile(filePath, 'utf-8');

    res.write(JSON.stringify({reservas}));
    res.end();


});

server.listen(8080);