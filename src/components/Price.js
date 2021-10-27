import pokedollar from '../img/pokedollar.png';

const Price = (props) => {
    const { cost } = props;

    return (
        <div className="cost">
            <img src={pokedollar} alt="Pokémon Dollar symbol" />
            {cost}
        </div>
    );
};

export default Price;
