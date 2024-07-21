import { useContext, useEffect, useState } from "react";
import { Badge, Button, Card, Container } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { deletarItem, getItemsUsuario } from "../firebase/itens";
import toast from "react-hot-toast";

function Itens() {
    const [itens, setItens] = useState(null);
    const user = useContext(UsuarioContext);

    const navigate = useNavigate();

    function carregarDados() {
        if (user) {
            getItemsUsuario(user.uid).then((result) => {
                setItens(result);
            })
        }
    }

    function excluirItem(id) {
        const deletar = confirm("Deseja remover esse item?");
        if (deletar) {
            deletarItem(id)
                .then(() => {
                    toast.success("Item excluído com sucesso!");
                    carregarDados();
                })
        }
    }

    useEffect(() => {
        carregarDados()
    }, []);

    if(user === null){
        return <Navigate to="/login"/>
    }

    return (
        <main>
            <Container className="mt-5">
                <h1>Seus Itens</h1>
                <hr />
                <Link className="btn btn-dark" to="/itens/adicionar">Adicionar Item</Link>
                {itens ? <section className="mt-2 ">{itens.map((item) => {
                    return <Card key={item.id}>
                        <Card.Body>
                            <Card.Title>{item.titulo}</Card.Title>
                            <Card.Text>{item.descricao}</Card.Text>
                            <Card.Text>Quantidade: {item.quantidade}</Card.Text>
                            <div className="mb-2" >{item.comprado ? <Badge
                                bg="success">Comprado</Badge> : <Badge bg="warning">Não comprado</Badge>}
                            </div>
                            <Button variant="outline-dark" onClick={() => {
                                navigate(`/itens/editar/${item.id}`)
                            }}><span className="material-symbols-outlined">
                                    edit
                                </span></Button>
                            <Button variant="outline-danger" onClick={() => excluirItem(item.id)}><span className="material-symbols-outlined">
                                delete
                            </span></Button>
                        </Card.Body>
                    </Card>
                })}</section> : <Loader />}


            </Container>
        </main>
    )
}

export default Itens;