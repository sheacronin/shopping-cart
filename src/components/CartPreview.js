import { Link } from 'react-router-dom';
import bag from '../img/bag.png';

const CartPreview = (props) => {
    const { numOfItemsInCart } = props;

    return (
        <div id="cart-preview">
            <img src={bag} alt="A bag" />
            <div id="num-of-items">{numOfItemsInCart}</div>
            <Link to="/shopping-cart/checkout">
                <button id="checkout-btn">Checkout</button>
            </Link>
        </div>
    );
};

export default CartPreview;
