const express = require('express');
const router = express.Router();
const { signup, login} = require('../controllers/usercontrol');
const { Auth } = require('../middleware/authatic');



router.post('/signup', signup);

router.post('/login', login);

 router.get('/logout', Auth, (req, res) => {
    res.clearCookie("jwtoken", {path:'/'})
        res.status(200).send('logout ka page');
        });

module.exports = router;
