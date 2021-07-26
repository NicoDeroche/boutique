import Page from "../components/styled/Page";
import useCart from "../hooks/useCart";
import styled from "styled-components";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';

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
    const { cart, total } = useCart();
    const processPayment = async () => {
        const newCart = cart.map(({ id, qty }) => ({ id, qty }));
        const url = '/.netlify/functions/charge-card';
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
        const { data } = await axios.post(url, { cart: newCart });
        await stripe.redirectToCheckout({ sessionId: data.id });
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