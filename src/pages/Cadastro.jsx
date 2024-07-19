import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { cadastrarUser, entrarGoogle } from "../firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Cadastro() {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const navigate = useNavigate();

    function cadastrar(data){
        cadastrarUser(data.nome, data.email, data.senha)
        .then(() => {
            toast.success(`Bem-vindo(a)! ${data.nome}`);
            navigate("/listas");
        }).catch(() => {
            toast.error("Ocorreu um erro!");
        });
    }

    function handleEntrarGoogle() {
        entrarGoogle().then(() => {
            toast.success("Bem-vindo(a)!");
            navigate("/listas");
        })
    }

    return (
        <main>
           <form className="form-section" onSubmit={handleSubmit(cadastrar)}>
                <h1 className="text-center">Cadastro</h1>
                <hr />
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" className="form-control" {...register("nome", {required:true, maxLength:150})}/>
                    {errors.nome && <small className="text-danger">Nome inválido!</small>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control" {...register("email", {required: true})}/>
                    {errors.email && <small className="text-danger">Email inválido!</small>}
                </div>
                <div>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" className="form-control" {...register("senha", { required: "A senha é obrigatória!", minLength: { value: 6, message: "A senha deve ter acima de 6 caracteres." } })} />
                    {errors.senha && <small className="text-danger">{errors.senha.message}</small>}
                </div>
                <Button variant="warning" className="mt-1 w-100" type="submit">Cadastrar</Button>
                <Button onClick={handleEntrarGoogle} variant="danger" className="mt-1 w-100" type="button">Entrar com Google</Button>
            </form>
        </main>
    )
}


export default Cadastro;