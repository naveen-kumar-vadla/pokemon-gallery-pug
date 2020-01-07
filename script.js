'use strict';

const { appendFileSync } = require('fs');
const pokemonData = require('./pokemon');
const html = [
  '<div class="pokemon">\n<h3 class="pokemonName">',

  '</h3>\n<img src=',

  ' alt=',

  '/>\n<p class="description">\n',

  '\n</p>\n</div>'
];

const getHtml = () => {
  pokemonData.forEach(pokemon => {
    const code =
      html[0] +
      pokemon.name +
      html[1] +
      `"${pokemon.art_url}"` +
      html[2] +
      `"${pokemon.name}Image"` +
      html[3] +
      pokemon.description +
      html[4];
    appendFileSync('./generatedHtml.html', code, 'utf8');
  });
};

getHtml();
