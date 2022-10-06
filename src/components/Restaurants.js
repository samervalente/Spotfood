import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRestaurants, filterRestaurants } from "../api/restaurantAPI";
import Button from "../assets/shared/Button";
import { getStates, getCity } from "../api/locationsAPI";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  const [uf, setUf] = useState("AC");
  const [statesList, setStatesList] = useState([]);

  const [cityList, setCityList] = useState([]);
  const [location, setLocation] = useState({
    state: "",
    city: "",
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
      const response = await getStates();
      setStatesList(response);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const sigla = uf.split("-")[0];
      const response = await getCity(sigla);
      setCityList(response);
    }
    fetchData();
  }, [uf]);

  useEffect(() => {
    async function fetchData() {
      const restaurants = await getAllRestaurants(config);
      setRestaurants(restaurants);
    }
    fetchData();
  }, []);

  useEffect(() => {});

  function exploreRestaurant(restaurantId) {
    navigate(`/restaurant/${restaurantId}`);
  }

  async function filterRestaurant() {
    location.state = location.state.trim();
    const response = await filterRestaurants(
      location.state,
      location.city,
      config
    );
    console.log(response);
    setRestaurants(response);
  }

  function renderRestaurants() {
    return restaurants.map((restaurant) => {
      return (
        <div
          className="restaurantContainer"
          data-test-id="div-restaurant"
          onClick={() => exploreRestaurant(restaurant.id)}
        >
          <img className="restaurantImage" src={restaurant.imageProfile} />
          <p className="restaurantName">{restaurant.name}</p>
          <div className="location">
            <span className="city">{restaurant.city} -</span>
            <span className="state">{restaurant.state}</span>
            <Button width="100%" content="Explorar restaurante" />
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <Container>
        <h2>Encontre o restaurante mais pertinho de você!</h2>
        <div className="filter">
          <div className="select">
            <select
              data-test-id="select-states"
              value={uf}
              onChange={(e) => {
                setUf(e.target.value);
                const state = e.target.value.split("-")[1];
                setLocation({ ...location, state });
              }}
            >
              {statesList.map((state) => {
                return (
                  <option className="selectState">
                    {state.sigla} - {state.nome}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="select">
            {cityList.length > 0 ? (
              <select
                data-test-id="select-city"
                className="selectCity"
                onChange={(e) => {
                  setLocation({ ...location, city: e.target.value });
                }}
              >
                {cityList.map((city) => {
                  return <option>{city.nome}</option>;
                })}
              </select>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={() => filterRestaurant()}
            data-test-id="button-filter"
          >
            Filtrar
          </button>
        </div>
        <h3 className="title">
          Os melhores restaurantes do Brasil estão aqui na{" "}
          <strong>Spotfood!</strong>
        </h3>
        <div className="restaurants">{renderRestaurants()}</div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 280px;
  height: 100vh;
  padding: 50px;
  gap: 50px;
  font-family: "Roboto";

  .filter {
    display: flex;
    align-items: center;
  }

  .restaurants {
    display: flex;

    flex-wrap: wrap;
    gap: 70px;
  }

  .title {
    font-size: 25px;
  }

  .restaurantContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 220px;
    height: 300px;
    background-color: white;
    box-shadow: 2px 3px 3px 3px gray;
    border-radius: 5px;
    cursor: pointer;

    img {
      width: 200px;
      height: 200px;
      border-radius: 5px;
    }

    .restaurantName {
      margin-top: 20px;
    }

    .location {
      margin-top: 10px;
    }

    .city {
      margin-right: 5px;
    }

    .state {
      color: red;
      font-weight: bold;
    }
  }

  select {
    appearance: none;
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;

    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    outline: none;
  }

  select::-ms-expand {
    display: none;
  }

  .select {
    width: 100%;
    min-width: 15ch;
    max-width: 30ch;
    border: 1px solid var(--select-border);
    border-radius: 0.25em;
    padding: 0.25em 0.5em;
    font-size: 1.25rem;
    cursor: pointer;
    line-height: 1.1;
    background-color: #fff;
    background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
    display: grid;
    grid-template-areas: "select";
    align-items: center;
    margin-right: 10px;
  }

  .select::after {
    content: "";
    width: 0.8em;
    height: 0.5em;
    background-color: var(--select-arrow);
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }

  select,
  .select:after {
    grid-area: select;
    justify-self: end;
  }

  .selectState {
    font-family: "Arial";
    border-bottom: 2px solid black;
  }
`;
