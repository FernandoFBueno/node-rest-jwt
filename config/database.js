const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbUser:dbuser123@api-rest-cashback.h9bdl.gcp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    console.log('MongoDB Conectado');
  })
  .catch(error => {
    console.log(error);
  });
mongoose.Promise = global.Promise;
module.exports = mongoose;