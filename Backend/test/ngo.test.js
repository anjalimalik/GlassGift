const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

let expect = chai.expect;
chai.use(chaiHttp);

xdescribe('Testing Actions on an NGO account', function() {
    const ngo = {
        email: 'testngo@gmail.com',
        password: 'testngo',
        location: "test NGO location",
    };

    it('POST - Test NGO registration', function() {
        chai.request(server)
            .post('/ngo')
            .set('content-type', 'application/json')
            .send(ngo)
            .end(function(err, res) {
                if (err) console.error('Error: NGO registration failed');
                expect(res).to.have.property('status', 200); // 500 for error
                expect(err).to.be(null);
            });
    });

    it('POST - Test duplicate NGO registration', function() {
        chai.request(server)
            .post('/ngo')
            .set('content-type', 'application/json')
            .send(ngo)
            .end(function(err, res) {
                expect(res.body).to.have.property('error', 'Already exists');
            });
    });

    it('POST - Test NGO login', function() {
        chai.request(server)
            .post('/login')
            .set('content-type', 'application/json')
            .send({
                email: ngo.email,
                password: ngo.password
            })
            .end(function(err, res) {
                if (err) console.error('Error: NGO login');
                expect(res).to.have.property('status', 200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('user');
                expect(err).to.be(null);

                // store id and token from response for subsequent tests
                ngo.id = res.body.user.id;
                ngo.token = res.body.token;
            });
    });

    it('GET - Test get NGO account information', function() {
        chai.request(server)
            .get('/ngo')
            .set('Authorization', ngo.token)
            .query({id: ngo.id})
            .send()
            .end(function(err, res) {
                if (err) console.error('Error: get NGO account failed');
                expect(res).to.have.property('status', 200);
                expect(res).to.have.a('object'); // should return ngo account object
                expect(err).to.be(null);
            });
    });

    const ngoUpdate = {
        location: "test NGO location",
        category: 0,
        description: "test",
        calendarLink: "test",
        minLimit: 0,
        maxLimit: 1,
    };

    const notice = {
        notice: "test",
    };

    it('PUT - Test NGO Update Info', function() {
        chai.request(server)
            .put('/ngo/')
            .set('Authorization', ngo.token)
            .set('content-type', 'application/json')
            .send(ngoUpdate)
            .end(function(err, res) {
                if (err) console.error('Error: NGO Update changes failed');
                expect(res).to.have.property('status', 200); // 500 for error
                expect(err).to.be(null);
            });
    });

    it('PUT - Test NGO Update Notice', function() {
        chai.request(server)
            .put('/ngo/notice')
            .set('Authorization', ngo.token)
            .set('content-type', 'application/json')
            .send(notice)
            .end(function(err, res) {
                if (err) console.error('Error: NGO Update notice failed');
                expect(res).to.have.property('status', 200);
                expect(err).to.be(null);
            });
    });

    it('GET - Test NGO get Notice', function() {
        chai.request(server)
            .get('/ngo/notice')
            .set('Authorization', ngo.token)
            .query({id: ngo.id}) // query has user id
            .send() // empty body
            .end(function(err, res) {
                if (err) console.error('Error: get notice failed');
                expect(res).to.have.property('status', 200);
                expect(res).to.have.a('object'); // should have notice in body
                expect(err).to.be(null);
            });
    });

    it('Search filters filter results', function() {
        const unfiltered = {}; // TODO
        const filtered = {}; // TODO

        expect(filtered).not.to.deep.equal(unfiltered);
    });

    it('Logging in works', function() {
        const user = {}; // TODO
        const requestedUser = {}; // TODO

        expect(user).to.deep.equal(requestedUser);
    });
});
