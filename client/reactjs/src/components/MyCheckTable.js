import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

export default function MyCheckTable(props) {
  const [state, setState] = useState({
    columns: [
      { title: "Check", field: "check" },
      {
        title: "Found",
        field: "found",
        cellStyle: rowData => ({
          backgroundColor: rowData === "true" ? "#e57373" : "#a5d6a7"
        })
      },
      { title: "Auto Fixable", field: "fixable" }
    ],
    options: {
      selection: false,
      selectionProps: rowData => ({
        disabled: rowData.found === "false",
        color: "primary"
      }),
      pageSize: 5
    }
  });
  return (
    <div>
      <MaterialTable
        title={`${props.tableState.cvName} (v${props.tableState.cvVersion})`}
        columns={state.columns}
        data={props.tableState.data}
        options={state.options}
      ></MaterialTable>
    </div>
  );
}
