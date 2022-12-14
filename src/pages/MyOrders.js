import styled from "styled-components";
import { Link } from "react-router-dom";
import LeftBar from "../components/LeftBar";
import { getClientOrders } from "../api/clientAPI";
import { useEffect, useState } from "react";
import { ButtonDefault } from "../assets/shared/Button";
import ReactStars from "react-stars";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const client = JSON.parse(localStorage.getItem("client"));
  const config = {
    headers: {
      authorization: `Bearer ${client.token}`,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getClientOrders(config);
      setOrders(response);
    }
    fetchData();
  });

  function renderOrders() {
    return orders.map((order) => {
      return (
        <div className="orderContainer">
          <div className="productsContainer">
            {order.products.map((product) => {
              return (
                <div className="product">
                  <img src={product.imageUrl} />
                  <p>{product.name}</p>
                  <p>Quantidade: {product.amount}</p>
                  <div className="feedback">
                    Avaliação:{" "}
                    <ReactStars
                      count={5}
                      value={product.rate}
                      size={24}
                      color2={"#ffd700"}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="orderInfosContainer">
            <span className="orderCode">
              <span>
                Pedido: <span className="orderCode">{order.order}</span>
              </span>
            </span>
            <span>Data: {order.date.replaceAll("-", "/")}</span>
            <span>
              Valor total:{" "}
              <span className="totalValue">R$ {order.totalValue}</span>
            </span>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <Container>
        <LeftBar />
        <MainContent>
          <h1>Meus pedidos</h1>
          <div className="contentContainer">
            {orders.length > 0 ? (
              <>{renderOrders()}</>
            ) : (
              <div className="notOrderProducts">
                {" "}
                <h2>Nenhum pedido efetuado ainda :( Que tal </h2>{" "}
                <Link to="/home">
                  <ButtonDefault>Explorar os restaurantes </ButtonDefault>{" "}
                </Link>
              </div>
            )}
          </div>
        </MainContent>
      </Container>
    </>
  );
}

const Container = styled.div`

  font-family: "Roboto";
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100vw;
  }
`;

const MainContent = styled.div`
  background-color: red;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  h1 {
    color: white;
    font-size: 25px;
  }

  .contentContainer {
    display: flex;
    flex-direction: column;
    background-color: white;
    overflow-y: scroll;
    width: 70%;
    border-radius: 10px;
    height: 500px;
    padding: 10px;
    gap: 15px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap:10px;
        width: 100vw;
        padding:0px;
        border-radius: 0px;
  }
  }

  .orderContainer {
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 3px 2px gray;
    border-radius: 10px;
    padding: 10px;

    @media (max-width: 768px) {
      width: 100%;
      border-radius: 0px;
      box-shadow: none;
      border-bottom: 2px solid gray;
  }

    .productsContainer {
      display: flex;
      align-items: center;
      overflow-x: scroll;
      gap: 20px;
      height: 250px;

      .product {
        box-shadow: 2px 2px 2px 2px gray;
        border-radius: 5px;
        width: 200px;
        padding: 10px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap:10px;

        p {
          width: 90%;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        img {
          width: 100px;
          height: 80px;
        }
      }
    }

    .feedback{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap:5px;
    }

    .orderInfosContainer {
      display: flex;
      justify-content: space-between;
      font-size: 14px;

      @media (max-width: 768px) {
        flex-direction: column;
        gap:10px;
        width: 100vw;
  }

      .orderCode {
        color: gray;
      }

      .totalValue {
        color: red;
        font-weight: bold;
      }
    }
  }

  .notOrderProducts{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap:10px;

    @media (max-width:768px){
      flex-direction: column;
    }
  }

  a{
    text-decoration: none;
  }
`;
