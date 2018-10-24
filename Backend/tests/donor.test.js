const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing registering donor account', () => {
  let donor = {
    email: 'test@gmail.com',
    password: 'test',
	  location: "test location",
  };

  it('POST - Test donor registration', (done) => {
    chai.request(server)
      .post('/donor')
      .set('content-type', 'application/json')
      .send(donor)
      .end((err, res) => {
        if (err) console.error('Error: donor registration failed');
        res.should.have.status(200); // 500 for error
        expect(err).to.be.null;
        done()
      })
  });

  it('POST - Test duplicate donor registration', (done) => {
    chai.request(server)
      .post('/donor')
      .set('content-type', 'application/json')
      .send(donor)
      .end((err, res) => {
        res.body.should.have.property('error').that.equals('Already exists');
        done()
      })
  });

  it('POST - Test donor login', (done) => {
    chai.request(server)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: donor.email,
        password: donor.password
      })
      .end((err, res) => {
        if (err) console.error('Error: donor login failed');
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        res.body.should.have.property('user');
        expect(err).to.be.null;

        donor.id = res.body.user.id;
        donor.token = res.body.token;
        done()
      });
  });

  it('Adding payment methods stores them for the future')
});
