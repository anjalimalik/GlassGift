const express = require('express');
const bcrypt = require("bcryptjs");
const ngoRepository = require('../database/ngo');
const userRepository = require('../database/user');
const db = require('../database/');
const email = require('../email');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const {sendConfirmationEmail, sendNoticeUpdateEmail} = require('../email');
const csv = require('csv');
const json2csv = require('json2csv').parse;

const fields = ['id', 'donorId', 'ngoId', 'amount', 'message', 'anonymous', 'type',
  'honoredUserId', 'honoredUserName','created'];

const router = express.Router();

router.post('/', async function (req, res) {
	const ngo = req.body;
	const hash = await bcrypt.hash(req.body.password, 10);
	const emailToken = uuidv4();
	const emailConfirmationLink = `http://localhost:8080/confirmEmail?token=${emailToken}`;

	let dbResult = await ngoRepository.getIdsByEmail(ngo.email);
	if (dbResult.length !== 0) return res.status(500).json({error: 'Already exists'});

	await ngoRepository.create(ngo.email, hash, ngo.name, ngo.location, emailToken, ngo.description, ngo.category,
		ngo.calLink, ngo.minLimit, ngo.maxLimit);

	await email.sendConfirmationEmail(ngo.email, ngo.name, emailConfirmationLink, 0);
	res.sendStatus(200);
});

router.put('/', async function (req, res) {
	const changes = req.body;
    const userId = req.get('Authorization');

	return res.sendStatus(200);
});

router.put('/email', async function(req, res) {
	const ngoId = req.get('Authorization');

	await db.modify('NGO', ['emailTemplate'], [req.body.emailTemplate], `id = '${ngoId}'`);

	res.status(200).send(`Email template for ${ngoId} successfully updated.`);
});

router.get('/', async function (req, res) {
	const ngos = await ngoRepository.getById(req.query.id);
	if (ngos.length === 0) return res.status(500).json({error: "NGO not found!"});

	return res.status(200).json(ngos[0]);
});

router.post('/paymentData', async function(req, res){
	const donorId = req.get('Authorization');

	const fileName = req.body.ngoId + donorId + '.csv';

	var data = await db.get('donation', ['*'], `ngoId = '${req.body.ngoId}' ` +
			(req.body.num > 0? `FETCH FIRST ${req.body.num} ROWS ONLY`: ''));

	res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
  	res.set('Content-Type', 'text/csv');

  	const opts = { fields };
  	try{
  		const csv =  json2csv(data, opts);
		res.status(200).send(csv);
	}catch(err){
		console.log(err);
		res.status(500).send(err);
	}
});

//line graph <- timestamp manipulation
router.post('/visualLineGraph', async function(req, res){
	const donorId = req.get('Authorization');
	const check = await db.get('GGUser', ['*'], `id = '${donorId}'`);
	if(!check){ return res.status(500).send("User not found"); }

	var dates = [];

	var month1 = 12; var month2 = 11;
	while(month1 > 0){
		let sum = await db.get('donation', ['SUM(amount) AS sum'], 
		`ngoId = '${req.body.ngoId}' AND created BETWEEN CURRENT_DATE - INTERVAL '${month1} months'` + 
		` AND CURRENT_DATE ${month2 === 0? '':`- INTERVAL '${month2} months'`}`);

		//dates[`month_${month1}`] = (sum[0].sum|0);
		dates.push(sum[0].sum|0);
		month1--; month2--;
	}

	return res.status(200).json(dates);
});

//calendar easy
router.post('/visualCalendar', async function(req, res){
	//star date, end date, type, ngoId
	const donorId = req.get('Authorization');
	const check = await db.get('GGUser', ['*'], `id = '${donorId}'`);
	if(!check){ return res.status(500).send("User not found"); }

	var donations = await db.get('donation', ['DISTINCT donorId'], `ngoId = '${req.body.ngoId}' AND `+
					`created BETWEEN '${req.body.startdate} 00:00:00.0' AND '${req.body.enddate} 00:00:00.0'`);


	var numDonations = await db.get('donation', [`COUNT(*)`], `ngoId = '${req.body.ngoId}' AND `+
					`created BETWEEN '${req.body.startdate} 00:00:00.0' AND '${req.body.enddate} 00:00:00.0'`);

	var totalMoney = await db.get('donation', [`sum(amount) AS sum`], `ngoId = '${req.body.ngoId}' AND `+
					`created BETWEEN '${req.body.startdate} 00:00:00.0' AND '${req.body.enddate} 00:00:00.0'`);


	var averageDonation = await db.get('donation', [`avg(amount) AS avg`], `ngoId = '${req.body.ngoId}' AND `+
					`created BETWEEN '${req.body.startdate} 00:00:00.0' AND '${req.body.enddate} 00:00:00.0'`);



	var averageAge = 0;

	for (var i = 0; i < donations.length; i++) {
		let donor = await db.get('Donor', ['age'], `id = '${donations[i].donorid}'`);
		averageAge += donor[0].age;
	}

	averageAge /= donations.length;

	return res.status(200).json({
		numDonations: numDonations[0].count,
		totalMoney: `\$${Math.floor((totalMoney[0].sum | 0)/100)}.${Math.floor((totalMoney[0].sum | 0)%100) < 10? '0' + Math.floor((totalMoney[0].sum | 0)%100): Math.floor((totalMoney[0].sum | 0)%100)}`,
		averageDonation: `\$${Math.floor((averageDonation[0].avg | 0)/100)}.${Math.floor((averageDonation[0].avg | 0)%100) < 10 ? '0' + Math.floor((averageDonation[0].avg | 0)%100): Math.floor((averageDonation[0].avg | 0)%100)}`,
		averageAge: averageAge,
		uniqueDonors: donations.length,
	});
});


