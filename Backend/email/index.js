const express = require('express');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'glassgiftteam@gmail.com',
		pass: 'jack3dj3sus'
	}
});

async function sendConfirmationEmail(email, name, confirmationLink, type) {
	var body = `Dear ${name},\n\nWelcome to GlassGift!\n Before we get started, we need you to follow the link`+
			   ` posted below:\n\n\t${confirmationLink}\n\nOnce you navigate to this page you will finish your` + 
			   ` registration as a new ${(type === 0 ? "NGO" : "donor")} on GlassGift. Thanks!!!\n\n`+
			   `Best Regards,\nThe GlassGift Team\n\n`+
			   `P.S.: Please don't respond to this email, we won\'t see it.\n`; 


	var mailoptions = {
		from: 'glassgiftteam@gmail.com',
		to: email,
		subject: 'Confirmation Email: Please Confirm Your Account',
		text: body
	};

	transporter.sendMail(mailoptions, function(err, info){
		if(err){
			return console.error(err);
		}else{
			return console.log('Email sent' + info.response);
		}
	});
}

async function sendIPemail(email, ipAddr){
	var body = `Dear User,\n\nHello from GlassGift! We noticed that you had logged in to your` +
		` account from a different IP adress than normal, the IP address you logged in from is:\n\n\t${ipAddr}` +
		`\n\nIf this was you, then you can disregard this email. Otherwise, we highly reccomend that you reset your` +
		`password as soon as possible. You can do so by going to the following URL.\n\n\t` +
		`URL\n\n` +
		`Thank you for using GlassGift! Hopefully we will never encounter this problem again :-).\n\n`+
		`Best Regards,\nThe GlassGift Team\n\n`+
		`P.S.: Please don't respond to this email, we won\'t see it.\n`; 

	var mailoptions = {
		from: 'glassgiftteam@gmail.com',
		to: email,
		subject: 'GlassGift: Login from unusual IP Address',
		text: body
	};

	transporter.sendMail(mailoptions, function(err, info){
		if(err){
			return console.error(err);
		}else{
			return console.log('Email sent' + info.response);
		}
	});
}

async function sendForgotPasswordemail(email, token){
	var body = `Dear User,\n\nHello from GlassGift! We noticed that you wish to reset or have forgotten`+
		`your password, this is not issue, however we do ask that you follow this link:\n\n`+
		`URL/token=${token}\n\nThis is sipmly so we can verify that you are who you say you are.\n`+
		`You will have 24 hours to reset your password, after that, the link we gave you will expire.\n`+
		`Thank you for using GlassGift! Hopefully we will never encounter this issue again.\n\n`+
		`Best Regards,\nThe GlassGift Team\n\n`+
		`P.S.: Please don't respond to this email, we won\'t see it.\n`; 

	var mailoptions = {
		from: 'glassgiftteam@gmail.com',
		to: email,
		subject: 'GlassGift: Reset your password!',
		text: body
	};

	transporter.sendMail(mailoptions, function(err, info){
		if(err){
			return console.error(err);
		}else{
			return console.log('Email sent' + info.response);
		}
	});
}

<<<<<<< HEAD
module.exports = {sendIPemail, sendConfirmationEmail, sendForgotPasswordemail}
=======
module.exports = {sendIPemail, sendConfirmationEmail}
>>>>>>> af49177b163f7649dd897ec9eeeada79cf662882
