const express = require('express');
const router = express.Router();


const { countPainting} = require('../controllers/countController');

router.get('/',countPainting);

module.exports = router;
