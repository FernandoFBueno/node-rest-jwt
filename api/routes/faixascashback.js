var jwt = require('jsonwebtoken');

module.exports = app => {
    const controller = app.controllers.faixascashback;
    app.post('/api/v1/faixascashback', validateUser, controller.postFaixasCashBack);
    app.get('/api/v1/faixascashback', validateUser, controller.getFaixasCashBack);

    function validateUser(req, res, next) {
      jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) {
          res.json({status:"error", message: err.message, data:null});
        }else{
          req.body.userId = decoded.id;
          next();
        }
      });
    }
}
