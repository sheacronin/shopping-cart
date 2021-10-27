import ItemCard from './ItemCard';

const Checkout = (props) => {
    const { cartItems } = props;

    const cartItemsSet = [...new Set(cartItems)];
    console.log(cartItemsSet);

    return (
        <section>
            <h2>Checkout</h2>
            {cartItemsSet.map((cartItem) => {
                const thisItemInCart = cartItems.filter(
                    (item) => item === cartItem
                );

                return (
                    <ItemCard
                        key={cartItem.id}
                        item={cartItem}
                        quantity={thisItemInCart.length}
                    />
                );
            })}
        </section>
    );
};

export default Checkout;
