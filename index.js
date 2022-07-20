const Cliente = require('./cliente');
const Reserva = require('./reserva');
const ListaReservas = require('./listaReservas');

const readline = require('readline');
const fsPromise = require('fs').promises;
const path = require('path');

const readl = readline.createInterface({input: process.stdin, output: process.stdout});

console.log(
    `
        Bem Vinda(o), ao ViageBem🧭! \n
        ============================================================================\n
        Algumas informações importantes: \n\
        Processo: ${process.pid}\n\
        Plataforma: ${process.platform}\n\
        Arquitetura: ${process.arch}\n
        ============================================================================
    `
);

readl.setPrompt(
    `
        O que você deseja?\n
        1. Realizar um cadastro
        2. Ver seu cadastro
        3. Criar uma reserva
        4. Verificar suas reservas
        5. Verificar uma reserva
        6. Atualizar uma reserva
        7. Deletar uma reserva
    `
);

readl.prompt();

function question(str) {
    return new Promise(resolve => (
      readl.question(str, resolve)  
    ));
  }


readl.on('line', async escolha => {
    switch (escolha) {
        case '1': {

            console.log(`\n`)
            const nome = await question('Qual o seu nome? ');
            const cpf = await question('Qual seu CPF? ')
            const email = await question('Qual seu email? ')
            
            readl.prompt();

            
            novoCliente(nome, cpf, email);

            async function novoCliente (nome, cpf, email) {
                const caminhoCliente = path.join(__dirname, 'cliente.json');
                const cpfCliente = new Cliente(nome, cpf, email);
                console.log(`\n`)

                const conteudoStr = await fsPromise.readFile(caminhoCliente, 'utf-8');
             
                const novoConteudo = `[${conteudoStr}, ${JSON.stringify(cpfCliente)}]`;
                
                await fsPromise.writeFile(caminhoCliente, novoConteudo, (err) => {
                    if (err) throw err;
                });

                const clienteStr = await fsPromise.readFile(caminhoCliente, 'utf-8'); //lendo e enviando
                return JSON.parse(clienteStr);

                console.log('Cliente cadastrado!')
                
            }

            exports.novoCliente = novoCliente;
            
            break;
        
        } 
        case '2': {
            
            const consulta = await question('\nQual seu cpf? ');
            readl.prompt();
            const caminhoCliente = path.join(__dirname, 'cliente.json');
            const conteudoStr = await fsPromise.readFile(caminhoCliente, 'utf-8');
            const conteudo = JSON.parse(conteudoStr);

            const resultado = conteudo.find(cliente => conteudo.cpf === consulta);

            console.log(conteudo[0].length)


            for(let con = 0; con<conteudo.length; con++) {
                for (let cont = 0; cont<conteudo[con].length; cont++){
                    if (consulta === conteudo[con].cpf) {
                        console.log(conteudo(con));
                    } else {
                        console.log('Cliente não encontrado');
                    }
                }
            }


        }
        case '3': {

            console.log(`\n`)
            const destino = await question('Qual o seu destino? ');
            const data = await question('Qual a data ')
            const preco = await question('Qual preco? ')
            const duracao = await question('Qual a duracao ')
            
            readl.prompt();

            
            novaReserva(destino, data, preco, duracao);

            async function novaReserva (destino, data, preco, duracao) {
                const caminhoReserva = path.join(__dirname, 'reservas.json');
                const novoDestino = new Reserva(destino, data, preco, duracao);
                console.log(`\n`)

                const conteudoStr = await fsPromise.readFile(caminhoReserva, 'utf-8');
             
                const novoConteudo = `[${conteudoStr}, ${JSON.stringify(novoDestino)}]`;
                
                await fsPromise.writeFile(caminhoReserva, novoConteudo, (err) => {
                    if (err) throw err;
                });

                const reservaStr = await fsPromise.readFile(caminhoReserva, 'utf-8'); //lendo e enviando
                return JSON.parse(reservaStr);

                console.log(`Reserva realizada!\n`)
                
            }

            exports.novaReserva = novaReserva;
            
            break;


        } 
        case '4': {

            

        }
        
        default: {
            console.log('Fechando...');
            readl.close();
        }
    }

    



}


)





