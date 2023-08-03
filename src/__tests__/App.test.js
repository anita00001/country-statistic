import renderer from 'react-test-renderer';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom/extend-expect'; // for toBeInTheDocument()

import App from '../components/App';
import Countries from '../components/Countries';
import CountryInfo from '../components/CountryInfo';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  country: {
    countryList: [
      { name: 'Country 1', capital: 'Capital 1', flag: 'Flag 1', population: 1000, location: [10, 20] },
      { name: 'Country 2', capital: 'Capital 2', flag: 'Flag 2', population: 2000, location: [30, 40] },
    ],
    status: 'idle',
    error: null,
  },
};
const store = mockStore(initialState);

describe('App component', () => {
  test('renders App component: Countries component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Countries')).toBeInTheDocument();
  });

  test('renders App component: CountryInfo', () => {
    const countryName = 'Country 1';
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/country/${initialState.name}`]}>
          <Routes>
            <Route path="/country/:name" element={<CountryInfo getCountry={initialState} />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const countryNameRegex = new RegExp(countryName, 'i');
    waitFor(() => expect(screen.getByText(countryNameRegex)).toBeInTheDocument());

    const countryCapitalRegex = new RegExp(initialState.capital, 'i');
    waitFor(() => expect(screen.getByText(countryCapitalRegex)).toBeInTheDocument());

    const countryPopulationRegex = new RegExp(initialState.population, 'i');
    waitFor(() => expect(screen.getByText(countryPopulationRegex)).toBeInTheDocument());

    const countryFlagRegex = new RegExp(initialState.flag, 'i');
    waitFor(() => expect(screen.getByText(countryFlagRegex)).toBeInTheDocument());

    const countryLocationRegex = new RegExp(initialState.location, 'i');
    waitFor(() => expect(screen.getByText(countryLocationRegex)).toBeInTheDocument());

    const countryBackButtonRegex = new RegExp('Back', 'i');
    waitFor(() => expect(screen.getByText(countryBackButtonRegex)).toBeInTheDocument());
  });

  test('renders App component: Dispatch fetchCountryList action on component mount', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(1));
  });

  test('App component matches snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});