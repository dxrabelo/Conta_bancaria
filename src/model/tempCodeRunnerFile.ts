import { Conta } from './Conta'
import { ContaPoupança } from './contaPoupança';
import { ContaCorrente } from './contaCorrente';

const conta1 = new Conta(1, 1290, 109, "Daliane", 5000);
const conta2 = new Conta(2, 1122, 302, "Adriana", 2000);

conta1.visualizar();
conta2.visualizar();

conta1.sacar(1000);
conta2.depositar(2000);

conta1.visualizar();
conta2.visualizar();

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