import axios from "axios";
import fs from 'fs';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

// Create indexes for chart
(async () => {
    const obj = {};
    const months = [1,2,3,4,5,6,7,8,9,10,11,12];
    const years = [2017,2018,2019,2020];
    const dates = fs.readFileSync('dates.txt','utf8').split(/\r?\n/);
    for (const date of dates) {
        if(date){
            console.log(date);
            for (const year of years){
                if(!obj.hasOwnProperty(`${year}`)){
                    obj[`${year}`] = {};
                }
                const patternYear = new RegExp(`. ${year}$`);
                if(patternYear.test(date)){
                    for (const month of months){
                        if(!obj[`${year}`].hasOwnProperty(`${month}`)){
                            obj[`${year}`][`${month}`] = [];
                        }
                        const patternMonth = new RegExp(`. ${month}. ${year}$`);
                        if(patternMonth.test(date)){
                            obj[`${year}`][`${month}`].push(date);
                        }
                    }
                }
            }
        }
    };


    for (const year of years){
        console.log(`${year}`);
        const res = [];
        for (const month of months){
            res.push(obj[`${year}`][`${month}`].length);
        }
        console.log(res);
    }
})();

// Extract dates from uris
// (async () => {
//     const uris = fs.readFileSync('list.txt','utf8').split(/\r?\n/);
//     for (const  url of uris) {
//         console.log(url)
//         const resp = await axios.get(url);
//         const dom = new JSDOM(resp.data);
//         const times = dom.window.document.querySelectorAll("time.article-meta-value");
//         for (const time of times.values()) {
//             if(time.textContent){
//                 fs.appendFile('dates.txt', `${time.textContent}\n`, function (err) {
//                     if (err) throw err;
//                   });
//             }
//         }
//     };
// })();
