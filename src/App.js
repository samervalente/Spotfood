import "./assets/styles/global.css";
import "./assets/styles/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import HomeLogged from "./pages/HomeLogged";
import ClientContext from "./contexts/clientContext";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import MyOrders from "./pages/MyOrders";
import OrdersCart from "./pages/OrdersCart";
import Restaurant from "./pages/Restaurant";
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
            <Route path="/order/:id" element={<Order />} />
            <Route path="/orders/:cartId" element={<OrdersCart />} />
            <Route path="/orders/me" element={<MyOrders />} />
            <Route path="/restaurant/:restaurantId" element={<Restaurant />} />
            <Route path="/register" element={<ClientRegister />} />
          </Routes>
        </BrowserRouter>
      </ClientContext.Provider>
    </>
  );
}

export default App;
