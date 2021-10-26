import { useEffect, useState } from 'react';
import './ItemCard.css';

const ItemCard = (props) => {
    useEffect(() => {
        fetchItem();
    }, []);

    const [item, setItem] = useState({});

    const { url } = props;

    const fetchItem = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setItem(data);
        console.log(data);
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

    return (
        <article className="item-card">
            <h3>{formatName(item.name)}</h3>
            <img src={item.sprites.default} alt={formatName(item.name)} />
        </article>
    );
};

export default ItemCard;
