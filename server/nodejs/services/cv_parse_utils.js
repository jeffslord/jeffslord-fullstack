const fs = require("fs");
const xml2js = require("xml2js");
const path = require("path");
const parser = new xml2js.Parser();

function ParseFile(filePath, cb) {
    fs.readFile(filePath, "utf8", (err, data) => {
        parser.parseString(data, (err2, parsedString) => {
            // WriteFile(
            //     "./data/json/cv_json_latest.json",
            //     JSON.stringify(result, null, 4)
            // );
            cb(null, parsedString);
        });
    });
}
function ParseXML(xml, cb) {
    parser.parseString(xml, (err, parsedString) => {
        cb(null, parsedString);
    });
}

module.exports = {
    ParseFile,
    ParseXML
}