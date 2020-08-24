const pokemons = require('../resources/pokemonData');

const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

const serveHome = (req, res) => {
  res.render('home', { pokemons });
};

module.exports = { logger, serveHome };
