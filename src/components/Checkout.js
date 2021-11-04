import { CheckoutItemCard } from './ItemCard';
import Price from './Price';
import '../styles/Checkout.css';

const Checkout = (props) => {
    const {
        cartItems,
        handleRemoveFromCart,
        handleCheckoutIncrement,
        handleCheckoutDecrement,
        handleQuantityChange,
    } = props;

    const cartItemsSet = [...new Set(cartItems)];

    let totalCost = 0;
    cartItems.forEach((item) => {
        totalCost += item.cost;
    });

    return (
        <section>
            <div className="section-title">
                <h2>YOUR CART</h2>
            </div>
            <div id="total-cost">
                <strong>Total Cost:</strong> <Price cost={totalCost} />
            </div>

            <div id="cart-items-container">
                {cartItemsSet.map((cartItem) => {
                    const thisItemInCart = cartItems.filter(
                        (item) => item === cartItem
                    );

                    return (
                        <CheckoutItemCard
                            key={cartItem.id}
                            item={cartItem}
                            quantity={thisItemInCart.length}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleCheckoutDecrement={handleCheckoutDecrement}
                            handleCheckoutIncrement={handleCheckoutIncrement}
                            handleQuantityChange={handleQuantityChange}
                        />
                    );
                })}
            </div>

            <div id="checkout-and-pay-container">
                <button id="checkout-and-pay">Checkout and Pay</button>
            </div>
        </section>
    );
};

export default Checkout;
