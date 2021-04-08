import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import PokemonDetailView from "./PokemonDetailView";

/**
 * /*
 Task 1: Create a Pokemon List View

 Render the first 151 pokemon with their name & number

 Task 2: Create a Pokemon Details View

 When Clicking a pokemon we want to see details about
 the pokemon, let’s start by first showing it’s
 type & photo

 Provided material:

 https://pokeapi.co/docs/v2

 */

function App() {
    const [loading, setLoading] = React.useState(true);
    const [pokemon, setPokemon] = React.useState([]);
    const [selectedPokemon, setSelectedPokemon] = React.useState(null);

    React.useEffect(() => {
        console.log('using effect!!!');
        axios.request({
            url: 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0',
            method: 'get'
        }).then(res => {
            setLoading(false);
            const {data: {results}} = res;
            setPokemon(results);
        }).catch(err => {
            console.error('BIG PROBLEMS', err);
        });
    }, []);

    const handleClick = (id) => setSelectedPokemon(id);

    return (
        <div className="App">
          {loading ? <div>Loading</div> : <header className="App-header">
                {selectedPokemon ? <PokemonDetailView id={selectedPokemon}/> : null}
                <ul>
                    {pokemon.map((p, idx) => (
                        <a href={'#'} onClick={() => handleClick(idx + 1)} key={idx}>
                            <li>
                                {idx + 1} - {p.name}
                            </li>
                        </a>
                    ))}
                </ul>
            </header>}
        </div>
    );
}

export default App;
