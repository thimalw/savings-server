const { expect } = require('chai');
const config = require('config');
const server = require('../src/server');

describe('Server', () => {
  it('Should be running on the current port', async () => {
    expect(server.port).to.equal(config.get('port'));
  });
});
