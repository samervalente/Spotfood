import styled from "styled-components"
import pana from "../assets/images/pana.png"
import amico from "../assets/images/amico.png"
import logo from "../assets/images/logo.png"

export default function Home(){

    return (
        <>  
            <Body>
                <div className="header">
                    <img src={logo} />
                </div>
               <div className="container">
               <div className="left-side">
                    <p className="title-time-to-eat">Chegou a hora de comer?!</p>
                
                    <img src={pana} />
                    <p className="description">Com a <strong>Spotfood</strong> você aproveita as melhores delícias culinárias do país, pertinho de você. No conforto da sua casa.</p>
                   <button className="registerButon">Quero comer</button>
                </div>
                <div className="right-side">
                    <p className="title-time-to-work">Chegou a hora de empreender?!</p>
                    
                    <img src={amico} />
                    <p className="description">Aventure-se na gastronomia e monste seu próprio empreendimento. Faça o mundo descobrir as suas melhores receitas. Está tudo aqui, à um clique de distância :)</p>
                
                    <button className="registerButon">Iniciar meu negócio</button>
                </div>
               </div>
            </Body>
        </>
    )
}


const Body = styled.div`
height: 100vh;
font-family: 'Roboto';
.header{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
     
}

.img-pana{
    width: 150px;
    height: 200px;
}


.container{
    display: flex;

   .left-side{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  
    height: calc(100vh - 250px);
    padding-left:20px;
    margin-top: 20px;
    img{
        width: 230px;
        height: 230px;
        margin-top:10px;
    }

    .title-time-to-eat{
        font-size: 40px;
    } 
   }

   .right-side{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: calc(100vh - 250px);
    padding-left:20px;
    margin-left:10px;

    .title-time-to-work{
        font-size: 40px;
    }

    img{
        width: 230px;
        height: 230px;
        margin-top:10px;
    }
   }

   button{
    background-color: orange;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    color:brown;
    width:50%;
    height: 50px;
    font-size: 22px;
    transition: all linear 0.5s;

    :hover{
        background-color: brown;
        color:white;
        cursor:pointer;
    }
   }

   .description{
    width: 50%;
    text-align: justify;
    color:gray;
    margin-top:10px;
   }

}





`