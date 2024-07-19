import { useForm } from "react-hook-form";
import { updateItem } from "../firebase/itens";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";


function EditarItem() {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }} = useForm();

    function atualizarItem(data) {
        updateItem(id, data).then((item) => {
            toast.success
        })
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
                    <label htmlFor="descricao">Descrição</label>
                    <textarea id="descricao" className="form-control" {...register("descricao", { required: true })}></textarea>
                    {errors.descricao && <small className="invalid">A descrição é inválida!</small>}
                </div>
                <div>
                    <label htmlFor="dataConclusao">Data</label>
                    <input type="date" className="form-control" {...register("dataConclusao")} />
                </div>
                <div className="form-check mt-1">
                    <input type="checkbox" id="concluido" className="form-check-input" {...register("concluido")} />
                    <label htmlFor="concluido">Concluído?</label>
                </div>
                <div>
                    <label htmlFor="categoria" >Categoria</label>
                    <select id="categoria" className="form-select" {...register("categoria", { required: true })}>
                        <option value="Trabalho">Trabalho</option>
                        <option value="Estudos">Estudos</option>
                        <option value="Projetos">Projetos</option>
                        <option value="Lazer">Lazer</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>
                <Button variant="dark" className="w-100 mt-1" type="submit" >Atualizar Tarefa</Button>
            </form>
        </main>
    );
}

export default EditarItem;