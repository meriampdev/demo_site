var express = require('express');
var router = express.Router();
// import { apiUtil } from '../utils/util.js'
var util = require('../utils/util.js')
var config = require('../config')
// import { GOOGLE_KEY } from '../config'

router.get('/', function(req, res, next) {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.location}&rankby=distance&keyword=${req.query.keyword}&key=${config.GOOGLE_KEY}`
  console.log('search', req.query)
  util.apiUtil('GET', url, function(err, code, response) {
    // console.log('response', response)
    if (!err) {
      res.send(response)
    } else {
      res.status(code).send(response)
    }
  })
});

module.exports = router;
