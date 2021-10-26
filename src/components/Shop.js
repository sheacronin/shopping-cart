import { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import bag from '../img/bag.png';
import '../styles/Shop.css';

const Shop = () => {
    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/item/');
            const data = await response.json();

            setItems(data.results);
        };

        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (item, quantity = 1) => {
        setCartItems((prevState) => {
            const newState = [...prevState];
            for (let n = quantity; n > 0; n--) {
                newState.push(item);
            }
            return newState;
        });
        console.log(cartItems);
    };

    return (
        <section id="shop">
            <h1>Shop</h1>
            <CartPreview numOfItemsInCart={cartItems.length} />
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
            <button id="checkout-btn">Checkout</button>
        </div>
    );
};

export default Shop;
