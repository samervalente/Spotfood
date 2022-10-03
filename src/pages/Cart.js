import styled from "styled-components";
import LeftBar from "../components/LeftBar";
import { getClientCart } from "../api/clientAPI";
import { removeProductsFromCart } from "../api/productsAPI";
import { useEffect, useState } from "react";
import Button from "../assets/shared/Button";
import { Link } from "react-router-dom";


export default function Cart() {
  const [cartInfos, setCartInfos] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const client = JSON.parse(localStorage.getItem("client"));
  const [fetchDependency, setFechDependency] = useState(false);
  const config = {
    headers: {
      authorization: `Bearer ${client.token}`,
    },
  };
  useEffect(() => {
    async function fetchData() {
      const response = await getClientCart(config);
      setCartInfos(response);
      setCartProducts(response.cartProducts);
    }
    fetchData();
  }, [fetchDependency]);

async function removeProductFromCart(productId) {
    await removeProductsFromCart(productId, config);
    setFechDependency(!fetchDependency);
  }

  async function finishOrder(){
    console.log(cartInfos)
  }


  function renderCart() {
    if (cartProducts && cartProducts.length > 0) {
      return cartProducts.map((product) => {
        return (
          <div className="cartInfos">
            <div className="card">
              <img src={product.imageUrl} />
              <span className="productName">{product.name}</span>
            </div>
            <span>
              quantidade: <span className="amount">x{product.amount}</span>
            </span>
            <span>Preço: R$ {product.price.toFixed(2).replace(".", ",")}</span>
            <span>
              Subtotal: R${" "}
              {(product.amount * product.price).toFixed(2).replace(".", ",")}
            </span>
           
           <Button onClick={() => removeProductFromCart(product.productId)} content={"Remover"} />
      
          </div>
        );
      });
    } else {
      return <>
            "Carrinho vazio :( <br/> Que tal adicionar alguns produtos?"
            <Link to="/home">
                <Button width={"30%"} content={"Ver restaurantes"}/>
            </Link>
      </>
    }
  }

  return (
    <>
      <LeftBar />
      <Container>
        <div className="user">
          <h1>
            Olá, <strong>{client.name.split(" ")[0]}</strong>! Visualize seu
            carrinho logo abaixo:
          </h1>
        </div>
        <div className="cartContainer">{renderCart()}</div>
        <div className="cartActions">
          
            <Link to={`/orders/${cartInfos.cartId}`}> 
              <Button onClick={() => finishOrder()} content={"Finalizar compra"} />
            </Link>
          

          {cartInfos.totalPrice ? (
            <span>Total: R${cartInfos.totalPrice.toFixed(2)}</span>
          ) : (
            <span>Total: R$ 00,00</span>
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: red;
  height: 100vh;
  margin-left: 280px;
  color: white;
  font-family: "Roboto";

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .user {
    h1 {
      font-size: 25px;
    }
  }

  .cartContainer {
    width: 80%;
    height: 400px;
    background-color: white;
    border-radius: 10px;
    color: black;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    overflow: scroll;

    .cartInfos {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
      box-shadow: 2px 2px 2px 2px gray;
      align-items: center;
      height: 120px;
      border-radius: 5px;
      padding: 10px 15px;

      .card {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
          height: 80px;
          width: 120px;
        }
        .productName {
        }
      }
      .amount {
        color: red;
        font-weight: bold;
      }

      span {
      }
    }
  }

  .cartActions {
    width: 80%;
    height: 100px;
    background-color: white;
    border-radius: 5px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 65px;
  }
`;
