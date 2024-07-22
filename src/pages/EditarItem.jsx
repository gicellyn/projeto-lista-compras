import { useForm } from "react-hook-form";
import { getItem, updateItem } from "../firebase/itens";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useEffect } from "react";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { Button } from "react-bootstrap";

function EditarItem() {
    const { listaId, itemId } = useParams();
    const user = useContext(UsuarioContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();


    const carregarItem = async () => {
        try {
            if (user) {
                const item = await getItem(user.uid, listaId, itemId); 
                if (item) {
                    reset(item); 
                } else {
                    navigate("/notfound"); 
                }
            } else {
                navigate("/login"); 
            }
        } catch (error) {
            console.error("Erro ao carregar item:", error);
            navigate("/notfound"); 
        }
    };


    const atualizarItem = async (data) => {
        try {
            if (user) {
                await updateItem(user.uid, listaId, itemId, data);
                toast.success("Item modificado com sucesso!");
                navigate(`/listas/${listaId}`); 
            } else {
                navigate("/login");
            }
        } catch (error) {
            toast.error("Erro ao atualizar item!");
        }
    };

    useEffect(() => {
        carregarItem(); 
    }, [user, itemId, listaId, navigate]);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <main>
            <form className="form-section" onSubmit={handleSubmit(atualizarItem)}>
                <h1 className="text-center">Editar Item</h1>
                <hr />
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
                <Button variant="warning" className="w-100 mt-1" type="submit" >Atualizar Item</Button>
            </form>
        </main>
    );
}

export default EditarItem;