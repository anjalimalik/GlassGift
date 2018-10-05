const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')

let should = chai.should()
chai.use(chaiHttp)

describe('Testing Actions on an NGO account', () => {
  let ngo = {
    email: 'testngo@gmail.com',
    password: 'testngo',
	  location: "test NGO location",
  }

  it('Test NGO registration', (done) => {
    chai.request(server)
      .post('/ngo')
      .set('content-type', 'application/json')
      .send(ngo)
      .end((err, res) => {
        if (err) console.error('Error: NGO registration failed')
        res.should.have.status(200) // 500 for error
        done()
      })
  })

  it('Test duplicate NGO registration', (done) => {
    chai.request(server)
      .post('/ngo')
      .set('content-type', 'application/json')
      .send(ngo)
      .end((err, res) => {
        if (err) { console.error('Error: NGO duplicate registration failed') }
        res.body.should.have.property('error').that.equals('Already exists')
        done()
      })
  })

  it('Test NGO login', (done) => {
    chai.request(server)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: ngo.email,
        password: ngo.password
      })
      .end((err, res) => {
        if (err) console.error('Error: NGO login')
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('token')
        res.body.should.have.property('user')

        // store id and token from response for subsequent tests
        ngo.id = res.body.user.id
        ngo.token = res.body.token
        done()
      })
  })

  it('Test get NGO account information', (done) => {
    chai.request(server)
      .get('/ngo')
      .set('Authorization', ngo.token)
      .query({id: ngo.id}) 
      .send()
      .end((err, res) => {
        if (err) console.error('Error: get NGO account failed')
        res.should.have.status(200)
        res.should.have.a('object') // should return ngo account object
        done()
      })
  })

  let ngoUpdate = {
    location: "test NGO location",
    category: 0,
    description: "test",
    calendarLink: "test",
    minLimit: 0,
    maxLimit: 1,
  }

  let notice = {
    notice: "test",
  }

  it('Test NGO Update Info', (done) => {
    chai.request(server)
    .post('/ngo')
    .set('Authorization', ngo.token)
    .set('content-type', 'application/json')
    .send(ngoUpdate)
    .end((err, res) => {
      if (err) console.error('Error: NGO Update changes failed')
      res.should.have.status(200) // 500 for error
      done()
    })
  })

  it('Test NGO Update Notice', (done) => {
    chai.request(server)
    .post('/ngo/notice')
    .set('Authorization', ngo.token)
    .set('content-type', 'application/json')
    .send(notice)
    .end((err, res) => {
      if (err) console.error('Error: NGO Update notice failed')
      res.should.have.status(200) 
      done()
    })
  })

  it('Test NGO get Notice', (done) => {
    chai.request(server)
      .get('/ngo/notice')
      .set('Authorization', ngo.token)
      .query({id: ngo.id}) // query has user id
      .send() // empty body
      .end((err, res) => {
        if (err) console.error('Error: get notice failed')
        res.should.have.status(200)
        res.should.have.a('object') // should have notice in body
        done()
      })
  })

})
