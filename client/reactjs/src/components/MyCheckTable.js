import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

export default function MyCheckTable(props) {
  //   const [state, setState] = useState({
  //     columns: [
  //       { title: "Check", field: "check" },
  //       {
  //         title: "Found",
  //         field: "found",
  //         cellStyle: rowData => ({
  //           backgroundColor: rowData === "Yes" ? "#e57373" : "#a5d6a7"
  //         })
  //       }
  //     ],
  //     data: [
  //       { check: "Split Nodes", found: "Yes" },
  //       { check: "Right Joins", found: "No" }
  //     ],
  //     options: {
  //       selection: true,
  //       selectionProps: rowData => ({
  //         disabled: rowData.found === "No",
  //         color: "primary"
  //       })
  //       // rowStyle: rowData => ({
  //       //   backgroundColor: rowData.found === "Yes" ? "#e57373" : "#a5d6a7"
  //       // })
  //     },
  //     actions: [
  //       {
  //         tooltip: "Fix all checks",
  //         icon: "check",
  //         onClick: (evt, data) => {
  //           console.log(evt, data);
  //         }
  //       }
  //     ]
  //   });
  return (
    <div>
      <MaterialTable
        title={`Calculation View: ${props.tableState.cvName} (v${props.tableState.cvVersion})`}
        columns={props.tableState.columns}
        data={props.tableState.data}
        options={props.tableState.options}
        actions={props.tableState.actions}
      ></MaterialTable>
    </div>
  );
}
