import React from 'react';

const Cell = ({ cellValue }) => {
  let cellValueClass = cellValue === 0 ? '' : 'currentCell';

  return (
    <td className={`color-${cellValue} cell ${cellValueClass}`}>
      <div className='cellValue'>{cellValue === 0 ? null : cellValue}</div>
    </td>
  );
};

export default Cell;
