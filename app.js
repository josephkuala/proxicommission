require('dotenv').config();
var express = require('express');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db/sequelize');
const associations = require('./models/associations');
const swaggerJsdoc = require("swagger-jsdoc");
const http = require('http');
const  swaggerUi = require("swagger-ui-express");


const app = express();

app
  .use(bodyParser.json())
  .use(logger('dev'))
  .use(express.urlencoded({ extended: false }))
  .use(cors())





 //DB Connection 
sequelize.authenticate()
.then(() => console.log('Connection has been successfully established.'))
.catch(err => console.error('Unable to connect to the database:', err));

sequelize.sync({ force: false }) // Mettre force: true pour réinitialiser la base de données
.then(() => {
  console.log('Database connected and models synchronized');
})
.catch((error) => {
  console.error('Unable to connect to the database:', error);
});


//Routes
const medecin = require('./routes/medecin');
const gain = require('./routes/gain');
const testmed = require('./routes/testmedical');
const transaction = require('./routes/transaction');
const etat = require('./routes/etat');
const patient = require('./routes/patient');
const solde = require('./routes/solde');
const accountstate = require('./routes/accountstate');
const historyfund = require('./routes/fond');
const typeuser = require('./routes/typeuser');

app
  .use('/api/v1/medecin', medecin)
  .use('/api/v1/gain', gain)
  .use('/api/v1/test', testmed)
  .use('/api/v1/transact', transaction)
  .use('/api/v1/etat', etat)
  .use('/api/v1/patient', patient)
  .use('/api/v1/solde', solde)
  .use('/api/v1/accountstate', accountstate)
  .use('/api/v1/fond', historyfund)
  .use('/api/v1/typeuser', typeuser)


//Swagger Conf
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Proxilab Gestion de commission Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  ///res.render('error');
});

module.exports = app;
