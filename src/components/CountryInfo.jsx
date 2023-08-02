import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const CountryInfo = () => {
  const { name } = useParams();

  const country = useSelector((state) => state.country.countryList);
  const getCountry = country.find((c) => c.name === name);
  // console.log(getCountry);

  if (!getCountry) {
    return <div>Country not found!</div>;
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
    <div>
      <Link to="/"><p>Go Back</p></Link>
      <h2>{getCountry.name}</h2>
      <p>
        Capital:
        {getCountry.capital}
      </p>
      <p>
        Population:
        {getCountry.population}
      </p>
      <h3>See More Countries</h3>
      {getRecCountries.length === 0 ? (
        <p>No recommended countries</p>
      ) : (
        getRecCountries.map((c) => (
          <div key={c.name}>
            <Link to={`/country/${c.name}`}>
              <p>{c.name}</p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default CountryInfo;
