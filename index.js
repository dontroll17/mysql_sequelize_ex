const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const corsConf = require('./config/corsConf');
const bodyParser = require('body-parser');
const db = require('./app/models');

app.use(cors(corsConf));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./app/routes/users.routes')(app);

//sync databases
(async() => {
    try{
       const sync = await db.sequelize.sync()
       console.log('Sync');
    }
    catch(e) {
        console.error(e);
    }
})();

app.listen(port, () => {
    console.log(`Blest-off on http://localhost:${port}`);
});