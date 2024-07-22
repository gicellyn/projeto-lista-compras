import { useEffect, useState, useContext } from "react";
import { Container, ListGroup, Button, Badge } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { obterItens, deletarItem, obterNomeLista } from "../firebase/listas";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

function Listas() {
    const usuario = useContext(UsuarioContext);
    const { listaId } = useParams();
    const [itens, setItens] = useState([]);
    const [nomeLista, setNomeLista] = useState(""); 
    const [carregando, setCarregando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (usuario) {

            const carregarDados = async () => {
                try {
                    const nome = await obterNomeLista(usuario.uid, listaId);
                    setNomeLista(nome); 
                    const itens = await obterItens(usuario.uid, listaId);
                    setItens(itens);
                    setCarregando(false);
                } catch (error) {
                    console.error("Erro ao carregar dados:", error);
                    setCarregando(false);
                }
            };

            carregarDados();

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
        <Container className="form-section mt-5 text-center">
            <h1>Itens da Lista</h1>
            <hr />
            <Button className="btn btn-dark mb-3" onClick={() => navigate(`/listas/${listaId}/adicionar`)}>Novo Item</Button>
            <ListGroup >
                {itens.map((item) => (
                    <ListGroup.Item key={item.id}>
                        <h5>{item.titulo}</h5>
                        <p>{item.descricao}</p>
                        <div className="mb-2" >{item.comprado ? <Badge
                            bg="success">Comprado</Badge> : <Badge bg="warning">Não comprado</Badge>}
                        </div>
                        <p>Quantidade: {item.quantidade}</p>
                        <Button className="m-2" variant="outline-danger" onClick={() => handleDeletar(item.id)}><span className="material-symbols-outlined">
                                delete
                            </span></Button>
                        <Button variant="outline-warning" onClick={() => navigate(`/listas/${listaId}/editar/${item.id}`)}><span className="material-symbols-outlined">
                                    edit
                                </span></Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default Listas;