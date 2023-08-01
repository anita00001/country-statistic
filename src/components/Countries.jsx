import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Countries.css';

const Countries = () => {
  const countryList = useSelector((state) => state.country.countryList);

  return (
    <div className="list-countries-wrapper">
      {countryList.map((item) => (
        <div key={item.name} className="list-countries">
          <Link to={`/country/${item.name}`}>
            <h3>{item.name}</h3>
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
