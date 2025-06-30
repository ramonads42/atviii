import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Cliente from '../../modelo/cliente';

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    cliente: Cliente; 
    excluirCliente: (cpfCliente: string) => void;
    atualizarDados: () => void;
};

export default function ConfirmacaoExclusaoCliente(props: Props) {
    const handleExcluir = (event: React.MouseEvent) => {
        event.preventDefault();
        if (!props.cliente) {
            console.warn("Nenhum cliente selecionado para exclusão.");
            return;
        }

        const cpfCliente = props.cliente.getCpf.getValor;
        const nomeCliente = props.cliente.nome;

        props.excluirCliente(cpfCliente);
        props.atualizarDados();

        props.seletorView('Clientes', event);
    };

    const { tema, seletorView, cliente } = props;

    if (!cliente) {
        return (
            <div className="container-fluid">
                <h2>Excluir Cliente</h2>
                <p className="alert alert-warning">Nenhum cliente selecionado para exclusão. Por favor, volte para a lista de clientes e selecione um.</p>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Clientes', e)}>Voltar</button>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2>Confirmar Exclusão de Cliente</h2>
            <div className="alert alert-warning" role="alert">
                Você tem certeza que deseja excluir o cliente: <strong>{cliente.nome}</strong> (CPF: {cliente.getCpf.getValor})?
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
                onClick={(e) => seletorView('Clientes', e)}
            >
                Cancelar
            </button>
        </div>
    );
}
