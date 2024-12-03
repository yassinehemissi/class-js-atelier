const db = require('../database/database');

const createContact = async (req, res, next) => {
	const { Contact } = await db();
	const { fullName, phone } = req.body;
	const contact = await Contact.create({ fullName, phone });
	res.redirect('/contact');

}

const getContacts = async (req, res, next) => {
	const { Contact } = await db();
	const data = await Contact.findAll({});
	res.render('contact/contacts.twig', { data });
}


const getContact = async (req, res, next) => {
	const { Contact } = await db();
	const { id } = req.params;
	const data = await Contact.findOne({ where: { id } });
	res.render('contact/contact.twig', { contact: data, id });
}

const deleteContact = async (req, res, next) => {
	const { Contact } = await db();
	const { id } = req.params;
	await Contact.destroy({ where: { id } });
	res.redirect('/contact');
}

module.exports = {
	createContact,
	getContact,
	getContacts,
	deleteContact
}



