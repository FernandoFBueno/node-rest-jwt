const mongoose = require('mongoose');
const { Schema } = mongoose;

const faixaCashBackSchema = new Schema({
  Descricao: {
    type: String,
    require: true
  },
  Porcentagem: {
    type: Schema.Types.Decimal128,
    required: true,
    default: 0.00
  },
  FaixaTop: {
    type: Schema.Types.Decimal128,
    required: true,
    default: 0.00
  },
  FaixaIni: {
    type: Schema.Types.Decimal128,
    required: true,
    default: 0.00
  }
});

module.exports = mongoose.model('faixascashback', faixaCashBackSchema);