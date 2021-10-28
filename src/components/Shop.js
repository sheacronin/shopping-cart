import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ItemCard, CategoryCard } from './ItemCard';
import bag from '../img/bag.png';
import '../styles/Shop.css';

const CategoriesShop = (props) => {
    useEffect(() => {
        const fetchItemCategories = async () => {
            const response = await fetch(
                'https://pokeapi.co/api/v2/item-category/?limit=45'
            );
            const data = await response.json();
            const categories = data.results.filter(
                (category) =>
                    category.name === 'standard-balls' ||
                    category.name === 'stat-boosts' ||
                    category.name === 'medicine' ||
                    category.name === 'healing' ||
                    category.name === 'pp-recovery' ||
                    category.name === 'revival'
            );
            console.log(categories);
            setItemCategories(categories);
        };

        fetchItemCategories();
    }, []);

    const [itemCategories, setItemCategories] = useState([]);

    const { numOfItemsInCart, handleAddToCart } = props;

    return (
        <section id="shop">
            <h1>Shop</h1>
            <CartPreview numOfItemsInCart={numOfItemsInCart} />
            <div id="item-cards-container">
                {itemCategories.map((category) => (
                    <CategoryCard
                        key={category.name}
                        url={category.url}
                        handleCartChange={handleAddToCart}
                    />
                ))}
            </div>
        </section>
    );
};

const ItemsShop = (props) => {
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
                        handleCartChange={handleAddToCart}
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

export default CategoriesShop;
