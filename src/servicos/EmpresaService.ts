import Empresa from "../modelo/empresa";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import Pet from "../modelo/pet";
import CPF from "../modelo/cpf";
import RG from "../modelo/rg";
import Telefone from "../modelo/telefone";


class EmpresaService {
    private empresa: Empresa;

    constructor() {
        this.empresa = new Empresa();

        this.cadastrarClienteComDados = this.cadastrarClienteComDados.bind(this);
        this.atualizarCliente = this.atualizarCliente.bind(this);
        this.excluirCliente = this.excluirCliente.bind(this);

        this.cadastrarPet = this.cadastrarPet.bind(this);
        this.atualizarPet = this.atualizarPet.bind(this);
        this.excluirPet = this.excluirPet.bind(this);

        this.cadastrarProduto = this.cadastrarProduto.bind(this);
        this.atualizarProduto = this.atualizarProduto.bind(this);
        this.excluirProduto = this.excluirProduto.bind(this);

        this.cadastrarServico = this.cadastrarServico.bind(this);
        this.atualizarServico = this.atualizarServico.bind(this);
        this.excluirServico = this.excluirServico.bind(this);

        this.registrarConsumo = this.registrarConsumo.bind(this);

        this.getRelatorioTop10ClientesPorQuantidade = this.getRelatorioTop10ClientesPorQuantidade.bind(this);
        this.getRelatorioTop5ClientesPorValor = this.getRelatorioTop5ClientesPorValor.bind(this);
        this.getRelatorioProdutosServicosMaisConsumidos = this.getRelatorioProdutosServicosMaisConsumidos.bind(this);
        this.getRelatorioConsumoPorTipoRaca = this.getRelatorioConsumoPorTipoRaca.bind(this);
        this.getRelatorioConsumoPorTipo = this.getRelatorioConsumoPorTipo.bind(this);

        this.popularDadosIniciais();
    }

    getClientes(): Cliente[] {
        return this.empresa.getClientes;
    }

    getProdutos(): Produto[] {
        return this.empresa.getProdutos;
    }

    getServicos(): Servico[] {
        return this.empresa.getServicos;
    }


    cadastrarClienteComDados(nome: string, nomeSocial: string, cpfValor: string, dataEmissaoString: string): void {
        const partesData = dataEmissaoString.split('/');
        const ano = new Number(partesData[2]).valueOf();
        const mes = new Number(partesData[1]).valueOf() - 1;
        const dia = new Number(partesData[0]).valueOf();
        const dataEmissao = new Date(ano, mes, dia);

        const cpf = new CPF(cpfValor, dataEmissao);
        const cliente = new Cliente(nome, nomeSocial, cpf);
        this.empresa.getClientes.push(cliente);
        console.log(`Cliente ${nome} cadastrado com sucesso!`);
    }

    atualizarCliente(cpfCliente: string, novoNome: string, novoNomeSocial: string): void {
        const clienteParaAtualizar = this.empresa.getClientes.find(c => c.getCpf.getValor === cpfCliente);
        if (clienteParaAtualizar) {
            if (novoNome) clienteParaAtualizar.nome = novoNome;
            if (novoNomeSocial) clienteParaAtualizar.nomeSocial = novoNomeSocial;
            console.log("Cliente atualizado via GUI:", clienteParaAtualizar);
        } else {
            console.warn("Cliente não encontrado para atualização:", cpfCliente);
        }
    }

    excluirCliente(cpfCliente: string): void {
        const index = this.empresa.getClientes.findIndex(c => c.getCpf.getValor === cpfCliente);
        if (index !== -1) {
            this.empresa.getClientes.splice(index, 1);
            console.log("Cliente excluído via GUI:", cpfCliente);
        } else {
            console.warn("Cliente não encontrado para exclusão:", cpfCliente);
        }
    }

    // Pets
    cadastrarPet(cpfCliente: string, nome: string, tipo: string, raca: string, genero: string): void {
        const cliente = this.empresa.getClientes.find(c => c.getCpf.getValor === cpfCliente);
        if (cliente) {
            const pet = new Pet(nome, raca, genero, tipo);
            cliente.getPets.push(pet);
            console.log(`Pet ${nome} cadastrado para o cliente ${cliente.nome}`);
        } else {
            console.warn(`Cliente com CPF ${cpfCliente} não encontrado para cadastrar pet.`);
        }
    }

