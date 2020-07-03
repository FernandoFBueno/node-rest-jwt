module.exports = app => {
    const FaixasCashBack = require('../models/faixascashback');
    const controller = {};

    controller.getFaixasCashBack = (req, res) => {
        const novoFaixasCashBack = FaixasCashBack.find();
        
        novoFaixasCashBack.then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    };

    controller.postFaixasCashBack = (req, res) => {
        const novoFaixasCashBack = new FaixasCashBack({
            Descricao: req.body.Descricao,
            Porcentagem: req.body.Porcentagem,
            FaixaTop: req.body.FaixaTop,
            FaixaIni: req.body.FaixaIni
        });

        novoFaixasCashBack.save().then(result => {
                res.json(result);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    };
  
    return controller;
  }