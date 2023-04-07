const express = require('express');
const { Auth } = require('../middleware/authatic')
const router = express.Router();


router.get('/weather', Auth, (req, res) => {
    res.send(req.rootUser);
});


module.exports = router;