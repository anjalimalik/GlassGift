const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing Search', function () {
    const search = {
        type: '0',
        keyword: 'ngo',
    };

    it('POST - Test Searching NGOs', function (done) {
        chai.request(server)
            .post('/search')
            .set('content-type', 'application/json')
            .send(search)
            .end(function (err, res) {
                if (err) console.error('Error: Search NGOs failed');
                expect(res).to.have.property('status', 200);
                expect(res).to.be.an('object');
                expect(err).to.be(null);
                //res.body[0].should.have.property('id');  // if not matching?
                //res.body[0].should.have.property('name');
                done()
            });
    });
});
