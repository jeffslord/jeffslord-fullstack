const nodeUtils = require("./utils/cv_node_utils");
const joinUtils = require("./utils/cv_join_utils");
const headerUtils = require("./cv_header_utils");
const dataSourceUtils = require("./utils/cv_data_source_utils");
const hintUtils = require("./utils/cv_hint_utils");
const localVarUtils = require("./utils/cv_local_var_utils");
const varMapUtils = require("./utils/cv_var_map_utils");


const CheckSplitNodes = nodeUtils.CheckSplitNodes;
const CheckCalcColumnsInFilter = nodeUtils.CheckCalcColumnsInFilter;
const CheckRightJoins = joinUtils.CheckRightJoins;
const CheckHints = hintUtils.CheckHints;
const CheckUnmappedParameters = nodeUtils.CheckUnmappedParameters;

//! Checks
const pParseFile = util.promisify(parseUtils.ParseFile);
const pGetCvheaderInfo = util.promisify(headerUtils.GetCvheaderInfo);
const pCheckSplitNodes = util.promisify(CheckSplitNodes);
const pCheckRightJoinCvs = util.promisify(CheckRightJoins);
const pCheckCalcColumnsInFilter = util.promisify(CheckCalcColumnsInFilter);
const pCheckUnmappedParameters = util.promisify(CheckUnmappedParameters);
const pCheckHints = util.promisify(CheckHints);

async function CheckView(filePath, cb) {
    const res = {};
    const checks = [];
    try {
        const json = await pParseFile(filePath);
        const headerInfo = await pGetCvheaderInfo(json);
        res.header = headerInfo;

        //! SPLIT NODES
        const splits = await pCheckSplitNodes(json);
        checks.push(MakeCheck("Split Nodes", splits.found, true, splits.data));

        //! RIGHT JOINS
        const rJoins = await pCheckRightJoinCvs(json);
        checks.push(MakeCheck("Right Joins", rJoins.found, true, rJoins.data, 'low'));

        //! CALCULATED COLUMNS IN FILTER
        const calcColsInFilter = await pCheckCalcColumnsInFilter(json);
        checks.push(MakeCheck("Calculated Columns in Filter", calcColsInFilter.found, false, calcColsInFilter.data));

        //! UNMAPPED PARAMETERS (Not used in filters or calculations)
        const unmapped = await pCheckUnmappedParameters(json);
        checks.push(MakeCheck("Unmapped Parameters", unmapped.found, false, unmapped.data));

        //! HINTS
        const hints = await pCheckHints(json);
        checks.push(MakeCheck("Hints", hints.found, false, hints.data));

        res.checks = checks;
        console.log("Check Results", JSON.stringify(res, null, 4));
        return cb(null, res);
    } catch (err) {
        throw err;
    }
}

const pCheckView = util.promisify(CheckView);

async function AnalyzeSingleFile(filePath, cb) {
    try {
        const checkRes = await pCheckView(filePath);
        fs.unlinkSync(filePath);
        return cb(null, checkRes);
    }
    catch (err) {
        fs.unlinkSync(filePath);
        throw err;
    }
}

const pAnalyzeSingleFile = util.promisify(AnalyzeSingleFile);

async function AnalyzeManyFiles(files, cb) {
    try {
        let analyzeRes = [];
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const checkRes = await pAnalyzeSingleFile(file.path);
            analyzeRes.push(checkRes);
            if (index + 1 === files.length) {
                return cb(null, analyzeRes);
            }
        }
    } catch (err) {
        throw (err);
    }
}


module.exports = {
    // CheckSplitNodes,
    // CheckCalcColumnsInFilter,
    // CheckRightJoins,
    // CheckHints,
    // CheckUnmappedParameters

    AnalyzeSingleFile,
    AnalyzeManyFiles
};