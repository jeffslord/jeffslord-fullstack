const nodeUtils = require("./utils/cv_node_utils");
const joinUtils = require("./utils/cv_join_utils");
const parseUtils = require("./utils/cv_parse_utils");
const headerUtils = require('./utils/cv_header_utils');
const util = require("util");
const fs = require('fs');
const xml2js = require("xml2js");
const async = require("async");


const FixSplitNodes = nodeUtils.FixSplitNodes;
const FixRightJoins = joinUtils.FixRightJoins;

//! Fixes
const pFixSplitNodes = util.promisify(FixSplitNodes);
const pFixRightJoins = util.promisify(FixRightJoins);

const pParseFile = util.promisify(parseUtils.ParseFile);
const pGetCvheaderInfo = util.promisify(headerUtils.GetCvheaderInfo);


async function FixSingleFile(filePath, cb) {
    try {
        const json = await pParseFile(filePath);
        const header = await pGetCvheaderInfo(json);
        const split = await pFixSplitNodes(json, header.version);
        const right = await pFixRightJoins(json);
        const builder = new xml2js.Builder();
        const xml = builder.buildObject(json);
        fs.unlinkSync(filePath);
        return cb(null, xml);
    } catch (err) {
        fs.unlinkSync(filePath);
        return (new Error(err));
        // throw err;
    }

    // async.waterfall([
    //     function (callback) {
    //         parseUtils.ParseFile(filePath, function (null, json) {
    //             return callback(null);
    //         }
    //         // callback(null, 'yes');
    //     }, function (err, result) {
    //         return;
    //     }
    // ]);
}

const pFixSingleFile = util.promisify(FixSingleFile);

async function FixManyFiles(files, cb) {
    try {
        const allRes = [];
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const resXml = await pFixSingleFile(file.path);
            allRes.push(resXml);
            if (index + 1 === files.length) {
                return cb(null, allRes);
            }
        }
    } catch (err) {
        return (new Error(err));
        // throw err;
    }
}

module.exports = {
    FixSingleFile,
    FixManyFiles
}