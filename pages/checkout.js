import Page from "../components/styled/Page";
import useCart from "../hooks/useCart";
import styled from "styled-components";


const Item = styled.li`
list-style:none;
display:flex;
justify-content:space-between;
border-bottom: 1px solid #efefef;
margin-bottom:1rem;
`;

const Ul = styled.ul`
padding:0;
`;

const Total = styled.p`
display:flex;
justify-content:space-between;
font-weight:600;
font-size:1.5rem;
`;

const Button = styled.button`
background:linear-gradient(to right, #56ab2f, #a8e063);
font-size: 2rem;
color:inherit;
outline:none;
border:none;
width:100%;
padding:1rem;
color:white;
&:hover {
    cursor: pointer;
}
`;



const Checkout = () => {
    const { cart,total } = useCart();
    const processPayment = () => {
        console.log("process payment");
    }
 
    return (
        <Page>
            <h2>paiement</h2>
            {cart.length > 0 ? (
                <>
                    <Ul>
                        {cart.map(item => {
                            return <Item>
                                <span>{item.qty}x {item.name}</span>
                                <span>{item.price} €</span>
                            </Item>
                        })}
                    </Ul>
                    <Total>
                        <span>Total</span>
                        <span>{total} €</span></Total>
                    <Button onClick={processPayment}>Payer</Button>
                </>
            ) : (
                <p>Vous n'avez aucun produit dans votre panier</p>
            )}
        </Page>
    )
}

export default Checkout;