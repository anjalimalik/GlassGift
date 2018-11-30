const email = require('../email');

describe('Email', function() {
    it('Make sure IP email is properly sent regardless of it getting called', async function() {
        const emailAddress = 'peterxeros368@gmail.com';
        const ip = '206.201.177.182';

        await email.sendIPEmail(emailAddress, ip);
    });

    it('Make sure Confirmation email is properly sent to Donor regardless of it getting called', async function() {
        const confirmationLink = 'bladeofgrassupyour';
        const type = 1;

        await email.sendConfirmationEmail(email, confirmationLink, type);
    });

    it('Make sure Confirmation email is properly sent to Donor regardless of it getting called', async function() {
        const confirmationLink = 'mahdude';
        const type = 0;

        await email.sendConfirmationEmail(email, confirmationLink, type);
    });

    it('Make sure donation confirmation email method works', async function() {
        const emailAddress = 'peterxeros368@gmail.com';
        const ngoName = 'Peace with Pedro';
        const amount = '200.50';
        const date = '10/15/2018';

        await email.sendDonationConfirmationEmail(emailAddress, amount, ngoName, date);
    });
});