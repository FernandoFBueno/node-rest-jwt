const mongoose = require('mongoose');
const { Schema } = mongoose;
const FKHelper = require('../helpers/foreign-key-helper');
const validateCashHelper = require('../helpers/validate-cash-helper');
const validateSuperUser = require('../helpers/validate-super-user-helper');

const comprasSchema = new Schema({
    FaixaCashBack: {
        type: Schema.ObjectId,
        ref: '_id',
		validate: {
			validator: (v) => Promise.resolve(FKHelper(mongoose.model('faixascashback'), v)),
			message: 'Faixa cash não existe'
		}
    },
    Revendedor: {
		type: Schema.ObjectId,
		ref: '_id',
		validate: {
			validator: (v) => Promise.resolve(FKHelper(mongoose.model('revendedor'), v)),
			message: 'Revendedor não existe'
		}
    },
    Data: {
        type: Date,
        required: true,
        default: Date.now
    },
    ValorCompra: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        default: 0.00
    },
    Status: {
        type: String
    }
});

comprasSchema.pre('save', async function() {
    if (this.FaixaCashBack == null) {
        this.FaixaCashBack = await validateCashHelper(mongoose.model('faixascashback'), this.ValorCompra);
    }

    if (this.Status == null) {
        this.Status = await validateSuperUser(mongoose.model('revendedor'), this.Revendedor);
    }    
});

module.exports = mongoose.model('compras', comprasSchema);