    atualizarPet(cpfClienteOriginal: string, nomePetOriginal: string, novoNome: string, novoTipo: string, novaRaca: string, novoGenero: string): void {
        const cliente = this.empresa.getClientes.find(c => c.getCpf.getValor === cpfClienteOriginal);
        if (cliente) {
            const pet = cliente.getPets.find(p => p.getNome === nomePetOriginal);
            if (pet) {
                if (novoNome) pet.setNome(novoNome);
                if (novoTipo) pet.setTipo(novoTipo);
                if (novaRaca) pet.setRaca(novaRaca);
                if (novoGenero) pet.setGenero(novoGenero);
                console.log(`Pet ${nomePetOriginal} do cliente ${cliente.nome} atualizado.`);
            } else {
                console.warn(`Pet ${nomePetOriginal} não encontrado para o cliente ${cliente.nome}.`);
            }
        } else {
            console.warn(`Cliente com CPF ${cpfClienteOriginal} não encontrado para atualizar pet.`);
        }
    }

    excluirPet(cpfCliente: string, nomePet: string): void {
        const cliente = this.empresa.getClientes.find(c => c.getCpf.getValor === cpfCliente);
        if (cliente) {
            const index = cliente.getPets.findIndex(p => p.getNome === nomePet);
            if (index !== -1) {
                cliente.getPets.splice(index, 1);
                console.log(`Pet ${nomePet} do cliente ${cliente.nome} excluído.`);
            } else {
                console.warn(`Pet ${nomePet} não encontrado para o cliente ${cliente.nome}.`);
            }
        } else {
            console.warn(`Cliente com CPF ${cpfCliente} não encontrado para excluir pet.`);
        }
    }

    // Produtos
    cadastrarProduto(nome: string, valor: number, descricao: string): void {
        const produto = new Produto(nome, valor, descricao);
        this.empresa.getProdutos.push(produto);
        console.log(`Produto ${nome} cadastrado.`);
    }

    atualizarProduto(nomeProdutoOriginal: string, novoNome: string, novoValor: number, novaDescricao: string): void {
        const produto = this.empresa.getProdutos.find(p => p.getNome === nomeProdutoOriginal);
        if (produto) {
            if (novoNome) produto.setNome(novoNome);
            if (novoValor !== undefined && novoValor !== null) produto.setValor(novoValor);
            if (novaDescricao) produto.setDescricao(novaDescricao);
            console.log(`Produto ${nomeProdutoOriginal} atualizado.`);
        } else {
            console.warn(`Produto ${nomeProdutoOriginal} não encontrado para atualização.`);
        }
    }

    excluirProduto(nomeProduto: string): void {
        const index = this.empresa.getProdutos.findIndex(p => p.getNome === nomeProduto);
        if (index !== -1) {
            this.empresa.getProdutos.splice(index, 1);
            console.log(`Produto ${nomeProduto} excluído.`);
        } else {
            console.warn(`Produto ${nomeProduto} não encontrado para exclusão.`);
        }
    }

    // Serviços
    cadastrarServico(nome: string, valor: number, descricao: string): void {
        const servico = new Servico(nome, valor, descricao);
        this.empresa.getServicos.push(servico);
        console.log(`Serviço ${nome} cadastrado.`);
    }

    atualizarServico(nomeServicoOriginal: string, novoNome: string, novoValor: number, novaDescricao: string): void {
        const servico = this.empresa.getServicos.find(s => s.getNome === nomeServicoOriginal);
        if (servico) {
            if (novoNome) servico.setNome(novoNome);
            if (novoValor !== undefined && novoValor !== null) servico.setValor(novoValor);
            if (novaDescricao) servico.setDescricao(novaDescricao);
            console.log(`Serviço ${nomeServicoOriginal} atualizado.`);
        } else {
            console.warn(`Serviço ${nomeServicoOriginal} não encontrado para atualização.`);
        }
    }

