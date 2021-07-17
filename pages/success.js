import Page from "../components/styled/Page"
import useCart from "../hooks/useCart"
import { useEffect } from "react";
const Success = () => {
    const { clearCart } = useCart();


    useEffect(() => {
        clearCart();
    }, []);

    
    return (
        <Page>
            <h2>Paiement réalisé avec succès</h2>
            <p>Merci pour votre achat sur la boutique</p>
        </Page>
    )
};


export default Success;