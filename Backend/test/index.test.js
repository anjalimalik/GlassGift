const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Testing Reset Password, Confirm Password, and Confirm Account', function() {
    const user = {
        email: 'test@gmail.com',
        password: 'test',
        id: '',
        token: ''
    };

    it('POST - Test Reset Password', function(done) {
        chai.request(server)
            .post('/reset_password')
            .set('content-type', 'application/json')
            .send({email: user.email})
            .end(function(err, res) {
                if (err) console.error('Error: Reset password failed');
                expect(res).to.have.property('status', 200);
                expect(err).to.be(null);
                done();
            });
    });

    it('POST - Test User login', function() {
        chai.request(server)
            .post('/login')
            .set('content-type', 'application/json')
            .send({
                email: user.email,
                password: user.password,
            })
            .end(function(err, res) {
                if (err) console.error('Error: User login');
                expect(res).to.have.property('status', 200);
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('user');
                expect(err).to.be(null);

                // store id and token from response for subsequent tests
                user.id = res.body.user.id;
                user.token = res.body.token;
            });
    });

    it('POST - Test Confirm Password', function() {
        chai.request(server)
            .post('/confirm_password')
            .set('content-type', 'application/json')
            .send({
                token: user.token,
                password: user.password,
            })
            .end(function(err, res) {
                if (err) console.error('Error: Confirm password failed');
                expect(res).to.have.property('status', 200);
                expect(err).to.be(null);
            });
    });

    it('POST - Test Confirm Account', function() {
        chai.request(server)
            .post('/confirm_account')
            .set('content-type', 'application/json')
            .send({
                token: user.token,
            })
            .end(function(err, res) {
                if (err) console.error('Error: Confirm account failed');
                expect(res).to.have.property('status', 200);
                expect(err).to.be(null);
            });
    });
});