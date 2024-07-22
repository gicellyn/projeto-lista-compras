import { useEffect, useState, useContext } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { obterItens, deletarItem, obterNomeLista } from "../firebase/listas"; 
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

function Listas() {
    const usuario = useContext(UsuarioContext);
    const { listaId } = useParams();
    const [itens, setItens] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [nomeLista, setNomeLista] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (usuario) {
            obterNomeLista(usuario.uid, listaId).then((nome) => {
                setNomeLista(nome);
            }).catch((error) => {
                toast.error("Erro ao obter nome da lista");
            });

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
            <h1>Itens da Lista: {nomeLista}</h1> {/* Exiba o nome da lista aqui */}
            <Button onClick={() => navigate(`/listas/${listaId}/adicionar`)}>Novo Item</Button>
            <ListGroup>
                {itens.map((item) => (
                    <ListGroup.Item key={item.id}>
                        {item.nome}
                        <Button variant="danger" onClick={() => handleDeletar(item.id)}>Excluir</Button>
                        <Button onClick={() => navigate(`/listas/${listaId}/editar/${item.id}`)}>Editar</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default Listas;