import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function MappingEdit({ mapping, setGotDBmappings, setShowEditForm, setPageMsg }) {

  const [local_cmmt, setLocalCmmt] = useState(mapping.local_cmmt);
  const [is_active, setIsActive] = useState(mapping.is_active);
  const [realized_irr, setRealizedIRR] = useState(mapping.realized_irr);
  const [realized_pnl, setRealizedPNL] = useState(mapping.realized_pnl);
  const [realized_date, setRealizedDate] = useState(mapping.realized_date);

  const [itemChanged, setItemChanged] = useState(false);

  const navigate = useNavigate();

  function handleLocalCmmtChange(event) {
    event.preventDefault();
    setItemChanged(true);
    setLocalCmmt(document.getElementById("localCmmt").value);
  }

  function handleIsActiveChange(event) {
    event.preventDefault();
    setItemChanged(true);
    setIsActive(document.getElementById("isActive").value);
  }

  function handleRealizedIRRchange(event) {
    event.preventDefault();
    setItemChanged(true);
    setRealizedIRR(document.getElementById("realizedIRR").value);
  }

  function handlerealizedPNLchange(event) {
    event.preventDefault();
    setItemChanged(true);
    setRealizedPNL(document.getElementById("realizedPNL").value)
  }

  function handleRealizedDateChange(event) {
    event.preventDefault();
    setItemChanged(true);
    setRealizedDate(document.getElementById("realizedDate").value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (itemChanged) {
      const url = 'http://localhost:8000/updateMapping/';
      const formData = new FormData();
      formData.append('deal_id', mapping.deal_id);
      formData.append('fund_name', mapping.fund_name);
      formData.append('as_of_date', mapping.as_of_date);
      formData.append('local_cmmt', local_cmmt === 'None' ? '' : local_cmmt);
      formData.append('is_active', is_active === 'None' ? '' : is_active);
      formData.append('realized_irr', realized_irr === 'None' ? '' : realized_irr);
      formData.append('realized_pnl', realized_pnl === 'None' ? '' : realized_pnl);
      formData.append('realized_date', realized_date === 'None' ? '' : realized_date);
      const config = {
        headers: {
          'content-type': 'application/vnd.api+json'
        },
      };
      axios.post(url, formData, config)
        .then((response) => {
          setGotDBmappings(false);
          setShowEditForm(false);
          setPageMsg("Mapping details updated. " + response.message);
        })
        .catch((error) => {
          setPageMsg("Error updating mapping details. " + error);
        });
    }
  }

  function handleCancel() {
    setShowEditForm(false);
    setItemChanged(false);
    setPageMsg("Got mappings list from DB for deal.");
    navigate("/mappings");
  }

  return (
    <div className="App">
      <form id="MainForm" onSubmit={handleSubmit}>
        <center>
          <h6>Edit Mapping: <b>{mapping.fund_name}</b></h6>
          <MDBTable id='record'>
            <MDBTableHead>
              <tr>
                <th>Mapping Field</th>
                <th>Current Value</th>
                <th>Updated Value</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>Local Cmmt</td>
                <td>{mapping.local_cmmt}</td>
                <td><input type="text" id='localCmmt' onChange={handleLocalCmmtChange}></input></td>
              </tr>
              <tr>
                <td>Is Active</td>
                <td>{mapping.is_active}</td>
                <td><input type="text" id='isActive' onChange={handleIsActiveChange}></input></td>
              </tr>
              <tr>
                <td>Realized IRR</td>
                <td>{mapping.realized_irr}</td>
                <td><input type="text" id='realizedIRR' onChange={handleRealizedIRRchange}></input></td>
              </tr>
              <tr>
                <td>Realized PNL</td>
                <td>{mapping.realized_pnl}</td>
                <td><input type="text" id='realizedPNL' onChange={handlerealizedPNLchange}></input></td>
              </tr>
              <tr>
                <td>Realized Date</td>
                <td>{mapping.realized_date}</td>
                <td><input type="Date" id='realizedDate' onChange={handleRealizedDateChange}></input></td>
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

export default MappingEdit;
