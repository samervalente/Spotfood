import styled from "styled-components";
import LeftBar from "../components/LeftBar";
import Header from "../components/Header";
import Restaurants from "../components/Restaurants";
import { useEffect, useState, useContext } from "react";
import ClientContext from "../contexts/clientContext";
import { useNavigate } from "react-router-dom";

export default function HomeLogged() {
  const { client, setClient } = useContext(ClientContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!client.token || !client.imageProfile) {
  //     setClient({ ...client, page: "/home" });
  //     navigate("/");
  //     return;
  //   }
  // }, []);

  return (
    <>
      <Container>
        <LeftBar />
        <MainContent>
          <Header />
          <Restaurants />
        </MainContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const MainContent = styled.div`
  width: 100%;
  margin-left: 280px;
`;
