import readlinesync = require("readline-sync");
import { colors } from './src/util/colors'

// Array para guardar as contas.
type Conta = { numero: number; nome: string; senha: string };
let contas: Conta[] = [];



export function main() {

    let opcao: number;

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
        console.log("    7 - Pagamentos                                        ");
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
            case 7: pagamentos();
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
    console.log(`\nCriar Conta ===`);
    const nome = readlinesync.question("Nome do cliente: ");
    const senha = readlinesync.question("Defina uma senha: ", { hideEchoBack: true });
    const numeroConta = Math.floor(1000 + Math.random() * 9000);

    contas.push({ numero: numeroConta, nome: nome, senha: senha });
    console.log(`\nConta criada com sucesso! Número da Conta ${numeroConta}`)
}

// Função para acessar Conta.

function acessarConta(): void {
    console.log('\n=== Acessar Conta ===');
    const numero = readlinesync.questionInt('Número da conta: ');
    const senha = readlinesync.question('Senha: ', { hideEchoBack: true });
    const conta = contas.find(c => c.numero === numero && c.senha === senha);

    if (conta) {
        console.log(`\nBem-vindo(a), ${conta.nome}!`);
    } else {
        console.log('\nConta não encontrada ou senha incorreta.');
    }
}

// Funções ainda não implementadas.
function atualizarDadosDaConta() {
    console.log("\n[!] Função ainda não implementada.");
}
function saldoExtrato() {
    console.log("\n[!] Função ainda não implementada.");
}
function transferencia() {
    console.log("\n[!] Função ainda não implementada.");
}
function sacar() {
    console.log("\n[!] Função ainda não implementada.");
}
function pagamentos() {
    console.log("\n[!] Função ainda não implementada.");
}
function investimento() {
    console.log("\n[!] Função ainda não implementada.");
}
function informacoesDaConta() {
    console.log("\n[!] Função ainda não implementada.");
}


// Executa se for chamado diretamente.

if (require.main === module) {
 
}



// Função com os dados da pessoa desenvolvedora.
function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: Daliane Rabelo");
    console.log("Daliane Rabelo - daliane.rabelo01@gmail.com");
    console.log("https://github.com/dxrabelo");
    console.log("*****************************************************");
}

main();

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

main();


