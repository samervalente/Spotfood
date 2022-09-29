import styled from "styled-components";
import SearchBar from "../assets/shared/SearchBar";
import pana from "../assets/images/pana.png"

export default function Header() {
  return (
    <>
      <HeaderComponent>
        <div className="userActions">
          <SearchBar />
          <UserProfile>
            <p>Olá, Samer!</p>
            <img src={pana} />
          </UserProfile>
        </div>
        <div className="options">
          <div className="option">Pizzas</div>
          <div className="option">Hamburguers</div>
          <div className="option">Sobremesas</div>
          <div className="option">Sushi</div>
          <div className="option">Bebidas</div>
          <div className="option">Mariscos</div>
        </div>
      </HeaderComponent>
    </>
  );
}

const HeaderComponent = styled.div`
  width: 100%;
  height: 130px;
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .userActions {
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 95%;

    .option {
      color: red;
      width: 10%;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      font-size: 15px;
      border-radius: 25px;
      background-color: white;
      cursor: pointer;
    }
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  color:white;
  font-family: 'Roboto';

  p{
    margin-right: 10px;
  }
  img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border:2px solid white;
  }
`;
