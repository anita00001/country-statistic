import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCountryList } from '../redux/country/countrySlice';

import Countries from './Countries';
import CountryInfo from './CountryInfo';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountryList());
  }, [dispatch]);

  return (
    <Routes>
      <Route exact path="/" element={<Countries />} />
      <Route path="/country/:name" element={<CountryInfo />} />
    </Routes>
  );
}

export default App;
