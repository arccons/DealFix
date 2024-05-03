import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DealEdit from '../Components/DealEdit';

function Deals({ setDBdeal }) {

  const [pageMsg, setPageMsg] = useState("");
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
          setGotDBdeals(true);
          setShowEditForm(false);
          setPageMsg("Got deal list from DB.");
        })
        .catch(error => {
          setPageMsg("Error getting deal list: " + error);
          setGotDBdeals(false);
          setShowEditForm(false);
        });
    }
  }, [gotDBdeals, setPageMsg, showEditForm])

  function handleEditClick(event) {
    event.preventDefault();
    setShowEditForm(true);
    const selectedIndex = event.target.value;
    const dl = dealList[selectedIndex];
    setCurrentDeal(dl);
    setPageMsg("Got deal details.");
  }

  function handleMappingClick(event) {
    event.preventDefault();
    setShowEditForm(false);
    const selectedIndex = event.target.value;
    const dl = dealList[selectedIndex];
    setDBdeal(dl);
    navigate('/mappings');
  }

  return (
    <div className="App">
      <center>
        <table>
          <caption><b>Deals</b></caption>
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
        <br></br>
        {showEditForm && <DealEdit deal={currentDeal} setGotDBdeals={setGotDBdeals} setShowEditForm={setShowEditForm} setPageMsg={setPageMsg} />}
        <br></br>
        {pageMsg}
      </center>
    </div>
  );
}

export default Deals;
