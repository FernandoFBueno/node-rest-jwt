module.exports = app => {
  const controller = {};
  const Revendedor = require('../models/revendedor');
  const bcrypt = require('bcrypt'); 
  const jwt = require('jsonwebtoken');

  controller.authenticate = (req, res, next) => {
    Revendedor.findOne({CPF:req.body.CPF}, function(err, userInfo){
      if (err) {
        next(err);
      } else {
        if(bcrypt.compareSync(req.body.Senha, userInfo.Senha)) {
          const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
          res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
        }else{
          res.json({status:"error", message: "Invalid cpf/password!!!", data:null});
        }
      }
    });
  };

  controller.putRevendedor = (req, res) => {
    const dataRevendedor = new Revendedor({
      _id: req.params.id,
      Nome: req.body.Nome,
      CPF: req.body.CPF,
      Email: req.body.Email,
      Senha: req.body.Senha
    });
    
    Revendedor.update({ _id: req.params.id } , dataRevendedor, (err, board) => {
      if (err) {
          res.status(500).json({ dataRevendedor, success: false, msg: "Failed to update Revendedor" });
      }
      else {
          res.status(200).json({ dataRevendedor, success: true, msg: "Revendedor updated" });
      }
    });
  };

  controller.getByIdRevendedores = (req, res) => {
    const id = req.params.id;
    const findById = Revendedor.findOne({ _id: id });
    
    findById.then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json(error);
    });
  };

  controller.getRevendedores = (req, res) => {
    const novoRevendedor = Revendedor.find();
    
    novoRevendedor.then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  };

  controller.postRevendedor = (req, res) => {
    const novoRevendedor = new Revendedor({
      Nome: req.body.Nome,
      CPF: req.body.CPF,
      Email: req.body.Email,
      Senha: req.body.Senha,
      Super: req.body.Super
    });

    novoRevendedor.save().then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  };

  return controller;
}