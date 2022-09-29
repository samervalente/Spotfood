import styled from "styled-components"
import { Link } from "react-router-dom"
import foodbg from "../assets/images/foodbgv2.jpg"
import logo from "../assets/images/logo.png"
import Button from "../assets/shared/Button"
import Input from "../assets/shared/Input"
export default function Home(){


    return(
        <>
        <Container>
            <LeftBarComponent>
            <img className="logo" src={logo} alt="logo"/>
            <h2>Entre agora na sua conta <strong>Spotfood</strong></h2>
            <Input placeholder={"Email"} />
            <Input placeholder={"Senha"} />
            <Button width={"80%"} content="Entrar" />

            <Link to="/register">
                <h2>Não possui uma conta? <strong>Cadastre-se</strong></h2>
            </Link>
            </LeftBarComponent>
            <MainContent>
                <img src={foodbg} alt="foodbg"/>
            </MainContent>
        </Container>
          
        </>
    )
}


const Container = styled.div`
display: flex;
`
const MainContent = styled.div`
background-color: gray;
width: 100%;
height: 100vh;

img{
    width: 100%;
    height: 100vh;
}
`

const LeftBarComponent = styled.div`
background:white;
height:100vh;
width: 380px;
color:black;
font-family: 'Roboto';

display: flex;
flex-direction: column;
justify-content: center;
padding-left:20px;
padding-top: 20px;

.logo{
    width: 200px;
}

h2{
    margin-top:10px
}



a{
    text-decoration: none;
    color:black;
    
}


`
