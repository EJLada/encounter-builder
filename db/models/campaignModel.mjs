import mongoose from 'mongoose';
const {Schema} = mongoose;

// Define the Campaign Schema
const campaignSchema = new Schema({
    campaignName: { type: String, required: true },
    campaignPlayers: [Schema.Types.ObjectId],  // Array of ObjectIds
    campaignEncounters: [Schema.Types.ObjectId]
});

// Compile the Model from the Schema
const Campaign = mongoose.model("Campaign", campaignSchema);

/**
 * Create a Campaign
 * @param {String} campaignName
 * @returns a promise. Resolves to the JSON object for the created document.
 */
const createCampaign = async (campaignName) => {
    const campaign = new Campaign({
        campaignName: campaignName,
        campaignPlayers: [],
        campaignEncounters: []});
    return campaign.save();
}

/**
 * Read all or selected movies based on provided parameters
 * @param {Object} filter
 * @returns a promise. Resolves to a JSON object containing the selected
 * Campaign objects
 */
const findCampaigns = async (filter = {}) => {
    const query = Campaign.find(filter)
        .select(['_id', 'campaignName']);
    return query.exec();
}
/**
 * Update properties of the Campaign with the selected `_id`.
 * @param {String} _id
 * @param campaignName
 * @param campaignPlayers
 * @param campaignEncounters
 * @returns a promise. Resolves to the number of documents modified
 */
const replaceCampaign = async (_id,
                               campaignName,
                               campaignPlayers,
                               campaignEncounters) => {
    const result = await Campaign.replaceOne({_id: _id}, {
        campaignName: campaignName,
        campaignPlayers: campaignPlayers,
        campaignEncounters: campaignEncounters });
    return result.nModified;
}

/**
 * Delete the Campaign with the provided `_id`
 * @param {String} _id
 * @returns a promise. Resolves to the number of deleted documents.
 */
const deleteCampaign = async (_id) => {
    const result = await Campaign.deleteOne({_id: _id});
    return result.deletedCount;
}



