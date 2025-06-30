import Entrada from "./src/io/entrada";
import Empresa from "./src/modelo/empresa";
import CadastroCliente from "./src/negocio/cadastroCliente";
import ListagemClientes from "./src/negocio/listagemCliente";
import AtualizacaoCliente from "./src/negocio/atualizarCliente";
import ExclusaoCliente from "./src/negocio/excluirCliente";
import CadastroPet from "./src/negocio/cadastroPet";
import ListagemPets from "./src/negocio/listagemPet";
import AtualizacaoPet from "./src/negocio/atualizarPet";
import ExclusaoPet from "./src/negocio/excluirPet";
import CadastroProduto from "./src/negocio/cadastroProduto";
import ListagemProdutos from "./src/negocio/listagemProduto";
import AtualizacaoProduto from "./src/negocio/atualizarProduto";
import ExclusaoProduto from "./src/negocio/excluirProduto";
import CadastroServico from "./src/negocio/cadastroServico";
import ListagemServico from "./src/negocio/listagemServico";
import ExclusaoServico from "./src/negocio/excluirServico";
import AtualizacaoServico from "./src/negocio/atualizarServico";
import RegistroConsumo from "./src/negocio/registroConsumo";
import RelatorioClientes from "./src/relatorio/relatorioClietes";
import RelatorioProdutosServicos from "./src/relatorio/relatorioProduServ";
import RelatorioPorTipoRaca from "./src/relatorio/relatorioPets";


console.log("Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinárias");
let empresa = new Empresa();
let execucao = true;

