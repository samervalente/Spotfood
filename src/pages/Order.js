import styled  from "styled-components";
import LeftBar from "../components/LeftBar";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, registerPurchase } from "../api/productsAPI";
import Button from "../assets/shared/Button";
import Input from "../assets/shared/Input"

export default function Order(){
    const { id } = useParams();
    const client = JSON.parse(localStorage.getItem("client"))
    const [product, setProduct] = useState({})
    const [amount, setAmount] = useState(1)
    const [isOrderFinished, setIsOrderFinished] = useState(false)
    
    const order = {
        products:[
            {
                productId:id,
                amount
            }
        ],
        totalValue:product.price*amount
    }

    const config = {
        headers:{
            authorization:`Bearer ${client.token}`
        }
    }

    useEffect(() => {
        async function fetchData(){
            const response = await getProductById(id, config)
            setProduct(response)
        }
        fetchData()
      
    },[])

    function addAmount(action){
        if(action === "add"){
            setAmount(amount+1)
            
            
        }else if(action === "minus" && amount !== 1){
            setAmount(amount-1)
        }
    }
   
    async function handlerPurchase(e){
        e.preventDefault()
        console.log(order)
        await registerPurchase(order, config)
        setIsOrderFinished(true)
    }

    return (
        <>
            <Container>
                <LeftBar />
                <MainContent>
                    {product.price ? <div className="orderContainer">
                        {!isOrderFinished ? <>
                            <div className="orderInfos">
                         <h2>Informações da compra</h2>
                         <div className="productInfos">
                            <img src={product.imageUrl} />
                            <p>Produto: {product.name}</p>
                            <p className="price">Preço unitário: R$ {(product.price).toFixed(2).replace(".",",")}</p>
                           <div className="addAmount">
                           <span>Quantidade: {amount}</span> 
                           <button onClick={() => addAmount("add")} className="amount">+</button> 
                           <button onClick={() => addAmount("minus")}  className="amount">-</button>
                           </div>
                           <h3>Total: <span className="total">R$ {(amount*product.price).toFixed(2).replace(".",",")}</span></h3>
                        </div>

                       
                         </div>
                         <div className="adress">
                            <h2>Informações de entrega</h2>
                            <form onSubmit={handlerPurchase}>
                                <Input placeholder={"CEP"} required />
                                <Input placeholder={"Número"} required />
                                <Input placeholder={"Complemento"} required />
                                <Input placeholder={"Enviar observação (opcional)"} />
                                <Button type={"submit"} width={"50%"} content={"Finalizar compra"} /> 
                            </form>
                           
                         </div>
                        </> : <div className="thanks">
                                <h2>Agradecemos pela compra. Volte sempre! =)</h2>
                                <Link to="/home">
                                    <Button content={"Voltar para a home"} />
                                </Link>
                                <Link to="/orders">
                                    <Button content={"Visualizar meus pedidos"} />
                                </Link>
                                <Link to="/cart">
                                    <Button content={"Visualizar meu carrinho"} />
                                </Link>
                             </div>}
                    </div>:  "Carregando..."}
                   
                </MainContent>
            </Container>
        </>

    )
}

const Container = styled.div`

display: flex;

`

const MainContent = styled.div`
margin-left:280px;
background-color: red;
width: 100%;
height: 100vh;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

    .orderContainer{
        display: flex;
      
        padding:20px;
        background-color: white;
        height: 400px;
        width: 60%;
        border-radius: 8px;
        box-shadow: 2px 2px 4px 2px brown;
        font-family: 'Roboto';
      

        h2{
            font-size:25px;
        }

        h3{
            margin-top:10px;
        }
        .total{
                font-size:20px;
                color:red;
                font-weight: bold;
           }

        display: flex;
        gap:20px;

        .orderInfos{
            border-right:2px solid lightgray;
            padding-right: 10px;
        }

        .productInfos{
          display: flex;
          flex-direction: column;
           align-items: flex-start;
           gap:10px;
           border-radius: 2px;
           height: 300px;
           width: 250px;
          
          
          
          .price{
          }

                img{
                    height: 100px;
                    border-radius: 5px;
           }

          
        }

        .addAmount{
            width: 100%;
            height: 20px;
            display: flex;
            align-items: center;
            gap: 10px;

            .amount{
                border: none;
                border-radius: 5px;
                background-color: red;
                color:white;
                cursor:pointer;
                font-size:20px;
                width: 25px;
        }
          
        }
        }
      
        .thanks{
            display: flex;
            flex-direction: column;
            align-items:center ;
            justify-content: center;
        }
      

`