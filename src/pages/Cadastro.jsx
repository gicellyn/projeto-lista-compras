import { Button } from "bootstrap";
import { useForm } from "react-hook-form";

function Cadastro() {
    const [register, handleSubmit] = useForm();

    return (
        <main>
            <form className="form-section">
                <h1>Cadastro</h1>
                <hr />
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" className="form-control" {...register("nome", {required:true, maxLength:150})}/>
                    {errors.nome && <small className="invalid">Nome inválido!</small>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control" {...register("email", {required: true})}/>
                    {errors.email && <small className="invalid">Email inválido!</small>}
                </div>
                <div>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" className="form-control" {...register("senha", {required:true, minLength:6})}/>
                    {errors.senha && <small className="invalid">Senha inválida!</small>}
                </div>
                <Button variant="outline-light" className="mt-1 w-100" type="submit">Cadastrar</Button>
                <Button>Entrar com o Google</Button>
            </form>
        </main>
    )
}


export default Cadastro;