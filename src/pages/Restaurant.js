import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import LeftBar from "../components/LeftBar";
import { useEffect, useState } from "react";
import { getRestaurantById } from "../api/restaurantAPI";
import { addProductToCart, removeProductsFromCart } from "../api/productsAPI";
import Button from "../assets/shared/Button";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Restaurant() {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [categories, setCategories] = useState([]);
  const [fetchDependency, setFechDependency] = useState(false);
  const [amount, setAmount] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);

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
      setRestaurant(response);
      setCategories(response.productsCategorie);
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
  let subtitle;

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function renderProducts() {
    if (categories && categories.length > 0) {
      return categories.map((category) => {
        return (
          <div className="categorieContainer">
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
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
                    <Button
                      className="removeFromCart"
                      width={"90%"}
                      onClick={() => purchase(product.productId)}
                      content={"Comprar"}
                    />

                    {!product.inCart ? (
                      <div className="addQuant">
                        <Button
                          onClick={openModal}
                          width={"90%"}
                          content={"Adicionar ao carrinho"}
                        />
                        <Modal
                          isOpen={modalIsOpen}
                          onAfterOpen={afterOpenModal}
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
                            <span> Valor total:R${amount * product.price}</span>
                          </div>
                          <Button
                            onClick={() => {
                              addProductsToCart(product.productId);
                              setIsOpen(false);
                            }}
                            width={"50%"}
                            content={"Adicionar ao carrinho"}
                          />
                        </Modal>
                      </div>
                    ) : (
                      <Button
                        onClick={() => removeProductFromCart(product.productId)}
                        width={"90%"}
                        content={"Remover do carrinho"}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      });
    }
  }

  return (
    <>
      <Container>
        <LeftBar />
        <MainContent>
          <div className="topInfos">
            <img src={restaurant.imageProfile} />
            <div className="restaurantInfos">
              <h2>{restaurant.restaurantName}</h2>
              <p>
                Veja todos os produtos de{" "}
                <strong>{restaurant.restaurantName}</strong>
              </p>
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
      margin-left: 10px;
      h2 {
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
    background-color: white;

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

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
`;
