module.exports = (model, valorCompra) => {
	return new Promise((resolve, reject) => {
		model.find({ FaixaIni:{"$lte":valorCompra}, FaixaTop:{"$gte":valorCompra} }, (err, result) => {
			if (result.length > 0) {
				return resolve(result[0]._id);
			}
			else {
                model.findOne().sort('_id').exec(function (err, maxId) {
                    if (maxId) {
                        return resolve(maxId._id);
                    }
                    else return reject(new Error("Faixa não encontrada"));
                });
            }
		});
	});
};
            