    excluirServico(nomeServico: string): void {
        const index = this.empresa.getServicos.findIndex(s => s.getNome === nomeServico);
        if (index !== -1) {
            this.empresa.getServicos.splice(index, 1);
            console.log(`Serviço ${nomeServico} excluído.`);
        } else {
            console.warn(`Serviço ${nomeServico} não encontrado para exclusão.`);
        }
    }

    // Registro de Consumo
    registrarConsumo(cpfCliente: string, nomeItem: string, tipoItem: 'produto' | 'servico'): void {
        const cliente = this.empresa.getClientes.find(c => c.getCpf.getValor === cpfCliente);
        if (cliente) {
            if (tipoItem === 'produto') {
                const produto = this.empresa.getProdutos.find(p => p.getNome === nomeItem);
                if (produto) {
                    cliente.getProdutosConsumidos.push(produto);
                    console.log(`Produto ${nomeItem} registrado para ${cliente.nome}`);
                } else {
                    console.warn(`Produto ${nomeItem} não encontrado.`);
                }
            } else if (tipoItem === 'servico') {
                const servico = this.empresa.getServicos.find(s => s.getNome === nomeItem);
                if (servico) {
                    cliente.getServicosConsumidos.push(servico);
                    console.log(`Serviço ${nomeItem} registrado para ${cliente.nome}`);
                } else {
                    console.warn(`Serviço ${nomeItem} não encontrado.`);
                }
            }
        } else {
            console.warn(`Cliente com CPF ${cpfCliente} não encontrado.`);
        }
    }

