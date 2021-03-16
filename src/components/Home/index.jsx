import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { airlines } from './data';
import axios from 'axios'
import Loader from "react-loader-spinner";
import './index.css';

const Home = () => {
  // state
  const [selectedAirlineMaxWeight, setSelectedAirlineMaxWeight] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInventory = () => {
      setLoading(true);
      axios.get('https://weekndr.herokuapp.com/api/v2/cabin-luggage-inventory')
      .then(response => {
        setLoading(false);
        setInventory(response.data.items)
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      })
    }
    fetchInventory();
  },[])

  const handleSelectedChange = value => {
    setSelectedAirlineMaxWeight(value.weight);
  };

  const handleClickAddItem = (item) => {
    const newInventory = [...inventory];
    const filteredInventory = newInventory.filter(el => el.name !== item.name);
    setInventory(filteredInventory);
    setSelectedItem((prevState) => [...prevState, item]);
  };

  const handleClickRemoveItem = (item) => {
    const selectedInventory = [...selectedItem];
    const filteredSelectedInventory = selectedInventory.filter(el => el.name !== item.name);
    setSelectedItem(filteredSelectedInventory);
    setInventory((prevState) => [...prevState, item]);
  };

  const calculateWeight = () => {
    const maxWeight = selectedAirlineMaxWeight * 1000;
    const totalItemsWeight = selectedItem.reduce(function (acc, item) { return acc + item.weight; }, 0);
    let className = "success";
    if (totalItemsWeight > maxWeight) {
      className = "danger";
    }
    return <div className={className}>{totalItemsWeight}</div>;
  };

  const options = airlines.map((airline) => {
    return ({ value: airline.id, label: airline.name, weight: airline.weight })
  })

  console.log(selectedItem)

  return (
    <>
      <div style={{paddingTop: "25px", width: "200px", margin: "0 auto"}}>
        <Select
          placeholder="Airline"
          options={options}
          onChange={handleSelectedChange}
          isClearable
        />    
      </div>
      <div style={{marginTop: "10px", width: "650px", display: "flex"}}>
        <div style={{marginRight: "5px", width: "300px", height: "250px", border: "1px solid black"}}>
          {loading
            ? <Loader
                type="TailSpin"
                color="#00BFFF"
                height={20}
                width={20}
                timeout={4000} 
              />
            : (
              <div>
              <div>Inventory</div>
              <ul>
              {inventory.map((item) => (
                <li key={item.name} style={{display: "flex", justifyContent: "space-between"}}>
                  <div>
                    {item.name}
                  </div>
                  <div>
                    <div className="hidden">{item.weight}</div>
                    <div
                      className="show add"
                      onClick={() => handleClickAddItem(item)}
                    >Add</div>
                  </div>
                </li>
              ))}
              </ul>
              </div>
            )
          }
        </div>
        <div style={{width: "300px", height: "300px", border: "1px solid black"}}>
          <div>Selected</div>
          {selectedItem.length
          ? (
            <>
              <ul>
                {selectedItem.map((item) => (
                  <li key={item.name} style={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                      {item.name}
                    </div>
                    <div className="hidden">{item.weight}</div>
                    <div
                      className="show add"
                      onClick={() => handleClickRemoveItem(item)}
                    >
                      Remove
                    </div>
                  </li>  
                ))}
              </ul>
              <div>
              {calculateWeight()}
              </div>
            </>
          )
           : null}
          <button>Voir résumé</button>
        </div>
      </div>
    </>
  );
}

export default Home;