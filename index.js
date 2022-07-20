const Cliente = require('./cliente');
const Reserva = require('./reserva');
const ListaReservas = require('./listaReservas');

const readline = require('readline');
const fsPromise = require('fs').promises;
const path = require('path');

const readl = readline.createInterface({input: process.stdin, output: process.stdout});
var cpfatual = '';

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


async function novoCliente (nome, cpf, email) {
    const caminhoCliente = path.join(__dirname, 'cliente.json');
    const novoCliente = new Cliente(nome, cpf, email);
    console.log(`\n`)

    const conteudoStr = await fsPromise.readFile(caminhoCliente, 'utf-8');
    const conteudo = JSON.parse(conteudoStr);
    conteudo.push(novoCliente);

    await fsPromise.writeFile(caminhoCliente, JSON.stringify(conteudo));

    console.log('Cliente cadastrado!')
}

async function novaReserva (destino, data, preco, duracao, cpf) {
    const caminhoReserva = path.join(__dirname, 'reservas.json');
    const novaReserva = new Reserva(destino, data, preco, duracao, cpf);
    console.log(`\n`)
    
    const conteudoStr = await fsPromise.readFile(caminhoReserva, 'utf-8');
    const conteudo = JSON.parse(conteudoStr);
    conteudo.push(novaReserva);
   
    await fsPromise.writeFile(caminhoReserva, JSON.stringify(conteudo));
    
    console.log(`Reserva realizada!\n`)
    
}

async function consultaReserva(cpf) {

    const caminhoReserva = path.join(__dirname, 'reservas.json');
    const conteudoStr = await fsPromise.readFile(caminhoReserva, 'utf-8');
    const conteudo = JSON.parse(conteudoStr);

    const resultado = conteudo.filter(reserva => reserva.cpf === cpf);

    return resultado;

}

async function atualizarReserva (destino, data, preco, duracao, cpf) {
    const caminhoReserva = path.join(__dirname, 'reservas.json');
    const novaReserva = new Reserva(destino, data, preco, duracao, cpf);
    console.log(`\n`)
    
    const conteudoStr = await fsPromise.readFile(caminhoReserva, 'utf-8');
    const conteudo = JSON.parse(conteudoStr);
    const conteudoRemovido = conteudo.filter(conteudo => conteudo.destino !== destino.destino)
    conteudoRemovido.push(novaReserva);

    console.log(novaReserva);
    console.log('conteudoRemovido:');

    console.log(conteudoRemovido);
}



readl.on('line', async escolha => {
    switch (escolha) {
        case '1': {

            console.log(`\n`)
            const nome = await question('Qual o seu nome? ');
            const cpf = await question('Qual seu CPF? ')
            const email = await question('Qual seu email? ')
            cpfatual = cpf;
            
            await novoCliente(nome, cpf, email);
            readl.prompt();
            break;
        
        } 
        case '2': {
            
            const consulta = await question('\nQual seu cpf? ');
            cpfatual = consulta;
            const caminhoCliente = path.join(__dirname, 'cliente.json');
            const conteudoStr = await fsPromise.readFile(caminhoCliente, 'utf-8');
            const conteudo = JSON.parse(conteudoStr);

            const resultado = conteudo.find(cliente => cliente.cpf == consulta);

            if (resultado !== undefined) {
                console.log(`\n
                Olá ${resultado.nome}!\n\
                Seu CPF cadastrado é: ${resultado.cpf}\n\
                Seu email é: ${resultado.email}\n
                Volte sempre!                
                `);
            } else {
                console.log('Cliente não encontrado!');
            }

            readl.prompt();
            break;

        }
        case '3': {

            console.log(`\n`)
            const destino = await question('Qual o seu destino? ');
            const data = await question('Qual a data: ')
            const preco = await question('Qual preco? R$')
            const duracao = await question('Qual a duração? ')
            
            if(cpfatual === '') {
                var cpf = await question('Qual o seu cpf ');
            } else {
                cpf = cpfatual;
            }

            readl.prompt();
            
            await novaReserva(destino, data, preco, duracao, cpf);
            break;

        } 
        case '4': {

            if (cpfatual === '') {
                var consulta = await question('\nQual seu cpf? ');
            } else {
                consulta = cpfatual
            }

            const resultado = await consultaReserva(consulta);

            console.log(`\nSuas reservas são:\n`);

            for (let cont = 0; cont<resultado.length; cont++){
                console.log(`
                    Destino: ${resultado[cont].destino}\n\
                    Data da Viagem: ${resultado[cont].data}\n\
                    O valor de sua reserva é: R$${resultado[cont].preco},00\n\
                    Duração é: ${resultado[cont].duracao}
                `);
            }
            
            break;

        }
        case '5': {
            
            if (cpfatual === '') {
                var consulta = await question('\nQual seu cpf? ');
            } else {
                consulta = cpfatual
            }

            const destino = await question('Qual destino? ')

            const caminhoReserva = path.join(__dirname, 'reservas.json');
            const conteudoStr = await fsPromise.readFile(caminhoReserva, 'utf-8');
            const conteudo = JSON.parse(conteudoStr);

            const resultado = conteudo.find(reservas => reservas.cpf == consulta && reservas.destino == destino);

            if (resultado !== undefined) {
                console.log(`\n
                Partiu ${resultado.destino}!?\n\
                O valor de sua reserva é: R$${resultado.preco},00\n\
                A data prevista: ${resultado.data}\n\
                Duração é: ${resultado.duracao}\n
                Volte sempre!                
                `);
            } else {
                console.log('Reserva não encontrada!');
            }

            readl.prompt();
            break;

        }
        case '6': {

            if (cpfatual === '') {
                var consulta = await question('\nQual seu cpf? ');
            } else {
                consulta = cpfatual
            }

            const resultado = await consultaReserva(consulta);
            
            for (let cont = 0; cont<resultado.length; cont++){
                console.log(`
                   Destino ${cont+1}: ${resultado[cont].destino}`);
            }
            console.log(' \n\ ');
            const escolha = await question('Qual destino deseja atualizar? [Digite o nome da reserva] ')

            const caminhoReserva = path.join(__dirname, 'reservas.json');
            const conteudoStr = await fsPromise.readFile(caminhoReserva, 'utf-8');
            const conteudo = JSON.parse(conteudoStr);

            const resultadoEscolha = conteudo.find(reservas => reservas.cpf == consulta && reservas.destino == escolha);

            console.log(`
                Destino Selecionado: ${resultadoEscolha.destino}\n\
                Data atual da Viagem: ${resultadoEscolha.data} \n\
                O valor atual de sua reserva é: R$${resultadoEscolha.preco},00\n\
                Duração atual é: ${resultadoEscolha.duracao}
                `);

            const novaData = await question('Qual a nova data? ')
            const novoValor = await question('Qual o nova valor? R$')
            const novaDuracao = await question('Qual a nova duração? ')

            await atualizarReserva(resultadoEscolha, novaData, novoValor, novaDuracao, consulta);
            
            readl.prompt();
            break;
        }
        case '7': {

            break;
        }
        
        default: {
            console.log('Fechando...');
            readl.close();
            process.exit();
        }
    }
})





