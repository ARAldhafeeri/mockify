import React from "react";
import MockifyTableTypes from "./Table.types";
import { Table } from "antd";
import { addtionalClasses } from "utils";

const MockifyTable: React.FC<MockifyTableTypes> = ({ columns, data, classes, expandable}) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      expandable={expandable}
      className={addtionalClasses({classes: classes})}
    />
  );
}

export default MockifyTable;
/**
 * sample usage antd 5.8.0
 * https://ant.design/components/table
 */