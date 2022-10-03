import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginClient } from "../api/clientAPI";
import foodbg from "../assets/images/foodbgv2.jpg";
import logo from "../assets/images/logo.png";
import Button from "../assets/shared/Button";
import Input from "../assets/shared/Input";
import ClientContext from "../contexts/clientContext";

export default function Home() {
  const [clientData, setClientData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setClient } = useContext(ClientContext);

  async function handlerSubmit(e) {
    e.preventDefault();

    const client = await loginClient(clientData);

    if (client.token) {
      setClient({ ...client });
      const clientSerialized = JSON.stringify(client);
      localStorage.setItem("client", clientSerialized);
      navigate("/home");
    }
  }

  return (
    <>
      <Container>
        <LeftBarComponent>
          <img className="logo" src={logo} alt="logo" />
          <h2>
            Entre agora na sua conta <strong>Spotfood</strong>
          </h2>
          <form onSubmit={handlerSubmit}>
            <Input
              type={"email"}
              placeholder={"Email"}
              onChange={(e) =>
                setClientData({ ...clientData, email: e.target.value })
              }
            />
            <Input
              type={"password"}
              placeholder={"Senha"}
              onChange={(e) =>
                setClientData({ ...clientData, password: e.target.value })
              }
            />

            <Button type={"submit"} width={"80%"} content="Entrar" />
          </form>
          <Link to="/register">
            <h2>
              Não possui uma conta? <strong>Cadastre-se</strong>
            </h2>
          </Link>
        </LeftBarComponent>
        <MainContent>
          <img src={foodbg} alt="foodbg" />
        </MainContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
`;
const MainContent = styled.div`
  background-color: gray;
  width: 100%;
  height: 100vh;

  img {
    width: 100%;
    height: 100vh;
  }
`;

const LeftBarComponent = styled.div`
  background: white;
  height: 100vh;
  width: 380px;
  color: black;
  font-family: "Roboto";

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  padding-top: 20px;

  .logo {
    width: 200px;
  }

  h2 {
    margin-top: 10px;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;
