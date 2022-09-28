import styled from "styled-components";

export default function Input({placeholder}){
    return (
        <InputComponent placeholder={placeholder} />
    )
}


const InputComponent = styled.input`

border:2px solid orange;
height: 40px;
width: 120%;
background-color: white;


`

