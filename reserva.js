class Reserva {
    constructor(destino, data, preco, duracao, cpf) {
        this.destino = destino;
        this.data = data;
        this.preco = preco;
        this.duracao = duracao;
        this.cpf = cpf;
    }
}

module.exports = Reserva;