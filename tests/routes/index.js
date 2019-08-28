const server = require('../../src/server');
const request = require('supertest');
const { expect } = require('chai');

describe('User Routes', () => {
  const testUser = {
    email: 'testuser@example.com',
    password: 'testUser123',
    name: 'Test User'
  };

  it('POST /v1/user should register a new user', (done) => {
    request(server)
      .post('/v1/user')
      .set('Accept', 'application/json')
      .send({
        email: testUser.email,
        password: testUser.password,
        passwordConfirm: testUser.password,
        name: testUser.name
      })
      .expect(200)
      .expect(res => {
        expect(res.body.data.email).to.equal(testUser.email);
      })
      .end(done);
  });

  it('POST /v1/user should return 400 on bad email', (done) => {
    request(server)
      .post('/v1/user')
      .set('Accept', 'application/json')
      .send({
        email: 'bademail@example',
        password: testUser.password,
        passwordConfirm: testUser.password,
        name: testUser.name
      })
      .expect(400)
      .end(done);
  });
});
