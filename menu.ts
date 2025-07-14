//importações necessárias. 
import readlinesync = require("readline-sync");
import { colors } from './src/util/colors';
import { ContaPoupança } from './src/model/ContaPoupanca';
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaController } from "./src/controller/ContaController"
const Controller = new ContaController();

export function main() {

    let opcao, numero, agencia, tipo, saldo, limite, aniversario, valor, numeroDestino: number;
    let titular: string;
    const tiposConta = ['Conta Corrente', 'Conta Poupança'];



    while (true) {

        // Exibe o Menu.

        console.log(colors.bg.black, colors.fg.bluestrong,
            "**********************************************************");
        console.log("                                                          ");
        console.log("                      Zenith Invest                       ");
        console.log("                                                          ");
        console.log("**********************************************************");
        console.log("    1 - Acesse sua Conta                                  ");
        console.log("    2 - Lista de Contas Cadastradas                       ");
        console.log("    3 - Atualizar Dados da Conta                          ");
        console.log("    4 - Buscar Conta por Número                           ");
        console.log("    5 - Transferência                                     ");
        console.log("    6 - Sacar                                             ");
        console.log("    7 - Depositar                                         ");
        console.log("    8 - Cadastrar Conta                                   ");
        console.log("    9 - Informações da Conta                              ");
        console.log("   10 - Sair                                              ");
        console.log("   11 - Deletar Conta                                     ");
        console.log("                                                          ");
        console.log("**********************************************************");
        console.log("**********************************************************",
            colors.reset);

        opcao = readlinesync.questionInt("\nEscolha uma opcao: ");
        // switch case para as opções do menu.
        switch (opcao) {
            case 1: acessarConta();
                break;
            case 2:
                console.log(colors.fg.whitestrong, "\n\nListar todas as contas cadastradas:");
                Controller.listarTodas();
                keyPress();
                break;
            case 3: atualizarDadosDaConta();
                console.log(colors.fg.whitestrong, "\n\nAtualizar dados da conta\n\n", colors.reset);
                numero = readlinesync.questionInt("");

                let conta = Controller.buscarArray(numero);

                if (conta != null) {
                    console.log("Digite o numero da agencia: ");
                    agencia = readlinesync.questionInt("");

                    console.log("Digite o Nome do titular: ");
                    titular = readlinesync.question("");

                    tipo = conta.getTipo();

                    console.log("\nDigite o saldo: ");
                    saldo = readlinesync.questionFloat("");

                    switch (tipo) {
                        case 1: // Conta Corrente
                            console.log("Digite o limite da conta: ");
                            limite = readlinesync.questionFloat("");
                            Controller.atualizar(new ContaCorrente(numero, agencia, titular, saldo, limite, tipo));
                            break;
                        case 2: // Conta Poupança
                            console.log("Digite o dia do aniversario da conta: ");
                            aniversario = readlinesync.questionInt("");
                            Controller.atualizar(new ContaPoupança(numero, agencia, titular, saldo, 0, tipo, aniversario));
                            break;
                        default:
                            console.log("Tipo de conta inválido!");
                            return;
                    }
                } else {

                    console.log(colors.fg.red, "\nA conta número " + numero + " não foi encontrada.", colors.reset);
                }
                keyPress();
                break;
            case 4: buscarContaPorNumero();
                console.log(colors.fg.whitestrong, "\n\nBuscar Conta por Número\n\n", colors.reset);
                keyPress();
                break;
            case 5: transferencia();
                console.log(colors.fg.whitestrong, "\n*** Transferência entre Contas ***", colors.reset);
                keyPress();
                break;
            case 6: sacar();
                console.log(colors.fg.whitestrong, "\n*** Saque de Conta ***", colors.reset);
                keyPress();
                break;
            case 7: depositar();
                console.log(colors.fg.whitestrong, "\n*** Depósito em Conta ***", colors.reset);
                keyPress();
                break;
            case 8: cadastrarConta();
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
            case 11: deletarConta();
                break;

        }

        readlinesync.question("\nPressione ENTER para continuar...");
    }
}


