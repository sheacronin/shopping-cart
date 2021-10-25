import bag from './img/bag.png';
import './Shop.css';

const Shop = () => {
    return (
        <section id="shop">
            <h1>Shop</h1>
            <CartPreview />
        </section>
    );
};

const CartPreview = () => {
    return (
        <div id="cart-preview">
            <img src={bag} alt="A bag" />
            <div id="num-of-items">1</div>
        </div>
    );
};

export default Shop;
