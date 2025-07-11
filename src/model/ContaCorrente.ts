import { Conta } from './Conta';

export class ContaCorrente extends Conta {

    private _limite: number;


    constructor(numero: number, agencia: number, titular: string, saldo: number, limite: number, tipo: number) {
        super(numero, agencia, tipo, titular, saldo);
        this._limite = limite;
    }
    public getLimite() {
        return this._limite;
    }
    public setLimite(limite: number) {
        this._limite = limite;
    }
    public sacar(valor: number): boolean {
        if ((this.getSaldo() + this._limite) < valor) {
            console.log("\n Saldo insuficiente!");
            return false;
        }

        this.setSaldo(this.getSaldo() - valor);
        console.log(`Saque de R$ ${valor} realizado com sucesso!`);
        return true;
    }
    public visualizar(): void {
        super.visualizar();
        console.log(`Limite: R$ ${this._limite}`);
    }

}
