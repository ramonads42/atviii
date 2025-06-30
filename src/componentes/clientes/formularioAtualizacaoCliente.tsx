import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Cliente from '../../modelo/cliente';

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    cliente: Cliente; 
    atualizarCliente: (cpfCliente: string, novoNome: string, novoNomeSocial: string) => void;
    atualizarDados: () => void;
};

export default function FormularioAtualizacaoCliente(props: Props) {
    const [nome, setNome] = useState<string>(props.cliente ? props.cliente.nome : '');
    const [nomeSocial, setNomeSocial] = useState<string>(props.cliente ? props.cliente.nomeSocial : '');


    useEffect(() => {
        if (props.cliente) {
            setNome(props.cliente.nome);
            setNomeSocial(props.cliente.nomeSocial);
        }
    }, [props.cliente]); 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "nome") setNome(value);
        else if (name === "nomeSocial") setNomeSocial(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!props.cliente) {
            console.warn("Nenhum cliente selecionado para atualização.");
            return;
        }

        const cpfCliente = props.cliente.getCpf.getValor;

        props.atualizarCliente(cpfCliente, nome, nomeSocial);
        props.atualizarDados(); 

        props.seletorView('Clientes', event); 
    };

    const { tema, seletorView, cliente } = props;

    if (!cliente) {
        return (
            <div className="container-fluid">
                <h2>Atualizar Cliente</h2>
                <p className="alert alert-warning">Nenhum cliente selecionado para atualização. Por favor, volte para a lista de clientes e selecione um.</p>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Clientes', e)}>Voltar</button>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2>Atualizar Cliente: {cliente.nome}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        value={nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="nomeSocial" className="form-label">Nome Social</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nomeSocial"
                        name="nomeSocial"
                        value={nomeSocial}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpf" className="form-label">CPF (Não Editável)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cpf"
                        name="cpf"
                        value={cliente.getCpf.getValor}
                        readOnly
                        disabled
                    />
                </div>
                <button type="submit" className="btn btn-primary me-2">Atualizar</button>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Clientes', e)}>Cancelar</button>
            </form>
        </div>
    );
}
