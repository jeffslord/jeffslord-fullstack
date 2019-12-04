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
const cvUtils = require("./cv_utils");

// Find all input nodes that are used in more than 1 calc view node
// And remove any datasources
function CheckSplitNodes(jsonResult, cb) {
  cvUtils.GetSplitNodes(jsonResult, (err, splitNodes) => {
    if (err) {
      return cb(err);
    }
    return cb(null, { splitNodes, found: Object.keys(splitNodes).length > 0 });
  });
}

function CheckRightJoinCvs(jsonResult, cb) {
  cvUtils.GetRightJoinCvs(jsonResult, (err, rightOuters) => {
    if (err) {
      return cb(err);
    }
    return cb(null, { rightOuters, found: rightOuters.length > 0 });
  });
}

function CheckCalcColumnsInFilter(jsonResult, cb) {
  cvUtils.GetCalcColumnsInFilter(jsonResult, (err, calcColsInFilter) => {
    if (err) {
      return cb(err);
    }
    return cb(null, { calcColsInFilter, found: calcColsInFilter.length > 0 });
  });
}

function CheckUnmappedParameters(jsonResult, cb) {
  cvUtils.GetUnmappedParameters(jsonResult, (err, unmapped) => {
    if (err) {
      return cb(err);
    }
    return cb(null, { unmapped, found: unmapped.length > 0 });
  });
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

const pParseFile = util.promisify(cvUtils.ParseFile);
const pGetCvheaderInfo = util.promisify(cvUtils.GetCvheaderInfo);
const pCheckSplitNodes = util.promisify(CheckSplitNodes);
const pCheckRightJoinCvs = util.promisify(CheckRightJoinCvs);
const pCheckCalcColumnsInFilter = util.promisify(CheckCalcColumnsInFilter);
const pCheckUnmappedParameters = util.promisify(CheckUnmappedParameters);
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
    // console.log('Split Nodes:\n', splits);

    //! RIGHT JOINS
    const rJoins = await pCheckRightJoinCvs(json);
    // console.log('Right Outer Joins:\n', rJoins);

    //! CALCULATED COLUMNS IN FILTER
    const calcColsInFilter = await pCheckCalcColumnsInFilter(json);
    // console.log('Calculated Columns in Filters:\n', cColsFilter);

    //! UNMAPPED PARAMETERS (Not used in filters or calculations)
    const unmapped = await pCheckUnmappedParameters(json);
    // console.log('Unmapped Parameters:\n', unmapped);

    checks.push({
      checkName: "Split Nodes",
      found: splits.found,
      autoFix: true,
      data: splits.splitNodes
    });
    checks.push({
      checkName: "Right Joins",
      found: rJoins.found,
      autoFix: true,
      data: rJoins.rightOuters
    });
    checks.push({
      checkName: "Calculated Columns in Filter",
      found: calcColsInFilter.found,
      autoFix: false,
      data: calcColsInFilter.calcColsInFilter
    });
    checks.push({
      checkName: "Unmapped parameters",
      found: unmapped.found,
      autoFix: false,
      data: unmapped.unmapped
    });

    res.checks = checks;
    console.log("Check Results", JSON.stringify(res, null, 4));
    return cb(null, res);
  } catch (err) {
    throw err;
  }
}

async function FixView(filePath, cb) {
  try {
    const json = await pParseFile(filePath);
    const header = await pGetCvheaderInfo(json);
    const split = await pFixSplitNodes(json, header.version);
    const right = await pFixRightJoins(json);
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(json);
    return cb(null, xml);
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
    FixView(filePath, (errFix, xml) => {
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
  FixView
};
