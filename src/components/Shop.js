import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';
import bag from '../img/bag.png';
import '../styles/Shop.css';

const Shop = (props) => {
    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/item/');
            const data = await response.json();

            setItems(data.results);
        };

        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const { numOfItemsInCart, handleAddToCart } = props;

    return (
        <section id="shop">
            <h1>Shop</h1>
            <CartPreview numOfItemsInCart={numOfItemsInCart} />
            <div id="item-cards-container">
                {items.map((item) => (
                    <ItemCard
                        key={item.name}
                        url={item.url}
                        handleAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </section>
    );
};

const CartPreview = (props) => {
    const { numOfItemsInCart } = props;

    return (
        <div id="cart-preview">
            <img src={bag} alt="A bag" />
            <div id="num-of-items">{numOfItemsInCart}</div>
            <Link to="/checkout">
                <button id="checkout-btn">Checkout</button>
            </Link>
        </div>
    );
};

export default Shop;
