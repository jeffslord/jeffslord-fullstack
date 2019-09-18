import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

export default function MyCheckTable(props) {
  return (
    <div>
      <MaterialTable
        title={`${props.tableState.cvName} (v${props.tableState.cvVersion})`}
        columns={props.tableState.columns}
        data={props.tableState.data}
        options={props.tableState.options}
        actions={props.tableState.actions}
      ></MaterialTable>
    </div>
  );
}
