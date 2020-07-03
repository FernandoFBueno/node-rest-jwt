var jwt = require('jsonwebtoken');

module.exports = (app) => {
    const controller = app.controllers.compra;
    app.post('/api/v1/compra', validateUser, controller.postCompras);
    app.put('/api/v1/compra/:id', validateUser, controller.putCompras);
    app.delete('/api/v1/compra/:id', validateUser, controller.deleteCompras);
    app.get('/api/v1/compras', validateUser, controller.getCompras);
    app.get('/api/v1/compra/:id', validateUser, controller.getByIdCompras);
    app.get('/api/v1/compras/:id', validateUser, controller.getAllByIdCompras);

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