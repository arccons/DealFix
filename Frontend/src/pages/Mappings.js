import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import MappingEdit from '../Components/MappingEdit';

function Mappings({ DBdeal }) {

  const [pageMsg, setPageMsg] = useState("");
  const [gotDBmappings, setGotDBmappings] = useState(false);
  const [mappingsList, setMappingsList] = useState([]);

  const [selectedMapping, setSelectedMapping] = useState();
  const [showEditForm, setShowEditForm] = useState(false);

  const navigate = useNavigate();

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
          setGotDBmappings(true);
          setShowEditForm(false);
          setPageMsg("Got mappings list from DB for deal: " + DBdeal.dealName);
        })
        .catch(error => {
          setPageMsg("Error getting mappings list: " + error);
          setGotDBmappings(false);
          setShowEditForm(false);
        });
    }
  }, [gotDBmappings, setPageMsg, showEditForm, DBdeal])

  function handleEditClick(event) {
    event.preventDefault();
    const selectedIndex = event.target.value;
    const mp = mappingsList[selectedIndex];
    setSelectedMapping(mp);
    setPageMsg("Editing Mapping for deal ID: " + DBdeal.dealName);
    setShowEditForm(true);
  }

  return (
    <div className="App">
      <center>
        <h6>Deal</h6>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>Deal ID</th>
              <th>Deal Name</th>
              <th>Effective Date</th>
              <th>Closing Date</th>
              <th>Sub-Sector</th>
              <th>Is Liquid</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              <td>{DBdeal.id}</td>
              <td>{DBdeal.dealName}</td>
              <td>{DBdeal.effectiveDate}</td>
              <td>{DBdeal.closingDate}</td>
              <td>{DBdeal.subSector}</td>
              <td>{DBdeal.isLiquid}</td>
            </tr>
          </MDBTableBody>
        </MDBTable>
        <br></br>
        <h6>Mappings</h6>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>Fund Name</th>
              <th>As of Date</th>
              <th>Local Cmmt</th>
              <th>Is Active</th>
              <th>Realized IRR</th>
              <th>Realized PNL</th>
              <th>Realized Date</th>
              <th>Edit</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {mappingsList.map((mp, index) => (
              <tr key={index}>
                <td>{mp.fund_name}</td>
                <td>{mp.as_of_date}</td>
                <td>{mp.local_cmmt}</td>
                <td>{mp.is_active}</td>
                <td>{mp.realized_irr}</td>
                <td>{mp.realized_pnl}</td>
                <td>{mp.realized_date}</td>
                <td><button value={index} onClick={handleEditClick}>Edit</button></td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
        <br></br>
        {!showEditForm && <button onClick={() => navigate("/")}>Done</button>}
        <br></br>
        {showEditForm && <MappingEdit mapping={selectedMapping} setGotDBmappings={setGotDBmappings} setShowEditForm={setShowEditForm} setPageMsg={setPageMsg} />}
        <br></br>
        {pageMsg}
      </center>
    </div>
  );
}

export default Mappings;
