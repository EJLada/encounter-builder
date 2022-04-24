import express from 'express';
import axios from 'axios';
const monsterRouter = express.Router();

monsterRouter
    .get('/', function(req, res) {
        // In this case req.params can contain `ID` for retrieving a single record,
        // `ordering=challenge_rating`, `search=abc` to search for monsters with
        // names containing "abc", etc.
        let modifiers = {}
        for (let key in req.query) {
            modifiers[key] = req.query[key];
        }
        axios.get('https://api.open5e.com/monsters', {
            params: modifiers })
            .then(monsters => {
                res.send(monsters.data);
            })
            .catch(err => {
                res.send(err);
            });
    })

export {monsterRouter};