// Funções do menu.
// Funções que serão chamadas no menu principal.

function acessarConta(): void {
    const numero = readlinesync.questionInt('Número da conta: ');
    Controller.procurandoPorNumero(numero); // não atribui a variável
    keyPress();
}

keyPress();

function atualizarDadosDaConta(): void {
    console.log(colors.fg.whitestrong, "\n\nAtualizar dados da conta\n\n", colors.reset);

    const numero = readlinesync.questionInt("Digite o número da conta: ");
    let buscarConta = Controller.buscarArray(numero);

    if (buscarConta != null) {
        const agencia = readlinesync.questionInt("Digite o número da agência: ");
        const titular = readlinesync.question("Digite o nome do titular: ");
        const saldo = readlinesync.questionFloat("Digite o saldo: ");
        const tipo = buscarConta.getTipo();

        switch (tipo) {
            case 1: // Conta Corrente
                const limite = readlinesync.questionFloat("Digite o limite da conta: ");
                Controller.atualizar(new ContaCorrente(numero, agencia, titular, saldo, limite, tipo));
                break;
            case 2: // Conta Poupança
                const aniversario = readlinesync.questionInt("Digite o dia do aniversário da conta: ");
                Controller.atualizar(new ContaPoupança(numero, agencia, titular, saldo, 0, tipo, aniversario));
                break;
            default:
                console.log("Tipo de conta inválido!");
                return;
        }

        console.log(colors.fg.green, `\nA conta número: ${numero} foi atualizada com sucesso.`, colors.reset);
    } else {
        console.log(colors.fg.red, `\nA conta número ${numero} não foi encontrada.`, colors.reset);
    }

    keyPress();
}

function buscarContaPorNumero(): void {
    console.clear();
    console.log(colors.fg.whitestrong, "\n=== Buscar Conta por Número ===\n", colors.reset);

    const numero = readlinesync.questionInt("Digite o número da conta: ");

    if (numero <= 0) {
        exibirErro("O número da conta deve ser maior que zero.");
        return;
    }

    const conta = Controller.buscarArray(numero);

    if (conta) {
        console.log(colors.fg.green, `\nConta número ${numero} localizada:\n`, colors.reset);
        Controller.procurandoPorNumero(numero); // Exibe os dados da conta
    } else {
        exibirErro(`Conta número ${numero} não encontrada.`);
    }

    keyPress();
}


function transferencia(): void {
    console.log(colors.fg.whitestrong, "\n*** Transferência entre Contas ***", colors.reset);

    const numeroOrigem = readlinesync.questionInt("Digite o número da conta de origem: ");
    const contaOrigem = Controller.buscarArray(numeroOrigem);

    if (contaOrigem == null) {
        console.log(colors.fg.red, `\nConta de origem número ${numeroOrigem} não encontrada.`, colors.reset);
        keyPress();
        return;
    }

    const numeroDestino = readlinesync.questionInt("Digite o número da conta de destino: ");
    const contaDestino = Controller.buscarArray(numeroDestino);

    if (contaDestino == null) {
        console.log(colors.fg.red, `\nConta de destino número ${numeroDestino} não encontrada.`, colors.reset);
        keyPress();
        return;
    }

    const valor = readlinesync.questionFloat("Digite o valor para transferir: ");

    if (valor <= 0) {
        console.log(colors.fg.red, "\nValor inválido para transferência.", colors.reset);
    } else if (contaOrigem.getSaldo() < valor) {
        console.log(colors.fg.red, "\nSaldo insuficiente na conta de origem.", colors.reset);
    } else {
        contaOrigem.setSaldo(contaOrigem.getSaldo() - valor);
        contaDestino.setSaldo(contaDestino.getSaldo() + valor);

        Controller.atualizar(contaOrigem);
        Controller.atualizar(contaDestino);

        console.log(colors.fg.green, `\nTransferência de R$ ${valor.toFixed(2)} realizada com sucesso!`, colors.reset);
    }

    keyPress();
}

