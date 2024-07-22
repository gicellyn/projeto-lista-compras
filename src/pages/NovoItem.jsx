import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { addItem } from "../firebase/itens";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";

function NovoItem() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const user = useContext(UsuarioContext);
    const navigate = useNavigate();
    const { listaId } = useParams(); 

    const salvarItem = (data) => {
        data.idUsuario = user.uid;

        addItem(user.uid, listaId, data)
            .then(() => {
                toast.success("Item adicionado com sucesso!");
                navigate(`/listas/${listaId}`);
            })
            .catch(() => {
                toast.error("Erro ao adicionar item!");
            });
    };

    if (user === null) {
        return <Navigate to="/login" />;
    }

    return (
        <main>
            <form className="form-section" onSubmit={handleSubmit(salvarItem)}>
                <h1>Adicionar Item</h1>
                <div>
                    <label htmlFor="titulo">Título</label>
                    <input type="text" id="titulo" className="form-control" {...register("titulo", { required: true, maxLength: 200 })} />
                    {errors.titulo && <small className="text-danger">O título é inválido!</small>}
                </div>
                <div>
                    <label htmlFor="descricao">Descrição</label>
                    <textarea id="descricao" className="form-control" {...register("descricao")}></textarea>
                </div>
                <div>
                    <label htmlFor="quantidade">Quantidade</label>
                    <input type="number" id="quantidade" className="form-control" {...register("quantidade", { required: true, maxLength: 200 })} />
                    {errors.quantidade && <small className="text-danger">Campo inválido!</small>}
                </div>
                <div className="form-check mt-1">
                    <input type="checkbox" id="comprado" className="form-check-input" {...register("comprado")} />
                    <label htmlFor="comprado">Comprado?</label>
                </div>   
                <Button variant="warning" className="w-100 mt-1" type="submit" >Adicionar Item</Button>
            </form>
        </main>
    );
}

export default NovoItem;
