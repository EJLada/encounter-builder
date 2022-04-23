import mongoose from 'mongoose';
const {Schema} = mongoose;

// Define the Campaign Schema
const encounterSchema = new Schema({
    encounterName: { type: String, required: true },
    encounterPlayers: [Schema.Types.ObjectId],  // Array of ObjectIds
    encounterMonsters: [Schema.Types.ObjectId],
    difficulty: String,
    notes: String,
    loot: String
});

// Compile the Model from the Schema
const Encounter = mongoose.model("Encounter", encounterSchema);

/**
 * Create an Encounter
 * @param {String} encounterName
 * @param {[Schema.Types.ObjectId]} encounterPlayers
 * @returns a promise. Resolves to the JSON object for the created document.
 */
const createEncounter = async (encounterName, encounterPlayers = []) => {
    const encounter = new Encounter({
        encounterName: encounterName,
        encounterPlayers: encounterPlayers,
        encounterMonsters: [],
        difficulty: '',
        notes: '',
        loot: ''
    });
    return encounter.save();
}

/**
 * Read all or selected Encounters based on provided parameters
 * @param {Object} filter object containing search parameters
 * @returns a promise. Resolves to a JSON object containing the id, name,
 * and difficulty of the selected Encounter objects
 */
const findEncounters = async (filter = {}) => {
    const query = Encounter.find(filter);
    return query.exec();
}

/**
 * Update properties of the Encounter with the selected `_id`.
 * @param {String} _id
 * @param {String} encounterName
 * @param {[Schema.Types.ObjectId]} encounterPlayers
 * @param {[Schema.Types.ObjectId]} encounterMonsters
 * @param {String} difficulty
 * @param {String} notes
 * @param {String} loot
 * @returns a promise. Resolves to the number of documents modified
 */
const replaceEncounter = async (_id,
                               encounterName,
                               encounterPlayers,
                               encounterMonsters,
                               difficulty,
                               notes,
                               loot) => {
    const result = await Encounter.replaceOne({_id: _id}, {
        encounterName: encounterName,
        encounterPlayers: encounterPlayers,
        encounterMonsters: encounterMonsters,
        difficulty: difficulty,
        notes: notes,
        loot: loot
        });
    return result.nModified;
}

/**
 * Delete the Encounter with the provided `_id`
 * @param {String} _id
 * @returns a promise. Resolves to the number of deleted documents.
 */
const deleteEncounter = async (_id) => {
    const result = await Encounter.deleteOne({_id: _id});
    return result.deletedCount;
}

export {createEncounter, findEncounters, replaceEncounter, deleteEncounter};