const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('chat.twig');
});

module.exports = router;

