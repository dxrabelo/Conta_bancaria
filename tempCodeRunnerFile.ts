import readlinesync = require("readline-sync");
import { colors } from './src/util/colors';
import { Conta } from './src/model/Conta'

interface contaSimples {
    numero: number;
    nome: string;
    senha: string;
    saldo: number;
    titular: string;
    extrato: number[];

}
const contas: contaSimples[] = [];

export function main() {

    let opcao: number;

    // Objeto da Classe Conta (Teste)
    const conta: Conta = new Conta(1, 123, 1, "Adriana", 10000);
    conta.visualizar();
    conta.sacar(10500);
    conta.visualizar();
    conta.depositar(5000);
    conta.visualizar();

    while (true) {

        // Exibe o Menu.

        console.log(colors.bg.black, colors.fg.bluestrong,
            "**********************************************************");
        console.log("                                                          ");
        console.log("                      Zenith Invest                       ");
        console.log("                                                          ");
        console.log("**********************************************************");
        console.log("    1 - Acesse sua Conta                                  ");
        console.log("    2 - Criar Conta                                       ");
        console.log("    3 - Atualizar Dados da Conta                          ");
        console.log("    4 - Saldo                                             ");
        console.log("    5 - Transferência                                     ");
        console.log("    6 - Sacar                                             ");
        console.log("    7 - Depositar                                         ");
        console.log("    8 - Investimento                                      ");
        console.log("    9 - Informações da Conta                              ");
        console.log("   10 - Sair                                              ");
        console.log("                                                          ");
        console.log("**********************************************************");
        console.log("**********************************************************",
            colors.reset);

        opcao = readlinesync.questionInt("\nEscolha uma opcao: ");

        switch (opcao) {
            case 1: acessarConta();
                break;
            case 2: criarConta();
                break;
            case 3: atualizarDadosDaConta();
                break;
            case 4: saldoExtrato();
                break;
            case 5: transferencia();
                break;
            case 6: sacar();
                break;
            case 7: depositar();
                break;
            case 8: investimento();
                break;
            case 9: informacoesDaConta();
                break;
            case 10:
                console.log(colors.fg.blackstrong,
                    "\nObrigado por usar Zenith Invest!\n",
                    colors.reset);
                process.exit(0);
            default:
                console.log("\nOpção inválida.");
        }

        readlinesync.question("\nPressione ENTER para continuar...");
    }
}

// Função para criar nova conta.
function criarConta() {
    console.log("\n=== Criar Conta ===");
    const numero = readlinesync.questionInt('Número da conta: ');
    const nome = readlinesync.question('Nome do titular: ');
    const senha = readlinesync.question('Senha: ', { hideEchoBack: true });
    const saldo = 0;
    const extrato: number[] = [];

    contas.push({ numero, nome, senha, saldo, extrato, titular: nome });
    console.log(`\nConta criada com sucesso! Número da Conta: ${numero}`);
}

// Função para acessar Conta.

function acessarConta(): void {
    console.log('\n=== Acessar Conta ===');
    const numero = readlinesync.questionInt('Número da conta: ');
    const senha = readlinesync.question('Senha: ', { hideEchoBack: true });
    const conta = contas.find((c: contaSimples) => c.numero === numero && c.senha === senha);

    if (conta) {
        console.log(`\nBem-vindo(a), ${conta.nome}!`);
    } else {
        console.log('\nConta não encontrada ou senha incorreta.');
    }
}
// Função para atualizar dados da conta.
function atualizarDadosDaConta() {
    console.log("\n=== Atualizar Dados da Conta ===");
    const numero = readlinesync.questionInt('Número da conta: ');
    const conta = contas.find((c: contaSimples) => c.numero === numero);
    if (conta) {
        const novaSenha = readlinesync.question('Nova senha: ', { hideEchoBack: true });
        conta.senha = novaSenha;
        console.log(`\nSenha atualizada com sucesso!`);
    } else {
        console.log('\nConta não reconhecida.');
    }
}

