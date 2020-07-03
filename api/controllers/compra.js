module.exports = app => {
    const controller = {};
    const Compra = require('../models/compras');
    const Revendedor = require('../models/revendedor');
    const FaixasCashBack = require('../models/faixascashback');

    getRevendedor = async (id) => {
        return new Promise((resolve, reject) => {
            Revendedor.findOne({ _id: id }, (err, result) => {
                if (result) {
                    return resolve(result);
                }
                else return resolve("");
            });
        });
    };

    getFaixaCash = async (id) => {
        return new Promise((resolve, reject) => {
            FaixasCashBack.findOne({ _id: id }, (err, result) => {
                if (result) {
                    return resolve(result);
                }
                else return resolve("");
            });
        });
    };
    
    controller.deleteCompras = (req, res) => {
        const id = req.params.id;
        Compra.deleteOne({ _id: id }).then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    };

    controller.putCompras = (req, res) => {
        const id = req.params.id;

        const dataCompra = new Compra({
            _id: req.params.id,
            Revendedor: req.body.Revendedor,
            ValorCompra: req.body.ValorCompra
        });
    
        Compra.update({ _id: req.params.id } , dataCompra, (err, board) => {
            if (err) {
                res.status(500).json({ dataCompra, success: false, msg: "Failed to update compra" });
            }
            else {
                res.status(200).json({ dataCompra, success: true, msg: "Compra updated" });
            }
        });
    };
  
    controller.getCompras = (req, res) => {
        const listCompras = Compra.find();
        
        listCompras.then(async resultCompra => {
            var revNome = "";
            var porcentagemCash = 0;
            var vlCash = 0;
            var compras = [];

            for (const compra of resultCompra) {

                await getRevendedor(compra.Revendedor).then(result => {
                    revNome = result.Nome;
                });

                await getFaixaCash(compra.FaixaCashBack).then(result => {
                    porcentagemCash = result.Porcentagem;
                });

                vlCash = (compra.ValorCompra * porcentagemCash) / 100;
    
                var compraSingle = {
                    _id: compra._id,
                    Revendedor: compra.Revendedor,
                    RevendedorNome: revNome,
                    Data: compra.Data,
                    ValorCompra: compra.ValorCompra,
                    PorcentagemCash: porcentagemCash,
                    ValorCash: vlCash.toFixed(2),
                    Status: compra.Status

                };

                compras.push(compraSingle);
            };
            
            res.status(200).json(compras);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    };

    controller.getAllByIdCompras = (req, res) => {
        const id = req.params.id;
        const findCompraByIdRev = Compra.find({ Revendedor: id });
        
        findCompraByIdRev.then(async resultCompra => {
            var revNome = "";
            var porcentagemCash = 0;
            var vlCash = 0;
            var compras = [];

            for (const compra of resultCompra) {

                await getRevendedor(compra.Revendedor).then(result => {
                    revNome = result.Nome;
                });

                await getFaixaCash(compra.FaixaCashBack).then(result => {
                    porcentagemCash = result.Porcentagem;
                });

                vlCash = (compra.ValorCompra * porcentagemCash) / 100;
    
                var compraSingle = {
                    Revendedor: compra.Revendedor,
                    RevendedorNome: revNome,
                    Data: compra.Data,
                    ValorCompra: compra.ValorCompra,
                    PorcentagemCash: porcentagemCash,
                    ValorCash: vlCash.toFixed(2),
                    Status: compra.Status

                };

                compras.push(compraSingle);
            };

            res.status(200).json(compras);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    };

    controller.getByIdCompras = (req, res) => {
        const id = req.params.id;
        const findCompraById = Compra.findOne({ _id: id });
        
        findCompraById.then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    };
  
    controller.postCompras = (req, res) => {
        const novaCompra = new Compra({
            Revendedor: req.body.Revendedor,
            Data: Date.now(),
            ValorCompra: req.body.ValorCompra
        });
  
        novaCompra.save().then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    };
  
    return controller;
  }