import React from 'react';
import { Link } from 'react-router-dom';

const SelectedItemsList = ({ data, onHandleClickRemoveItem, isDisabled, totalWeight, params }) => {
  return (
    <div className="card selected-card">
      <div className="title">Selected</div>
      {data.length
      ? (
        <div>
          <ul>
            {data.map((item) => (
              <li key={item.name}>
                <div>
                  {item.name}
                </div>
                <div className="hidden">{item.weight}</div>
                <div
                  className="show"
                  onClick={() => onHandleClickRemoveItem(item)}
                >
                  Remove
                </div>
              </li>  
            ))}
          </ul>
          <div>
            <div className={`right ${isDisabled ? "danger" : "success"}`}>Total: {totalWeight}</div>
          </div>
        </div>
      )
      : null}
      <Link 
        className={`button ${isDisabled && "disabled-button"}`}
        to={`/report?${params}`}
      >
        View summary
      </Link>
    </div>
  )
}

export default SelectedItemsList;