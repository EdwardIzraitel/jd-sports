require('dotenv').config();
import { connection } from './mysql';
import { addEpisode } from './helpers/addEpisode';
import { addSeries } from './helpers/addSeries';
import { Application } from 'express';
import { Request, Response } from 'express';
const express = require('express');
const PORT = process.env.PORT || 3000;
const app: Application = express();


app.get('/',(req:Request, res:Response)=>{
    res.send('Welcome');
});

//pathing
app.get('/get', async (req: Request, res: Response) => {
    //test connection
    const verifiedConnection = await connection();
    //call API and store data into mysql 'server'
    if (verifiedConnection == true) {
        addSeries(req, res);
        addEpisode(req, res);
        res.send('data pulled!');
    }
    else {
        res.send('something went wrong');
    }
});

//runs on node app.js launch
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}}`)
});

module.exports = app;