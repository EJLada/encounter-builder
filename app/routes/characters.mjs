import express from 'express';
import * as character from '../../db/models/characterModel.mjs';

const characterRouter = express.Router();

characterRouter
    // Create a new Character object
    .put('/', function(req, res) {
        character.createCharacter(req.body.characterName,
                                 req.body.level,
                                 req.body.charClass,
                                 req.body.subclass,
                                 req.body.armorClass,
                                 req.body.max_hp )
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            });
    })

    // Read all Characters matching parameters in `req.body`
    .get('/', function(req, res) {
        character.findCharacters(req.body)
            .then(characters => {
                res.send(characters);
            }).catch(err => {
            res.send(err);
        });
    })

    // Read one Character matching `_id` parameter.
    .get('/:_id', function(req, res) {
        character.findCharacters({_id: req.params._id})
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            });
    })

    // Update a Character matching the `_id` parameter
    .put('/:_id', function(req, res) {
        character.replaceCharacter(req.params._id,
                                   req.body.characterName,
                                   req.body.level,
                                   req.body.charClass,
                                   req.body.subclass,
                                   req.body.armorClass,
                                   req.body.max_hp)
            .then(nModified => {
                res.send({modifiedCount: nModified});
            })
            .catch(err => {
                res.send(err);
            });
    })

    // Delete a Character matching the `_id` parameter
    .delete('/:_id', function(req, res) {
        character.deleteCharacter(req.params._id)
            .then(count => {
                res.send({deletedCount: count});
            })
            .catch(err => {
                res.send(err);
            });
    })

export {characterRouter};