'use strict';
const request = require('supertest');

const app = require('../lib/app');

describe('GET', () => {
  describe('FILE NOT FOUND', () => {
    it('Should give file not found if file not exist', done => {
      request(app)
        .get('/badFile')
        .set('Accept', '*/*')
        .expect(404)
        .expect('Content-Type', /html/)
        .expect('Content-Length', '146')
        .expect(/\/badFile/, done);
    });
  });
  describe('/', () => {
    it('Should give home page with pokemons data', done => {
      request(app)
        .get('/')
        .set('Accept', '*/*')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect('Content-Length', '527473')
        .expect(/Bulbasaur/, done);
    });
  });
});
describe('POST', () => {
  describe('FILE NOT FOUND', () => {
    it('Should give file not found if file not exist', done => {
      request(app)
        .post('/badFile')
        .set('Accept', '*/*')
        .send('{ "name":"raja", "comment":"wonderful+site" }')
        .expect(404)
        .expect('Content-Type', /html/)
        .expect('Content-Length', '147')
        .expect(/\/badFile/, done);
    });
  });
});
describe('METHOD NOT ALLOWED', () => {
  it('Should should give method not allowed for put method ', done => {
    request(app)
      .put('/')
      .set('Accept', '*/*')
      .expect(404)
      .expect('Content-Type', /html/)
      .expect('Content-Length', '139')
      .expect(/Cannot PUT/, done);
  });
  it('Should should give method not allowed for delete method ', done => {
    request(app)
      .delete('/')
      .set('Accept', '*/*')
      .expect(404)
      .expect('Content-Type', /html/)
      .expect('Content-Length', '142')
      .expect(/Cannot DELETE/, done);
  });
});