while (execucao) {
    console.log("\nOpções:");
    console.log("1 - Gerenciar clientes");
    console.log("2 - Gerenciar pets");
    console.log("3 - Gerenciar produtos");
    console.log("4 - Gerenciar serviços");
    console.log("5 - Registrar consumo");
    console.log("6 - Relatórios");
    console.log("0 - Sair");

    let entrada = new Entrada();
    let opcao = entrada.receberNumero("Por favor, escolha uma opção: ");

    if (opcao === 1) {
        let execucaoClientes = true;
        
        while (execucaoClientes) {
            console.log("\nGerenciamento de Clientes:");
            console.log("1 - Cadastrar cliente");
            console.log("2 - Listar clientes");
            console.log("3 - Atualizar cliente");
            console.log("4 - Excluir cliente");
            console.log("0 - Voltar ao menu principal");
            
            let opcaoClientes = entrada.receberNumero("Por favor, escolha uma opção: ");
            
            if (opcaoClientes === 1) {
                let cadastro = new CadastroCliente(empresa.getClientes);
                cadastro.cadastrar();
            } 
            else if (opcaoClientes === 2) {
                let listagem = new ListagemClientes(empresa.getClientes);
                listagem.listar();
            }
            else if (opcaoClientes === 3) {
                let atualizacao = new AtualizacaoCliente(empresa.getClientes);
                atualizacao.atualizar();
            }
            else if (opcaoClientes === 4) {
                let exclusao = new ExclusaoCliente(empresa.getClientes);
                exclusao.excluir();
            }
            else if (opcaoClientes === 0) {
                execucaoClientes = false;
            }
            else {
                console.log("\nOperação não entendida :(");
            }
        }
    }
    else if (opcao === 2) {
        // Menu de pets
        let execucaoPets = true;
        
        while (execucaoPets) {
            console.log("\nGerenciamento de Pets:");
            console.log("1 - Cadastrar pet");
            console.log("2 - Listar pets");
            console.log("3 - Atualizar pet (em desenvolvimento)");
            console.log("4 - Excluir pet (em desenvolvimento)");
            console.log("0 - Voltar ao menu principal");
            
            let opcaoPets = entrada.receberNumero("Por favor, escolha uma opção: ");
            
            if (opcaoPets === 1) {
                let cadastro = new CadastroPet(empresa.getClientes);
                cadastro.cadastrar();
            }
            else if (opcaoPets === 2) {
                let listagem = new ListagemPets(empresa.getClientes);
                listagem.listar();
            }
            else if (opcaoPets === 3) {
                let atualizacao = new AtualizacaoPet(empresa.getClientes);
                atualizacao.atualizar();
            }
            else if (opcaoPets === 4) {
                let exclusao = new ExclusaoPet(empresa.getClientes);
                exclusao.excluir();
            }
            else if (opcaoPets === 0) {
                execucaoPets = false;
            }
            else {
                console.log("\nOperação não entendida :(");
            }
        }
    }
    else if (opcao === 3) {
        // Menu de produtos
        let execucaoProdutos = true;
        while (execucaoProdutos) {
            console.log("\nGerenciamento de Produtos:");
            console.log("1 - Cadastrar produto");
            console.log("2 - Listar produtos");
            console.log("3 - Atualizar produto");
            console.log("4 - Excluir produto");
            console.log("0 - Voltar ao menu principal");
            
            let opcaoProdutos = entrada.receberNumero("Por favor, escolha uma opção: ");
            
            if (opcaoProdutos === 1) {
                let cadastro = new CadastroProduto(empresa.getProdutos);
                cadastro.cadastrar();
            }
            else if (opcaoProdutos === 2) {
                let listagem = new ListagemProdutos(empresa.getProdutos);
                listagem.listar();
            }
            else if (opcaoProdutos === 3) {
                let atualizacao = new AtualizacaoProduto(empresa.getProdutos);
                atualizacao.atualizar();
            }
            else if (opcaoProdutos === 4) {
                let exclusao = new ExclusaoProduto(empresa.getProdutos);
                exclusao.excluir();
            }
            else if (opcaoProdutos === 0) {
                execucaoProdutos = false;
            }
            else {
                console.log("\nOperação não entendida :(");
            }
        }
    }
    else if (opcao === 4) {
        // Menu de serviços
        let execucaoServicos = true;
        while (execucaoServicos) {
            console.log("\nGerenciamento de Serviços:");
            console.log("1 - Cadastrar serviço");
            console.log("2 - Listar serviços");
            console.log("3 - Atualizar serviço (em desenvolvimento)");
            console.log("4 - Excluir serviço");
            console.log("0 - Voltar ao menu principal");
            
            let opcaoServicos = entrada.receberNumero("Por favor, escolha uma opção: ");
            
            if (opcaoServicos === 1) {
                let cadastro = new CadastroServico(empresa.getServicos);
                cadastro.cadastrar();
            }
            else if (opcaoServicos === 2) {
                let listagem = new ListagemServico(empresa.getServicos);
                listagem.listar();
            }
            else if (opcaoServicos === 3) {
                let atualizacao = new AtualizacaoServico(empresa.getServicos);
                atualizacao.atualizar();
            }
            else if (opcaoServicos === 4) {
                let exclusao = new ExclusaoServico(empresa.getServicos);
                exclusao.excluir();
            }
            else if (opcaoServicos === 0) {
                execucaoServicos = false;
            }
            else {
                console.log("\nOperação não entendida :(");
            }
        }
    }
    else if (opcao === 5) {
        let registro = new RegistroConsumo(empresa.getClientes, empresa.getProdutos, empresa.getServicos);
        registro.registrar();
    }
    else if (opcao === 6) {
        // Menu de relatórios
        let continuarRelatorios = true;
        
        while (continuarRelatorios) {
            console.log("\n=== RELATÓRIOS ===");
            console.log("1 - Top 10 clientes que mais consumiram (por quantidade)");
            console.log("2 - Top 5 clientes que mais consumiram (por valor)");
            console.log("3 - Produtos e serviços mais consumidos (geral)");
            console.log("4 - Consumo por tipo e raça de pets");
            console.log("5 - Consumo por tipo de pet");
            console.log("0 - Voltar ao menu principal");
            
            let opcaoRelatorio = entrada.receberNumero("Escolha uma opção: ");
            
            if (opcaoRelatorio === 1) {
                // Top 10 clientes por quantidade
                let relatorioClientes = new RelatorioClientes(empresa.getClientes);
                relatorioClientes.gerarTop10ClientesPorQuantidade();
                
            } else if (opcaoRelatorio === 2) {
                // Top 5 clientes por valor
                let relatorioClientes = new RelatorioClientes(empresa.getClientes);
                relatorioClientes.gerarTop5ClientesPorValor();
                
            } else if (opcaoRelatorio === 3) {
                // Produtos e serviços mais consumidos
                let relatorioProdServ = new RelatorioProdutosServicos(
                    empresa.getClientes, 
                    empresa.getProdutos, 
                    empresa.getServicos
                );
                relatorioProdServ.gerarRelatorioGeralMaisConsumidos();
                
            } else if (opcaoRelatorio === 4) {
                // Consumo por tipo e raça
                let relatorioPorTipoRaca = new RelatorioPorTipoRaca(
                    empresa.getClientes, 
                    empresa.getProdutos, 
                    empresa.getServicos
                );
                relatorioPorTipoRaca.gerarRelatorioPorTipoRaca();
                
            } else if (opcaoRelatorio === 5) {
                // Consumo por tipo
                let relatorioPorTipoRaca = new RelatorioPorTipoRaca(
                    empresa.getClientes, 
                    empresa.getProdutos, 
                    empresa.getServicos
                );
                relatorioPorTipoRaca.gerarRelatorioPorTipo();
                
            } else if (opcaoRelatorio === 0) {
                continuarRelatorios = false;
                
            } else {
                console.log("\nOpção inválida! Tente novamente.");
            }
        }
    }
    else if (opcao === 0) {
        execucao = false;
        console.log("\nAté mais!");
    }
    else {
        console.log("\nOperação não entendida :(");
    }
}