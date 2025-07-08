import { Conta } from './Conta'

const conta1 =  new Conta(1, 1290, 109, "Daliane", 5000);
const conta2 =  new Conta(2,1122, 302, "Adriana", 2000);

conta1.visualizar();
conta2.visualizar();

conta1.sacar(1000);
conta2.depositar(2000);

conta1.visualizar();
conta2.visualizar();

