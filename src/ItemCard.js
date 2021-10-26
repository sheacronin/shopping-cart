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

    return (
        <article className="item-card">
            <h3>{item.name}</h3>
            <img src={item.sprites.default} alt={item.name} />
        </article>
    );
};

export default ItemCard;
