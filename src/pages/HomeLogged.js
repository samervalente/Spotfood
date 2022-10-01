import styled from "styled-components";
import LeftBar from "../components/LeftBar";
import Header from "../components/Header";
import Restaurants from "../components/Restaurants";

export default function HomeLogged() {
 
  return (
    <>
      <Container>
        <LeftBar />
  
          <Restaurants />
       
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
`;

