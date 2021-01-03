import React, { useState, useEffect } from 'react';
import Head from './Head';
import './App.css';

function App() {
  const url = 'https://covid19.mathdro.id/api/deaths';
  let initSelectedCountry = 'Canada';

  const [myCountryData, setMyCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(initSelectedCountry);

  useEffect(() => {
    fetch(url)
      .then(function (respo) {
        return respo.json();
      })
      .then(function (data) {
        data.forEach((x) => {
          if (x.countryRegion === selectedCountry) {
            setMyCountryData((prev) => [...prev, x]);
          }
        });
      });
  }, [selectedCountry]);

  function handleCountryName(e) {
    const countryNameInput = e.target.value
      .trim()
      .toLowerCase()
      .charAt(0)
      .toUpperCase();
    if (e.key === 'Enter') {
      console.log(countryNameInput);
    }
  }

  function handleSelection(e) {
    const country = e.target.value;
    setSelectedCountry(country);
    setMyCountryData([]);
    // console.log(country);
  }
  if (myCountryData) {
    return (
      <div className='App'>
        <Head />
        <div className='countryName'>
          <input onKeyDown={handleCountryName} placeholder='Country'></input>
        </div>

        <div className='table'>
          <div className='countrySelection'>
            <select className='countriesOption' onChange={handleSelection}>
              <option className='options' value='Canada'>
                Canada
              </option>
              <option className='options' value='Russia'>
                Russia
              </option>
              <option className='options' value='US'>
                USA
              </option>
            </select>
          </div>
          <table>
            <thead>
              <tr className='tblHeads'>
                <th>Province</th>

                <th>Infected</th>

                <th>Recovered</th>

                <th>Deaths</th>
              </tr>
            </thead>

            <tbody>
              {myCountryData.map((info, index) => {
                return (
                  <tr className='tblRows' key={index}>
                    <td>{info.provinceState}</td>
                    <td>{info.confirmed}</td>
                    <td>{info.recovered}</td>
                    <td>{info.deaths}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default App;
