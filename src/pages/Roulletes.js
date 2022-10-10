import styled from "styled-components";
import { useState } from "react";
import LeftBar from "../components/LeftBar";
import Roullete from "../components/Roullete";

export default function Roulletes() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);



  return (
    <>
      <Container>
        <LeftBar />
        <RoulletesSection>
  
            <div className="wheelSection">
              <h1>Prato principal</h1>
                 
            </div>
            <div className="wheelSection">
              <h1>Sobremesa</h1>
              
            </div>
            <div className="wheelSection">
              <h1>Bebida</h1>
            </div>
         
        </RoulletesSection>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
 

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RoulletesSection = styled.div`
  display: flex;
  justify-content: center;
  z-index: -1;
  width: 80vw;
  height: 90vh;
  font-family: "Roboto";
  gap:20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .wheelSection {
    display: flex;
    width: 40%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding:20px;
    
  

    h1 {
      color: red;
      font-weight: bold;
      font-size: 2em;
    }
  }
`;
