import { useEffect, useState, useContext } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { obterListas } from "../firebase/listas";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Home() {
  const usuario = useContext(UsuarioContext);
  const [listas, setListas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) {
      obterListas(usuario.uid).then((listas) => {
        setListas(listas);
        setCarregando(false);
      }).catch(() => {
        setCarregando(false);
      });
    }
  }, [usuario]);

  if (carregando) {
    return <Loader />;
  }

  return (
    <>
       <Container className="form-section mt-5 text-center">
        <h1>Minhas Listas</h1>
        <hr />
        <Button className="text-center" variant="warning mb-3" onClick={() => navigate("/listas/criar")}>Criar Nova Lista</Button>
        <ListGroup>
          {listas.map((lista) => (
            <ListGroup.Item key={lista.id} action onClick={() => navigate(`/listas/${lista.id}`)}>
              {lista.nome}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>

  );
}

export default Home;