import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { useNavigate, Navigate } from "react-router-dom";
import { addItem } from "../firebase/itens";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";

function NovoItem() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const user =  useContext(UsuarioContext);

    const navigate = useNavigate();

    function salvarItem(data) {
        data.idUsuario = user.uid;

        addItem(data)
        .then(() => {
            toast.success("Item adicionado com sucesso!");
            navigate("/listas");
        }).catch(() => {
            toast.error("Um erro acontece ao adicionar tarefa!");
        });
    }

    if (user === null) {
        return <Navigate to="/login"/>
    }

    return (
        <main>
            <form className="form-section" onSubmit={handleSubmit(salvarItem)}>
                <h1>Adicionar Item</h1>
                <div>
                    <label htmlFor="lista">Lista</label>
                    <input type="text" id="lista" className="form-control" {...register("lista", { required: true, maxLength: 200 })} />
                    {errors.titulo && <small className="text-danger">Campo inválido!</small>}
                </div>
                <div>
                    <label htmlFor="item">Item</label>
                    <textarea id="item" className="form-control" {...register("item", { required: true })}></textarea>
                    {errors.item && <small className="text-danger">O item é inválido!</small>}
                </div>
                <div>
                    <label htmlFor="quantidade">Quantidade</label>
                    <input type="number" id="quantidade" className="form-control" {...register("lista", { required: true, maxLength: 200 })} />
                    {errors.quantidade && <small className="text-danger">Campo inválido!</small>}
                </div>
                <div className="form-check mt-1">
                    <input type="checkbox" id="comprado" className="form-check-input" {...register("comprado")} />
                    <label htmlFor="comprado">Comprado?</label>
                </div> 
                <Button variant="dark" className="w-100 mt-1" type="submit" >Adicionar Item</Button>
            </form>
        </main>
    )
}

export default NovoItem;