    // Relatórios 
    getRelatorioTop10ClientesPorQuantidade() {
        const listaClientes: { cliente: Cliente, quantidade: number }[] = [];
        this.empresa.getClientes.forEach(cliente => {
            const produtos = cliente.getProdutosConsumidos.length;
            const servicos = cliente.getServicosConsumidos.length;
            const total = produtos + servicos;
            listaClientes.push({ cliente, quantidade: total });
        });
        const top10 = listaClientes
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, 10)
            .map((item, index) => ({
                posicao: index + 1,
                cliente: item.cliente.nome,
                quantidadeProdutos: item.cliente.getProdutosConsumidos.length,
                quantidadeServicos: item.cliente.getServicosConsumidos.length,
                total: item.quantidade
            }));
        return top10.filter(item => item.total > 0);
    }

    getRelatorioTop5ClientesPorValor() {
        const listaClientes: { cliente: Cliente, valor: number }[] = [];
        this.empresa.getClientes.forEach(cliente => {
            let valorTotal = 0;
            cliente.getProdutosConsumidos.forEach(produto => {
                valorTotal += produto.getValor;
            });
            cliente.getServicosConsumidos.forEach(servico => {
                valorTotal += servico.getValor;
            });
            listaClientes.push({ cliente, valor: valorTotal });
        });
        const top5 = listaClientes
            .sort((a, b) => b.valor - a.valor)
            .slice(0, 5)
            .map((item, index) => ({
                posicao: index + 1,
                cliente: item.cliente.nome,
                valorTotal: item.valor
            }));
        return top5.filter(item => item.valorTotal > 0);
    }

    getRelatorioProdutosServicosMaisConsumidos() {
        const contagem: { [key: string]: { nome: string, tipo: 'Produto' | 'Serviço', quantidade: number } } = {};

        this.empresa.getProdutos.forEach(p => {
            contagem[`Produto-${p.getNome}`] = { nome: p.getNome, tipo: 'Produto', quantidade: 0 };
        });
        this.empresa.getServicos.forEach(s => {
            contagem[`Serviço-${s.getNome}`] = { nome: s.getNome, tipo: 'Serviço', quantidade: 0 };
        });

        this.empresa.getClientes.forEach(cliente => {
            cliente.getProdutosConsumidos.forEach(produto => {
                const key = `Produto-${produto.getNome}`;
                if (contagem[key]) {
                    contagem[key].quantidade++;
                }
            });
            cliente.getServicosConsumidos.forEach(servico => {
                const key = `Serviço-${servico.getNome}`;
                if (contagem[key]) {
                    contagem[key].quantidade++;
                }
            });
        });
        const ranking = Object.values(contagem)
            .filter(item => item.quantidade > 0)
            .sort((a, b) => b.quantidade - a.quantidade);
        return ranking;
    }

    getRelatorioConsumoPorTipoRaca() {
        const resultados: { tipoRaca: string, nome: string, tipo: 'Produto' | 'Serviço', quantidade: number }[] = [];
        console.log("[Relatório Tipo/Raça] Iniciando geração do relatório...");

        this.empresa.getClientes.forEach(cliente => {
            console.log(`[Relatório Tipo/Raça] Processando cliente: ${cliente.nome} (${cliente.getCpf.getValor})`);
            cliente.getPets.forEach(pet => {
                const tipo = pet.getTipo;
                const raca = pet.getRaca;
                
                console.log(`  [Relatório Tipo/Raça] Pet: ${pet.getNome}, Tipo: '${tipo}', Raça: '${raca}'`);

                if (!tipo || !raca || tipo.trim() === '' || raca.trim() === '') {
                    console.warn(`[Relatório Tipo/Raça] Pulando Pet com tipo/raça indefinidos/vazios para cliente ${cliente.nome}: ${pet.getNome}`);
                    return; 
                }

                const tipoRaca = `${tipo} - ${raca}`;

                cliente.getProdutosConsumidos.forEach(produto => {
                    let encontrado = resultados.find(r => r.tipoRaca === tipoRaca && r.nome === produto.getNome && r.tipo === 'Produto');
                    if (encontrado) {
                        encontrado.quantidade++;
                    } else {
                        resultados.push({ tipoRaca, nome: produto.getNome, tipo: 'Produto', quantidade: 1 });
                    }
                    console.log(`    [Relatório Tipo/Raça] Consumo de Produto: ${produto.getNome} para ${tipoRaca}`);
                });
                cliente.getServicosConsumidos.forEach(servico => {
                    let encontrado = resultados.find(r => r.tipoRaca === tipoRaca && r.nome === servico.getNome && r.tipo === 'Serviço');
                    if (encontrado) {
                        encontrado.quantidade++;
                    } else {
                        resultados.push({ tipoRaca, nome: servico.getNome, tipo: 'Serviço', quantidade: 1 });
                    }
                    console.log(`    [Relatório Tipo/Raça] Consumo de Serviço: ${servico.getNome} para ${tipoRaca}`);
                });
            });
        });
        
        console.log("[Relatório Tipo/Raça] Resultados brutos:", resultados);

        const grupos: { [key: string]: { tipoRaca: string, nome: string, tipo: 'Produto' | 'Serviço', quantidade: number }[] } = {};
        resultados.forEach(item => {
            if (!grupos[item.tipoRaca]) grupos[item.tipoRaca] = [];
            grupos[item.tipoRaca].push(item);
        });
        
        console.log("[Relatório Tipo/Raça] Grupos formados:", grupos);

        const relatorioFinal: any[] = [];
        Object.keys(grupos).sort().forEach(tipoRaca => {
            grupos[tipoRaca].sort((a, b) => b.quantidade - a.quantidade).forEach(item => {
                relatorioFinal.push(item);
            });
        });
        
        console.log("[Relatório Tipo/Raça] Relatório final (ordenado):", relatorioFinal);
        return relatorioFinal;
    }

    getRelatorioConsumoPorTipo() {
        const resultados: { tipoPet: string, nomeItem: string, tipoItem: 'Produto' | 'Serviço', quantidade: number }[] = [];
        console.log("[Relatório Tipo] Iniciando geração do relatório...");

        this.empresa.getClientes.forEach(cliente => {
            console.log(`[Relatório Tipo] Processando cliente: ${cliente.nome} (${cliente.getCpf.getValor})`);
            cliente.getPets.forEach(pet => {
                const tipoPet = pet.getTipo;
                
                console.log(`  [Relatório Tipo] Pet: ${pet.getNome}, Tipo: '${tipoPet}'`);

                if (!tipoPet || tipoPet.trim() === '') {
                    console.warn(`[Relatório Tipo] Pulando Pet com tipo indefinido/vazio para cliente ${cliente.nome}: ${pet.getNome}`);
                    return; 
                }

                cliente.getProdutosConsumidos.forEach(produto => {
                    let encontrado = resultados.find(r => r.tipoPet === tipoPet && r.nomeItem === produto.getNome && r.tipoItem === 'Produto');
                    if (encontrado) {
                        encontrado.quantidade++;
                    } else {
                        resultados.push({ tipoPet, nomeItem: produto.getNome, tipoItem: 'Produto', quantidade: 1 });
                    }
                    console.log(`    [Relatório Tipo] Consumo de Produto: ${produto.getNome} para ${tipoPet}`);
                });
                cliente.getServicosConsumidos.forEach(servico => {
                    let encontrado = resultados.find(r => r.tipoPet === tipoPet && r.nomeItem === servico.getNome && r.tipoItem === 'Serviço');
                    if (encontrado) {
                        encontrado.quantidade++;
                    } else {
                        resultados.push({ tipoPet, nomeItem: servico.getNome, tipoItem: 'Serviço', quantidade: 1 });
                    }
                    console.log(`    [Relatório Tipo] Consumo de Serviço: ${servico.getNome} para ${tipoPet}`);
                });
            });
        });

        console.log("[Relatório Tipo] Resultados brutos:", resultados);

        const grupos: { [key: string]: { tipoPet: string, nomeItem: string, tipoItem: 'Produto' | 'Serviço', quantidade: number }[] } = {};
        resultados.forEach(item => {
            if (!grupos[item.tipoPet]) grupos[item.tipoPet] = [];
            grupos[item.tipoPet].push(item);
        });
        
        console.log("[Relatório Tipo] Grupos formados:", grupos);

        const relatorioFinal: any[] = [];
        Object.keys(grupos).sort().forEach(tipoPet => {
            grupos[tipoPet].sort((a, b) => b.quantidade - a.quantidade).forEach(item => {
                relatorioFinal.push(item);
            });
        });
        
        console.log("[Relatório Tipo] Relatório final (ordenado):", relatorioFinal);
        return relatorioFinal;
    }


    //Dados Iniciais para Teste
    private popularDadosIniciais(): void {
        const cpf1 = new CPF("123.456.789-00", new Date(2020, 0, 1));
        const cliente1 = new Cliente("João da Silva", "João", cpf1);
        this.empresa.getClientes.push(cliente1);

        const cpf2 = new CPF("987.654.321-00", new Date(2021, 5, 15));
        const cliente2 = new Cliente("Maria Souza", "Maria", cpf2);
        this.empresa.getClientes.push(cliente2);

        const pet1 = new Pet("Rex", "Labrador", "Macho", "Cachorro");
        cliente1.getPets.push(pet1);
        const pet2 = new Pet("Mia", "Persa", "Fêmea", "Gato");
        cliente2.getPets.push(pet2);
        const pet3 = new Pet("Buddy", "Poodle", "Macho", "Cachorro");
        cliente1.getPets.push(pet3);


        const prod1 = new Produto("Ração Premium", 75.50, "Ração de alta qualidade para cães");
        this.empresa.getProdutos.push(prod1);
        const prod2 = new Produto("Brinquedo Mordedor", 25.00, "Brinquedo para cachorros");
        this.empresa.getProdutos.push(prod2);
        const prod3 = new Produto("Coleira Anti-pulgas", 50.00, "Coleira para prevenir pulgas");
        this.empresa.getProdutos.push(prod3);


        const serv1 = new Servico("Banho e Tosa", 80.00, "Serviço completo de higiene");
        this.empresa.getServicos.push(serv1);
        const serv2 = new Servico("Consulta Veterinária", 120.00, "Atendimento médico para pets");
        this.empresa.getServicos.push(serv2);
        const serv3 = new Servico("Vacinação", 90.00, "Aplicação de vacinas");
        this.empresa.getServicos.push(serv3);


        cliente1.getProdutosConsumidos.push(prod1); 
        cliente1.getProdutosConsumidos.push(prod2); 
        cliente1.getServicosConsumidos.push(serv1); 
        cliente1.getServicosConsumidos.push(serv3); 

        cliente2.getProdutosConsumidos.push(prod1); 
        cliente2.getServicosConsumidos.push(serv2); 
        cliente2.getServicosConsumidos.push(serv2); 

        console.log("Dados iniciais populados.");
    }
}

const empresaService = new EmpresaService();
export default empresaService;
