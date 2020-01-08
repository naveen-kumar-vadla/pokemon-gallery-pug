'use strict';

const { appendFileSync } = require('fs');
const pokemonData = require('./pokemonData');
const html = [
  '<div class="pokemon">\n<h3 class="pokemonName">',

  '</h3>\n<img src=',

  'alt=',

  '/>\n<h3 class="stats">STATISTICS</h3>\n<div class="type">\n',

  '\n</div>\n</div>'
];

const getId = id => {
  if (id < 10) return `#00${id}`;
  if (id < 100) return `#0${id}`;
  return `#${id}`;
};

const getHtml = (pokemonData, filePath) => {
  pokemonData.forEach(pokemon => {
    const types = pokemon.type.reduce((string, info) => {
      string += `<p>${info}</p>`;
      return string;
    }, '');
    const code =
      html[0] +
      getId(pokemon.id) +
      ' ' +
      pokemon.name +
      html[1] +
      `"${pokemon.art_url}"` +
      html[2] +
      `"${pokemon.name}Image"` +
      html[3] +
      types +
      html[4];
    appendFileSync(filePath, code, 'utf8');
  });
};

getHtml(pokemonData, './generatedHtml.html');
