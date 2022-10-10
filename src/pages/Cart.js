import styled from "styled-components";
import LeftBar from "../components/LeftBar";
import { getClientCart } from "../api/clientAPI";
import { removeProductsFromCart } from "../api/productsAPI";
import { useEffect, useState } from "react";
import { ButtonDefault } from "../assets/shared/Button";
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

            <ButtonDefault
              onClick={() => removeProductFromCart(product.productId)}
            >
              Remover
            </ButtonDefault>
          </div>
        );
      });
    } else {
      return (
        <>
          <div className="emptyCart">
            <p>Carrinho vazio :(</p>
            <p> Que tal adicionar alguns produtos?</p>
            <Link to="/home">
              <ButtonDefault>Ver restaurantes</ButtonDefault>
            </Link>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <MainSection>
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
              {cartProducts && cartProducts.length > 0 ? (
                <ButtonDefault>
                  Finalizar Compra
                </ButtonDefault>
              ) : (
                <ButtonDefault disabled className="finishDisable">
                  Finalizar Compra
                </ButtonDefault>
              )}
            </Link>

            {cartInfos.totalPrice ? (
              <span>Total: R${cartInfos.totalPrice.toFixed(2)}</span>
            ) : (
              <span>Total: R$ 00,00</span>
            )}
          </div>
        </Container>
      </MainSection>
    </>
  );
}

const MainSection = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  background-color: red;
  height: 100vh;
  width: 100vw;
  color: white;
  font-family: "Roboto";

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .user {
    padding: 10px;
    text-align: center;
    h1 {
      font-size: 1.5em;
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
    overflow-y: scroll;

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

    @media (max-width: 768px) {
      .cartInfos {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        height: 300px;

        button {
          width: 50%;
        }
      }
    }
  }

  a {
    text-decoration: none;
  }

  .finishDisable {
    background-color: gray;
  }

  .emptyCart {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    button {
      width: 100%;
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

    @media (max-width: 768px) {
      gap: 10px;
      width: 80%;

      a {
        width: 100%;
        button {
          width: 100%;
        }
      }
    }
  }
`;
