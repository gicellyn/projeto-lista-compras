import { useForm } from "react-hook-form";

function NovoItem() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const usuario 

    return (
        <main>
            <form className="form-section" onSubmit={handleSubmit()}>
                <h1>Editar tarefa</h1>
                <hr />
                <div>
                    <label htmlFor="lista">Lista</label>
                    <input type="text" id="lista" className="form-control" {...register("lista", { required: true, maxLength: 200 })} />
                    {errors.titulo && <small className="text-danger">Campo inválido!</small>}
                </div>
                <div>
                    <label htmlFor="item">Item</label>
                    <textarea id="item" className="form-control" {...register("item", { required: true })}></textarea>
                    {errors.descricao && <small className="text-danger">O item é inválido!</small>}
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