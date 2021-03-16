import React from 'react';

const InventoryList = ({ data, onHandleClickAddItem }) => {
  return (
    <div>
      <div>Inventory</div>
      <ul>
      {data.map((item) => (
        <li key={item.name} style={{display: "flex", justifyContent: "space-between"}}>
          <div>
            {item.name}
          </div>
          <div>
            <div className="hidden">{item.weight}</div>
            <div
              className="show add"
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