import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginClient } from "../api/clientAPI";
import foodbg from "../assets/images/foodbgv2.jpg";
import logo from "../assets/images/logo.png";
import { ButtonDefault } from "../assets/shared/Button";
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
        <LeftBarComponent className="bg">
          <img className="logo" src={logo} alt="logo" />
          <h2>
            Entre agora na sua conta <strong>Spotfood</strong>
          </h2>
          <form onSubmit={handlerSubmit}>
            <input
              className=""
              type="email"
              placeholder="email"
              data-test-id="input-login-email"
              onChange={(e) =>
                setClientData({ ...clientData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="password"
              data-test-id="input-login-password"
              onChange={(e) =>
                setClientData({ ...clientData, password: e.target.value })
              }
            />
            <ButtonDefault type="submit" data-test-id="button-login-enter">
              Entrar
            </ButtonDefault>
          </form>
          <Link to="/register">
            <h2>
              Não possui uma conta? <strong>Cadastre-se</strong>
            </h2>
          </Link>
        </LeftBarComponent>
        <MainContent>
          <img className="foodbg" src={foodbg} alt="foodbg" />
        </MainContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  background-color: blue;


  @media(max-width: 768px){
    width: 100%;
    flex-direction: column;
    background-image: url("https://thumbs.dreamstime.com/b/italian-food-background-different-types-pasta-health-vegetarian-concept-top-view-copy-space-italian-food-114155664.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }
`;
const MainContent = styled.div`
  background-color: gray;
  width: 100%;
  height: 100vh;

  img {
    width: 100%;
    height: 100vh;

  }

  @media(max-width: 768px){
    display: none;
    
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
  gap: 10px;
  padding: 20px;
 
  
  @media (max-width: 768px){
    width: 100vw;
    padding:10px;
    align-items: center;
    background:none;
    background-size: cover;
    
    
    h2{
      background-color: white;
      padding:10px;
      color:red;
      border-radius:5px;
    }
    
  }

  .logo {
    width: 200px;
  
  }

  input {
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: red;
    color: white;
    outline: none;
    padding: 10px;

    ::placeholder {
      color: white;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 90%;
  }

  h2 {
    margin-top: 10px;
  }

  a {
    text-decoration: none;
    color: black;
  }

  button {
    width: 100%;
    background-color: green;
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
`;
