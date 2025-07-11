import { Conta } from "../model/Conta"

export interface ContaRepository {

    // CRUD

    procurandoPorNumero(numero: number): void;
    listarTodas(): void;
    cadastrar(conta: Conta): void;
    atualizar(conta: Conta): void;
    detelar(numero: number): void;

    // Métodos Bancários.

    sacar(numero: number, valor: number): void;
    depositar(numero: number, valor: number): void;
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void;

}