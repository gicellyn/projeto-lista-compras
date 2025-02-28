import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Listas from "./pages/Listas";
import NotFound from "./pages/NotFound";
import Rodape from "./components/Rodape";
import { UsuarioContext } from "./contexts/UsuarioContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { Toaster } from "react-hot-toast";
import NovoItem from "./pages/NovoItem";
import EditarItem from "./pages/EditarItem";
import Itens from "./pages/Itens";
import CriarListas from "./pages/CriarListas";


function App() {

  const [userLogado, setUserLogado] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserLogado(user);
      setLoading(false)
    });
  }, []);

  if(loading){
    return null;
  }

  return (
    <>
      <UsuarioContext.Provider value={userLogado}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/itens" element={<Itens />}/>
            <Route path="/listas/:listaId" element={<Listas />} />
            <Route path="/listas/criar" element={<CriarListas />} />
            <Route path="/listas/:listaId/adicionar" element={<NovoItem />} />
            <Route path="/listas/:listaId/editar/:itemId" element={<EditarItem />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Rodape />
        </BrowserRouter>
        <Toaster position="bottom-left"/>
      </UsuarioContext.Provider>
    </>
  );
}

export default App;