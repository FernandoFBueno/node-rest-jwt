module.exports = (model, id) => {
	return new Promise((resolve, reject) => {
		model.findById({ _id: id }, (err, result) => {
            console.log(result);
			if (result) {
                if (result.Super == true) {
                    return resolve("Aprovado");
                }
                return resolve("Em validação");
			}
			else return reject(new Error("Revendedor não encontrada"));
		});
	});
};