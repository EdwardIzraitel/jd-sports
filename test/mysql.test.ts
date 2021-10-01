import { Series } from '../src/interfaces/series';
const seriesTable = require('../public/database/module/series');
const chai = require('chai');
const chaiHttp = require('chai-http');
// import {insertToSeries} from '../src/helpers/addSeries'
// const seriesInsertion = require('../src/helpers/addSeries').insertToSeries;
const database = require('../src/mysql');
const app = require('../src/app');
// import server from '../src/app';
// import createServer from '../src/server';

chai.use(chaiHttp);
describe('series', () => {
    /*
      * Test the /GET route
      */
    describe('testing', () => {
        it('it should GET all the series', (done) => {
            chai.request('http://localhost:3000/get')
                .get('/').then((res: any) => {
                    res.should.have.status(200);
                    // res.shoud.have.body('data pulled!');
                    console.log('xxx');
                    done();
                    // database.connection();
                    // var seriesArray: Series[] = new Array();
                    // const testSeries: Series = {
                    //     uid: "testuid",
                    //     title: "test",
                    //     abbreviation: "item.abbreviation",
                    //     productionStartYear: 5,
                    //     productionEndYear: 6,
                    //     seasonsCount: 7
                    // }
                    // // console.log('eee');
                    // seriesTable.create({
                    //     uid: testSeries.uid,
                    //     title: testSeries.title,
                    //     abbreviation: testSeries.abbreviation,
                    //     productionStartYear: testSeries.productionStartYear,
                    //     productionEndYear: testSeries.productionEndYear,
                    //     seasonsCount: testSeries.seasonsCount
                    // }).then(() => {
                    //     console.log("test");
                    //     const information = seriesTable.findAll();
                    //     console.log(JSON.stringify(information, null, 2));
                    //     // done();
                    // });
                    // seriesArray.push(testSeries);
                    // insertToSeries(seriesArray);
                }).catch((e: any) => {
                    console.log(e);
                });
        });
    });

});


// describe('insertToSeriest', function () {
//     describe('#insertToSeries()', function () {
//         it('see what happens', async function () {
//             database.connection();
//             var seriesArray: Series[] = new Array();
//             const testSeries: Series = {
//                 uid: "testuid",
//                 title: "test",
//                 abbreviation: "item.abbreviation",
//                 productionStartYear: 5,
//                 productionEndYear: 6,
//                 seasonsCount: 7
//             }

//             await seriesTable.create({
//                 uid: testSeries.uid,
//                 title: testSeries.title,
//                 abbreviation: testSeries.abbreviation,
//                 productionStartYear: testSeries.productionStartYear,
//                 productionEndYear: testSeries.productionEndYear,
//                 seasonsCount: testSeries.seasonsCount
//             }).then(() => {
//                 const information = seriesTable.findAll();
//                 console.log(JSON.stringify(information, null, 2));
//             });
//             // seriesArray.push(testSeries);
//             // insertToSeries(seriesArray);


//             // console.log(testSeries);
//             let x: number = 5;
            // expecting(x).to.equal(5);
//         });
//     });
// });

