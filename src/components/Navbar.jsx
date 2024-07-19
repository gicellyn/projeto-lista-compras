import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useContext } from "react";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { logout } from "../firebase/auth";
import toast from "react-hot-toast";

function Menu() {
    const user = useContext(UsuarioContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout().then(() => {
            toast.success("Você foi deslogado!");
            navigate("/login");
        });
    }

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
                           {user && <Link className="nav-link" to="/">Home</Link>}
                           {user && <Link className="nav-link" to="/listas">Listas</Link>}
                            {!user && <Link className="nav-link" to="/login">Login</Link>}
                           {!user && <Link className="nav-link" to="/cadastro">Cadastro</Link>}
                           {user && <Button variant="danger" onClick={handleLogout}>Sair</Button>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Menu;