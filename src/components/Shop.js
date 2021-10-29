import { useEffect, useState } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { CategoryCard } from './ItemCard';
import CartPreview from './CartPreview';
import ShopCategory from './ShopCategory';
import '../styles/Shop.css';

const Shop = (props) => {
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
            setItemCategories(categories);
        };

        fetchItemCategories();
    }, []);

    const [itemCategories, setItemCategories] = useState([]);

    const { numOfItemsInCart, handleAddToCart } = props;

    let match = useRouteMatch();

    return (
        <section id="shop">
            <h1>Shop</h1>
            <CartPreview numOfItemsInCart={numOfItemsInCart} />
            <Switch>
                <Route exact path={match.path}>
                    <div id="item-cards-container">
                        {itemCategories.map((category) => (
                            <Link
                                to={`${match.path}/${category.name}`}
                                key={category.name}
                            >
                                <CategoryCard url={category.url} />
                            </Link>
                        ))}
                    </div>
                </Route>
                <Route path={`${match.path}/:category`}>
                    <ShopCategory handleAddToCart={handleAddToCart} />
                </Route>
            </Switch>
        </section>
    );
};

export default Shop;
