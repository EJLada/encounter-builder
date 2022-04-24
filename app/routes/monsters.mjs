import express from 'express';
import axios from 'axios';
const monsterRouter = express.Router();

monsterRouter
    .get('/', function(req, res) {
        // In this case req.params can contain `ID` for retrieving a single record,
        // `ordering=challenge_rating`, `search=abc` to search for monsters with
        // names containing "abc", etc.
        axios.get('https://api.open5e.com/monsters', {
            params: req.params
        })
            .then(monsters => {
                res.send(monsters);
            })
            .catch(err => {
                res.send(err);
            });
    })

export {monsterRouter};