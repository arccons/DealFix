import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function DealEdit({ deal, setGotDBdeals, setShowEditForm, setPageMsg }) {

  const [effectiveDate, setEffectiveDate] = useState(deal.effectiveDate);
  const [closingDate, setClosingDate] = useState(deal.closingDate);
  const [subSector, setSubsector] = useState(deal.subSector);
  const [isLiquid, setIsLiquid] = useState(deal.isLiquid);

  const [itemChanged, setItemChanged] = useState(false);

  const navigate = useNavigate();

  function handleEffectiveDateChange(event) {
    event.preventDefault();
    setItemChanged(true);
    setEffectiveDate(document.getElementById("effectiveDate").value);
  }

  function handleClosingDateChange(event) {
    event.preventDefault();
    setItemChanged(true);
    setClosingDate(document.getElementById("closingDate").value);
  }

  function handleSubSectorChange(event) {
    event.preventDefault();
    setItemChanged(true);
    setSubsector(document.getElementById("subSector").value);
  }

  function handleIsLiquidChange(event) {
    event.preventDefault();
    setItemChanged(true);
    setIsLiquid(document.getElementById("isLiquid").value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (itemChanged) {
      const url = 'http://localhost:8000/updateDeal/';
      const formData = new FormData();
      formData.append('dealID', deal.id);
      formData.append('effectiveDate', effectiveDate === 'None' ? '' : effectiveDate);
      formData.append('closingDate', closingDate === 'None' ? '' : closingDate);
      formData.append('subSector', subSector);
      formData.append('isLiquid', isLiquid);
      const config = {
        headers: {
          'content-type': 'application/vnd.api+json'
        },
      };
      axios.post(url, formData, config)
        .then((response) => {
          setGotDBdeals(false);
          setShowEditForm(false);
          setPageMsg("Deal details updated.");
        })
        .catch((error) => {
          setPageMsg("Error updating deal details. " + error);
        });
    }
  }

  function handleCancel() {
    setItemChanged(false);
    setShowEditForm(false);
    setPageMsg("Got deal list from DB.");
    navigate("/");
  }

  return (
    <div className="App">
      < form id="MainForm" onSubmit={handleSubmit}>
        <center>
          <h5>Edit Deal: <b>{deal.dealName}</b></h5>
          <MDBTable id='EditDeal'>
            <MDBTableHead>
              <tr>
                <th>Deal Field</th>
                <th>Current Value</th>
                <th>Updated Value</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>Effective Date</td>
                <td>{deal.effectiveDate}</td>
                <td><input type="Date" id='effectiveDate' onChange={handleEffectiveDateChange}></input></td>
              </tr>
              <tr>
                <td>Closing Date</td>
                <td>{deal.closingDate}</td>
                <td><input type="Date" id='closingDate' onChange={handleClosingDateChange}></input></td>
              </tr>
              <tr>
                <td>subSector</td>
                <td>{deal.subSector}</td>
                <td><input type="text" id='subSector' onChange={handleSubSectorChange}></input></td>
              </tr>
              <tr>
                <td>Is Liquid</td>
                <td>{deal.isLiquid}</td>
                <td><input type="text" id='isLiquid' onChange={handleIsLiquidChange}></input></td>
              </tr>
            </MDBTableBody>
          </MDBTable>
          <br></br>
          <button onClick={() => handleCancel()}>Cancel</button>{itemChanged && <button>Save Changes</button>}
        </center>
      </form>
    </div>
  );
}

export default DealEdit;
