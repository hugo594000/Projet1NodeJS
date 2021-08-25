const mysql = require('mysql');
const express = require('express');
const app = express();
const connection = mysql.createConnection({
    hôte: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Database'
});
connection.connect((err) => {
    if (err) {
        console.log('erreur de connection ');
    } else {

        console.log('connecté');
        app.get('/api/:nomAdresse/:nbRes', (req, res) => {
            if (err) {
                console.log('erreur');
                return;
            } else {
                var reqSQL = " SELECT adresse, longitude, latitude, MATCH(adresse)AGAINST ('" +
                    req.params.nomAdresse + "' IN BOOLEAN MODE) AS score  FROM adresseIndex WHERE MATCH(adresse) AGAINST('" +
                    req.params.nomAdresse + "' IN BOOLEAN MODE) ORDER BY score DESC LIMIT " + req.params.nbRes + ";";
                console.log(reqSQL);
                connection.query(reqSQL, (err, resSQL) => {
                    if (err) throw err;
                    res.send(resSQL);

                })
            }
        });

        app.listen(80, () => console.log('API Started on port 80'));
    }
});