import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerClient } from "../api/clientAPI";
import pana from "../assets/images/pana.png";
import logo from "../assets/images/logo.png";
import Button from "../assets/shared/Button";
import Input from "../assets/shared/Input";

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
    console.log(clientData);
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
            <img src={pana} alt="panaimg" />
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

              <button type="submit" data-test-id="button-register-register">
                Registrar
              </button>
            </form>

            <h2>
              Já possui uma conta? Faça{" "}
              <strong>
                <Link to="/">Login</Link>
              </strong>
            </h2>
          </div>
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
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header {
    width: 150px;
    height: 150px;
  }

  .forms {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    outline: none;
    border-radius: 5px;
    margin-top: 10px;
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
`;
