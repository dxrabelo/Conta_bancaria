import { ContaPoupança } from './ContaPoupanca';
import { ContaCorrente } from './Corrente';


const contaCorrente: ContaCorrente = new ContaCorrente(3, 1234, "João", 1500, 500, 1);
contaCorrente.visualizar();
contaCorrente.sacar(2000);
contaCorrente.visualizar();
contaCorrente.depositar(1000);
contaCorrente.visualizar();

const contaPoupanca: ContaPoupança = new ContaPoupança(4, 5678, "Maria", 3000, 0, 2, 15);
contaPoupanca.visualizar();
contaPoupanca.sacar(500);
contaPoupanca.visualizar();
contaPoupanca.depositar(1000);
contaPoupanca.visualizar();