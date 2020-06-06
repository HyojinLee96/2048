import React from "react";
import Cell from "./Cell";
import { uuid } from "uuidv4";

const Row = ({ row }) => {
  return (
    <tr className="row">
      {row.map((cell, i) => (
        <Cell key={uuid()} cellValue={cell} />
      ))}
    </tr>
  );
};

export default Row;
