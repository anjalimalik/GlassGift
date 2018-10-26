const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing Reset Password, Confirm Password, and Confirm Account', function() {
    let user = {
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
                res.should.have.status(200);
                expect(err).to.be.null;
                done()
            })
    });

    it('POST - Test User login', function(done) {
        chai.request(server)
            .post('/login')
            .set('content-type', 'application/json')
            .send({
                email: user.email,
                password: user.password,
            })
            .end(function(err, res) {
                if (err) console.error('Error: User login');
                res.should.have.status(200);
                res.body.should.have.property('token');
                res.body.should.have.property('user');
                expect(err).to.be.null;

                // store id and token from response for subsequent tests
                user.id = res.body.user.id;
                user.token = res.body.token;
                done()
            })
    });

    it('POST - Test Confirm Password', function(done) {
        chai.request(server)
            .post('/confirm_password')
            .set('content-type', 'application/json')
            .send({
                token: user.token,
                password: user.password,
            })
            .end(function(err, res) {
                if (err) console.error('Error: Confirm password failed');
                res.should.have.status(200);
                expect(err).to.be.null;
                done()
            })
    });

    it('POST - Test Confirm Account', function(done) {
        chai.request(server)
            .post('/confirm_account')
            .set('content-type', 'application/json')
            .send({
                token: user.token,
            })
            .end(function(err, res) {
                if (err) console.error('Error: Confirm account failed');
                res.should.have.status(200);
                expect(err).to.be.null;
                done()
            })
    })
});