function sacar(): void {
    console.log(colors.fg.whitestrong, "\n*** Saque de Conta ***", colors.reset);

    const numero = readlinesync.questionInt("Digite o número da conta: ");
    const conta = Controller.buscarArray(numero);

    if (conta != null) {
        const valor = readlinesync.questionFloat("Digite o valor para saque: ");

        if (valor <= 0) {
            console.log(colors.fg.red, "\nValor inválido para saque.", colors.reset);
        } else if (conta.getSaldo() >= valor) {
            conta.setSaldo(conta.getSaldo() - valor);
            Controller.atualizar(conta); // Atualiza os dados no array/controlador
            console.log(colors.fg.green, `\nSaque de R$ ${valor.toFixed(2)} realizado com sucesso.`, colors.reset);
        } else {
            console.log(colors.fg.red, "\nSaldo insuficiente para o saque.", colors.reset);
        }
    } else {
        console.log(colors.fg.red, `\nConta número ${numero} não encontrada.`, colors.reset);
    }

    keyPress();
}

function depositar(): void {
    console.log(colors.fg.whitestrong, "\n*** Depósito em Conta ***", colors.reset);

    const numero = readlinesync.questionInt("Digite o número da conta: ");
    const conta = Controller.buscarArray(numero);

    if (conta != null) {
        const valor = readlinesync.questionFloat("Digite o valor para depósito: ");

        if (valor <= 0) {
            console.log(colors.fg.red, "\nValor inválido para depósito.", colors.reset);
        } else {
            conta.setSaldo(conta.getSaldo() + valor);
            Controller.atualizar(conta);
            console.log(colors.fg.green, `\nDepósito de R$ ${valor.toFixed(2)} realizado com sucesso.`, colors.reset);
        }
    } else {
        console.log(colors.fg.red, `\nConta número ${numero} não encontrada.`, colors.reset);
    }

    keyPress();
}

function cadastrarConta(): void {
    console.log("\nCadastrar Nova Conta");

    const tipo = readlinesync.questionInt("\nDigite o tipo da conta (1 - Corrente | 2 - Poupança): ");
    const numero = readlinesync.questionInt("Número da conta: ");
    const senha = readlinesync.questionInt("Senha da conta: ");
    const titular = readlinesync.question("Nome do titular: ");
    const saldo = readlinesync.questionFloat("Saldo inicial: ");
    const agencia = readlinesync.questionInt("Número da agência: ");

    let conta;

    if (tipo === 1) {
        const limite = readlinesync.questionFloat("Limite da conta corrente: ");
        conta = new ContaCorrente(numero, senha, titular, saldo, limite, agencia);
    } else if (tipo === 2) {
        const aniversario = readlinesync.questionInt("Dia do aniversário da conta poupança: ");
        conta = new ContaPoupança(numero, senha, titular, saldo, 0, agencia, aniversario);
    } else {
        console.log("\nTipo de conta inválido!");
        return;
    }

    Controller.cadastrar(conta);
    keyPress();
}
function informacoesDaConta(): void {
    console.log("Função informacoesDaConta ainda não implementada.");
}

function deletarConta(): void {
    console.log(colors.fg.red, "\n*** Deletar Conta ***", colors.reset);

    const numero = readlinesync.questionInt("Digite o número da conta que deseja deletar: ");

    const conta = Controller.buscarArray(numero);

    if (conta != null) {
        const confirmar = readlinesync.question(`Tem certeza que deseja deletar a conta número ${numero}? (s/n): `);

        if (confirmar.toLowerCase() === 's') {
            Controller.deletar(numero);
            console.log(colors.fg.green, `\nConta número ${numero} deletada com sucesso!`, colors.reset);
        } else {
            console.log(colors.fg.yellow, "\nOperação cancelada pelo usuário.", colors.reset);
        }
    } else {
        console.log(colors.fg.red, `\nConta número ${numero} não encontrada.`, colors.reset);
    }

    keyPress();
}
function exibirErro(mensagem: string): void {
    console.log(colors.fg.red, `\nErro: ${mensagem}`, colors.reset);
    keyPress();
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


// Exibe informações sobre o desenvolvedor.
sobre();