import { useEffect, useState } from 'react';
import bag from './img/bag.png';
import './Shop.css';

const Shop = () => {
    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/item/');
        const data = await response.json();

        setItems(data.results);
    };

    return (
        <section id="shop">
            <h1>Shop</h1>
            <CartPreview />
            {items.map((item) => (
                <div key={item.name}>{item.name}</div>
            ))}
        </section>
    );
};

const CartPreview = () => {
    return (
        <div id="cart-preview">
            <img src={bag} alt="A bag" />
            <div id="num-of-items">1</div>
            <button id="checkout-btn">Checkout</button>
        </div>
    );
};

export default Shop;
