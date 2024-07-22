import { useEffect, useState, useContext } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { obterItens, deletarItem, obterNomeLista } from "../firebase/listas";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";

function Listas() {
    const usuario = useContext(UsuarioContext);
    const { listaId } = useParams();
    const [itens, setItens] = useState([]);
    const [nomeLista, setNomeLista] = useState(""); // Novo estado para o nome da lista
    const [carregando, setCarregando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (usuario) {

            const carregarDados = async () => {
                try {
                    const nome = await obterNomeLista(usuario.uid, listaId);
                    setNomeLista(nome); // Define o nome da lista no estado
                    const itens = await obterItens(usuario.uid, listaId);
                    setItens(itens);
                    setCarregando(false);
                } catch (error) {
                    console.error("Erro ao carregar dados:", error);
                    setCarregando(false);
                }
            };

            carregarDados();
            // obterItens(usuario.uid, listaId).then((itens) => {
            //     setItens(itens);
            //     setCarregando(false);
            // }).catch(() => {
            //     setCarregando(false);
            // });
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
            {/* <h1>Itens da Lista</h1> */}
            <h1>{nomeLista ? `Lista:  ${nomeLista}` : "Itens da Lista"}</h1> {/* Atualizado para exibir o nome da lista */}
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