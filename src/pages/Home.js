import styled from "styled-components";
import pana from "../assets/images/pana.png";
import amico from "../assets/images/amico.png";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import Button from "../assets/shared/Button";

export default function Home() {
  return (
    <>
      <Body>
        <div className="header">
          <img src={logo} />
          <div>
          <Link to="/clients/login">
            <p>
                Entrar como <strong>cliente</strong>
              </p>
          </Link>
            <p>
              Entrar como <strong>restaurante</strong>
            </p>
          </div>
        </div>
        <div className="container">
          <div className="left-side">
            <p className="title-time-to-eat">Chegou a hora de comer?!</p>

            <img src={pana} />
            <p className="description">
              Com a <strong>Spotfood</strong> você aproveita as melhores
              delícias culinárias do país, pertinho de você. No conforto da sua
              casa.
            </p>
            <Link to="/clients/register">
              <Button content={"Quero comer"} />
            </Link>
          </div>
          <div className="right-side">
            <p className="title-time-to-work">Chegou a hora de empreender?!</p>

            <img src={amico} />
            <p className="description">
              Aventure-se na gastronomia e monste seu próprio empreendimento.
              Faça o mundo descobrir as suas melhores receitas. Está tudo aqui,
              à um clique de distância :)
            </p>

            <Link to="/restaurants/register">
              <Button content={"Quero iniciar meu negócio"} />
            </Link>
          </div>
        </div>
      </Body>
    </>
  );
}

const Body = styled.div`
  height: 100vh;
  font-family: "Roboto";
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;

    img {
      margin-left: 50px;
    }

    p {
      background-color: brown;
      color: white;
      padding: 10px;
      border-radius: 5px;
      margin-top: 10px;
      margin-right: 100px;
      cursor: pointer;
      transition: all 0.3s;
      :hover {
        color: orange;
      }
    }
  }

  .img-pana {
    width: 150px;
    height: 200px;
  }

  .container {
    display: flex;

    .left-side {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      height: calc(100vh - 250px);
      padding-left: 20px;
      margin-top: 20px;
      img {
        width: 230px;
        height: 230px;
        margin-top: 10px;
      }

      .title-time-to-eat {
        font-size: 40px;
      }
    }

    .right-side {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      height: calc(100vh - 250px);
      padding-left: 20px;
      margin-left: 10px;

      .title-time-to-work {
        font-size: 40px;
      }

      img {
        width: 230px;
        height: 230px;
        margin-top: 10px;
      }
    }

    .description {
      width: 50%;
      text-align: justify;
      color: gray;
      margin-top: 10px;
    }
  }

  a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      width: 100%;
    }
`;
