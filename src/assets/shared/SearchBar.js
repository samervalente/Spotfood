import styled from "styled-components";


export default function SearchBar(){
    return (
        <>
            <SearchBarComponent />
        </>
    )
}


const SearchBarComponent = styled.input`
width: 30%;
height: 30px;
background-color: white;
border-radius: 8px;
border: none;
box-shadow: 2px 2px  black;
outline: none;

`
