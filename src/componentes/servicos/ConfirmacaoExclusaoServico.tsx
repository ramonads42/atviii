import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Servico from '../../modelo/servico';

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    servico: Servico; // O serviço a ser excluído será passado via props
    excluirServico: (nomeServico: string) => void; // Função de exclusão do service
    atualizarDados: () => void; // Para notificar o Roteador sobre a mudança
};

export default function ConfirmacaoExclusaoServico(props: Props) {
    const handleExcluir = (event: React.MouseEvent) => {
        event.preventDefault();
        if (!props.servico) {
            // Em vez de alert(), usar um feedback na tela
            console.warn("Nenhum serviço selecionado para exclusão.");
            return;
        }

        const nomeServico = props.servico.getNome;

        // Chamada ao método do EmpresaService
        props.excluirServico(nomeServico);

        // Notificar o Roteador para atualizar os dados globais
        props.atualizarDados();

        // alert(`Serviço "${nomeServico}" excluído com sucesso!`); // Substituir por feedback na UI
        props.seletorView('Serviços', event); // Voltar para a lista de serviços
    };

    const { tema, seletorView, servico } = props;

    if (!servico) {
        return (
            <div className="container-fluid">
                <h2>Excluir Serviço</h2>
                <p className="alert alert-warning">Nenhum serviço selecionado para exclusão. Por favor, volte para a lista de serviços e selecione um.</p>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Serviços', e)}>Voltar</button>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2>Confirmar Exclusão de Serviço</h2>
            <div className="alert alert-warning" role="alert">
                Você tem certeza que deseja excluir o serviço: <strong>{servico.getNome}</strong> (Valor: R$ {servico.getValor.toFixed(2)}, Descrição: {servico.getDescricao})?
            </div>
            <button
                type="button"
                className="btn btn-danger me-2"
                onClick={handleExcluir}
            >
                Sim, Excluir
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={(e) => seletorView('Serviços', e)}
            >
                Cancelar
            </button>
        </div>
    );
}
