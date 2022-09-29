import styled from "styled-components";
import { Link } from "react-router-dom";
import pana from "../assets/images/pana.png"
import logo from "../assets/images/logo.png"
import Button from "../assets/shared/Button";
import Input from "../assets/shared/Input";

export default function ClientRegister(){
    return (
        <>
            <Body>
               <div className="container">
                    <div className="header">
                        <img src={logo} alt="logoimg"/>
                     
                    </div>
                    <div className="forms">
                    <img src={pana} alt="panaimg" />
                        <form>
                            <Input placeholder={"Nome"} />
                            <Input placeholder={"CPF"} />
                            <Input placeholder={"Email"} />
                            <Input placeholder={"Password"} />
                            <Button width={'80%'} type={"submit"} content={"Registrar-se"} />
                            <h2>Já possui uma conta? Faça <strong>
                                <Link to="/">
                                    Login
                                </Link></strong></h2>
                        </form>
                       
                    </div>
               </div>
            </Body>
        </>
    )
}




const Body = styled.div`
width: 100%;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
font-family: 'Roboto';

.container{
    width: 70%;
    display:flex;
    flex-direction: column;
    align-items: center;
}

.header{
    width: 150px;
    height: 150px;
}

.forms{
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
  
}

input{
    outline: none;
    border-radius: 5px;
    margin-top:10px;
}


h2{
    margin-top:10px;
}

a{
    text-decoration: none;
}

a:visited{
    color:red;
}

`