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

const fillTemplate = (template, propertyBag) => {
  const replaceKeyWithValue = (template, key) => {
    const pattern = new RegExp(`__${key}__`, 'g');
    return template.replace(pattern, propertyBag[key]);
  };
  const keys = Object.keys(propertyBag);
  const html = keys.reduce(replaceKeyWithValue, template);
  return html;
};

const pokemonCardTemplate = `
<div class="pokemon" id="__name__">
<div class="pokeCard-heading">
<h3 class="backName">__name__</h3>
<h3 class="backName">#__id__</h3>
</div>
<img src="./images/__id__.png" " alt=" __name__ Image" class="pokemon-image"/>
    <table class=".table" align="center">__base__</table>
    <div class="types">__type__</div>
</div>`;

const generatePokemonHtmlCode = (htmlCode, pokemon) => {
  pokemon.id = getId(pokemon.id);
  pokemon.type = pokemon.type.reduce(getTypeCode, '');
  pokemon.base = getTableCode(pokemon.base);
  return htmlCode + fillTemplate(pokemonCardTemplate, pokemon);
};

const displayPokemonCards = resText => {
  const pokemonData = JSON.parse(resText);
  const pokemonContainer = document.querySelector('.pokemonContainer');
  pokemonContainer.innerHTML = pokemonData.reduce(generatePokemonHtmlCode, '');
};

const main = () => {
  sendXHR('GET', './resources/pokemonData.json', '', displayPokemonCards);
};

window.onload = main();
