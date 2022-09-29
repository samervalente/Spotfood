import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import ClientContext from "../contexts/clientContext";
import { getAllRestaurants } from "../api/restaurantAPI";
import Button from "../assets/shared/Button";
import { getStates, getCity } from "../api/locationsAPI";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const { client } = useContext(ClientContext);
  const [uf, setUf] = useState("AC");
  const [city, setCity] = useState("");
  const [statesList, setStatesList] = useState([]);
  const [cityList, setCityList] = useState([]);

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

  function renderRestaurants() {
    return restaurants.map((restaurant) => {
      return (
        <div className="restaurantContainer">
          <img className="restaurantImage" src={restaurant.imageProfile} />
          <p className="restaurantName">{restaurant.name}</p>
          <div className="location">
            <span className="city">{restaurant.city} -</span>
            <span className="state">{restaurant.states.name}</span>
            <Button width="100%" content="Explorar restaurante" />
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <Container>
        <div className="filter">
          <div className="select">
            <select
              value={uf}
              onChange={(e) => {
                setUf(e.target.value);
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
                className="selectCity"
                onChange={(e) => setCity(e.target.value)}
              >
                {cityList.map((city) => {
                  return <option>{city.nome}</option>;
                })}
              </select>
            ) : (
              ""
            )}
          </div>
          <Button width={"10%"} content={"Filtrar"} />
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
  flex-wrap: wrap;
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
    gap: 50px;
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
    // A reset of styles, including removing the default dropdown arrow
    appearance: none;
    // Additional resets for further consistency
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
