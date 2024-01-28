const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv').config();
const http = require('http');
const https = require('https');
const app = express()
app.use(compression())
const router = require('./routes/index.routes');




const port = process.env.PORT || 3004
mongoose.connect(process.env.MONGO_URI_PROD, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(data => {
        console.log('Connected');
    })
    .catch(err => {
        console.log('Error')
        console.log(err)
    })

const server = http.createServer(app);
const { setupSocketIO } = require('./sockets');
//here we can use one server for both express and sockets
setupSocketIO(server);
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json());

app.use("/api", router);

server.listen(port, function () {
    console.log('Server is running on Port', port);
});