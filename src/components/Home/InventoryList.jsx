import React from 'react';

const InventoryList = ({ data, onHandleClickAddItem }) => {
  return (
    <div>
      <div className="title">Inventory</div>
      <ul>
      {data.map((item) => (
        <li key={item.name}>
          <div>
            {item.name}
          </div>
          <div>
            <div className="hidden">{item.weight}</div>
            <div
              className="show"
              onClick={() => onHandleClickAddItem(item)}
            >Add</div>
          </div>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default InventoryList;