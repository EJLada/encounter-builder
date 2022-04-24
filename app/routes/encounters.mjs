import express from 'express';
import * as encounter from '../../db/models/encounterModel.mjs';

const encounterRouter = express.Router();

encounterRouter
    // Create a new Encounter object
    .put('/', function(req, res) {
        encounter.createEncounter(req.body.encounterName, req.body.encounterPlayers)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            });
    })

    // Read all Encounters matching parameters in `req.body`
    .get('/', function(req, res) {
        encounter.findEncounters(req.body)
            .then(encounters => {
                res.send(encounters);
            }).catch(err => {
            res.send(err);
        });
    })

    // Read one Encounter matching `_id` parameter.
    .get('/:_id', function(req, res) {
        encounter.findEncounters({_id: req.params._id})
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            });
    })

    // Update an Encounter matching the `_id` parameter
    .put('/:_id', function(req, res) {
        encounter.replaceEncounter(req.params._id,
            req.body.encounterName,
            req.body.encounterPlayers,
            req.body.encounterMonsters,
            req.body.difficulty,
            req.body.notes,
            req.body.loot)
            .then(nModified => {
                res.send({modifiedCount: nModified});
            })
            .catch(err => {
                res.send(err);
            });
    })

    // Delete an Encounter matching the `_id` parameter
    .delete('/:_id', function(req, res) {
        encounter.deleteEncounter(req.params._id)
            .then(count => {
                res.send({deletedCount: count});
            })
            .catch(err => {
                res.send(err);
            });
    })

export {encounterRouter};