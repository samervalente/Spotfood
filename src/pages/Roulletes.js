import styled from "styled-components";
import { useState } from "react";
import LeftBar from "../components/LeftBar";
import { Wheel } from "react-custom-roulette";
import { plates, desserts, drinks } from "../data/RoulleteData";

export default function Roulletes() {
  const [mustSpin, setMustSpin] = useState({
    plates:false,
    desserts:false,
    drinks:false
  });
  const [prizeNumber, setPrizeNumber] = useState(0);



  const handlePlatesSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * plates.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin({...mustSpin, plates:true})
  }

  const handleDessertsSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * desserts.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin({...mustSpin, desserts:true})
  }

  const handleDrinksSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * drinks.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin({...mustSpin, drinks:true})
  }

  return (
    <>
      <Container>
        <LeftBar />
        <RoulletesSection>
          <div className="wheelSection">
            <h1>Prato principal</h1>
            <div className="wheel-wraper">
              <Wheel
                mustStartSpinning={mustSpin.plates}
                prizeNumber={prizeNumber}
                data={plates}
                outerBorderColor={"green"}
                innerBorderColor={"green"}
                onStopSpinning={() => {
                  setMustSpin({...mustSpin, plates:false});
                }}
                backgroundColors={["white", "red"]}
                textColors={["red","white"]}
              />
              
            </div>
            <button onClick={() => handlePlatesSpinClick()}>Girar</button>
          </div>
          <div className="wheelSection">
            <h1>Sobremesa</h1>
            <div className="wheel-wraper">
              <Wheel
                mustStartSpinning={mustSpin.desserts}
                prizeNumber={prizeNumber}
                data={desserts}
                onStopSpinning={() => {
                  setMustSpin({...mustSpin, desserts:false});
                }}
                outerBorderColor={"pink"}
                innerBorderColor="pink"
                backgroundColors={["white", "brown"]}
                textColors={["red","white"]}
              />
              
            </div>
            <button onClick={() => handleDessertsSpinClick()}>Girar</button>
          </div>
          <div className="wheelSection">
            <h1>Bebida</h1>
            <div className="wheel-wraper">
              <Wheel
                mustStartSpinning={mustSpin.drinks}
                prizeNumber={prizeNumber}
                data={drinks}
                onStopSpinning={() => {
                  setMustSpin({...mustSpin, drinks:false});
                }}
                outerBorderColor={"red"}
                backgroundColors={["white", "orange"]}
                textColors={["red","white"]}
              />
              
            </div>
            <button onClick={() => handleDrinksSpinClick()}>Girar</button>
          </div>
        </RoulletesSection>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;

   overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RoulletesSection = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  height: 90vh;
  font-family: "Roboto";
  overflow: hidden;
 
  button{
    background-color: red;
    color:white;
    border:none;
    border-radius: 5px;
    padding:10px;
    width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;

    cursor:pointer;

    :hover{
      background-color: green;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    z-index: -1;
   
  }

  .wheelSection {
    display: flex;
    width: 40%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap:10px;

    .wheel-wraper {
     width: 300px;
     height: 300px;

     > div {
          height: 100%;
          width: 100%;
          max-height: unset;
          max-width: unset;
     }
}


    h1 {
      color: red;
      font-weight: bold;
      font-size: 2em;
    }
  }
`;
