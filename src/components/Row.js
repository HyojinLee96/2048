import React from "react";
import Cell from "./Cell";
import uuid from "uuid";

const Row = ({ row }) => {
  return (
    <tr>
      {row.map((cell, i) => (
        <Cell key={uuid()} cellValue={cell} />
      ))}
    </tr>
  );
};

export default Row;
