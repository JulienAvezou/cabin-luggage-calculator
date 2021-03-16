import React, { useState, useEffect } from 'react';
import '../../index.css';
import Select from 'react-select';
import axios from 'axios'
import Loader from "react-loader-spinner";
import { airlines } from './data';

// components
import InventoryList from './InventoryList';
import SelectedItemsList from './SelectedItemsList';

const Home = () => {
  // state
  const [selectedAirline, setSelectedAirline] = useState({});
  const [inventoryList, setInventoryList] = useState([]);
  const [selectedItemsList, setSelectedItemsList] = useState([]);
  const [totalWeight, setTotalWeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // vars
  // retrieve airlines data
  const options = airlines.map((airline) => {
    return ({ value: airline.id, label: airline.name, weight: airline.weight })
  });

  // query params to pass to /report
  let params = "";
  selectedItemsList.forEach((el) => params += `name=${el.name}&weight=${el.weight}&`);
  params += `airline=${selectedAirline.label}`;

  // hooks
  // load inventory data
  useEffect(() => {
    const fetchInventory = () => {
      setIsLoading(true);
      axios.get('https://weekndr.herokuapp.com/api/v2/cabin-luggage-inventory')
      .then(response => {
        setIsLoading(false);
        setInventoryList(response.data.items)
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      })
    }
    fetchInventory();
  },[])

  // update total weight calculator and control button state
  useEffect(() => {
      const calculateWeight = () => {
        const maxWeight = selectedAirline.weight * 1000;
        const totalItemsWeight = selectedItemsList.reduce((acc, item) => { return acc + item.weight; }, 0);
        setTotalWeight(totalItemsWeight);
        if (selectedAirline.label) {
          if (totalItemsWeight > maxWeight || selectedItemsList.length === 0) {
            setIsDisabled(true);        
          } else {
            setIsDisabled(false);
          }
        }
      };
      calculateWeight();
  }, [selectedItemsList, selectedAirline.weight, totalWeight, selectedAirline.label])

  // methods
  const handleSelectedChange = value => {
    setSelectedAirline(value);
  };

  // add item to selected list & remove same item from inventory lit
  const handleClickAddItem = (item) => {
    const newInventoryList = [...inventoryList];
    const updatedInventoryList = newInventoryList.filter(el => el.name !== item.name);
    setInventoryList(updatedInventoryList);
    setSelectedItemsList((prevState) => [...prevState, item]);
  };

  // add item to inventory list & remove same item from selected list
  const handleClickRemoveItem = (item) => {
    const newSelectedItemsList = [...selectedItemsList];
    const updatedSelectedItemsList = newSelectedItemsList.filter(el => el.name !== item.name);
    setSelectedItemsList(updatedSelectedItemsList);
    setInventoryList((prevState) => [...prevState, item]);
  };

  return (
    <div>
      <div className="selectable">
        <Select
          placeholder="Airline"
          options={options}
          onChange={handleSelectedChange}
        />    
      </div>
      <div className="card-container flex">
        <div className="card">
          {isLoading
            ? <div className>
                <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={30}
                  width={30}
                  timeout={4000} 
                />
              </div>
            : (
              <InventoryList
                data={inventoryList}
                onHandleClickAddItem={handleClickAddItem}
              />
            )
          }
        </div>
        <SelectedItemsList 
          data={selectedItemsList}
          onHandleClickRemoveItem={handleClickRemoveItem}
          isDisabled={isDisabled}
          totalWeight={totalWeight}
          params={params}
        />
      </div>
    </div>
  );
}

export default Home;