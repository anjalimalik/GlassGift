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
            .post('/ngo/search')
            .set('content-type', 'application/json')
            .send(search)
            .end(function (err, res) {
                if (err) console.error('Error: Search NGOs failed');
                expect(res).to.have.property('status', 200);
                expect(res).to.be.an('object');
                expect(err).to.be.null;
                expect(res.body[0]).to.have.property('id');  // if not matching?
                expect(res.body[0]).to.have.property('name');

                done();
            });
    });

    it("History", function(done) {
        const requester = chai.request(server).keepOpen();
        const searches = [
            {type: 0, keyword: "foo"},
            {type: 1, keyword: "bar"},
            {type: 2, keyword: "baz"}
        ];

        Promise.all(searches.map(search => requester.post('/ngo/search').send(search)));

        chai.request(server)
            .get('/ngo/search/history')
            .send()
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.deep.equal(searches);
                done();
            });
    });
});
