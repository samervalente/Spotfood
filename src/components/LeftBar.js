import styled from "styled-components";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdPaper } from "react-icons/io";
import {BsQuestionCircle} from "react-icons/bs"
import {RiLogoutCircleRFill} from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom";
import Hamburger from 'hamburger-react'

export default function LeftBar() {
  const client = JSON.parse(localStorage.getItem("client"));
  const navigate = useNavigate()
  const [isOpen, setOpen] = useState(false)

  function logout(){
    localStorage.removeItem("client")
    navigate("/")
  }
 
  return (
    <>
      
      <HamburguerContainer>
      <Link to="/home">
       <img className="logo" src={logo} alt="logo" />
      </Link>
        <Hamburger direction="right" className="hamburguer" toggled={isOpen} toggle={setOpen} />
      </HamburguerContainer>
      <LeftBarComponent isOpen={isOpen}>
        <div className="optionsBar">
            <div>
        <img className="logo" src={logo} alt="logo" />
        <div className="options">
          <div className="home">
            <AiOutlineHome className="icon" />
            <Link to="/home">
              <h2>Início</h2>
            </Link>
          </div>
          <div className="cart">
            <AiOutlineShoppingCart className="icon" />
            <Link to="/cart">
              <h2>Meu carrinho</h2>
            </Link>
          </div>
          <div className="orders">
            <IoMdPaper className="icon" />
            <Link to="/orders">
              <h2>Meus pedidos</h2>
            </Link>
          </div>
          <div className="favo">
            <BsQuestionCircle className="icon" />
            <h2>O que vou comer hoje?</h2>
          </div>
        </div>
        </div>
        <div className="userInfos">
          <div className="userProfile">
            <img className="userImgProfile" src={client.imageProfile} />
            <span>{client.name}</span>
          </div>
          <div className="div"></div>
          <span className="logout" onClick={() => logout()}>Logout <RiLogoutCircleRFill className="icon logout" /> </span>
        </div>
        </div>
        <div className="overlap" onClick={() => setOpen(false)}>

        </div>
      </LeftBarComponent>
    </>
  );
}

const HamburguerContainer = styled.div`

  display:none;
  @media (max-width: 768px){
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100px;
      padding:15px;

      a{
        
        height: 90%;
        width: 80%;

        img{
          height: 90%;
          width: 40%;
        }
      
      }
 
    }
  

`
const LeftBarComponent = styled.div`
  height: 100vh;
  display: flex;

  .optionsBar{
    background: white;
    width: 280px;
    color: black;
    box-shadow: 2px 2px 3px gray;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding:20px;
    font-family: 'Roboto';
    
  .logo {
    width: 180px;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:active {
    color: green;
  }

  .home,
  .cart,
  .orders,
  .favo {
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    width: 90%;
    cursor: pointer;
    align-items: flex-end;

    .icon {
      font-size: 22px;
      color: red;
    }

    h2 {
      margin-left: 10px;
      transition: all linear 0.2s;

      :hover {
        translate: 15px;
      }

      :active {
        color: orange;
      }
    }
  }

  .userInfos{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap:10px;

    .userProfile{
      display: flex;
      align-items: center;
      gap:10px;
      .userImgProfile{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    }

    .div{
      height: 30px;
      width: 2px;
      background-color: gray;
    }

    .logout{
      display:flex;
      align-items: center;
      gap:5px;
      cursor:pointer;

      color:red;

    .icon.logout{
      font-size:30px;
    }
    }
  }

  @media (max-width: 768px){
    width: 60%;
  }

  }
 

  @media (max-width: 768px){
    
      z-index: 1;
      position: fixed;
      display: ${props => props.isOpen ? "flex" : "none"};
      width: 100vw;
      height: 100vh;
      top:0;
      left:0;

      .overlap{
    height: 100vh;
    width: 40%;
    background-color: red;
    opacity: 0.8;
    overflow-y: none;
  }
  .home,
  .cart,
  .orders,
  .favo {
    h2, .icon{
    
      font-size:22px;
    }
  }
 
    }

 
`;
