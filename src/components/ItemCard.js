import { useEffect, useState } from 'react';
import '../styles/ItemCard.css';
import Price from './Price';

const CheckoutItemCard = (props) => {
    const {
        handleRemoveFromCart,
        item,
        quantity,
        handleCheckoutIncrement,
        handleCheckoutDecrement,
        handleQuantityChange,
    } = props;

    return (
        <article className="item-card">
            <h3>{formatName(item.name)}</h3>
            <img src={item.sprites.default} alt={formatName(item.name)} />
            <Price cost={item.cost} />
            <div>
                <DecrementButton
                    handleClick={() => handleCheckoutDecrement(item)}
                />
                <input
                    className="quantity-input"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e, item)}
                />
                <IncrementButton
                    handleClick={() => handleCheckoutIncrement(item)}
                />
                <RemoveFromCart
                    item={item}
                    handleRemoveFromCart={handleRemoveFromCart}
                />
            </div>
        </article>
    );
};

const ItemCard = (props) => {
    const { url, handleCartChange, isCheckout } = props;
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
                <Price cost={item.cost} />
                <div>
                    <DecrementButton handleClick={handleDecrementClick} />
                    <input
                        className="quantity-input"
                        value={itemQuantity}
                        onChange={handleQuantityChange}
                    />
                    <IncrementButton handleClick={handleIncrementClick} />
                    {isCheckout ? (
                        <RemoveFromCart
                            item={item}
                            handleRemoveFromCart={handleCartChange}
                        />
                    ) : (
                        <AddToCart
                            item={item}
                            quantity={itemQuantity}
                            handleAddToCart={handleCartChange}
                        />
                    )}
                </div>
            </article>
        );
    } else {
        return null;
    }
};

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

const RemoveFromCart = (props) => {
    const { item, handleRemoveFromCart } = props;

    return (
        <button
            className="remove-from-cart"
            onClick={() => handleRemoveFromCart(item)}
        >
            Remove From Cart
        </button>
    );
};

export { CheckoutItemCard, ItemCard };
