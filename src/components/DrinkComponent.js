import styled from "styled-components";



export default function Foods(){
    return(
        <>
            <Container>
                <div className="foodLabel">
                    <h2>Pizzas</h2>
                    <div className="foodContainer">
                        <div className="foodContent">
                            <img className="foodImage" />
                            <h3 className="foodName"></h3>
                            <p className="foodPrice"></p>
                            <p className="foodDescription"></p>
                        </div>
                    </div>
                </div>
                
            </Container>
        </>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;


`