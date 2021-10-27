import ItemCard from './ItemCard';
import Price from './Price';

const Checkout = (props) => {
    const { cartItems } = props;

    const cartItemsSet = [...new Set(cartItems)];
    console.log(cartItemsSet);

    let totalCost = 0;
    cartItems.forEach((item) => {
        totalCost += item.cost;
    });

    return (
        <section>
            <h2>Checkout</h2>
            <Price cost={totalCost} />

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
