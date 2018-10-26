describe('Users', () => {
    it('Unfamiliar IP addresses produce notifications', () => {
        const result = {}; // TODO request with X-Forwarded-For bad IP
        const expectedError = {};

        expect(result).toEqual(expectedError);
    });

    it('Editing profile information changes the resulting API route', () => {
        const user = {}; // TODO
        // TODO add user

        const changes = {}; // TODO
        // TODO change user

        const newUser = {}; // TODO

        expect(newUser).not.toEqual(user);
        expect(newUser).toEqual(Object.assign(user, changes));
    });
});