import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { airlines } from './data';
import axios from 'axios'
import Loader from "react-loader-spinner";

const Home = () => {
  const [selectedAirline, setSelectedAirline] = useState(0);
  const [inventory, setInventory] = useState([]);
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
    setSelectedAirline(value.weight);
  };

  const options = airlines.map((airline) => {
    return ({ value: airline.id, label: airline.name, weight: airline.weight })
  })

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
        <div style={{marginRight: "5px", width: "300px", height: "200px", border: "1px solid black"}}>
          {loading
            ? <Loader
                type="TailSpin"
                color="#00BFFF"
                height={20}
                width={20}
                timeout={4000} 
              />
            : (
              <ul>
              {inventory.map((item) => (
                <li style={{display: "flex", justifyContent: "space-between"}}>
                  <div>
                    {item.name}
                  </div>
                  <div onHover={() => console.log('test')}>
                    {item.weight}
                  </div>
                </li>
              ))}
              </ul>
            )
          }
        </div>
        <div style={{width: "100px", height: "300px", border: "1px solid black"}}>
          body
        </div>
      </div>
    </>
  );
}

export default Home;