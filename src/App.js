import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Shop from './components/Shop';
import Checkout from './components/Checkout';
import './App.css';

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    const removeOneItemFromCart = (item) => {
        setCartItems((prevState) => {
            const newState = [...prevState];
            const itemIndex = newState.findIndex(
                (cartItem) => cartItem === item
            );
            newState.splice(itemIndex, 1);
            return newState;
        });
    };

    const addOneItemToCart = (item) => {
        setCartItems((prevState) => {
            const newState = [...prevState];
            newState.push(item);
            return newState;
        });
    };

    const handleCheckoutQuantityChange = (e, item) => {
        const quantity = e.target.value;
        if (isNaN(quantity)) {
            return;
        }

        const itemsInCart = cartItems.filter((cartItem) => cartItem === item);
        const numOfItemsInCart = itemsInCart.quantity;

        if (quantity > numOfItemsInCart) {
            const quantityToAdd = quantity - numOfItemsInCart;
            for (let n = quantityToAdd; n > 0; n--) {
                addOneItemToCart(item);
            }
        } else if (quantity < numOfItemsInCart) {
            const quantityToRemove = numOfItemsInCart - quantity;
            for (let n = quantityToRemove; n > 0; n--) {
                removeOneItemFromCart(item);
            }
        }
    };

    const handleAddToCart = (item, quantity = 1) => {
        setCartItems((prevState) => {
            const newState = [...prevState];
            for (let n = quantity; n > 0; n--) {
                newState.push(item);
            }
            return newState;
        });
        console.log(cartItems);
    };

    const handleRemoveFromCart = (item) => {
        setCartItems((prevState) =>
            prevState.filter((cartItem) => cartItem !== item)
        );
    };

    return (
        <Router>
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/shop">
                    <Shop
                        numOfItemsInCart={cartItems.length}
                        handleAddToCart={handleAddToCart}
                    />
                </Route>
                <Route exact path="/checkout">
                    <Checkout
                        cartItems={cartItems}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleCheckoutDecrement={removeOneItemFromCart}
                        handleCheckoutIncrement={addOneItemToCart}
                        handleQuantityChange={handleCheckoutQuantityChange}
                    />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
