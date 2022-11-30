import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import csv from 'csvtojson';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const convertCVStoTXT = async () => {
    const csvFilePath = path.join(__dirname, '/files/simpleCSVFile.csv');
    const newFilePath = path.join(__dirname, '/files/newTextFile.txt');

    const jsonData = await csv().fromFile(csvFilePath);

    const txt = fs.createWriteStream(newFilePath);

    txt.on('error', (err) => {
        console.log("ERROR:" + err);
    });

    jsonData.forEach((row) => {
        const data = JSON.stringify(row) + '\n';
        txt.write(data);
    });
};

convertCVStoTXT();