//pie graph easy
router.post('/visualPieGraph', async function(req, res){
	const donorId = req.get('Authorization');
	const check = await db.get('GGUser', ['*'], `id = '${donorId}'`);
	if(!check){ return res.status(500).send("User not found"); }

	var totalMale = 0;
	var totalFemale = 0;
	var totalNB = 0;

	var donations = await db.get('donation', ['DISTINCT donorId'], `ngoId = '${req.body.ngoId}'`);

	for (var i = 0; i < donations.length; i++) {
		let gender = (await db.get('Donor', ['gender'], `id = '${donations[i].donorid}'`));

		if(gender[0].gender === "Male"){
			totalMale++;
		}else if(gender[0].gender === "Female"){
			totalFemale++;
		}else {
			totalNB++;
		}
	}

	let total = totalMale + totalFemale + totalNB;

	return res.status(200).json({
		male: ((totalMale + 0.00) / total),
		female: ((totalFemale + 0.00) / total),
		nb: ((totalNB + 0.00) / total),
	});		
});

router.post('/search', async function (req, res) {
    switch (req.body.type) {
		case 0:
			return res.status(200).json(ngoRepository.searchByName(req.body.keyword));
		case 1:
			return res.status(200).json(ngoRepository.searchByLocation(req.body.keyword));
		case 2:
			return res.status(200).json(ngoRepository.searchByCategory(req.body.keyword));
		default:
			return res.status(500).json({error: "Couldn't match type"});
	}

	if (req.body.filter !== 'select') {
		const filter = parseInt(req.body.filter);
		where += ` AND category = \'${filter}\'`;
	}

	const dbResult = await db.get('GGUser INNER JOIN NGO ON GGUser.id = NGO.id',
		['NGO.id as id', 'username', 'email', 'location', 'category', 'description', 'calLink', 'notice',
			'minLimit', 'maxLimit'], where);
	return res.status(200).json(dbResult);
});

router.get('/notice', async function (req, res) {
	const ngos = await ngoRepository.getById(req.query.id);
	if (ngos.length === 0) return res.status(500).json({error: "Account doesn't exist"});

	const ngo = ngos[0];
	res.status(200).json({notice: ngo.notice});
});

router.put('/notice', async function (req, res) {
	const userId = req.get('Authorization');

	let ngoData = await db.get("GGUser", ['name'], `id = '${userId}'`);

	await db.pool.query(`UPDATE NGO SET notice = '${req.body.notice}' WHERE id = '${userId}'`);

	let subscribers = await db.get("Subscriptions", 
		['donorId'],
		`ngoId = '${userId}'`);

	for (var i = 0; i < subscribers.length; i++) {
		let donorData = await db.get("GGUser", ['email'], `id = '${donorId}'`);
		sendNoticeUpdateEmail(donorData.email, req.body.notice, ngoData.name);
	}

	return res.sendStatus(200);
});

router.post('/limit/max', async function (req, res) {
	await ngoRepository.setMaxLimit(req.decodedToken.id, req.body.limit);
	return res.sendStatus(200);
});

router.post('/limit/min', async function (req, res) {
	await ngoRepository.setMinLimit(req.decodedToken.id, req.body.limit);
	return res.sendStatus(200);
});

router.get('/newsletter', async function(req, res) {
	const newsletter = await ngoRepository.getNewsletter(req.query.id);
	res.status(200).json(newsletter[0]);
});

router.post('/newsletter', async function(req, res) {
	await ngoRepository.createNewsletter(req.body["ngoId"], req.body["newsletter"]);
	return res.sendStatus(200);
});

router.post('/newsletter/send', async function(req, res) {
	const newsletter = await ngoRepository.getNewsletter(req.body["ngoId"]);

	(await ngoRepository.getSubscribers(req.body["ngoId"]))
		.map(async (id) => (await userRepository.getEmailsFromId(id))[0])
		.forEach(async (userEmail) => await email.sendNewsletter(newsletter, userEmail));
});

module.exports = router;
