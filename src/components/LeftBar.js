import styled from "styled-components";
import logo from "../assets/images/logo.png"
import {AiOutlineHome, AiOutlineShoppingCart} from "react-icons/ai"
import {IoMdPaper} from "react-icons/io"
import {MdOutlineFavoriteBorder} from "react-icons/md"
import { Link } from "react-router-dom";

export default function LeftBar(){
    return(
        <>
           <LeftBarComponent>
               <img className="logo" src={logo} alt="logo"/>
               <div className="options">
                    <div className="home">
                        <AiOutlineHome className="icon"/>
                       <Link to="/">
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
                        <MdOutlineFavoriteBorder className="icon" />
                        <h2>Favoritos</h2>
                    </div>
               </div>
           </LeftBarComponent>
        </>
    )
}

const LeftBarComponent = styled.div`
background:white;
height:100vh;
width: 280px;
color:black;


display: flex;
flex-direction: column;
padding-left:20px;
padding-top: 20px;

.logo{
    width: 180px;
}

a{
    text-decoration: none;
    color:black;
    
}

a:active{
  
    color:green;
  
}

.home, .cart, .orders, .favo{
    margin-top:30px;
    display: flex;
    justify-content: flex-start;
    width: 70%;
    cursor: pointer;
    font-family: 'Roboto';
    align-items: flex-end;
   
    .icon{
        font-size:22px;
        color:red;
    }

    h2{
        margin-left:10px;
        transition: all linear 0.2s;
        
        :hover{
            translate: 15px;
          
        }

        :active{
            color:orange;
        }
    }
}



`