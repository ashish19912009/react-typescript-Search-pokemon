import React from 'react';
import './App.css';
import PokemonSearch from './components/Pokemon';

function App() {
  return (
    <div className="App">
      <p>
        <PokemonSearch Username={'Ashish'} numberOfPokemon={10}/>
      </p>
    </div>
  );
}

export default App;
