import mongoose from 'mongoose';
const {Schema} = mongoose;

// Define the Campaign Schema
const characterSchema = new Schema({
    characterName: { type: String, required: true },
    level: { type: String, required: true },
    charClass: { type: String, required: true },
    subclass: String,
    armorClass: { type: Number, required: true },
    max_hp: { type: Number, required: true },
});

// Compile the Model from the Schema
const Character = mongoose.model("Character", characterSchema);

/**
 * Create a Character
 * @param {String} characterName
 * @param {String} level
 * @param {String} charClass
 * @param {String} subclass
 * @param {Number} armorClass
 * @param {Number} max_hp
 * @returns a promise. Resolves to the JSON object for the created document.
 */
const createCharacter = async (characterName,
                               level = 1,
                               charClass= 'Fighter',
                               subclass = '',
                               armorClass = 10,
                               max_hp= 10) => {
    const character = new Character({
        characterName: characterName,
        level: level,
        charClass: charClass,
        subclass: subclass,
        armorClass: armorClass,
        max_hp: max_hp
    });
    return character.save();
}

/**
 * Read all or selected Characters based on provided parameters
 * @param {Object} filter object containing search parameters
 * @returns a promise. Resolves to a JSON object containing the id, name,
 * and difficulty of the selected Encounter objects
 */
const findCharacters = async (filter = {}) => {
    const query = Character.find(filter);
    return query.exec();
}

/**
 * Update properties of the Character with the selected `_id`.
 * @param {String} _id
 * @param {String} characterName
 * @param {String} level
 * @param {String} charClass
 * @param {String} subclass
 * @param {Number} armorClass
 * @param {Number} max_hp
 * @returns a promise. Resolves to the number of documents modified
 */
const replaceCharacter = async (_id,
                                characterName,
                                level,
                                charClass,
                                subclass,
                                armorClass,
                                max_hp) => {
    const result = await Character.replaceOne({_id: _id}, {
        characterName: characterName,
        level: level,
        charClass: charClass,
        subclass: subclass,
        armorClass: armorClass,
        max_hp: max_hp
    });
    return result.nModified;
}

/**
 * Delete the Character with the provided `_id`
 * @param {String} _id
 * @returns a promise. Resolves to the number of deleted documents.
 */
const deleteCharacter = async (_id) => {
    const result = await Character.deleteOne({_id: _id});
    return result.deletedCount;
}

export {createCharacter, findCharacters, replaceCharacter, deleteCharacter};