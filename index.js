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

            // console.log('Cliente cadastrado!')
            novoCliente(nome, cpf, email);

            async function novoCliente (nome, cpf, email) {
                const caminhoCliente = path.join(__dirname, 'cliente.json');
                const cpfCliente = new Cliente(nome, cpf, email);
                console.log(`\n`)

                const conteudoStr = await fsPromise.readFile(caminhoCliente, 'utf-8');

                let conteudo = [];
                conteudo = JSON.parse(conteudoStr);
                
                const novoConteudo = `[${conteudo}, ${JSON.stringify(cpfCliente)}]`;

                console.log(novoConteudo);
                
                // await fsPromise.writeFile(caminhoCliente, novoConteudo, (err) => {
                //     if (err) throw err;
                // });

                // const clienteStr = await fsPromise.readFile(caminhoCliente, 'utf-8'); //lendo e enviando
                // return JSON.parse(clienteStr);
                
            }

            // exports.novoCliente = novoCliente;
            
            break;

        } default: {
            console.log('Fechando...');
            readl.close();
        }
    }

    



}


)





