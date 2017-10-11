const request = require( 'request' )

module.exports = {
  apiUtil: function(method, url, callback) {
    if (method === 'GET') {
      request.get({ url: url }, function(error, response, data){
        if (error) {
          // res.status(error.code).send({ code: 'InternalError', message: error })
          callback(true, error.code, { code: 'InternalError', message: error })
        }
        var parsedData

        try {
          parsedData = JSON.parse(data);
          parsedData = parsedData.splice(0, 5);
        } catch (e) {
          parsedData = data;
        }

        if (!data) {
          // res.status(200).send({ code: 'InternalError', message: 'empty response' })
          callback(false, 200, { code: 'InternalError', message: 'empty response' })
        } 
        else if (parsedData && parsedData.error) {
          // res.status(error.code).send({ code: 'InternalError', message: error })
          callback(true, error.code, { code: 'InternalError', message: error })
        } 
        else {
          // res.send(parsedData)
          callback(false, 200, parsedData)
        }
      })
    }
  }
}