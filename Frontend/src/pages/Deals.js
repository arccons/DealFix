import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DealEdit from '../Components/DealEdit';

function Deals({ setDBdeal, setPageMsg }) {

  const [gotDBdeals, setGotDBdeals] = useState(false);
  const [dealList, setDealList] = useState([]);
  const [currentDeal, setCurrentDeal] = useState();
  const [showEditForm, setShowEditForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect: Entered.");
    if (!gotDBdeals) {
      console.log("useEffect: Getting deal list.");
      const url = 'http://localhost:8000/deals/';
      const config = {
        headers: {
          'content-type': 'application/json'
        },
      }
      axios.get(url, config)
        .then(response => {
          setDealList(JSON.parse(response.data.DEAL_LIST));
          console.log(response.data.DEAL_LIST);
          setGotDBdeals(true);
          if (showEditForm) {
            setShowEditForm(false);
          } else {
            setPageMsg("");
          }
        })
        .catch(error => {
          console.error("Error getting deal list: ", error);
          setPageMsg("Error getting deal list: " + error);
          setGotDBdeals(false);
          setShowEditForm(false);
        });
    }
  }, [gotDBdeals, setPageMsg, showEditForm])

  function handleEditClick(event) {
    event.preventDefault();
    const selectedIndex = event.target.value;
    console.log(selectedIndex);
    const dl = dealList[selectedIndex];
    console.log(dl);
    setCurrentDeal(dl);
    setShowEditForm(true);
  }

  function handleMappingClick(event) {
    event.preventDefault();
    const selectedIndex = event.target.value;
    console.log(selectedIndex);
    const dl = dealList[selectedIndex];
    setDBdeal(dl);
    console.log(dl);
    navigate('/mappings', { state: { deal: dl } });
  }

  return (
    <div className="App">
      <center>
        <table>
          <caption><b>Deal List</b></caption>
          <thead>
            <tr>
              <th>Deal ID</th>
              <th>Deal Name</th>
              <th>Effective Date</th>
              <th>Closing Date</th>
              <th>Sub-Sector</th>
              <th>Is Liquid</th>
              <th>Edit</th>
              <th>Mappings</th>
            </tr>
          </thead>
          <tbody>
            {dealList.map((d, index) => (
              <tr key={index}>
                <td>{d.id}</td>
                <td>{d.dealName}</td>
                <td>{d.effectiveDate}</td>
                <td>{d.closingDate}</td>
                <td>{d.subSector}</td>
                <td>{d.isLiquid}</td>
                <td><button value={index} onClick={handleEditClick}>Edit</button></td>
                <td><button value={index} onClick={handleMappingClick}>Mappings</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
      <br></br>
      {showEditForm && <DealEdit deal={currentDeal} setShowEditForm={setShowEditForm} setPageMsg={setPageMsg} />}
    </div>
  );
}

export default Deals;
