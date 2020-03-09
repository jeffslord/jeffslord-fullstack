/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
/*
  *DOCUMENTATION

  *NOTES:
  - UPDATE: This is resolved I think.
    Currently this works for classic version of calculation views.
    Quick check is to see if input nodes use '#' at the beginning. If they do, this will work.
    A fix for different versions will probably eventually be made.
    HANA Studio appears to end at version 2.3, while Web Ide is at version 3.0.

  *Current features:
  - Identify split nodes
  - Fix split nodes (Will recursively check after initial fix)
  - Identify right joins
  - Fix right joins (By converting them to left joins)
  - Identify unmapped input parameters
  - Identify filters on calculated columns

  *Planned features:
  - Identify calculated columns in joins
  - Select classic schema to auto analyze cdata from a schema
  - Upload zip of xsa calculation views to analyze from


//Filter on calculated column
Calculated columns in joins
  mapping defines how names change
  join attribute gives which columns are joined?

*/

const xml2js = require("xml2js");
const path = require("path");
const util = require("util");
const fs = require('fs');
const cvUtils = require("./cv_utils");

const dataSourceUtils = require("./cv_data_source_utils");
const headerUtils = require("./cv_header_utils");
const hintUtils = require("./cv_hint_utils");
const joinUtils = require("./cv_join_utils");
const localVarUtils = require("./cv_local_var_utils");
const nodeUtils = require("./cv_node_utils");
const parseUtils = require("./cv_parse_utils");
const varMapUtils = require("./cv_var_map_utils");

const cvCheck = require("./cv_check");
const cvFix = require("./cv_fix");

function MakeCheck(checkName, found, autoFix, data, importance = 'unknown') {
  let check = {
    checkName: checkName,
    found: found,
    autoFix, autoFix,
    data, data,
    importance, importance
  }
  return check;
}


//! Checks
const pParseFile = util.promisify(parseUtils.ParseFile);
const pGetCvheaderInfo = util.promisify(headerUtils.GetCvheaderInfo);
const pCheckSplitNodes = util.promisify(cvCheck.CheckSplitNodes);
const pCheckRightJoinCvs = util.promisify(cvCheck.CheckRightJoins);
const pCheckCalcColumnsInFilter = util.promisify(cvCheck.CheckCalcColumnsInFilter);
const pCheckUnmappedParameters = util.promisify(cvCheck.CheckUnmappedParameters);
const pCheckHints = util.promisify(cvCheck.CheckHints);

//! Fixes
// const pFixSplitNodes = util.promisify(FixSplitNodes);
const pFixSplitNodes = util.promisify(cvFix.FixSplitNodes);
// const pFixRightJoins = util.promisify(FixRightJoins);
const pFixRightJoins = util.promisify(cvFix.FixRightJoins);

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
    throw err;
  }
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
    throw err;
  }
}

function Test() {
  const filePath = path.join(
    `${__dirname}`,
    "..",
    "data",
    "xml",
    "employeespunchedin.xml"
  );
  console.log("New test");
  // const filePath = path.join(`${__dirname}`, `..`, `data`, `xml`, `cv_bad.xml`);
  // const filePath = path.join(`${__dirname}`, `..`, `data`, `xml`, `cv_bad2.xml`);
  console.log("Processing...");
  CheckView(filePath, (errProcess, res) => {
    if (errProcess) {
      console.error(errProcess);
    }
    console.log("Processing complete!");
    console.log(res);
    console.log("Fixing...");
    FixSingleFile(filePath, (errFix, xml) => {
      if (errFix) {
        console.error(errFix);
      }
      console.log("Fixing complete!");
      console.log("\nWriting files...");
      // cvUtils.WriteFile('./data/json/cv_json_latest.json', JSON.stringify(xml));
      cvUtils.WriteFile("./data/xml/cv_xml_latest.xml", xml);
    });
  });
}

module.exports = {
  Test,
  CheckView,
  FixSingleFile,
  FixManyFiles,
  AnalyzeSingleFile,
  AnalyzeManyFiles
};
