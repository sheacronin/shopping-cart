import { useEffect, useState } from 'react';
import '../styles/ItemCard.css';

const ItemCard = (props) => {
    const { url, handleAddToCart } = props;
    const [isReadyToRender, setIsReadyToRender] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setItem(data);
            setIsReadyToRender(true);
        };

        fetchItem();
    }, [url]);

    const [item, setItem] = useState({});

    const formatName = (name) => {
        const words = name.split('-');
        const capitalizedWords = [];

        words.forEach((word) => {
            let capitalizedWord = word[0].toUpperCase();
            capitalizedWord += word.slice(1);
            capitalizedWords.push(capitalizedWord);
        });

        return capitalizedWords.join(' ');
    };

    const [itemQuantity, setItemQuantity] = useState(0);
    const handleQuantityChange = (e) => {
        const quantity = e.target.value;
        if (isNaN(quantity)) {
            return;
        }

        setItemQuantity(quantity);
    };

    if (isReadyToRender) {
        return (
            <article className="item-card">
                <h3>{formatName(item.name)}</h3>
                <img src={item.sprites.default} alt={formatName(item.name)} />
                <div>
                    <DecrementButton />
                    <input
                        className="quantity-input"
                        value={itemQuantity}
                        onChange={handleQuantityChange}
                    />
                    <IncrementButton />
                    <AddToCart
                        item={item}
                        quantity={itemQuantity}
                        handleAddToCart={handleAddToCart}
                    />
                </div>
            </article>
        );
    } else {
        return null;
    }
};

const DecrementButton = () => {
    return <button className="decrement">-</button>;
};

const IncrementButton = () => {
    return <button className="increment">+</button>;
};

const AddToCart = (props) => {
    const { item, quantity, handleAddToCart } = props;
    return (
        <button
            className="add-to-cart"
            onClick={() => handleAddToCart(item, quantity)}
        >
            Add to Cart
        </button>
    );
};

export default ItemCard;
