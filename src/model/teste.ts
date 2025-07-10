import { Conta } from './Conta'
import { ContaPoupança } from './contaPoupança';
import { ContaCorrente } from './contaCorrente';

// Objeto da classe conta (Teste).
const conta = new Conta(2, 1122, 302, "Adriana", 2000);
conta.visualizar();
conta.sacar(10500);
conta.visualizar();
conta.depositar(5000);
conta.visualizar();

// Objeto da classe ContaCorrente (teste).
const contaCorrente: ContaCorrente = new ContaCorrente(3, 1234, "João", 1500, 500, 1);
contaCorrente.visualizar();
contaCorrente.sacar(2000);
contaCorrente.visualizar();
contaCorrente.depositar(1000);
contaCorrente.visualizar();

// Objeto da classe ContaPoupança (teste).
const contaPoupanca: ContaPoupança = new ContaPoupança(4, 5678, "Maria", 3000, 0, 2, 15);
contaPoupanca.visualizar();
contaPoupanca.sacar(500);
contaPoupanca.visualizar();
contaPoupanca.depositar(1000);
contaPoupanca.visualizar();