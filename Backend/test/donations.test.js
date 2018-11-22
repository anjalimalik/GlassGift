const chai = require('chai');
const chaiHttp = require('chai-http');
const uuidv4 = require('uuid/v4');

const server = require('../app');

const expect = chai.expect;
chai.use(chaiHttp);

const donor = {
    email: 'test00@gmail.com',
    password: 'test00',
    id: uuidv4(),
    token: ''
};

const honorDonor = {
    email: 'test02@gmail.com',
    password: 'test02',
    id: uuidv4(),
    token: ''
};

const ngo = {
    email: 'test01@gmail.com',
    password: 'test01',
    id: uuidv4(),
    maxLimit: 1000,
    minLimit: 0,
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
            ngoName: "PeaceWithPedro",
            anon: false,
            message: "Kerchoo",
            type: 1,
            stripeToken: "tok_visa_debit",
            currency: "usd"
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

    it("A successful donation should send a json with the stripe order back", function(done){
         const donation = {
            ngoId: ngo.id,
            amount: ngo.maxLimit -10,
            ngoName: "PeaceWithPedro",
            anon: false,
            message: "Kerchoo",
            type: 1,
            stripeToken: "tok_visa_debit",
            currency: "usd"
        };

        chai.request(server)
            .post('/donation')
            .set('content-type', 'application/json')
            .set('Authorization', donor.id)
            .send({donation})
            .then( function(res) {
                expect(res).to.have.status(200);
                expect(res.body).to.not.be.null;
                done();
            });
    });

    it("Ability to donate on behalf of someone", function(done){
        const donation = {
            ngoId: ngo.id,
            honoredUserId: honorDonor.id,
            honoredUserName: "Billybobjoefredhenry",
            amount: ngo.maxLimit -100,
            ngoName: "PeaceWithPedro",
            anon: false,
            message: "Kerchoo",
            type: 1,
            stripeToken: "tok_visa_debit",
            currency: "usd"
        };

        chai.request(server)
            .post('/donation')
            .set('content-type', 'application/json')
            .set('Authorization', donor.id)
            .send({donation})
            .then( function(res) {
                expect(res).to.have.status(200);
                expect(res.body).to.not.be.null;
                done();
            });
    });

    it("Get Donation List by Donor", function(done) {
        chai.request(server)
            .get('/donations')
            .query({
                by: 'donor',
                id: donor.id
            })
            .send()
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.be.length(0);
                done();
            });
    });

    it("Get donation list by NGO", function(done) {
        chai.request(server)
            .get('/donations')
            .query({
                by: 'ngo',
                id: ngo.id
            })
            .send()
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.be.length(0);
                done();
            });
    });
});