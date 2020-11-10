const express = require('express');
const { Client } = require('pg');
const connectionString = 'postgres://$POSTGRESQL_USER:$POSTGRESQL_PASSWORD@postgresql:5432/sampledb';

const client = new Client({
    connectionString: connectionString
});

client.connect();

var app = express();
var os = require("os");

app.set('port', process.env.PORT || 8080);

app.get('/', function (req, res, next) {
    client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {      
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        console.log(req.headers.host + ' -> -> ' + os.hostname());
        res.status(200).send(result.rows); 
    });
});

app.listen(8080, function () {
    console.log('Server is running.. on Port 8080');
});
