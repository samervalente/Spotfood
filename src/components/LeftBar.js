import styled from "styled-components";
import logo from "../assets/images/logo.png";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdPaper } from "react-icons/io";
import {BsQuestionCircle} from "react-icons/bs"
import {RiLogoutCircleRFill} from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom";


export default function LeftBar() {
  const client = JSON.parse(localStorage.getItem("client"));
  const navigate = useNavigate()

  function logout(){
    localStorage.removeItem("client")
    navigate("/")
  }

  return (
    <>
      <LeftBarComponent>
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
      </LeftBarComponent>
    </>
  );
}

const LeftBarComponent = styled.div`
  background: white;
  height: 100vh;
  width: 280px;
  color: black;
  box-shadow: 2px 2px 3px gray;
  position: fixed;
  left: 0;
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
`;
