import React from "react";

const Cell = ({ cellValue }) => {
  return (
    <td>
      <div className='cellValue'>{cellValue === 0 ? null : cellValue}</div>
    </td>
  );
};

export default Cell;
