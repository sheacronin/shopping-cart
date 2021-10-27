import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Shop from './components/Shop';
import Checkout from './components/Checkout';
import './App.css';

const App = () => {
    const [cartItems, setCartItems] = useState([]);
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
                    <Checkout cartItems={cartItems} />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
