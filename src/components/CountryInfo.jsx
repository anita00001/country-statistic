import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const CountryInfo = () => {
  const { name } = useParams();

  const country = useSelector((state) => state.country.countryList);
  const getCountry = country.find((c) => c.name === name);
  console.log(getCountry);

  if (!getCountry) {
    return <div>Country not found!</div>;
  }

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
    </div>
  );
};

export default CountryInfo;
