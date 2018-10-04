const express = require('express');
const mailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'peterxeros368@gmail.com'
		pass: 'Im not listing my password here'
	}
});

async function sendIPemail(email, ipAddr){
	var body = `Dear User,\n\nHello from GlassGift! We noticed that you had logged in to your` +
		`account from a different IP adress than normal, the IP address you logged in from is:\n\n\t${ipAddr}` +
		`\n\nIf this was you, then you can disregard this email. Otherwise, we highly reccomend that you reset your` +
		`password as soon as possible. You can do so by going to the following URL.\n\n\t` +
		`URL\n\n` +
		`Thank you for using GlassGift! Hopefully we will never encounter this problem again :-).\n\n`+
		`Best Regards,\nThe GlassGift Team\n\n`+
		`P.S.: Please don't respond to this email, we won\'t see it.\n`; 

	var mailoptions = {
		from: 'peterxeros368@gmail.com'
		to: email,
		subject: 'GlassGift: Login from unusual IP Address',
		text: body
	};

	transporter.sendMail(mailoptions, function(err, info){
		if(error){
			console.log(error);
		}else{
			console.log('Email sent' + info.response);
		}
	});
}

