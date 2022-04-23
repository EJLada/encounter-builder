import mongoose from 'mongoose';

const URI = process.env.MONGO_URI;

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(URI)
            .then(() => {
                console.log("Database connection successful.")
            })
            .catch(err => {
                console.error("Database connection error.")
            })
    }
}

const db = new Database();
export default db;