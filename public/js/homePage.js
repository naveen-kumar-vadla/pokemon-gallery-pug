'use strict';

const STATUS_CODES = { OK: 200 };

const sendXHR = (method, url, message, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onload = function() {
    if (this.status === STATUS_CODES.OK) {
      callback(this.responseText);
    }
  };
  xhr.send(message);
};

const getTypeCode = (string, type) => {
  string += `<div class="type"><div class="${type}"></div>${type}</div>`;
  return string;
};

const getId = id => {
  if (id < 10) return `00${id}`;
  if (id < 100) return `0${id}`;
  return `${id}`;
};

const getTableCode = poke => {
  return `<tr><th>HP</th><td>${poke.HP}</td></tr>
  <tr><th>ATTACK</th><td>${poke.Attack}</td></tr>
  <tr><th>DEFENCE</th><td>${poke.Defense}</td></tr>
  <tr><th>SPEED</th><td>${poke.Speed}</td></tr>
  <tr><th>SPECIAL ATTACK</th><td>${poke['Sp. Attack']}</td></tr>
  <tr><th>SPECIAL DEFENCE</th><td>${poke['Sp. Defense']}</td></tr>`;
};

const generatePokemonHtmlCode = (htmlCode, pokemon) => {
  const types = pokemon.type.reduce(getTypeCode, '');
  htmlCode +=
    html[0] +
    pokemon.name +
    html[1] +
    pokemon.name +
    html[2] +
    getId(pokemon.id) +
    html[3] +
    `./images/${getId(pokemon.id)}.png` +
    html[4] +
    pokemon.name +
    html[5] +
    types +
    html[6] +
    pokemon.name +
    html[7] +
    getTableCode(pokemon.base) +
    html[8];

  return htmlCode;
};


const html = [
  '<div class="pokemon" id="',
  //Bulbasaur
  '"><div class="pokeCard-heading"><h3 class="pokemonName">',
  //Bulbasaur
  '</h3><h3 class="pokemonName">#',
  //001
  '</h3></div><img src="',
  ///Users/vadlanaveenkumar/naveen/projects/html/pokemon/images/001.png"
  '" alt="',
  //Bulbasaur
  'Image"/><div class="pokemonInfo"><div class="types">',
  //   <div class="type">
  //     <div class="Grass"></div>Grass
  //   </div>
  //   <div class="type">
  //     <div class="Poison"></div>Poison
  //   </div>
  // </div>
  '</div><div class="pokemonBack"><div class="icon"><i class="material-icons">info_outline</i></div><h3 class="backName">',
  //Bulbasaur
  '</h3><table class=".table" align="center">',
  // <tr>
  //   <th>HP</th>
  //         <td>45</td>
  //       </tr>
  //       <tr>
  //         <th>ATTACK</th>
  //         <td>49</td>
  //       </tr>
  //       <tr>
  //         <th>DEFENCE</th>
  //         <td>49</td>
  //       </tr>
  //       <tr>
  //         <th>SPEED</th>
  //         <td>45</td>
  //       </tr>
  //       <tr>
  //         <th>SPECIAL ATTACK</th>
  //         <td>65</td>
  //       </tr>
  //       <tr>
  //         <th>SPECIAL DEFENCE</th>
  //         <td>65</td>
  //       </tr>
  '</table></div></div></div>'
];

const getHtml = pokemonData => pokemonData.reduce(generatePokemonHtmlCode, '');
 
const displayPokemonCards = resText => {
  const pokemonData = JSON.parse(resText);
  const pokemonContainer = document.querySelector('.pokemonContainer');
  pokemonContainer.innerHTML = getHtml(pokemonData);
};

const main = () => sendXHR('GET', './data/pokemonData.json', '', displayPokemonCards);

window.onload = main();
