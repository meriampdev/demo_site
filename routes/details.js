var express = require('express');
var router = express.Router();
// import { apiUtil } from '../utils/util.js'
// import { GOOGLE_KEY } from '../config'
var util = require('../utils/util.js')
var config = require('../config')


router.get('/', function(req, res, next) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${config.GOOGLE_KEY}&placeid=${req.query.placeid}`
  util.apiUtil('GET', url, function(err, code, response) {
    if (!err) {
      res.send(response)
    } else {
      res.status(code).send(response)
    }
  })
});

module.exports = router;
