const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Testing registering donor account', function() {
    const donor = {
        email: 'test@gmail.com',
        password: 'test',
        location: "test location",
    };

    it('POST - Test donor registration', function() {
        chai.request(server)
            .post('/donor')
            .set('content-type', 'application/json')
            .send(donor)
            .end(function(err, res) {
                if (err) console.error('Error: donor registration failed');
                expect(res).to.have.property('status', 200); // 500 for error
                expect(err).to.be(null);
            });
    });

    it('POST - Test duplicate donor registration', function() {
        chai.request(server)
            .post('/donor')
            .set('content-type', 'application/json')
            .send(donor)
            .end(function(err, res) {
                expect(res.body).to.have.property('error', 'Already exists');
            });
    });

    it('POST - Test donor login', function() {
        chai.request(server)
            .post('/login')
            .set('content-type', 'application/json')
            .send({
                email: donor.email,
                password: donor.password
            })
            .end(function(err, res) {
                if (err) console.error('Error: donor login failed');
                expect(res).to.have.property('status', 200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('user');
                expect(err).to.be(null);

                donor.id = res.body.user.id;
                donor.token = res.body.token;
            });
    });

    it('Adding payment methods stores them for the future', function() {

    });
});
