import pokemart from './img/pokemart.png';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>
                Welcome to the Pokémart, where you can purchase items to assist
                you on your adventure through the Pokémon world!
            </p>
            <img src={pokemart} alt="Pokémart icon" id="pokemart"></img>
        </div>
    );
};

export default Home;
