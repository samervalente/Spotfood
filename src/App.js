import "./assets/styles/global.css";
import "./assets/styles/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import HomeLogged from "./pages/HomeLogged";
import ClientContext from "./contexts/clientContext";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import ClientRegister from "./pages/ClientRegister";

function App() {
  const [client, setClient] = useState({
    name: "",
    imageProfile: "",
    token: "",
    page: "",
  });

  return (
    <>
      <ClientContext.Provider value={{ client, setClient }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<HomeLogged />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/register" element={<ClientRegister />} />
          </Routes>
        </BrowserRouter>
      </ClientContext.Provider>
    </>
  );
}

export default App;
