import { Episode } from '../interfaces/episode';
import { Request, Response} from 'express';

const episodeTable = require('../../public/database/module/episodes');
const http = require('http');
const url = 'http://stapi.co/api/v1/rest/episode/search';

export var addEpisode = (req: any, res: any) => {
    //sends request
    const requestData = http.get(url, (response: any) => {
        //prints status, 200=okay
        console.log(`statusCode: ${response.statusCode}`);

        let episodeString: string = '';
        //stores api data into string
        response.on('data', (data: any) => {
            episodeString += data.toString();
        });
        //call method to update database with JSON format
        response.on('end', async () => {
            try {
                const episodeList = JSON.parse(episodeString.toString());

                let episodeArray: Episode[] = new Array();
                let currentEpisode: Episode;

                for (var i = 0; i < episodeList.episodes.length; i++) {
                    var item = episodeList.episodes[i];
                    currentEpisode = {
                        uid: item.uid,
                        title: item.title,
                        seriesTitle: item.series.title,
                        seasonNumber: item.seasonNumber,
                        episodeNumber: item.episodeNumber,
                        usAirDate: item.usAirDate
                    };
                    episodeArray.push(currentEpisode);
                }
                await insertToEpisode(episodeArray);
            }
            catch (error: any) {
                console.log(error);
            }
        });
        requestData.on('error', (error: any) => {
            console.error(error);
        });

    });
}

//insert all episode objects into database
async function insertToEpisode(episodeArray: Episode[]) {
    for (var i = 0; i < episodeArray.length; i++) {
        var item = episodeArray[i];
        try {
            //create equivalent to build + save
            await episodeTable.create({
                uid: item.uid,
                title: item.title,
                seriesTitle: item.seriesTitle,
                seasonNumber: item.seasonNumber,
                episodeNumber: item.episodeNumber,
                usAirDate: item.usAirDate,
            });
        }
        catch (error) {
            console.log(error);
        }

        // const users = await database.Episode.findAll();
        // console.log(JSON.stringify(users, null, 2));
    }
}