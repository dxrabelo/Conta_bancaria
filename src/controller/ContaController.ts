import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/colors";

export class ContaController implements ContaRepository {
  

    private listaContas: Array<Conta> = new Array<Conta>();
    private numero: number = 0;

    
    procurarPorNumero(numero: number): void {
        let buscarConta = this.buscarArray(numero);

        if (buscarConta != null) {
            buscarConta.visualizar();
        } else {
            console.log(colors.fg.red, `\nA conta número ${numero} não foi encontrada.`, colors.reset);
        }
    }

    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar();
        };
    }

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, "\nConta cadastrada com sucesso!", colors.reset);
    }

    atualizar(conta: Conta): void {
        let buscarConta = this.buscarArray(conta.getNumero());

        if (buscarConta != null) {
            this.listaContas[this.listaContas.indexOf(buscarConta)] = conta;
            console.log(colors.fg.green, `\nA conta número ${conta.getNumero()} foi atualizada com sucesso!`, colors.reset);
        } else {
            console.log(colors.fg.red, `\nA conta número ${conta.getNumero()} não foi encontrada.`, colors.reset);
        }
    }

    deletar(numero: number): void {
        const conta = this.buscarArray(numero);
        if (conta !== null) {
            this.listaContas = this.listaContas.filter(c => c.getNumero() !== numero);
            console.log(colors.fg.green, `\nConta número ${numero} removida com sucesso.`, colors.reset);
        } else {
            console.log(colors.fg.red, `\nA conta número ${numero} não foi encontrada.`, colors.reset);
        }
    }

    sacar(numero: number, valor: number): void {
        let conta = this.buscarArray(numero);

        if (conta != null) {
            if (conta.sacar(valor)) {
                console.log(colors.fg.green, `\nSaque de R$${valor.toFixed(2)} realizado com sucesso na conta ${numero}.`, colors.reset);
            } else {
                console.log(colors.fg.red, `\nSaldo insuficiente para saque na conta ${numero}.`, colors.reset);
            }
        } else {
            console.log(colors.fg.red, `\nConta número ${numero} não encontrada.`, colors.reset);
        }
    }

    depositar(numero: number, valor: number): void {
        let conta = this.buscarArray(numero);

        if (conta != null) {
            conta.depositar(valor);
            console.log(colors.fg.green, `\nDepósito de R$${valor.toFixed(2)} realizado com sucesso na conta ${numero}.`, colors.reset);
        } else {
            console.log(colors.fg.red, `\nConta número ${numero} não encontrada.`, colors.reset);
        }
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let contaOrigem = this.buscarArray(numeroOrigem);
        let contaDestino = this.buscarArray(numeroDestino);

        if (contaOrigem != null && contaDestino != null) {
            if (contaOrigem.sacar(valor)) {
                contaDestino.depositar(valor);
                console.log(colors.fg.green, `\nTransferência de R$${valor.toFixed(2)} da conta ${numeroOrigem} para ${numeroDestino} realizada com sucesso.`, colors.reset);
            } else {
                console.log(colors.fg.red, `\nSaldo insuficiente na conta ${numeroOrigem}.`, colors.reset);
            }
        } else {
            console.log(colors.fg.red, `\nConta de origem ou destino não encontrada.`, colors.reset);
        }
    }

    public buscarArray(numero: number): Conta | null {
        for (let conta of this.listaContas) {
            if (conta.getNumero() === numero)
                return conta;
        }
        return null;
    }
}
