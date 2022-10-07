import styled from "styled-components";
import LeftBar from "../components/LeftBar";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClientCart } from "../api/clientAPI";
import { removeProductsFromCart, registerPurchase } from "../api/productsAPI";
import { ButtonDefault, ButtonGreen } from "../assets/shared/Button";
import Input from "../assets/shared/Input";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

export default function Order() {

  const client = JSON.parse(localStorage.getItem("client"));
  const [cartInfos, setCartInfos] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [isOrderFinished, setIsOrderFinished] = useState(false);
  const [isProcessRequest, setIsProcessRequest] = useState(false);
  const [fetchDependency, setFechDependency] = useState(false);

  const config = {
    headers: {
      authorization: `Bearer ${client.token}`,
    },
  };

  const notify = () =>
    toast.success(
      'Compra realizada com sucesso! Visualize seu pedido na aba "Meus pedidos".',
      {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

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

  async function handlerPurchase(e) {
    e.preventDefault();
    setIsProcessRequest(true);
    const products = cartProducts.map((product) => ({
      productId: product.productId,
      amount: product.amount,
    }));
    const body = { products, totalValue: cartInfos.totalPrice };
    const { status } = await registerPurchase(body, config);
    if (status === 200) {
      setTimeout(() => {
        setIsOrderFinished(true);
        notify();
      }, 2000);
    }
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
          {cartProducts && cartProducts.length > 0 ? (
            <div className="orderContainer">
              {!isOrderFinished ? (
                <>
                  <div className="orderInfos">
                    <h2>Informações da compra</h2>
                    <div className="productsContainer">
                      {cartProducts.map((product) => {
                        return (
                          <div className="productInfos">
                            <img src={product.imageUrl} />
                            <p>Produto: {product.name} </p>
                            <p>Quantidade: {product.amount}</p>
                            <p className="price">
                              Preço unitário: R$ {(product.price).toFixed(2).replace(".",",")}
                            </p>
                            <p>Subtotal: R$ {(product.amount*product.price).toFixed(2).replace(".",",")}</p>
                            <ButtonDefault
                              onClick={() =>
                                removeProductFromCart(product.productId)
                              }
                              
                            > Remover </ButtonDefault>
                          </div>
                        );
                      })}
                    </div>
                    <h3>
                      Total:{" "}
                      <span className="total">R${cartInfos.totalPrice}</span>
                    </h3>
                  </div>

                  <div className="adress">
                    <h2>Informações de entrega</h2>
                    <form onSubmit={handlerPurchase}>
                      <Input placeholder={"CEP"} required />
                      <Input placeholder={"Número"} required />
                      <Input placeholder={"Complemento"} required />
                      <Input placeholder={"Enviar observação (opcional)"} />
                      <ButtonGreen type={"submit"}>
                        {isProcessRequest ? (
                          <ThreeDots
                            height="30"
                            width="80"
                            radius="9"
                            color="white"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                          />
                        ) : (
                          "Finalizar compra"
                        )}
                      </ButtonGreen>
                    </form>
                  </div>
                </>
              ) : (
                <div className="thanks">
                  <h2>Agradecemos pela compra. Volte sempre! =)</h2>
                  <Link to="/home">
                    <ButtonDefault content={"Voltar para a home"}>Voltar para a home</ButtonDefault>
                  </Link>
                  <Link to="/orders">
                    <ButtonDefault content={"Visualizar meus pedidos"} >Visualizar meus pedidos</ButtonDefault>
                  </Link>
                  <Link to="/cart">
                    <ButtonDefault content={"Visualizar meu carrinho"} >Visualizar meu carrinho</ButtonDefault>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            "Carregando..."
          )}
        </MainContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;


  @media (max-width:768px){
     flex-direction: column;
      }
`;

const MainContent = styled.div`
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

      .productsContainer {
        overflow-y: scroll;
        height: 250px;

        display: flex;
        flex-direction: column;
        gap: 30px;

        .productInfos {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          border-radius: 2px;
          height: 300px;
          width: 90%;
          border-bottom: 1px solid lightgray;

          padding-bottom: 10px;
          .price {
          }

          img {
            height: 100px;
            border-radius: 5px;
          }
        }
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

    @media (max-width:768px){
      flex-direction: column;
      width: 100%;
      height: 100%;
      border-radius: 0px;
      box-shadow: none;

      .adress{
        width: 100%;
      }

      input{
        width: 80%;
      }
      }
  }

  .adress {
    width: 50%;
   
    button {
      background-color: green;
    }
  }

  .thanks {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:15px;

   

  }

  a{
    text-decoration: none;
  }
`;
