import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MappingEdit from '../Components/MappingEdit';

function Mappings({ DBdeal, setPageMsg }) {

  const [gotDBmappings, setGotDBmappings] = useState(false);
  const [mappingsList, setMappingsList] = useState([]);
  const [selectedMapping, setSelectedMapping] = useState();
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    console.log("useEffect: Entered.");
    if (!gotDBmappings) {
      console.log("useEffect: Getting mappings list.");
      console.log(DBdeal);
      const formData = new FormData();
      formData.append('dealID', DBdeal.id);
      const url = 'http://localhost:8000/mappings/';
      const config = {
        headers: {
          'content-type': 'application/vnd.api+json'
        },
      }
      axios.post(url, formData, config)
        .then(response => {
          setMappingsList(JSON.parse(response.data.MAPPING_LIST));
          console.log(JSON.parse(response.data.MAPPING_LIST));
          setGotDBmappings(true);
          if (showEditForm) {
            setShowEditForm(false);
          } else {
            setPageMsg("");
          }
        })
        .catch(error => {
          console.error("Error getting deal list: ", error);
          setPageMsg("Error getting deal list: " + error);
          setGotDBmappings(false);
          setShowEditForm(false);
        });
    }
  }, [gotDBmappings, setPageMsg, showEditForm, DBdeal])

  function handleEditClick(event) {
    event.preventDefault();
    const selectedIndex = event.target.value;
    console.log(selectedIndex);
    const mp = mappingsList[selectedIndex];
    setSelectedMapping(mp);
    console.log(mp);
    setShowEditForm(true);
  }

  return (
    <div className="App">
      <center>
        <table>
          <caption><b>Deal</b></caption>
          <thead>
            <tr>
              <th>Deal ID</th>
              <th>Deal Name</th>
              <th>Effective Date</th>
              <th>Closing Date</th>
              <th>Sub-Sector</th>
              <th>Is Liquid</th>
            </tr>
          </thead>
          <tbody>
            <td>{DBdeal.id}</td>
            <td>{DBdeal.dealName}</td>
            <td>{DBdeal.effectiveDate}</td>
            <td>{DBdeal.closingDate}</td>
            <td>{DBdeal.subSector}</td>
            <td>{DBdeal.isLiquid}</td>
          </tbody>
        </table>
        <br></br>
        <table>
          <caption><b>Mappings</b></caption>
          <thead>
            <th>Fund Name</th>
            <th>As of Date</th>
            <th>Local Cmmt</th>
            <th>Is Active</th>
            <th>Realized IRR</th>
            <th>Realized PNL</th>
            <th>Realized Date</th>
            <th>Edit</th>
          </thead>
          <tbody>
            {mappingsList.map((mp, index) => (
              <tr>
                <td>{mp.fund_name}</td>
                <td>{mp.as_of_date}</td>
                <td>{mp.local_cmmt}</td>
                <td>{mp.is_active}</td>
                <td>{mp.realized_irr}</td>
                <td>{mp.realized_pnl}</td>
                <td>{mp.realized_date}</td>
                <td><button key={index} value={index} onClick={handleEditClick}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
      <br></br>
      {showEditForm && <MappingEdit mapping={selectedMapping} setShowEditForm={setShowEditForm} setPageMsg={setPageMsg} />}
    </div>
  );
}

export default Mappings;
