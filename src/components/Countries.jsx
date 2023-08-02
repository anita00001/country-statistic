import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import worldMap from '../assets/world-map.jpg';
import '../styles/Countries.css';

const Countries = () => {
  const countryList = useSelector((state) => state.country.countryList);

  const uniqueContinents = new Set();
  countryList.forEach((country) => {
    uniqueContinents.add(country.continent);
  });
  const dropdownOptions = Array.from(uniqueContinents);

  const [selectedContinent, setSelectedContinent] = useState('All');
  const [search, setSearch] = useState('');

  const filteredCountries = countryList.filter(
    (country) => selectedContinent === 'All' || country.continent === selectedContinent,
  ).filter((country) => country.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <NavBar />
      <section className="country-page">
        <div className="country-page-top">
          <img src={worldMap} alt="world map" className="world-map-img" />
          {/* Search Bar */}
          <input
            type="text"
            className="search-bar"
            placeholder="Search country by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="country-page-center">
          <h3>Countries</h3>
          {/* Dropdown */}
          <select
            className="dropdown"
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value)}
          >
            <option value="All">All</option>
            {dropdownOptions.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>
        <div className="list-countries-wrapper">
          {/* List of Countries */}
          {filteredCountries.map((item) => (
            <div key={item.name} className="list-countries">
              <Link to={`/country/${item.name}`}>
                <img src={item.flag} alt="national flag" className="national-flag" />
                <h3 className="country-name-display">{item.name}</h3>
                <p className="continent-name">{item.continent}</p>
                <p className="country-area">
                  {item.area}
                  {' '}
                  km²
                </p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Countries;
