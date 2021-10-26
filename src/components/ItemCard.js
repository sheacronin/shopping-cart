import { useEffect, useState } from 'react';
import '../styles/ItemCard.css';

const ItemCard = (props) => {
    const { url } = props;
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

    if (isReadyToRender) {
        return (
            <article className="item-card">
                <h3>{formatName(item.name)}</h3>
                <img src={item.sprites.default} alt={formatName(item.name)} />
                <div>
                    <button>-</button>
                    <input className="quantity-input"></input>
                    <button>+</button>
                </div>
            </article>
        );
    } else {
        return null;
    }
};

export default ItemCard;
