import ItemCard from './ItemCard';

const Checkout = (props) => {
    const { cartItems } = props;

    const cartItemsSet = [...new Set(cartItems)];
    console.log(cartItemsSet);

    return (
        <section>
            <h2>Checkout</h2>
            {cartItemsSet.map((cartItem) => (
                <ItemCard key={cartItem.id} item={cartItem} />
            ))}
        </section>
    );
};

export default Checkout;
