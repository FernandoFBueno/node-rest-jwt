const app = require('./config/express')();
const port = app.get('port');
const mongoose = require('./config/database');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});

