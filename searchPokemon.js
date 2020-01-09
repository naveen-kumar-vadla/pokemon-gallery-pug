const filterPokemons = (pokemon, text) => {
  const pokemonName = pokemon.children[0].innerText.toLowerCase();
  return pokemonName.includes(text);
};
const searchPokemon = () => {
  const text = document.getElementById('searchBox').value.toLowerCase();
  const allPokemons = Array.from(document.getElementsByClassName('pokemon'));
  allPokemons.forEach(pokemon => (pokemon.style['display'] = 'none'));
  const filteredPokemons = allPokemons.filter(pokemon =>
    filterPokemons(pokemon, text)
  );
  filteredPokemons.forEach(pokemon => (pokemon.style['display'] = 'flex'));
};
