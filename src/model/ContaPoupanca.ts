import { Conta } from './Conta';

export class ContaPoupança extends Conta {

    private _aniversario: number;

    constructor(numero: number, agencia: number, titular: string, saldo: number, limite: number, tipo: number, aniversario: number) {
        super(numero, agencia, tipo, titular, saldo);
        this._aniversario = aniversario;
    }

    public getAniversario(): number {
        return this._aniversario;
    }
    public setAniversario(aniversario: number) {
        this._aniversario = aniversario;
    }

    public visualizar(): void {
        super.visualizar();
        console.log(`Aniversário: ${this._aniversario}`);
    }
}