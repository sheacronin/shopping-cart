import pokemart from '../img/pokemart.png';
import '../styles/Home.css';

const Home = () => {
    return (
        <section id="home">
            <div className="section-title">
                <h2>HOME</h2>
            </div>
            <p>
                Welcome to the Poké Mart, where you can purchase items to assist
                you on your adventure through the Pokémon world!
            </p>
            <img src={pokemart} alt="Pokémart icon" id="pokemart"></img>
        </section>
    );
};

export default Home;