// Função para exibir o saldo e extrato da conta.
function saldoExtrato() {
    console.log("\n=== Saldo e Extrato da Conta ===");
    const numero = readlinesync.questionInt('Número da conta: ');
    const conta = contas.find((c: contaSimples) => c.numero === numero);
    if (conta) {
        console.log(`\nSaldo: ${conta.saldo}`);
        console.log(`Extrato: ${conta.extrato.join('\n')}`);
    } else {
        console.log('\nConta não reconhecida.');
    }
}
// Função para realizar transferência entre contas.
function transferencia() {
    console.log("\n=== Transferência ===");
    const numeroOrigem = readlinesync.questionInt('Número da conta de origem: ');
    const numeroDestino = readlinesync.questionInt('Número da conta de destino: ');
    const valor = readlinesync.questionFloat('Valor da transferência: ');

    const contaOrigem = contas.find((c: contaSimples) => c.numero === numeroOrigem);
    const contaDestino = contas.find((c: contaSimples) => c.numero === numeroDestino);

    if (contaOrigem && contaDestino) {
        if (contaOrigem.saldo >= valor) {
            contaOrigem.saldo -= valor;
            contaDestino.saldo += valor;
            console.log(`\nTransferência de ${valor} realizada com sucesso!`);
        } else {
            console.log(`\nSaldo insuficiente na conta de origem.`);
        }
    } else {
        console.log(`\nConta de origem ou destino não reconhecida.`);
    }
}
// Função para sacar dinheiro da conta.
function sacar() {
    console.log("\n=== Sacar ===");
    const numero = readlinesync.questionInt('Número da conta: ');
    const valor = readlinesync.questionFloat('Valor do saque: ');
    const conta = contas.find((c: contaSimples) => c.numero === numero);
    if (conta) {
        if (conta.saldo >= valor) {
            conta.saldo -= valor;
            console.log(`\nSaque de ${valor} realizado com sucesso!`);
        } else {
            console.log(`\nSaldo insuficiente para realizar o saque.`);
        }
    } else {
        console.log('\nConta não reconhecida.');
    }
}
// Função para depositar dinheiro na conta.
function depositar() {
    console.log("\n=== Depositar ===");
    const numero = readlinesync.questionInt('Número da conta: ');
    const valor = readlinesync.questionFloat('Valor do depósito: ');
    const conta = contas.find((c: contaSimples) => c.numero === numero);
    if (conta) {
        conta.saldo += valor;
        console.log(`\nDepósito de ${valor} realizado com sucesso!`);
    } else {
        console.log('\nConta não reconhecida.');
    }
}
// Função para investimentos na conta.
function investimento() {
    console.log("\n=== Investimento ===");
    const numero = readlinesync.questionInt('Número da conta: ');
    const valor = readlinesync.questionFloat('Valor do investimento: ');
    const conta = contas.find((c: contaSimples) => c.numero === numero);
    if (conta) {
        conta.saldo -= valor;
        console.log(`\nInvestimento de ${valor} realizado com sucesso!`);
    } else {
        console.log('\nConta não reconhecida.');
    }
}
// Função que exibe informações da conta.
function informacoesDaConta() {
    console.log("\n=== Informações da Conta ===");
    const numero = readlinesync.questionInt('Número da conta: ');
    const conta = contas.find((c: contaSimples) => c.numero === numero);
    if (conta) {
        console.log(`\nNúmero da conta: ${conta.numero}`);
        console.log(`Titular: ${conta.titular}`);
        console.log(`Saldo: ${conta.saldo}`);
        console.log(`Extrato: ${conta.extrato.join('\n')}`);
    } else {
        console.log('\nConta não reconhecida.');
    }
}


// Função com os dados da pessoa desenvolvedora.
function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: Daliane Rabelo");
    console.log("Daliane Rabelo - daliane.rabelo01@gmail.com");
    console.log("https://github.com/dxrabelo");
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

// Executa o programa. 
main();


