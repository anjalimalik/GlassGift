const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'glassgiftteam@gmail.com',
		pass: 'jack3dj3sus'
	}
});

async function sendConfirmationEmail(email, name, confirmationToken, type) {
	var body = `Dear ${name},\n\nWelcome to GlassGift!\n Before we get started, we need you to follow the link`+
			   ` posted below:\n\n\t${confirmationToken}\n\nOnce you navigate to this page you will finish your` +
			   ` registration as a new ${(type === 0 ? "NGO" : "donor")} on GlassGift. Thanks!!!\n\n`+
			   `Best Regards,\nThe GlassGift Team\n\n`+
			   `P.S.: Please don't respond to this email, we won\'t see it.\n`;

	const mailOptions = {
		from: 'glassgiftteam@gmail.com',
		to: email,
		subject: 'Confirmation Email: Please Confirm Your Account',
		text: body
	};

	transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			return console.error(err);
		} else {
			return console.log('Email sent' + info.response);
		}
	});
}

async function sendIPEmail(email, ipAddress) {
	const body = `Dear User,\n\nHello from GlassGift! We noticed that you had logged in to your` +
		` account from a different IP address than normal, the IP address you logged in from is:\n\n\t${ipAddress}` +
		`\n\nIf this was you, then you can disregard this email. Otherwise, we highly recommend that you reset your` +
		`password as soon as possible. You can do so by going to the following URL.\n\n\t` +
		`URL\n\n` +
		`Thank you for using GlassGift! Hopefully we will never encounter this problem again :-).\n\n` +
		`Best Regards,\nThe GlassGift Team\n\n` +
		`P.S.: Please don't respond to this email, we won\'t see it.\n`;

	const mailOptions = {
		from: 'glassgiftteam@gmail.com',
		to: email,
		subject: 'GlassGift: Login from unusual IP Address',
		text: body
	};

	transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			return console.error(err);
		} else {
			return console.log('Email sent' + info.response);
		}
	});
}

async function sendForgotPasswordEmail(email, resetPasswordLink) {
	const body = `Dear User,\n\nHello from GlassGift! We noticed that you wish to reset or have forgotten` +
		`your password, this is not issue, however we do ask that you follow this link:\n\n` +
		`${resetPasswordLink}\n\nThis is simply so we can verify that you are who you say you are.\n` +
		`You will have 24 hours to reset your password, after that, the link we gave you will expire.\n` +
		`Thank you for using GlassGift! Hopefully we will never encounter this issue again.\n\n` +
		`Best Regards,\nThe GlassGift Team\n\n` +
		`P.S.: Please don't respond to this email, we won\'t see it.\n`;

	const mailOptions = {
		from: 'glassgiftteam@gmail.com',
		to: email,
		subject: 'GlassGift: Reset your password!',
		text: body
	};

	transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			return console.error(err);
		} else {
			return console.log('Email sent' + info.response);
		}
	});
}

//Add sending donation Id.
async function sendDonationConfirmationEmail(email, amount, NGOname, date, donationId){
	var body = `Dear User,\n\n\tHello from GlassGift! This is a confirmation, of the following donation completed`+
		`on your account:\n\nDonation id: ${donationId}\nAmount: \$${amount}\nPaid out to NGO: ${NGOname}\nDate: ${date}\n\n`+
		`If you do not remember copmleting this transaction, we would highly reccomend resetting your `+
		`password. If this problem persists, we would highly reccomend contacting our team. You can go ahead and `+
		`email us at glassgiftteam@gmail.com, however, please add an URGENT Tag to the email. Otherwise we will not `+
		`see the email\n\nBest Regards,\nThe GlassGift Team\n\n`;

	var mailoptions = {
		from: 'glassgiftteam@gmail.com',
		to: email,
		subject: 'GlassGift: Donation Sent!',
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

async function sendReceiptEmail(donation, ngoEmail, donorEmail){
	let stringAmount = (donation.amount/100) + "." 
                + (donation.amount%100 < 10? `0${donation.amount%100}`: donation.amount%100);

	var body = `Here is your receipt from GlassGift:\n\n` +
			`Donation id: ${donation.id}\nNGO ID: ${donation.ngoid}\nDonor ID: ${donation.donorid}\n`+
			`Amount: \$${(donation.amount/100) + "." + (donation.amount%100 < 10? `0${donation.amount%100}`: donation.amount%100)}\n`+
			`Message: "${donation.message}"\n\n` +
			`Total: \$${stringAmount}\n\n` +
			`If there is an issue with this, please email us with an URGENT tag and we will send you the stripe receipt,`+
			`you can also contact the ngo you donated to with this email: ${ngoEmail}. Thank you for using GlassGift!`+
			`\n\nBest Regards,\nThe GlassGift Team\n\n`;

	var mailoptions = {
		from: 'glassgiftteam@gmail.com',
		to: donorEmail,
		subject: `GlassGift: Receipt for donation ${donation.id}`,
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

async function sendNGOThankYouEmail(donorEmail, ngoEmailText, donorName, ngoName){
	var body = `Dear ${donorName},\n\n` + ngoEmailText;

	var mailoptions = {
		from: 'glassgiftteam@gmail.com',
		to: donorEmail,
		subject: `Thank you from ${ngoName}`,
		text: body
	}

	transporter.sendMail(mailoptions, function(err, info){
		if(err){
			return console.error(err);
		}else{
			return console.log('Email sent' + info.response);
		}
	});
}

async function sendNewsletter(newsletter, email) {
    const mailOptions = {
        from: 'glassgiftteam@gmail.com',
        to: email,
        subject: '[GlassGift] New Newsletter',
        text: newsletter
    };

    transporter.sendMail(mailOptions);
}

async function sendDonationReceiptEmail(email, amount, ngoName, date) {
    const body = `Donation Receipt\nAmount: $${amount/100}\nNGO Name: ${ngoName}\nDate: ${date}\n`;

    const mailoptions = {
        from: 'glassgiftteam@gmail.com',
        to: email,
        subject: 'GlassGift: Donation Receipt',
        text: body,
    };

    transporter.sendMail(mailoptions, (err, info) => {
        if (err) {
            return console.error(err);
        } else {
            return console.log('Email sent' + info.response)
        }
    });
}

async function sendNoticeUpdateEmail(email, notice, ngoName){
	const body = `Dear User,\n\nYou have an update from ${ngoName};\n\n\t`+
				 `"${notice}"\n\n This notice will be available on ${ngoName}'s page.`+
				 `Thank you for using GlassGift.\n\nBest Regards,\nThe GlassGift Team`;

	const mailoptions = {
		from: 'glassgiftteam@gmail.com',
		to: email,
		subject: `GlassGift: Update from ${ngoName}`,
		text: body,
	};

	transporter.sendMail(mailoptions, (err, info) => {
		if (err) {
			return console.error(err);
		} else {
			return console.log('Email sent' + info.response)
		}
	});
}

async function sendNGOThankYouEmail(email, template, donorName, ngoName){
	const body = `Dear ${donorName},\n\n${template}`;

	const mailoptions = {
		from: 'glassgiftteam@gmail.com',
		to: email,
		subject: `Thank you from ${ngoName}`,
		text: body,
	};

	transporter.sendMail(mailoptions, (err, info) => {
		if (err) {
			return console.error(err);
		} else {
			return console.log('Email sent' + info.response)
		}
	});
}

module.exports = {sendIPEmail, sendConfirmationEmail, sendForgotPasswordEmail, sendDonationConfirmationEmail, sendReceiptEmail, sendDonationReceiptEmail, sendNoticeUpdateEmail, sendNGOThankYouEmail}

