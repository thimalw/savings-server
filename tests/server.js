const { expect } = require('chai');
const mongoose = require('mongoose');
const config = require('config');

process.env.NODE_ENV = 'test';
const server = require('../src/server');

before((done) => {
  mongoose.connection.once('open', () => {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
});

describe('Server', () => {
  it('Should be running on the current port', async () => {
    expect(server.port).to.equal(config.get('port'));
  });
});
