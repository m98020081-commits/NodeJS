const express = require('express');
const router = express.Router();

const {
    getPaintings,
    getPaintingById,
    getPaintingsFeatured,
    getPaintingGenre
} = require('../controllers/paintingController');
const validateQueryParams = require('../middleware/validateQueryParams');

router.get('/', validateQueryParams, getPaintings);

router.get('/featured',  getPaintingsFeatured);

router.get('/genre/:genre', getPaintingGenre);

router.get('/:id', getPaintingById);


module.exports = router;
