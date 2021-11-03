import { useParams } from 'react-router';
import { ItemCard } from './ItemCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ShopCategory = (props) => {
    const { handleAddToCart } = props;
    const { category } = useParams();

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/item-category/${category}`
            );
            const data = await response.json();
            console.log(data);
            setItems(data.items);
        };

        fetchItems();
    }, [category]);

    const [items, setItems] = useState([]);

    return (
        <div>
            <Link to="/shop" className="back-btn-link">
                <button className="back-btn">← Back</button>
            </Link>
            <div id="item-cards-container">
                {items.map((item) => (
                    <ItemCard
                        key={item.name}
                        url={item.url}
                        handleCartChange={handleAddToCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default ShopCategory;
