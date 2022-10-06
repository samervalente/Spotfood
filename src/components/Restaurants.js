import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllRestaurants, filterRestaurants } from "../api/restaurantAPI";
import {ButtonDefault} from "../assets/shared/Button";
import { getStates, getCity } from "../api/locationsAPI";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  const [uf, setUf] = useState("AC");
  const [statesList, setStatesList] = useState([]);
  const [fetchDependency, setFechDependency] = useState(false)
  const [cityList, setCityList] = useState([]);
  const [location, setLocation] = useState({
    state: "Acre",
    city: "Acrelândia",
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
  }, [fetchDependency]);

  useEffect(() => {});

  function exploreRestaurant(restaurantId) {
    navigate(`/restaurant/${restaurantId}`);
  }

  async function filterRestaurant() {
    location.state = location.state.trim();
    console.log(location)
    const response = await filterRestaurants(
      location.state,
      location.city,
      config
    );
     
    setRestaurants(response);
  }

  function renderRestaurants() {
    return restaurants.length > 0 ? restaurants.map((restaurant) => {
      return (
        <div
          className="restaurantContainer"
          data-test-id="div-restaurant"
          onClick={() => exploreRestaurant(restaurant.id)}
        >
          <img className="restaurantImage" src={restaurant.imageProfile} />
          <p className="restaurantName">{restaurant.name}</p>
          <p>Estado: <span className="location">{restaurant.state}</span></p>
          <p>Cidade: <span className="location">{restaurant.city}</span></p>
          <ButtonDefault>Explorar restaurante</ButtonDefault>
        </div>
      );
    }) : <div><p>Poxa! Não encontramos nenhum restaurante nesta localidade :(</p>
     
      <ButtonDefault className="back-home" onClick={() => setFechDependency(!fetchDependency)}>Continuar explorando</ButtonDefault>
     
    </div>
  }

  return (
    <>
      <Container>
        <div className="header">
        <h3 className="title">
          Os melhores restaurantes do Brasil estão aqui na{" "}
          <strong>Spotfood!</strong>
        </h3>
        <h2 className="found">Encontre o restaurante mais pertinho de você!</h2>
        <div className="filter">
        <span className="locationFilter">Estado</span>
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
          <span className="locationFilter">Cidade</span>
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
          <ButtonDefault
            className="filter"
            onClick={() => filterRestaurant()}
            data-test-id="button-filter"
          >
            Filtrar
          </ButtonDefault>
        </div>
        </div>
      
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


  .header{
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   gap:15px;
   width: 100%;
  }

  .found{
    font-size:20px;
    color:red;
    font-weight: bold;
  }

  .locationFilter{
    font-weight: bold;
    font-size: 16px;
    margin-right: 10px;
  }

  .filter {
    display: flex;
    justify-content: center;
  }

  .restaurants {
    display: flex;
    width: 100%;
   
    flex-wrap: wrap;
    gap: 40px;
  }

  .title {
    font-size: 25px;
  }

  .restaurantContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
    gap:10px;
    width: 220px;
    height: 350px;
    background-color: white;
    box-shadow: 2px 3px 3px 3px gray;
    border-radius: 5px;
    cursor: pointer;

    img {
      width: 100%;
      height: 200px;
      border-radius: 5px;
    }

      .location{
        color:red;
        font-weight: 500;
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


  button{
      width: 100%;
      background-color: red;
      color:white;
      border:none;
      border-radius: 5px;
      height: 30px;
      font-size:16px;
      transition: all linear 0.3s;
      cursor:pointer;
      :hover{
        background-color: orange;
        
        color:red;

      }
    }

    .filter{
      width: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .back-home{
      width: 50%;
      margin-top:10px
    }
`;
