const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')

let should = chai.should()
chai.use(chaiHttp)

describe('Testing registering donor account', () => {
  let donor = {
    email: 'test@gmail.com',
    password: 'test',
	  location: "test location",
  }

  it('Test donor registration', (done) => {
    chai.request(server)
      .post('/donor')
      .set('content-type', 'application/json')
      .send(donor)
      .end((err, res) => {
        if (err) console.error('Error: donor registration failed')
        res.should.have.status(200) // 500 for error
        done()
      })
  })

  it('Test duplicate donor registration', (done) => {
    chai.request(server)
      .post('/donor')
      .set('content-type', 'application/json')
      .send(donor)
      .end((err, res) => {
        if (err) {  console.error('Error: donor duplicate registration check failed') }
        res.body.should.have.property('error').that.equals('Already exists')
        done()
      })
  })

  it('Test donor login', (done) => {
    chai.request(server)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: donor.email,
        password: donor.password
      })
      .end((err, res) => {
        if (err) console.error('Error: donor login failed')
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('token')
        res.body.should.have.property('user')
        
        donor.id = res.body.user.id
        donor.token = res.body.token
        done()
      })
  })
})
