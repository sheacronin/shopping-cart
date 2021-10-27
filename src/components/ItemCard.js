import { useEffect, useState } from 'react';
import '../styles/ItemCard.css';

const ItemCard = (props) => {
    const { url, handleAddToCart } = props;
    const [isReadyToRender, setIsReadyToRender] = useState(false);

    const [item, setItem] = useState(props.item);

    useEffect(() => {
        const fetchItem = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setItem(data);
            setIsReadyToRender(true);
        };

        if (!props.item) {
            fetchItem();
        } else {
            setIsReadyToRender(true);
        }
    }, [url, props.item]);

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

    const [itemQuantity, setItemQuantity] = useState('');

    useEffect(() => {
        if (props.quantity) {
            setItemQuantity(props.quantity);
        }
    }, [props.quantity]);

    const handleQuantityChange = (e) => {
        const quantity = e.target.value;
        if (isNaN(quantity)) {
            return;
        }

        setItemQuantity(quantity);
    };

    const handleDecrementClick = () => {
        if (itemQuantity > 0) {
            setItemQuantity((prevState) => {
                if (prevState) {
                    return parseInt(prevState) - 1;
                } else {
                    return 0;
                }
            });
        }
    };

    const handleIncrementClick = () => {
        setItemQuantity((prevState) => {
            if (prevState) {
                return parseInt(prevState) + 1;
            } else {
                return 1;
            }
        });
    };

    if (isReadyToRender) {
        return (
            <article className="item-card">
                <h3>{formatName(item.name)}</h3>
                <img src={item.sprites.default} alt={formatName(item.name)} />
                <div>
                    <DecrementButton handleClick={handleDecrementClick} />
                    <input
                        className="quantity-input"
                        value={itemQuantity}
                        onChange={handleQuantityChange}
                    />
                    <IncrementButton handleClick={handleIncrementClick} />
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

const DecrementButton = (props) => {
    const { handleClick } = props;
    return (
        <button className="decrement" onClick={handleClick}>
            -
        </button>
    );
};

const IncrementButton = (props) => {
    const { handleClick } = props;
    return (
        <button className="increment" onClick={handleClick}>
            +
        </button>
    );
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
