'use strict';

const { writeFileSync } = require('fs');
const pokemonData = require('./pokemonData');
const html = [
  '<div class="pokemon">\n<div class="pokemonName">\n<p>',
  //name
  '</p><p>',
  //id
  '</div>\n<img src=',
  //img url
  'alt=',
  //name
  '/>\n<div class="type">\n',
  //types
  '\n</div>\n</div>'
];

const getTypeCode = (string, type) => {
  string += `<p>${type}</p>`;
  return string;
};

const generatePokemonHtmlCode = (htmlCode, pokemon) => {
  const types = pokemon.type.reduce(getTypeCode, '');
  htmlCode +=
    html[0] +
    pokemon.name +
    html[1] +
    `#${pokemon.num}` +
    html[2] +
    `"${pokemon.art_url}"` +
    html[3] +
    `"${pokemon.name}Image"` +
    html[4] +
    types +
    html[5];
  return htmlCode;
};

const getHtml = () => {
  const htmlCode = pokemonData.reduce(generatePokemonHtmlCode, '');
  writeFileSync('./generatedHtml.html', htmlCode, 'utf8');
};

getHtml();
