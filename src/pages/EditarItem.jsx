import { useForm } from "react-hook-form";
import { getItem, updateItem } from "../firebase/itens";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useEffect } from "react";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { Button } from "react-bootstrap";


function EditarItem() {
    const { id } = useParams();
    const user = useContext(UsuarioContext);
    const { register, handleSubmit, formState: { errors }, reset} = useForm();

    const navigate = useNavigate();

    function carregarItem() {
        getItem(id).then((item) => {
            if (item) {
                reset(item);
            } else {
                navigate("/listas");
            }
        })
    }

    function atualizarItem(data) {
        updateItem(id, data).then(() => {
            toast.success("Item modificado com sucesso!");
            navigate("/listas");
        })
    }

    useEffect(() => {
        carregarItem();
    }, []);

    if (user === null) {
        return <Navigate to="/login"/>
    }

    return (
        <main>
            <form className="form-section" onSubmit={handleSubmit(atualizarItem)}>
                <h1>Editar tarefa</h1>
                <hr />
                <div>
                    <label htmlFor="titulo">Titulo</label>
                    <input type="text" id="titulo" className="form-control" {...register("titulo", { required: true, maxLength: 200 })} />
                    {errors.titulo && <small className="invalid">O título é inválido!</small>}
                </div>
                <div>
                    <label htmlFor="item">Item</label>
                    <textarea id="item" className="form-control" {...register("item", { required: true })}></textarea>
                    {errors.descricao && <small className="invalid">O item é inválido!</small>}
                </div>
                <div className="form-check mt-1">
                    <input type="checkbox" id="comprado" className="form-check-input" {...register("comprado")} />
                    <label htmlFor="comprado">Comprado?</label>
                </div>      
                <Button variant="dark" className="w-100 mt-1" type="submit" >Atualizar Tarefa</Button>
            </form>
        </main>
    );
}

export default EditarItem;