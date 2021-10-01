"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.insertToSeries = exports.addSeries = void 0;
var seriesTable = require('../../public/database/module/series');
var http = require('http');
var url = 'http://stapi.co/api/v1/rest/series/search';
var addSeries = function (req, res) {
    //sends request
    var requestData = http.get(url, function (response) {
        //prints status, 200=okay
        console.log("statusCode: " + response.statusCode);
        var seriesString = '';
        //store data from api call into string
        response.on('data', function (data) {
            seriesString += data.toString();
        });
        //call method to update database with JSON format
        response.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
            var seriesList, seriesArray, currentSeries, i, item, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        seriesList = JSON.parse(seriesString.toString());
                        seriesArray = new Array();
                        currentSeries = void 0;
                        for (i = 0; i < seriesList.series.length; i++) {
                            item = seriesList.series[i];
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
                        return [4 /*yield*/, insertToSeries(seriesArray)];
                    case 1:
                        //insert list of objects into database
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    requestData.on('error', function (error) {
        console.error(error);
    });
};
exports.addSeries = addSeries;
//insert all series objects into database
//export for test purposes, not used outside of this file while app.js runs
function insertToSeries(seriesArray) {
    return __awaiter(this, void 0, void 0, function () {
        var i, item, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < seriesArray.length)) return [3 /*break*/, 6];
                    item = seriesArray[i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, seriesTable.create({
                            uid: item.uid,
                            title: item.title,
                            abbreviation: item.abbreviation,
                            productionStartYear: item.productionStartYear,
                            productionEndYear: item.productionEndYear,
                            seasonsCount: item.seasonsCount
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 5];
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.insertToSeries = insertToSeries;
