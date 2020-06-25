const express = require('express');
const router = express.Router();

const varieties = require('./essentials.json');

router.get('/:id', function (req, res) {
    const { id } = req.params;

    const idAsNumber = parseInt(id, 10);

    const foundVariety = varieties.find((singleVariety) => {
        return singleVariety.id === idAsNumber;
    });

    res.send(foundVariety);
});

router.get('/', function (req, res) {
    res.send(varieties);
});

module.exports = router;