import styled from "styled-components";
import LeftBar from "../components/LeftBar";
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

  @media (max-width: 768px){
    flex-direction: column;
  }
  
`;
