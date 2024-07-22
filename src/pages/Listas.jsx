import { useEffect, useState, useContext } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { obterItens, deletarItem } from "../firebase/listas";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";

function Listas() {
    const usuario = useContext(UsuarioContext);
    const { listaId } = useParams();
    const [itens, setItens] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (usuario) {
            obterItens(usuario.uid, listaId).then((itens) => {
                setItens(itens);
                setCarregando(false);
            }).catch(() => {
                setCarregando(false);
            });
        } else {
            navigate("/login");
        }
    }, [usuario, listaId, navigate]);

    function handleDeletar(itemId) {
        deletarItem(usuario.uid, listaId, itemId)
            .then(() => {
                setItens((prevItens) =>
                    prevItens.filter((item) => item.id !== itemId)
                );
            })
            .catch(() => {
                toast.error("Erro ao deletar item!");
            });
    }

    if (carregando) {
        return <Loader />;
    }

    if (usuario === null) {
        return <Navigate to="/login" />;
    }

    return (
        <Container>
            <h1>Itens da Lista</h1>
            <Button onClick={() => navigate(`/listas/${listaId}/adicionar`)}>Novo Item</Button>
            <ListGroup>
                {itens.map((item) => (
                    <ListGroup.Item key={item.id}>
                        <h5>{item.titulo}</h5> 
                        <p>{item.descricao}</p> 
                        <p>Quantidade: {item.quantidade}</p>
                        <Button variant="danger" onClick={() => handleDeletar(item.id)}>Excluir</Button>
                        <Button onClick={() => navigate(`/listas/${listaId}/editar/${item.id}`)}>Editar</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default Listas;