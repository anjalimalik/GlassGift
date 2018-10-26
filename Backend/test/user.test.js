const chai = require('chai');
const expect = chai.expect;

describe('Users', function() {
    it('Unfamiliar IP addresses produce notifications', function() {
        const result = {}; // TODO request with X-Forwarded-For bad IP
        const expectedError = {};

        expect(result).to.equal(expectedError);
    });

    it('Editing profile information changes the resulting API route', function() {
        const user = {}; // TODO
        // TODO add user

        const changes = {}; // TODO
        // TODO change user

        const newUser = {}; // TODO

        expect(newUser).not.to.equal(user);
        expect(newUser).to.equal(Object.assign(user, changes));
    });
});