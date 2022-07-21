const http = require('http');
const server = http.createServer();
const fsPromise = require('fs').promises;
const path = require('path');

server.on('request', async (req, res) => {

    const { method, url } = req;
    const filePath = path.join(__dirname, 'index.html');
    const site = await fsPromise.readFile(filePath);
    res.write(site);
    res.end();
});

server.listen(8081);


