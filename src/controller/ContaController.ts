import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/colors";

export class ContaController implements ContaRepository {
    detelar(numero: number): void {
        throw new Error("Method not implemented.");
    }

    private listaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0;


    procurandoPorNumero(numero: number): void {
        let buscarConta = this.buscarArray(numero);

        if (buscarConta != null) {
            buscarConta.visualizar();
        } else
            console.log(colors.fg.red, "\nA conta numero " + numero + " não foi encontrada.", colors.reset);
    }
    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar();
        };
    }
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log("\nConta cadastrada com sucesso!");
    }
    atualizar(conta: Conta): void {
        let buscarConta = this.buscarArray(conta.getNumero());

        if (buscarConta != null) {
            this.listaContas[this.listaContas.indexOf(buscarConta)] = conta;
            console.log(colors.fg.green, "\nA conta numero:" + conta.getNumero() + " foi atualizada com sucesso!", colors.reset);
        } else
            console.log(colors.fg.red, "\nA conta numero " + conta.getNumero() + " não foi encontrada.", colors.reset);
    }
    deletar(numero: number): void {
        this.listaContas = this.listaContas.filter(c => c.getNumero() !== numero);
    }
    sacar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    depositar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    // Checa se uma conta existe
    public buscarArray(numero: number): Conta | null {

        for (let conta of this.listaContas) {
            if (conta.getNumero() === numero)
                return conta;
        }
        return null;
    }


}