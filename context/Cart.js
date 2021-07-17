import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const Cart = ({ children }) => {
    const getInitialCart = () => JSON.parse(localStorage.getItem("cart"));

    const [cart, setCart] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const initialCart = getInitialCart();
        if (initialCart) {
            setCart(initialCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        let newTotal = 0;
        cart.forEach(item => {
            newTotal += (item.price * item.qty);
        });
        setTotal(newTotal);
    }, [cart]);


    const clearCart = () => {
      localStorage.removeItem("cart");
      setCart([]);  
    }
    const addItemToCart = (product, qty = 1) => {
        const item = cart.find(i => i.id === product.id);
        if (item) {
            item.qty += qty;
            setCart([...cart]);
        } else {
            setCart([...cart, { ...product, qty }]);
        }
    };

    const openCart = () => {
        setIsOpen(true);
    }

    const closeCart = () => {
        setIsOpen(false);
    }

    const removeItemFromCart = (id) => {
        const newCart = cart.filter(item => {
            return item.id !== id
        });
        setCart(newCart);
    }
    const exposed = {
        cart,
        addItemToCart,
        removeItemFromCart,
        openCart,
        closeCart,
        isOpen,
        total,
        clearCart
    };

    return <Context.Provider value={exposed}>{children}</Context.Provider>;

}

export default Cart;