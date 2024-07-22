import { useState, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { useNavigate } from "react-router-dom";
import { adicionarLista } from "../firebase/listas";
import toast from "react-hot-toast";

function CriarListas() {
  const usuario = useContext(UsuarioContext);
  const [nomeLista, setNomeLista] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nomeLista.trim() === "") {
      toast.error("O nome da lista não pode estar vazio");
      return;
    }
    try {
      await adicionarLista(usuario.uid, { nome: nomeLista });
      toast.success("Lista criada com sucesso");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao criar lista");
    }
  };

  return (
    <Container>
      <h1>Criar Nova Lista</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNomeLista">
          <Form.Label>Nome da Lista</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome da lista"
            value={nomeLista}
            onChange={(e) => setNomeLista(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Criar Lista
        </Button>
      </Form>
    </Container>
  );
}

export default CriarListas;