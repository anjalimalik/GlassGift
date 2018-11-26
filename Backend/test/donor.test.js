const chai = require('chai');
const chaiHttp = require('chai-http');
const uuidv4 = require('uuid/v4');
const server = require('../app');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Testing registering donor account', function() {
    const donor = {
        id: uuidv4(),
        email: 'test@gmail.com',
        password: 'test',
        location: "test location",
    };

    it('POST - Test donor registration', function(done) {
        chai.request(server)
            .post('/donor')
            .set('content-type', 'application/json')
            .send(donor)
            .end(function(err, res) {
                if (err) console.error('Error: donor registration failed');
                if (res.status === 500) {
                    expect(JSON.parse(res.text)).to.have.property('error', 'Already exists');
                } else {
                    expect(res).to.have.status(200); // 500 for error
                    expect(err).to.be.null;
                }

                done();
            });
    });

    it('POST - Test duplicate donor registration', function(done) {
        chai.request(server)
            .post('/donor')
            .set('content-type', 'application/json')
            .send(donor)
            .end(function(err, res) {
                expect(res.body).to.have.property('error', 'Already exists');
                done();
            });
    });

    it('POST - Test donor login', function(done) {
        chai.request(server)
            .post('/login')
            .set('content-type', 'application/json')
            .send({
                email: donor.email,
                password: donor.password
            })
            .end(function(err, res) {
                if (err) console.error('Error: donor login failed');

                expect(res).to.have.status(500);
                expect(JSON.parse(res.text)).to.have.property('error', 'Not confirmed');

                // TODO
                // expect(res).to.have.status(200);
                // expect(res.body).to.be.an('object');
                // expect(res.body).to.have.property('token');
                // expect(res.body).to.have.property('user');
                // expect(err).to.be.null;

                // donor.id = res.body.user.id;
                // donor.token = res.body.token;
                done();
            });
    });

    it('Adding payment methods stores them for the future', function(done) {

    });

    it("Export transactions", function(done) {
        chai.request(server)
            .get('/donor/export_transactions')
            .query({id: donor.id})
            .send()
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res.headers['Content-disposition']).to.equal('attachment; filename=donor-transactions.csv');
                expect(res.headers['Content-Type']).to.equal('text/csv');
                done();
            });
    });
});
