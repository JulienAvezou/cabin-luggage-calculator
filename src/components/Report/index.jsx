import React from 'react';

const Report = () => {

  const getQueryParams = () => {            
    const pairs = window.location.search.slice(1).split('&');
    const arrNames = [];
    const arrWeights = [];

    pairs.forEach((pair) => {
        pair = pair.split('=');
        if (pair[0] === 'name') {
          arrNames.push(decodeURIComponent(pair[1]))
        } else if (pair[0] === 'weight') {
          arrWeights.push(decodeURIComponent(pair[1]))
        }  
    });
    const result = arrNames.map((name, i) => {
      return [name, arrWeights[i]];
    });
    return result;
  };

  const calculateTotalWeight = () => {
    let total = 0; 
    getQueryParams().forEach((param) => {
      total += parseInt(param[1]);
    });
    return total;
  }

  return (
    <div>
      <div>My BackPack</div>
        <ul>
        {getQueryParams().map((param) => (
          <li>
            <div>{param[0]}</div>
            <div>{param[1]}</div>
          </li>
        ))}        
        </ul>
        <div>{calculateTotalWeight()}</div>
    </div>
  );
}

export default Report;