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

  console.log(myCountryData);

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

        <div className='table'>
          <div className='countrySelection'>
            <select onChange={handleSelection}>
              <option value='Canada'>Canada</option>
              <option value='Russia'>Russia</option>
              <option value='US'>USA</option>
            </select>
          </div>
          <table>
            <thead>
              <tr class='tblHeads'>
                <th>Province</th>

                <th>Infection</th>

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
