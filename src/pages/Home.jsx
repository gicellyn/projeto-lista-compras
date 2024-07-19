import { useEffect, useState, useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { listarListas } from "../firebase/listas"; // Assumindo que a função foi criada

function Home() {
  const [listas, setListas] = useState([]);
  const usuario = useContext(UsuarioContext);

  useEffect(() => {
    if (usuario && usuario.uid) {
      listarListas(usuario.uid).then((resultados) => {
        setListas(resultados);
      }).catch((error) => {
        console.error("Erro ao listar listas: ", error);
      });
    }
  }, [usuario]);

// MUDAR PARA NULL O USUARIO DEPOIS DE TESTAR
  if (usuario === true) { 
    return <Navigate to="/login" />;
  }

  return (
    <main style={{ paddingBottom: "56px" }}>
        <div className="container-fluid p-0">
            <img src="/public/banner-listaexpress.png" className="img-fluid" alt="Banner Lista Express" />
        </div>
      <Container>
        <h1>HOME</h1>
        <hr />
        <h3>Suas Listas de Compras</h3>
        <hr />
        <Link className="btn btn-dark" to="/listas">
          Adicionar Lista
        </Link>
        <section className="mt-2">
          {listas.map((lista) => (
            <Card key={lista.id} className="mb-2">
              <Card.Body>
                <Card.Title>{lista.titulo}</Card.Title>
                <Card.Text>{lista.descricao}</Card.Text>
                <Button variant="dark" as={Link} to={`/listas/${lista.id}`}>
                  Ver Itens
                </Button>
              </Card.Body>
            </Card>
          ))}
        </section>
      </Container>
    </main>
  );
}

export default Home;

