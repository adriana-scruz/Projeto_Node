const http = require('http');
const server = http.createServer();
const fsPromise = require('fs').promises;
const path = require('path');
const { isMapIterator } = require('util/types');

const cliente = [
    {nome: 'Maria', cpf: '12345678', email: 'maria@mail.com'}
];

const reserva = [
    {destino: 'Madri', data: '23/2/2024', valor: 'R$ 15.000,00', duração: '10 dias' }
]


server.on('request', async (req, res) => {

    const { method, url } = req;

    if (url === '/') {
        
        const filePath = path.join(__dirname, 'index.html');
        const site = await fsPromise.readFile(filePath, 'utf-8');

        // const clienteDefinido = site.replace('{CLIENTE}', 'Maria')
        
        // const clienteDados = cliente.map(cliente => (
        //     `<li>${cliente.nome}</li>`
        // ));
        
        // const listaDadosCliente = clienteDados.replace('{CLIENTE}', clienteDados.join(''));
        
        // res.writeHead(200, { 'Content-Type': 'text/html'})
        // res.setHeader('Content-Type', 'text/html');
        // res.end(listaDadosCliente);
        res.write(site);
        res.end();


    } else if (url === '/style.css') {
        res.writeHead(200, { 'Content-Type': 'text/css'})
        const filePath = path.join(__dirname, 'style.css');
        const css = await fsPromise.readFile(filePath, 'utf-8');
        res.end(css);
    } else if ( url === '/imagens/logo_agencia.png') {
        res.writeHead(200, { 'Content-Type': 'image/png'})
        const filePath = path.join(__dirname, 'imagens', 'logo_agencia.png');
        const logo = await fsPromise.readFile(filePath);
        res.end(logo);
    } else if ( url === '/imagens/divisor.png') {
        res.writeHead(200, { 'Content-Type': 'image/png'})
        const filePath = path.join(__dirname, '/imagens/divisor.png');
        const divisor = await fsPromise.readFile(filePath);
        res.end(divisor);
    } else{
        res.statusCode = 404; // 404 ➡ Not Found
        res.end('Endereco nao encontrado!')
    }
    
});
server.listen(8081);

