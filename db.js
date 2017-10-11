var MongoClient = require('mongodb').MongoClient,
  test = require('assert');
MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  test.equal(null, err);

  db.on('close', function() {
  })

  db.close();
});