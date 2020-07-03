const assert = require('assert');
const bcrypt = require('bcrypt'); 
const mongoose = require('../config/database');

describe('Main Test Revendedor', () => {
    const RevendedorModel = require('../api/models/revendedor');
    const revendedorData = { Nome: 'Teste', CPF: '12312312312', Email: 'teste@teste.com', Senha: '12345', Super: false };

    let validUser;
    let savedUser;

    before(async () => {
        await mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    });

    afterEach(async () => {
        await RevendedorModel.deleteOne({ CPF: revendedorData.CPF });
        await mongoose.disconnect();
    });

    describe('Test create revendedor', () => {
        it('create, save and check user successfully', async () => {
            validUser = new RevendedorModel(revendedorData);
            savedUser = await validUser.save();
            assert.equal(savedUser.Nome, revendedorData.Nome);
            assert.equal(savedUser.Email, revendedorData.Email);
            assert.equal(true, bcrypt.compareSync(revendedorData.Senha, savedUser.Senha));
            assert.equal(savedUser.CPF,revendedorData.CPF);
        });
    });
});