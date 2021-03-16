import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

 const Report = () => {

  // format query params from url
  const getQueryParams = () => {            
    const pairs = window.location.search.slice(1).split('&');
    const arrNames = [];
    const arrWeights = [];
    let airline = '';
    pairs.forEach((pair) => {
        pair = pair.split('=');
        if (pair[0] === 'name') {
          arrNames.push(decodeURIComponent(pair[1]))
        } else if (pair[0] === 'weight') {
          arrWeights.push(decodeURIComponent(pair[1]))
        }  else if (pair[0] === 'airline') {
          airline = decodeURIComponent(pair[1])
        }
    });
    const result = arrNames.map((name, i) => {
      return [name, arrWeights[i]];
    });
    return { data: result, airline };
  };

  // total weight counter
  const calculateTotalWeight = () => {
    let total = 0; 
    getQueryParams().data.forEach((param) => {
      total += parseInt(param[1]);
    });
    return total;
  }

  return (
    <div className="card-container">
      <div className="selectable">{getQueryParams().airline}</div>
      <div className="card">
        <div className="title">My BackPack</div>
        <ul>
        {getQueryParams().data.map((param) => (
          <li key={param[0]}>
            <div>{param[0]}</div>
            <div>{param[1]}</div>
          </li>
        ))}        
        </ul>
        <div className="right">Total: {calculateTotalWeight()}</div>
        <Link 
          className="button button-back"
          to={"/"}
        >
          Back
        </Link>
      </div> 
    </div>
  );
}

export default Report;