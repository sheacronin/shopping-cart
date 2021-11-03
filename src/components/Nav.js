import { Link } from 'react-router-dom';
import '../styles/Nav.css';

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">HOME</Link>
                </li>
                <li>
                    <Link to="/shop">SHOP</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
