import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { GiReturnArrow } from 'react-icons/gi';
import '../styles/CountryInfo.css';

const CountryInfo = () => {
  const { name } = useParams();

  const country = useSelector((state) => state.country.countryList);
  const getCountry = country.find((c) => c.name === name);

  if (!getCountry) {
    return <div className="error">Country not found!</div>;
  }

  const recommendedCountries = () => {
    const recommend = country.filter(
      (c) => c.name !== getCountry.name
        && c.continent === getCountry.continent,
    );
    return recommend.slice(0, 5);
  };

  const getRecCountries = recommendedCountries();

  return (
    <div className="country-info-page">
      <div className="info-page-top">
        <Link to="/"><GiReturnArrow /></Link>
        <h3 className="country-name">{getCountry.name}</h3>
      </div>
      <div className="country-info-wrap">
        <img src={getCountry.flag} alt="national flag" className="national-flag" />
        <table className="info-table">
          <tbody>
            <tr>
              <td>Country</td>
              <td>{getCountry.name}</td>
            </tr>
            <tr>
              <td>Capital</td>
              <td>{getCountry.capital}</td>
            </tr>
            <tr>
              <td>Sub-region</td>
              <td>{getCountry.subregion}</td>
            </tr>
            <tr>
              <td>Region</td>
              <td>{getCountry.continent}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>
                {getCountry.location[1].toFixed(2)}
                lat,
                {' '}
                {getCountry.location[0].toFixed(2)}
                long
              </td>
            </tr>
            <tr>
              <td>Time Zone</td>
              <td>{getCountry.timezones}</td>
            </tr>
            <tr>
              <td>Population</td>
              <td>{getCountry.population}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {getCountry.area}
                {' '}
                km²
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 className="country-recommend">See More Countries</h3>
      <div className="recom-country-wraper">
        {getRecCountries.length === 0 ? (
          <p className="error">No recommended countries</p>
        ) : (
          getRecCountries.map((c) => (
            <div key={c.name}>
              <Link to={`/country/${c.name}`}>
                <div key={c.name} className="recom-details">
                  <p className="recom-country-name">{c.name}</p>
                  <img src={c.flag} alt="national-flag" className="recom-country-flag" />
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CountryInfo;
