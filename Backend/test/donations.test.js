const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const expect = chai.expect;
chai.use(chaiHttp);

const donor = {
    email: 'test@gmail.com',
    password: 'test',
    id: '',
    token: ''
};

const ngo = {
    email: 'test@gmail.com',
    password: 'test',
    id: '',
    token: ''
};

describe("Donations", function() {
    before(function() {
        chai.request(server)
            .post('/donor')
            .set('content-type', 'application/json')
            .send(donor);

        chai.request(server)
            .post('/ngo')
            .set('content-type', 'application/json')
            .send(ngo);
    });

    it("A donation outside a minimum/maximum limit of an NGO should fail", function() {
        const donation = {
            donorId: donor.id,
            ngoId: ngo.id,
            amount: ngo.maxLimit + 1
        };

        chai.request(server)
            .post('/donation')
            .set('content-type', 'application/json')
            .send(donation)
            .end(function(err, res) {
                expect(res).to.have.status(500);
            });
    });

    it("Viewing anonymous payments shouldn't reveal the donor's identity", function() {
        // Donate anonymously
        // Assert no identifying details present
    });
});