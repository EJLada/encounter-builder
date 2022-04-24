import express from 'express';
import * as campaign from '../../db/models/campaignModel.mjs';

const campaignRouter = express.Router();

campaignRouter
    // Create a new Campaign object
    .put('/', function(req, res) {
        campaign.createCampaign(req.body.campaignName)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            });
    })

    // Read all Campaigns matching parameters in `req.body`
    .get('/', function(req, res) {
        campaign.findCampaigns(req.body)
            .then(campaigns => {
                res.send(campaigns);
            }).catch(err => {
                res.send(err);
        });
    })

    // Read one Campaign matching `_id` parameter.
    .get('/:_id', function(req, res) {
        campaign.findCampaigns({_id: req.params._id})
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            });
    })

    // Update a Campaign matching the `_id` parameter
    .put('/:_id', function(req, res) {
        campaign.replaceCampaign(req.params._id,
                                 req.body.campaignName,
                                 req.body.campaignPlayers,
                                 req.body.campaignEncounters)
            .then(nModified => {
                res.send({modifiedCount: nModified});
            })
            .catch(err => {
                res.send(err);
            });
    })

    // Delete a Campaign matching the `_id` parameter
    .delete('/:_id', function(req, res) {
        campaign.deleteCampaign(req.params._id)
            .then(count => {
                res.send({deletedCount: count});
            })
            .catch(err => {
                res.send(err);
            });
    })

export {campaignRouter};