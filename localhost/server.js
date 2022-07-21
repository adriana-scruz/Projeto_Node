const http = require('http');
const server = http.createServer();
const fsPromise = require('fs').promises;
const path = require('path');

server.on('request', async (req, res) => {

    const { method, url } = req;

    if (url === '/') {

        res.writeHead(200, { 'Content-Type': 'application/xhtml+xml'})
        const filePath = path.join(__dirname, 'index.html');
        const site = await fsPromise.readFile(filePath);
        res.write(site);
        res.end();


    } else if (url === 'styles.css') {

        res.writeHead(200, { 'Content-Type': 'text/css'})
        const filePath = path.join(__dirname, 'styles.css');
        const css = await fsPromise.readFile(filePath, 'utf-8');
        res.end(css);

    } else if ( url === 'app.js') {

        res.writeHead(200, { 'Content-Type': 'text/javascript'})
        const filePath = path.join(__dirname, '/../app.js');
        const js = await fsPromise.readFile(filePath, 'utf-8');
        res.end(js);


    } else if ( url === 'imagens/logo_agencia.png') {

        res.writeHead(200, { 'Content-Type': 'image/png'})
        const filePath = path.join(__dirname, '/imagens/logo_agencia.png');
        const logo = await fsPromise.readFile(filePath, 'utf-8');
        res.end(logo);


    } else if ( url === 'imagens/divisor.png') {

        res.writeHead(200, { 'Content-Type': 'image/png'})
        const filePath = path.join(__dirname, '/imagens/divisor.png');
        const divisor = await fsPromise.readFile(filePath, 'utf-8');
        res.end(divisor);


    } else{

        res.statusCode = 404; // 404 ➡ Not Found
        res.end('Endereco nao encontrado!')

    }
    
});

server.listen(8081);


