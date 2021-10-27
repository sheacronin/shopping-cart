import { CheckoutItemCard } from './ItemCard';
import Price from './Price';

const Checkout = (props) => {
    const { cartItems, handleRemoveFromCart } = props;

    const cartItemsSet = [...new Set(cartItems)];
    console.log(cartItemsSet);

    let totalCost = 0;
    cartItems.forEach((item) => {
        totalCost += item.cost;
    });

    return (
        <section>
            <h2>Your Cart</h2>
            <Price cost={totalCost} />

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
                    />
                );
            })}

            <button>Checkout and Pay</button>
        </section>
    );
};

export default Checkout;
