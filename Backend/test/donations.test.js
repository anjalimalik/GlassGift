const chai = require('chai');
const chaiHttp = require('chai-http');
const uuidv4 = require('uuid/v4');

const server = require('../app');

const expect = chai.expect;
chai.use(chaiHttp);

const donor = {
    email: 'test@gmail.com',
    password: 'test',
    id: uuidv4(),
    token: ''
};

const ngo = {
    email: 'test@gmail.com',
    password: 'test',
    id: uuidv4(),
    token: ''
};

describe("Donations", function() {
    before(async function() {
        await chai.request(server)
            .post('/donor')
            .set('content-type', 'application/json')
            .send(donor);

        await chai.request(server)
            .post('/ngo')
            .set('content-type', 'application/json')
            .send(ngo);
    });

    it("A donation outside a minimum/maximum limit of an NGO should fail", function(done) {
        const donation = {
            donorId: donor.id,
            ngoId: ngo.id,
            amount: ngo.maxLimit + 1,
            anonymous: true
        };

        chai.request(server)
            .post('/donation')
            .set('content-type', 'application/json')
            .send({donation})
            .then(function(res) {
                expect(res).to.have.status(500);
                done();
            });
    });

    it("Viewing anonymous payments shouldn't reveal the donor's identity", function() {
        // Donate anonymously
        // Assert no identifying details present
    });
});