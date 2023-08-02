import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Countries.css';

const Countries = () => {
  const countryList = useSelector((state) => state.country.countryList);

  const uniqueContinents = new Set();
  countryList.forEach((country) => {
    uniqueContinents.add(country.continent);
  });
  const dropdownOptions = Array.from(uniqueContinents);
  console.log(dropdownOptions);

  const [selectedContinent, setSelectedContinent] = useState('All');
  const [search, setSearch] = useState('');

  const filteredCountries = countryList.filter(
    (country) => selectedContinent === 'All' || country.continent === selectedContinent,
  ).filter((country) => country.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="list-countries-wrapper">
      <h1>Countries</h1>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search country by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Dropdown */}
      <select
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
      {/* List of Countries */}
      {/* {countryList.map((item) => ( */}
      {filteredCountries.map((item) => (
        <div key={item.name} className="list-countries">
          <Link to={`/country/${item.name}`}>
            <h3>{item.name}</h3>
            <p>{item.continent}</p>
            <p>
              {item.area}
              {' '}
              km²
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Countries;
