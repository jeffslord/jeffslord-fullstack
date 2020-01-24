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

// Find all input nodes that are used in more than 1 calc view node
// And remove any datasources
function CheckSplitNodes(jsonResult, cb) {
  cvUtils.GetSplitNodes(jsonResult, (err, data) => {
    if (err) {
      return cb(err);
    }
    return cb(null, { data, found: Object.keys(data).length > 0 });
  });
}

function CheckRightJoinCvs(jsonResult, cb) {
  cvUtils.GetRightJoinCvs(jsonResult, (err, data) => {
    if (err) {
      return cb(err);
    }
    return cb(null, { data, found: data.length > 0 });
  });
}

function CheckCalcColumnsInFilter(jsonResult, cb) {
  cvUtils.GetCalcColumnsInFilter(jsonResult, (err, data) => {
    if (err) {
      return cb(err);
    }
    return cb(null, { data, found: data.length > 0 });
  });
}

function CheckUnmappedParameters(jsonResult, cb) {
  cvUtils.GetUnmappedParameters(jsonResult, (err, data) => {
    if (err) {
      return cb(err);
    }
    return cb(null, { data, found: data.length > 0 });
  });
}

function CheckHints(jsonResult, cb) {
  cvUtils.GetHints(jsonResult, (err, data) => {
    if (err) {
      return cb(err);
    }
    return cb(null, { data, found: data.length > 0 });
  })
}

// need to check if split node is a data source
// if it is a data source than it is allowed to be in multiple places
function FixSplitNodes(jsonResult, version, cb) {
  // const cvRoot = GetCvRoot(jsonResult);
  cvUtils.GetNodeRoot(jsonResult, (err, cvRoot) => {
    if (err) {
      return cb(err);
    }
    let complete = false;
    const allSplits = [];
    while (!complete) {
      // Get input nodes that are used by more than 1 node
      CheckSplitNodes(jsonResult, (err, splitRes) => {
        if (err) {
          return cb(err);
        }
        if (Object.keys(splitRes.splitNodes).length === 0) {
          complete = true;
        } else {
          allSplits.push(splitRes.splitNodes);
          Object.keys(splitRes.splitNodes).forEach(key => {
            // Get the calc view nodes based on the name of split inputs
            cvUtils.GetInputs(jsonResult, key, (err2, inputNodes) => {
              for (let i = 0; i < splitRes.splitNodes[key] - 1; i++) {
                // Make a copy for each split (if used in 10 places, create 9 new)
                cvUtils.CopyCv(jsonResult, key, cvCopy => {
                  const cvCopyNew = cvCopy;
                  // Change the copies id to new id (_i for iteration)
                  cvCopyNew.$.id = `${cvCopyNew.$.id}_${i + 1}`;
                  // Add copy to the structure
                  cvRoot.push(cvCopyNew);
                  // Change input node to the newly created calc view node
                  // CreateInputName(inputNodes[i].$.node, version, (err, newName) => {
                  //   inputNodes[i].$.node = newName;
                  // });
                  if (version <= 2.3) {
                    inputNodes[i].$.node = `#${cvCopyNew.$.id}`;
                  } else {
                    inputNodes[i].$.node = `${cvCopyNew.$.id}`;
                  }
                });
              }
            });
          });
        }
      });
    }
    return cb(null, allSplits);
  });
}

function FixRightJoins(jsonResult, cb) {
  CheckRightJoinCvs(jsonResult, (err, rightRes) => {
    rightRes.rightOuters.forEach(ele => {
      ele.$.joinType = "leftOuter";
      [ele.input[0], ele.input[1]] = [ele.input[1], ele.input[0]];
    });
    return cb(null, rightRes.rightOuters);
  });
}

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
const pParseFile = util.promisify(cvUtils.ParseFile);
const pGetCvheaderInfo = util.promisify(cvUtils.GetCvheaderInfo);
const pCheckSplitNodes = util.promisify(CheckSplitNodes);
const pCheckRightJoinCvs = util.promisify(CheckRightJoinCvs);
const pCheckCalcColumnsInFilter = util.promisify(CheckCalcColumnsInFilter);
const pCheckUnmappedParameters = util.promisify(CheckUnmappedParameters);
const pCheckHints = util.promisify(CheckHints);

//! Fixes
const pFixSplitNodes = util.promisify(FixSplitNodes);
const pFixRightJoins = util.promisify(FixRightJoins);

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

    // checks.push({
    //   checkName: "Split Nodes",
    //   found: splits.found,
    //   autoFix: true,
    //   data: splits.splitNodes
    // });
    // checks.push({
    //   checkName: "Right Joins",
    //   found: rJoins.found,
    //   autoFix: true,
    //   data: rJoins.rightOuters
    // });
    // checks.push({
    //   checkName: "Calculated Columns in Filter",
    //   found: calcColsInFilter.found,
    //   autoFix: false,
    //   data: calcColsInFilter.calcColsInFilter
    // });
    // checks.push({
    //   checkName: "Unmapped parameters",
    //   found: unmapped.found,
    //   autoFix: false,
    //   data: unmapped.unmapped
    // });
    // checks.push({
    //   checkName: "Hints",
    //   found: hints.found,
    //   autoFix: false,
    //   data: hints.hints
    // });

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
