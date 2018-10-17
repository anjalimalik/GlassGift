const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')

let should = chai.should()
let expect = chai.expect;
chai.use(chaiHttp)

describe('Testing Reset Password, Confirm Password, and Confirm Account', () => {
  let user = {
    email: 'test@gmail.com',
    password: 'test',
    id: '',
    token: ''
  }

  it('POST - Test Reset Password', (done) => {
    chai.request(server)
      .post('/reset_password')
      .set('content-type', 'application/json')
      .send({ email: user.email })
      .end((err, res) => {
        if (err) console.error('Error: Reset password failed')
        res.should.have.status(200)
        expect(err).to.be.null;
        done()
      })
  })

  // TO GET TOKEN
  it('POST - Test User login', (done) => {
    chai.request(server)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: user.email,
        password: user.password,
      })
      .end((err, res) => {
        if (err) console.error('Error: User login')
        res.should.have.status(200)
        res.body.should.have.property('token')
        res.body.should.have.property('user')
        expect(err).to.be.null;

        // store id and token from response for subsequent tests
        user.id = res.body.user.id
        user.token = res.body.token
        done()
      })
  })

  it('POST - Test Confirm Password', (done) => {
    chai.request(server)
      .post('/confirm_password')
      .set('content-type', 'application/json')
      .send({
        token: user.token,
        password: user.password,
      })
      .end((err, res) => {
        if (err) console.error('Error: Confirm password failed')
        res.should.have.status(200)
        expect(err).to.be.null;
        done()
      })
  })

  it('POST - Test Confirm Account', (done) => {
    chai.request(server)
      .post('/confirm_account')
      .set('content-type', 'application/json')
      .send({
        token: user.token,
      })
      .end((err, res) => {
        if (err) console.error('Error: Confirm account failed')
        res.should.have.status(200)
        expect(err).to.be.null;
        done()
      })
  })

})
