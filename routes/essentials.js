const express = require('express');
const router = express.Router();

const essentials = require('./essentials.json');

router.get('/:id/:info', function (req, res, next) {
    const { id, info } = req.params;

    const idAsNumber = parseInt(id, 10);

    const foundEssential = essentials.find((singleEssential) => {
        return singleEssential.id === idAsNumber;
    });

    res.send(foundEssential[info]);
});

router.get('/:id', function (req, res, next) {
    const { id } = req.params;

    const idAsNumber = parseInt(id, 10);

    const foundEssential = essentials.find((singleEssential) => {
        return singleEssential.id === idAsNumber;
    });

    res.send(foundEssential);
});

router.get('/', function (req, res, next) {
    res.send(essentials);
});

module.exports = router;