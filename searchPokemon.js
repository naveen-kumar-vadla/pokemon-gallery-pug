const filterPokemon = (pokemon, text) => {
  const pokemonName = pokemon.innerText.toLowerCase();
  return pokemonName.includes(text);
};
const displayPokemon = text => {
  const allPokemon = Array.from(document.getElementsByClassName('pokemon'));
  allPokemon.forEach(pokemon => (pokemon.style['display'] = 'none'));
  const filteredPokemon = allPokemon.filter(pokemon =>
    filterPokemon(pokemon, text)
  );
  filteredPokemon.forEach(pokemon => (pokemon.style['display'] = 'flex'));
};

const searchPokemon = () => {
  const text = document.getElementById('searchBox').value.toLowerCase();
  displayPokemon(text);
};
