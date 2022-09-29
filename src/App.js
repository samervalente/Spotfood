import "./assets/styles/global.css";
import "./assets/styles/reset.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import ClientRegister from "./pages/ClientRegister"


function App() {
  return (
    <>
      <BrowserRouter>
  
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/register" element={<ClientRegister />} />
         
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
