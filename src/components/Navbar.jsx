import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

function Menu() {
    return (
        <header>
            <Navbar bg="light" variant="light" expand="md">
        <Container fluid>
          <Link to="/">
            <img src="/logo-lista.png" width="150" alt="Logo" />
          </Link>
        </Container>
        <Container>
            <Navbar.Toggle />
             <Navbar.Collapse>
                <Nav className="ms-auto">
                    <Link className="nav-link" to="/login">Login</Link>
                     <Link className="nav-link" to="/cadastro">Cadastro</Link>
                    <Link className="nav-link" to="/Listas Salvas">Listas Salvas</Link>
                </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Menu;