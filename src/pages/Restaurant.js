import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ImLocation2 } from "react-icons/im";
import { FaStore } from "react-icons/fa";
import LeftBar from "../components/LeftBar";
import { getRestaurantById, getRestaurantProducts } from "../api/restaurantAPI";
import { addProductToCart, removeProductsFromCart } from "../api/productsAPI";
import { ButtonDefault, ButtonGreen } from "../assets/shared/Button";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Restaurant() {
  const { restaurantId } = useParams();
  const [restaurantInfos, setRestaurantInfos] = useState({});
  const [restaurantProducts, setRestaurantProducts] = useState([]);
  const [fetchDependency, setFechDependency] = useState(false);
  const [amount, setAmount] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalControlData, setModalControlData] = useState({
    productId: 0,
    price: 0,
  });

  const navigate = useNavigate();
  const client = JSON.parse(localStorage.getItem("client"));
  const config = {
    headers: {
      authorization: `Bearer ${client.token}`,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getRestaurantById(restaurantId, config);
      setRestaurantInfos(response[0]);
    }

    fetchData();
  }, [fetchDependency]);

  useEffect(() => {
    async function fetchData() {
      const response = await getRestaurantProducts(restaurantId, config);
      setRestaurantProducts(response.productsCategorie);
    }

    fetchData();
  }, [fetchDependency]);

  async function addProductsToCart(productId) {
    const body = { amount };

    await addProductToCart(productId, body, config);
    setFechDependency(!fetchDependency);
  }

  async function removeProductFromCart(productId) {
    await removeProductsFromCart(productId, config);
    setFechDependency(!fetchDependency);
  }

  async function purchase(productId) {
    navigate(`/order/${productId}`);
  }

  function openModal() {
    setAmount(1);
    setIsOpen(true);
  }

  function closeModal() {
    setAmount("");
    setIsOpen(false);
  }

  function renderProducts() {
    if (restaurantProducts && restaurantProducts.length > 0) {
      return restaurantProducts.map((category) => {
        return (
          <div className="categorieContainer">
            <h2 className="categoryName">{category.category}</h2>
            <div className="productsContainer">
              {category.products.map((product) => {
                return (
                  <div className="productInfos">
                    <img src={product.imageUrl} />
                    <p className="productName">{product.productName}</p>
                    <span className="price">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="productDescription">{product.description}</span>
                    <ButtonDefault
                      width={"90%"}
                      onClick={() => purchase(product.productId)}
                    >
                      Comprar
                    </ButtonDefault>

                    {!product.inCart ? (
                      <div className="addQuant">
                        <ButtonGreen
                          className="addToCart"
                          onClick={() => {
                            setModalControlData({
                              price: product.price,
                              productId: product.productId,
                            });
                            openModal(product.productId);
                          }}
                          width={"90%"}
                        >
                          Adicionar ao carrinho
                        </ButtonGreen>
                        <Modal
                          isOpen={modalIsOpen}
                          onRequestClose={closeModal}
                          style={customStyles}
                        >
                          <div className="addSpan">
                            <p>Selecione a quantidade</p>
                            <input
                              onChange={(e) => setAmount(e.target.value)}
                              type="number"
                              min={1}
                              defaultValue={1}
                              className="addInput"
                            />
                            <span>
                              {" "}
                              Valor total: R$ {amount * modalControlData.price}
                            </span>
                          </div>
                          <ButtonDefault
                            onClick={() => {
                              addProductsToCart(modalControlData.productId);
                              closeModal();
                            }}
                            width={"50%"}
                          >
                            Adicionar ao carrinho
                          </ButtonDefault>
                        </Modal>
                      </div>
                    ) : (
                      <ButtonDefault
                        onClick={() => removeProductFromCart(product.productId)}
                        width={"90%"}
                      >
                        Remover do carrinho
                      </ButtonDefault>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="noProductsContainer">
          <p>Estamos abastacendo a loja. Fique de olho ;)</p>
          <Link to="/home">
            <ButtonDefault>Explorar restaurantes</ButtonDefault>
          </Link>
        </div>
      );
    }
  }

  return (
    <>
      <Container>
   
            <LeftBar />
        <MainContent>
          <div className="topInfos">
            <img src={restaurantInfos.imageProfile} />
            <div className="restaurantInfos">
              <div className="name">
                <FaStore className="icon store" />
                <h2>{restaurantInfos.name}</h2>
              </div>
              <p>
                Veja todos os produtos de{" "}
                <strong>{restaurantInfos.name}</strong>
              </p>
              <div className="location">
                <ImLocation2 className="icon" />{" "}
                <span>
                  {restaurantInfos.state} - {restaurantInfos.city}
                </span>
              </div>
            </div>
          </div>
          
          <div className="products">{renderProducts()}</div>
        </MainContent>
       
      </Container>
    </>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    heigth: "100px",
  },
  overlay: {
    backgroundColor: "white",

    position: "fixed",
    heigth: "10px",
    scroll: "none",
  },
};

const Container = styled.div`
  display: flex;

  @media (max-width: 768px){
    flex-direction: column;
  }
 
`;

const MainContent = styled.div`
  font-family: "Roboto";
  width: 100%;


  .topInfos { 
    background: hsla(0, 88%, 54%, 1);
    background: linear-gradient(
      270deg,
      hsla(0, 88%, 54%, 1) 13%,
      hsla(0, 94%, 47%, 1) 47%,
      hsla(0, 100%, 24%, 1) 100%
    );
    background: -moz-linear-gradient(
      270deg,
      hsla(0, 88%, 54%, 1) 13%,
      hsla(0, 94%, 47%, 1) 47%,
      hsla(0, 100%, 24%, 1) 100%
    );

    background: -webkit-linear-gradient(
      270deg,
      hsla(0, 88%, 54%, 1) 13%,
      hsla(0, 94%, 47%, 1) 47%,
      hsla(0, 100%, 24%, 1) 100%
    );

    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#F12323", endColorstr="#E90707", GradientType=1 );

    color: white;
    width:100vw;
    padding: 30px 60px;

    height: 150px;
    display: flex;
    align-items: center;

    .restaurantInfos {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-left: 15px;

      .icon {
        color: white;
      }

      .icon.store {
        font-size: 60px;
      }

      .name,
      .location {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      h2 {
        font-weight: bold;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        font-size: 50px;
      }

      @media(max-width:768px){
        h2{
          
          font-size:30px;
        }

        .name, .location{
          gap:5px;
        }
    }
    }
    img {
      height: 180px;
      width: 180px;
    
      border-radius: 0px 0px 15px 15px;
    }

    @media(max-width:768px){
      height:170px;
      background-image: url("https://st2.depositphotos.com/1891407/10272/v/950/depositphotos_102723300-stock-illustration-cooking-kitchen-food-background.jpg");
      background-size: cover;
   
      

      img{
        display:none;
      }
    }
  }

  

  .products {
    width:100vw;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap:30px;
    height: calc(100vh - 150px);
 
    
    @media (max-width: 768px){
      gap:0px;
      flex-direction: column;
      align-items: center;
      height: 100%;
    }
    
    .categorieContainer {
      height: 500px;
     
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-left: 20px;
      padding-top: 20px;
      margin-top: 20px;
      
      border-radius: 10px;
    
      overflow-x: scroll;
        padding:20px;
          ::-webkit-scrollbar {
          display: none;
        }
      .categoryName {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        
      }

      .productsContainer {
        display: flex;
        flex-direction: column;
        gap: 20px;
        height: 100%;
        overflow-y: scroll;
        padding:20px;
          ::-webkit-scrollbar {
          display: none;
        }
        

        .productInfos {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px;
          align-items: center;
          border-radius: 5px;
          height: 300px;
          width: 230px;
          box-shadow: 3px 3px 3px 3px gray;

          .productName, .productDescription{
            text-align: center;
          }

          .productDescription{
            color:gray;
          }

          .price {
            color: red;
            font-weight: bold;
          }
        }

        .addQuant {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;

          .addSpan {
            display: flex;
          }

          span {
            display: flex;
            align-items: center;
            gap: 5px;
            justify-content: center;
          }

          input {
            width: 20%;
            height: 20px;
            display: flex;
            text-align: center;
            color: red;
            font-weight: bold;
          }
        }
      }

      img {
        height: 100px;
        border-radius: 5px;
      }
    }

    @media(max-width:768px){
      padding:20px;
    }
  }

  .noProductsContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 10px;
    height: calc(100vh - 300px);

    a {
      text-decoration: none;
      width: 30%;
    }

    button {
      width: 100%;
      background-color: red;
      color: white;
      border: none;
      border-radius: 5px;
      height: 30px;
      font-size: 16px;
      transition: all linear 0.3s;
      cursor: pointer;
      :hover {
        background-color: orange;

        color: red;
      }
    }

    @media(max-width:768px){
      align-items: center;

      a{
        width: 60%;
      }

   
    }
  }


`;
