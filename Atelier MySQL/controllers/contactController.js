const { createContact, getContacts, deleteContact, getContact } = require("../services/contactService");
const express = require("express");


const router = express.Router();

router.get('/', getContacts);

router.post('/', createContact);

router.get('/:id', getContact)

router.delete('/:id', deleteContact);

module.exports = router;




