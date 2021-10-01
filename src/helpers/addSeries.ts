import { Series } from '../interfaces/series';
import { Request, Response} from 'express';
const seriesTable = require('../../public/database/module/series');

const http = require('http');
const url: string = 'http://stapi.co/api/v1/rest/series/search';

export var addSeries = (req: Request, res: Response) => {
    //sends request
    const requestData = http.get(url, (response: Response) => {
        //prints status, 200=okay
        console.log(`statusCode: ${response.statusCode}`);        
        let seriesString: string = '';

        //store data from api call into string
        response.on('data', (data: any) => {
            seriesString += data.toString();
        });

        //call method to update database with JSON format
        response.on('end', async () => {
            try {
                const seriesList = JSON.parse(seriesString.toString());

                let seriesArray: Series[] = new Array();
                let currentSeries: Series;
                
                for (var i = 0; i < seriesList.series.length; i++) {
                    var item = seriesList.series[i];
                    //generate Series object
                    currentSeries = {
                        uid: item.uid,
                        title: item.title,
                        abbreviation: item.abbreviation,
                        productionStartYear: item.productionStartYear,
                        productionEndYear: item.productionEndYear,
                        seasonsCount: item.seasonsCount
                    };
                    //insert object into array
                    seriesArray.push(currentSeries);

                }
                //insert list of objects into database
                await insertToSeries(seriesArray);
            }
            catch (error: unknown) {
                console.log(error);
            }
        });
    });
    requestData.on('error', (error: Error) => {
        console.error(error);
    });
}

//insert all series objects into database
//export for test purposes, not used outside of this file while app.js runs
export async function insertToSeries(seriesArray: Series[]) {
    for (var i = 0; i < seriesArray.length; i++) {
        var item = seriesArray[i];
        try {
            await seriesTable.create({
                uid: item.uid,
                title: item.title,
                abbreviation: item.abbreviation,
                productionStartYear: item.productionStartYear,
                productionEndYear: item.productionEndYear,
                seasonsCount: item.seasonsCount
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    // const users = await database.Series.findAll();
    // console.log(JSON.stringify(users, null, 2));
}
