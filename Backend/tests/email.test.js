const email = require('../email');

test('Make sure IP email is properly sent regardless of it getting called', () => {
    var emailaddr = 'peterxeros368@gmail.com';
    var ip = '206.201.177.182';

    email.sendIPemail(emailaddr, ip);
    expect( console.log.calledOnce ).to.be.true;
});

test('Make sure Confrimation email is properly sent to Donor regardless of it getting called', () => {
	var emailaddr = 'peterxeros368@gmail.com';
	var name = 'Pedro';
	var confirmationLink = 'http://localhost:8080/confirmEmail?email=bladeofgrassupyour';
	var type = 1;

	email.sendConfirmationEmail(email, name, confirmationLink, type);
	expect( console.log.calledOnce ).to.be.true;
});

test('Make sure Confrimation email is properly sent to Donor regardless of it getting called', () => {
	var emailaddr = 'peterxeros368@gmail.com';
	var name = 'Peace with Pedro';
	var confirmationLink = 'http://localhost:8080/confirmEmail?email=myhihidude';
	var type = 0;

	email.sendConfirmationEmail(email, name, confirmationLink, type);
	expect( console.log.calledOnce ).to.be.true;
});

test('Make sure that email method for registration is called upon registration', () => {
	//TODO
});

test('Make sure that the method for sending an IP email upon a failed IP email is sent', () =>{
	//TODO
});