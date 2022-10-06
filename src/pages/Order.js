import styled from "styled-components";
import LeftBar from "../components/LeftBar";
import { ToastContainer, toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, registerPurchase } from "../api/productsAPI";
import {ButtonDefault, ButtonGreen} from "../assets/shared/Button";
import { ThreeDots } from  'react-loader-spinner'

import 'react-toastify/dist/ReactToastify.css';

export default function Order() {
  const { id } = useParams();
  const client = JSON.parse(localStorage.getItem("client"));
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const [isProcessRequest, setIsProcessRequest] = useState(false)
  const [isOrderFinished, setIsOrderFinished] = useState(false);

  const order = {
    products: [
      {
        productId: id,
        amount,
      },
    ],
    totalValue: product.price * amount,
  };

  const config = {
    headers: {
      authorization: `Bearer ${client.token}`,
    },
  };

  const notify = () => toast.success('Compra realizada com sucesso! Visualize seu pedido na aba "Meus pedidos".', {
    position: "top-right",
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });;

  useEffect(() => {
    async function fetchData() {
      const response = await getProductById(id, config);
      setProduct(response);
    }
    fetchData();
  }, []);

  function addAmount(action) {
    if (action === "add") {
      setAmount(amount + 1);
    } else if (action === "minus" && amount !== 1) {
      setAmount(amount - 1);
    }
  }

  async function handlerPurchase(e) {
    e.preventDefault();
    setIsProcessRequest(true)
    await registerPurchase(order, config);
    
    setTimeout(() => {
      setIsOrderFinished(true)
      notify()
    }, 2000)
  }
 

  return (
    <>
      <Container>
        <LeftBar />
        
        <MainContent>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
       
        <ToastContainer />
                         
          {product.price ? (
            <div className="orderContainer">
              {!isOrderFinished ? (
                <>
                  <div className="orderInfos">
                    <h2>Informações da compra</h2>
                    <div className="productInfos">
                      <img src={product.imageUrl} />
                      <p>Produto: {product.name}</p>
                      <p className="price">
                        Preço unitário: R${" "}
                        {product.price.toFixed(2).replace(".", ",")}
                      </p>
                      <div className="addAmount">
                        <span>Quantidade: {amount}</span>
                        <ButtonDefault
                        data-test-id="button-add"
                          onClick={() => addAmount("add")}
                          className="amount"
                        >
                          +
                        </ButtonDefault>
                        <ButtonDefault
                          onClick={() => addAmount("minus")}
                          className="amount"
                        >
                          -
                        </ButtonDefault>
                      
                      </div>
                      <h3>
                        Total:{" "}
                        <span className="total">
                          R${" "}
                          {(amount * product.price)
                            .toFixed(2)
                            .replace(".", ",")}
                        </span>
                      </h3>
                    </div>
                  </div>
                  <div className="adress">
                    <h2>Informações de entrega</h2>
                    <form onSubmit={handlerPurchase}>
                      <input data-test-id="cep" type="text" placeholder={"CEP"} required />
                      <input data-test-id="number" placeholder={"Número"}  required />
                      <input data-test-id="complement" placeholder={"Complemento"} required />
                      <input data-test-id="observation" placeholder={"Enviar observação (opcional)"} />
                      <ButtonGreen
                        type={"submit"}
                      >
                        {isProcessRequest?
                        <ThreeDots 
                            height="30" 
                            width="80" 
                            radius="9"
                            color="white" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />: "Finalizar compra"}
                      </ButtonGreen>
                    </form>
                  </div>
                </>
              ) : (
                <div className="thanks">
                  <h2>Agradecemos pela compra. Volte sempre! =)</h2>
                  <Link to="/home">
                    <ButtonDefault content={"Voltar para a home"}> Voltar para a home </ButtonDefault>
                  </Link>
                  <Link to="/orders">
                    <ButtonDefault content={"Visualizar meus pedidos"} >  Visualizar meus pedidos</ButtonDefault>
                  </Link>
                  <Link to="/cart">
                    <ButtonDefault >Visualizar meu carrinho</ButtonDefault> 
                  </Link>
                </div>
              )}
            </div>
          ) : (
            "Carregando..."
          )}
        </MainContent>
      
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  margin-left: 280px;
  background-color: red;
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .orderContainer {
    display: flex;

    padding: 20px;
    background-color: white;
    height: 400px;
    width: 60%;
    border-radius: 8px;
    box-shadow: 2px 2px 4px 2px brown;
    font-family: "Roboto";

    h2 {
      font-size: 25px;
    }

    h3 {
      margin-top: 10px;
    }
    .total {
      font-size: 20px;
      color: red;
      font-weight: bold;
    }

    display: flex;
    gap: 20px;

    .orderInfos {
      border-right: 2px solid lightgray;
      padding-right: 10px;
    }

    .productInfos {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      border-radius: 2px;
      height: 300px;
      width: 250px;

      .price {
      }

      img {
        height: 100px;
        border-radius: 5px;
      }
    }

    .addAmount {
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      gap: 10px;

      .amount {
        border: none;
        border-radius: 5px;
        background-color: red;
        color: white;
        cursor: pointer;
        font-size: 20px;
        width: 25px;
      }
    }
  }
  
  form{
    display: flex;
    flex-direction: column;
    gap:10px;
  }

  input{
    width: 100%;
    height:30px;
    border:none;
    border-radius: 5px;
    background-color: red;
    color:white;
    outline:none;
    padding:10px;

    ::placeholder{
      color:white;
    }
  }


  .thanks {
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  
    gap:15px;

    a{
      text-decoration: none;
      width: 60%;
    }

    button{
      width: 100%;
    }
  }
`;
