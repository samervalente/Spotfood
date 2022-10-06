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
                    <p>{product.productName}</p>
                    <span className="price">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>
                    <span>{product.description}</span>
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
  margin-left: 280px;
`;

const MainContent = styled.div`
  font-family: "Roboto";

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
    padding: 30px 60px;

    height: 300px;
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
    }
    img {
      height: 200px;
      width: 200px;
      box-shadow: 2px 3px 20px 5px black;
    }
  }
  .products {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .categorieContainer {
      height: 500px;
      box-shadow: 2px 1px 2px 2px gray;
      border: 2px solid white;
      padding-left: 20px;
      padding-top: 20px;
      margin-top: 20px;
      width: 90%;
      border-radius: 10px;

      .categoryName {
        font-size: 35px;
        margin-bottom: 10px;
      }

      .productsContainer {
        display: flex;
        gap: 20px;

        .productInfos {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding:10px;
          align-items: center;
          border-radius: 2px;
          height: 300px;
          width: 230px;
          box-shadow: 2px 2px 2px 3px lightgray;

          .price {
            margin-top: 10px;
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
  }

  .noProductsContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    height: calc(100vh - 300px);

    a {
      width: 100%;
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
  }
`;
