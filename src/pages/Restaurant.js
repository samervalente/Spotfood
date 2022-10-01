import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import LeftBar from "../components/LeftBar";
import { useEffect, useState } from "react";
import { getRestaurantById, addProductToCart } from "../api/restaurantAPI";
import Button from "../assets/shared/Button";

export default function Restaurant() {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const client = JSON.parse(localStorage.getItem("client"));

  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${client.token}`,
      },
    };

    async function fetchData() {
      const response = await getRestaurantById(restaurantId, config);
      setRestaurant(response);
      setProducts(response.products);
    }

    fetchData();
  }, []);

  async function purchase(productId) {
    navigate(`/order/${productId}`);
  }

  function renderProducts() {
    console.log(products);
    if (products && products.length > 0) {
      return products.map((category) => {
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
                    <Button width={"90%"} content={"Adicionar ao carrinho"} />
                    <Button
                      width={"90%"}
                      onClick={() => purchase(product.productId)}
                      content={"Comprar"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      });
    } else {
      return "Estamos abastecendo a loja ainda. Fique atento ;)";
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
    padding: 20px;

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
      border-radius: 50%;
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
          align-items: center;
          border-radius: 2px;
          height: 300px;
          width: 200px;
          box-shadow: 2px 2px 2px 3px lightgray;

          .price {
            margin-top: 10px;
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
