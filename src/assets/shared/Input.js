import styled from "styled-components";

export default function Input({placeholder, onChange}){
    return (
        <InputComponent placeholder={placeholder} onChange={onChange} />
    )
}


const InputComponent = styled.input`
border-radius: 5px;
border: 2px solid red;
margin:10px 0px;
height: 40px;
width: 80%;
background-color: white;


`

