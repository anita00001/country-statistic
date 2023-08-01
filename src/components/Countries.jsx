import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCountryList } from '../redux/country/countrySlice';
import '../styles/Countries.css';

const Countries = () => {
  const countryList = useSelector((state) => state.country.countryList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountryList());
  }, [dispatch]);

  return (
    <div className="list-countries-wrapper">
      {countryList.map((item) => (
        <div key={item.name} className="list-countries">
          <h3>{item.name}</h3>
          <p>
            {item.area}
            {' '}
            km²
          </p>
        </div>
      ))}
    </div>
  );
};

export default Countries;
