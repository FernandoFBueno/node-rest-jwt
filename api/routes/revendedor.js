var jwt = require('jsonwebtoken');

module.exports = app => {
    const controller = app.controllers.revendedor;
    app.post('/api/v1/user', controller.postRevendedor);
    app.get('/api/v1/revendedores', validateUser, controller.getRevendedores);
    app.post('/api/v1/authenticate', controller.authenticate);
    app.put('/api/v1/revendedor/:id', validateUser, controller.putRevendedor);

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
