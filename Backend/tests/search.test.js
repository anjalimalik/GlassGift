const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing Search', () => {
    let search = {
        type: '0',
        keyword: 'ngo',
    };

    it('POST - Test Searching NGOs', (done) => {
        chai.request(server)
            .post('/search')
            .set('content-type', 'application/json')
            .send(search)
            .end((err, res) => {
                if (err) console.error('Error: Search NGOs failed');
                res.should.have.status(200);
                res.should.be.json;
                expect(err).to.be.null;
                //res.body[0].should.have.property('id');  // if not matching?
                //res.body[0].should.have.property('name');
                done()
            })
    });
});
