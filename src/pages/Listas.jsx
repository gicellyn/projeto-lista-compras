import { useEffect, useState, useContext } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { obterItens, deletarItem } from "../firebase/listas";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function Listas() {
    const { usuario } = useContext(UsuarioContext);
    const { listaId } = useParams();
    const [itens, setItens] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (usuario) {
            obterItens(usuario.uid, listaId).then((itens) => {
              setItens(itens); setCarregando(false);
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
            <Button onClick={() => navigate(`/listas/adicionar`)}>Novo Item</Button>
            <ListGroup>
                {itens.map((item) => (
                    <ListGroup.Item key={item.id}>
                        {item.nome}
                        <Button variant="danger" onClick={() => handleDeletar(item.id)}>Excluir</Button>
                        <Button onClick={() => navigate(`/listas/${listaId}/editar/${item.id}`)}>Editar</Button>
                        {/* <Button onClick={() => navigate(`/listas/${listaId}/editar-item/${item.id}`)}>Editar</Button> */}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default Listas;


// import React, { useContext, useEffect, useState } from "react";
// import { Container, ListGroup, Button } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import { UsuarioContext } from "../contexts/UsuarioContext";
// import { obterItens, deletarItem } from "../firebase/listas";
// import Loader from "../components/Loader";

// function Listas() {
//   const { usuario } = useContext(UsuarioContext);
//   const { listaId } = useParams();
//   const [itens, setItens] = useState([]);
//   const [carregando, setCarregando] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (usuario) {
//       obterItens(usuario.uid, listaId)
//         .then((itens) => {
//           setItens(itens);
//           setCarregando(false);
//         })
//         .catch((error) => {
//           console.error("Erro ao obter itens: ", error);
//           setCarregando(false);
//         });
//     } else {
//       // Redirecionar para a página de login se o usuário não estiver autenticado
//       navigate("/login");
//     }
//   }, [usuario, listaId, navigate]);

//   function handleDeletar(itemId) {
//     deletarItem(usuario.uid, listaId, itemId)
//       .then(() => {
//         setItens((prevItens) =>
//           prevItens.filter((item) => item.id !== itemId)
//         );
//       })
//       .catch((error) => {
//         console.error("Erro ao deletar item: ", error);
//       });
//   }

//   if (carregando) {
//     return <Loader />;
//   }

//   return (
//     <Container>
//       <h1>Itens da Lista</h1>
//       <Button onClick={() => navigate(`/listas/${listaId}/novo-item`)}>Novo Item</Button>
//       <ListGroup>
//         {itens.map((item) => (
//           <ListGroup.Item key={item.id}>
//             {item.nome}
//             <Button variant="danger" onClick={() => handleDeletar(item.id)}>Excluir</Button>
//             <Button onClick={() => navigate(`/listas/${listaId}/editar-item/${item.id}`)}>Editar</Button>
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </Container>
//   );
// }

// export default Listas;



// import React, { useContext, useEffect, useState } from "react";
// import { Container, ListGroup, Button } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import { UsuarioContext } from "../contexts/UsuarioContext";
// import { obterItens, deletarItem } from "../firebase/listas";
// import Loader from "../components/Loader";


// function Listas() {
//   const { usuario } = useContext(UsuarioContext);
//   const { listaId } = useParams();
//   const [itens, setItens] = useState([]);
//   const [carregando, setCarregando] = useState(true);
//   const navigate = useNavigate();

//   useEffect(function() {
//     if (usuario) {
//       obterItens(usuario.uid, listaId)
//         .then(function(itens) {
//           setItens(itens);
//           setCarregando(false);
//         })
//         .catch(function(error) {
//           console.error("Erro ao obter itens: ", error);
//           setCarregando(false);
//         });
//     }
//   }, [usuario, listaId]);

//   function handleDeletar(itemId) {
//     deletarItem(usuario.uid, listaId, itemId)
//       .then(function() {
//         setItens(function(prevItens) {
//           return prevItens.filter(function(item) {
//             return item.id !== itemId;
//           });
//         });
//       })
//       .catch(function(error) {
//         console.error("Erro ao deletar item: ", error);
//       });
//   }

//   if (carregando) {
//     return <Loader />;
//   }

//   return (
//     <Container>
//       <h1>Itens da Lista</h1>
//       <Button onClick={function() { navigate(`/listas/${listaId}/novo-item`); }}>Novo Item</Button>
//       <ListGroup>
//         {itens.map(function(item) {
//           return (
//             <ListGroup.Item key={item.id}>
//               {item.nome}
//               <Button variant="danger" onClick={function() { handleDeletar(item.id); }}>Excluir</Button>
//               <Button onClick={function() { navigate(`/listas/${listaId}/editar-item/${item.id}`); }}>Editar</Button>
//             </ListGroup.Item>
//           );
//         })}
//       </ListGroup>
//     </Container>
//   );
// }

// export default Listas;




// import React, { useEffect, useState } from 'react';
// import { Container, ListGroup, Button } from 'react-bootstrap';
// import { useParams, useNavigate } from 'react-router-dom';
// import Loader from '../components/Loader';  // Certifique-se de que Loader esteja funcionando ou comente se necessário

// function Listas() {
//   // Simular dados de itens
//   const [itens, setItens] = useState([
//     { id: '1', nome: 'Item 1' },
//     { id: '2', nome: 'Item 2' },
//     { id: '3', nome: 'Item 3' },
//   ]);
//   const [carregando, setCarregando] = useState(false); // Simular carregamento rápido
//   const { listaId } = useParams();
//   const navigate = useNavigate();

//   // Simular carregamento dos itens
//   useEffect(() => {
//     setCarregando(true);
//     setTimeout(() => {
//       setCarregando(false);
//     }, 500); // Simular 0.5 segundos de carregamento
//   }, [listaId]);

//   function handleDeletar(itemId) {
//     setItens((prevItens) =>
//       prevItens.filter((item) => item.id !== itemId)
//     );
//   }

//   if (carregando) {
//     return <Loader />;
//   }

//   return (
//     <Container>
//       <h1>Itens da Lista</h1>
//       <Button onClick={() => navigate(`/listas/${listaId}/novo-item`)}>Novo Item</Button>
//       <ListGroup>
//         {itens.map((item) => (
//           <ListGroup.Item key={item.id}>
//             {item.nome}
//             <Button variant="danger" onClick={() => handleDeletar(item.id)}>Excluir</Button>
//             <Button onClick={() => navigate(`/listas/${listaId}/editar-item/${item.id}`)}>Editar</Button>
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </Container>
//   );
// }

// export default Listas;