const email = require('../email');

test('Make sure IP email is properly sent regardless of it getting called', () => {
    var emailaddr = 'peterxeros368@gmail.com';
    var ip = '206.201.177.182';

    email.sendIPemail(emailaddr, ip);
});

test('Make sure Confirmation email is properly sent to Donor regardless of it getting called', () => {
	var emailaddr = 'peterxeros368@gmail.com';
	var name = 'Pedro';
	var confirmationLink = 'bladeofgrassupyour';
	var type = 1;

	email.sendConfirmationEmail(email, confirmationLink, type);
});

test('Make sure Confrimation email is properly sent to Donor regardless of it getting called', () => {
	var emailaddr = 'peterxeros368@gmail.com';
	var name = 'Peace with Pedro';
	var confirmationLink = 'mahdude';
	var type = 0;

	email.sendConfirmationEmail(email, confirmationLink, type);
});

test('Make sure donation confirmation email method works', () =>{
	var emailaddr = 'peterxeros368@gmail.com';
	var NGOname = 'Peace with Pedro'
	var amount = '200.50'
	var date = '10/15/2018'

	email.sendDonationConfirmationEmail(emailaddr, amount, NGOname, date);
});

