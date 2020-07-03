const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Schema } = mongoose;

const nameValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'Nome deve conter de 3 a 50 caracteres'
    })
];

const cpfValidator = [
    validate({
      validator: 'isLength',
      arguments: [11],
      message: 'CPF deve conter 11 caracteres'
    }),
    validate({
      validator: 'isNumeric',
      passIfEmpty: true,
      message: 'CPF deve conter apenas numeros'
    })
];

const emailValidator = [
    validate({
      validator: 'isEmail',
      message: 'Informe um email valido'
    })
];

const revendedorSchema = new Schema({
    Nome: {
        type: String,
        required: true,
        validate: nameValidator
    },
    CPF: {
        type: String,
        required: true,
        unique: true,
        validate: cpfValidator
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        validate: emailValidator
    },
    Senha: {
        type: String,
        required: true
    },
    Super: {
        type: Boolean,
        required: true,
        default: false
    }
});

revendedorSchema.pre('save', async function(next){
    this.Senha = await bcrypt.hashSync(this.Senha, saltRounds);
    next();
});

module.exports = mongoose.model('revendedor', revendedorSchema);