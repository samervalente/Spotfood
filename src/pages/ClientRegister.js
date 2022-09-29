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
              <Input
                placeholder={"Nome"}
                onChange={(e) =>
                  setClientData({ ...clientData, name: e.target.value })
                }
              />

              <Input
                type="email"
                placeholder={"Email"}
                onChange={(e) =>
                  setClientData({ ...clientData, email: e.target.value })
                }
              />

              <Input
                placeholder={"URL da imagem de perfil"}
                onChange={(e) =>
                  setClientData({ ...clientData, imageProfile: e.target.value })
                }
              />

              <Input
                type="password"
                placeholder={"Senha"}
                onChange={(e) =>
                  setClientData({ ...clientData, password: e.target.value })
                }
              />

              <Input
                type="password"
                placeholder={"Confirme a senha"}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button width={"80%"} type={"submit"} content={"Registrar-se"} />
              <h2>
                Já possui uma conta? Faça{" "}
                <strong>
                  <Link to="/">Login</Link>
                </strong>
              </h2>
            </form>
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
