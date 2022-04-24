import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Import route modules for data handling
import {campaignRouter} from './app/routes/campaigns.mjs';

// Assign route modules for data handling
app.use('/campaigns', campaignRouter);

app.get("/", (req, res) => {
    res.json({message: "Welcome to RegularGnoll's 5e Encounter Builder!"});
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});