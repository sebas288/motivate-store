const express = require('express');
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const routerApi = require('./routes');
const app = express();
const port = 4000;


app.use(express.json());

const whitelist = ['http://localhost'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    }else {
      callback(new Error);
    }

  }
}
app.use(cors());

app.get('/', (req, res, next) => {
  res.send('Mi server en express')
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Mi port: " + port);
});
