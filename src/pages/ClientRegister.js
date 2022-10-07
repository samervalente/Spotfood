import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerClient } from "../api/clientAPI";
import pana from "../assets/images/pana.png";
import logo from "../assets/images/logo.png";
import {ButtonDefault} from "../assets/shared/Button";


export default function ClientRegister() {
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    imageProfile: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handlerSubmit(e) {
    
    e.preventDefault();
    if (clientData.password !== confirmPassword) {
      return alert("As senhas devem ser iguais.");
    }
    const status = await registerClient(clientData);
    if (status === 201) {
      navigate("/");
    }
  }

  return (
    <>
      <Body>
        <div className="container">
          <div className="header">
            <img src={logo} alt="logoimg" />
          </div>
          
          <div className="forms">
          <img className="pana" src={pana} alt="panaimg" />
            <form onSubmit={handlerSubmit}>
              <input
                placeholder="Nome"
                data-test-id="input-register-name"
                onChange={(e) =>
                  setClientData({ ...clientData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                data-test-id="input-register-email"
                onChange={(e) =>
                  setClientData({ ...clientData, email: e.target.value })
                }
              />
              <input
                placeholder="URL da imagem do perfil"
                data-test-id="input-register-avatar"
                onChange={(e) =>
                  setClientData({ ...clientData, imageProfile: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Senha"
                data-test-id="input-register-password"
                onChange={(e) =>
                  setClientData({ ...clientData, password: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Confirmação de senha"
                data-test-id="input-register-confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <ButtonDefault type="submit" data-test-id="button-register-register">
                Registrar
              </ButtonDefault>
            </form>

      
          </div>
          <h2>
              Já possui uma conta? Faça{" "}
              <strong>
                <Link to="/">Login</Link>
              </strong>
            </h2>
        </div>
      </Body>
    </>
  );
}

const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:20px;
   
  }

  .header {
    width: 150px;
    height: 100%;
  
  }

  .forms {
   
    display: flex;
    gap:20px;
    align-items: center;
    justify-content: center;
  }


  input{
    width: 100%;
    height:30px;
    border:none;
    border-radius: 5px;
    background-color: red;
    color:white;
    outline:none;
    padding:10px;

    ::placeholder{
      color:white;
    }
  }

  form{
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:12px;
  }

  h2 {
    margin-top: 10px;
  }

  a {
    text-decoration: none;
  }

  a:visited {
    color: red;
  }


  button{
      width: 100%;
      background-color: green;
      color:white;
      border:none;
      border-radius: 5px;
      height: 30px;
      font-size:16px;
      transition: all linear 0.3s;
      cursor:pointer;
      margin-top:10px;
      :hover{
        background-color: orange;
        color:red;

      }
    }

    @media (max-width:768px){
      .pana{
        display: none;
      }

      .header{
        width: 100%;
        display: flex;
        justify-content: center;
        img{
          width: 50%;
          height: 60px;
        }
      }

      .forms{
        width: 100%;
      }
    }
`;
