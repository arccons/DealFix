import React, { useState } from 'react';
import axios from 'axios';

function MappingEdit({ mapping, setGotDBmappings, setShowEditForm, setPageMsg }) {

  const [local_cmmt, setLocalCmmt] = useState(mapping.local_cmmt);
  const [is_active, setIsActive] = useState(mapping.is_active);
  const [realized_irr, setRealizedIRR] = useState(mapping.realized_irr);
  const [realized_pnl, setRealizedPNL] = useState(mapping.realized_pnl);
  const [realized_date, setRealizedDate] = useState(mapping.realized_date);

  const [itemChanged, setItemChanged] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mappingUploaded, setMappingUploaded] = useState(false);

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
      setFormSubmitted(true);
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
          setMappingUploaded(true);
          setGotDBmappings(false);
          setShowEditForm(false);
          setPageMsg(response.data.message);
          console.log(response.data.message);
        })
        .catch((error) => {
          setMappingUploaded(false);
          setPageMsg(error.message);
          console.error("error.message: ", error);
        });
    }
  }

  return (
    <div className="App">
      <form id="MainForm" onSubmit={handleSubmit}>
        <center>
          <table id='record'>
            <caption><b>Edit Mapping:</b> {mapping.fund_name}</caption>
            <thead>
              <tr>
                <th>Mapping Field</th>
                <th>Current Value</th>
                <th>Updated Value</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
          <button>Save Changes</button>
          {formSubmitted && mappingUploaded && <center><b><p>Mapping Updated successfully!</p></b></center>}
          {formSubmitted && !mappingUploaded && <center><p><b> Mapping Update failed!</b></p></center>}
        </center>
      </form>
    </div>
  );
}

export default MappingEdit;
