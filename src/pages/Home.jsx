import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
// import { UsuarioContext } from "../contexts/UsuarioContext";
// import { getListasUsuario } from "../firebase/listas"; // Assumindo que a função foi criada

function Home() {
  const [listas, setListas] = useState([]);
//   const usuario = useContext(UsuarioContext);

  useEffect(() => {
    // if (usuario) {
    //   getListasUsuario(usuario.uid).then((resultados) => {
    //     setListas(resultados);
    //   });
    // }
  }, []);

  // if (usuario === null) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <main className="mt-3" style={{ paddingTop: "16px", paddingBottom: "56px" }}>
        <img src="/public/banner-listaexpress.png" className="img-fluid" alt="Banner Lista Express" />
      <Container>
        <h1>Suas Listas de Compras</h1>
        <hr />
        <Link className="btn btn-dark" to="/listas/adicionar">
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

