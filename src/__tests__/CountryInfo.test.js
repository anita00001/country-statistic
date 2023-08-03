import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CountryInfo from '../components/CountryInfo';

const mockStore = configureMockStore();

const countryList = [
  {
    name: 'Country 1',
    continent: 'Continent 1',
    capital: 'Capital 1',
    subregion: 'Subregion 1',
    location: [10, 20],
    area: 100,
    timezones: 'Timezone 1',
    population: 1000,
    flag: 'flag1.png',
  },
  {
    name: 'Country 2',
    continent: 'Continent 2',
    capital: 'Capital 2',
    subregion: 'Subregion 2',
    location: [30, 40],
    area: 200,
    timezones: 'Timezone 2',
    population: 2000,
    flag: 'flag2.png',
  },
  {
    name: 'Country 3',
    continent: 'Continent 1',
    capital: 'Capital 3',
    subregion: 'Subregion 3',
    location: [50, 60],
    area: 300,
    timezones: 'Timezone 3',
    population: 3000,
    flag: 'flag3.png',
  },
];

const store = mockStore({ country: { countryList } });

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    name: 'Country 1',
  }),
}));

describe('CountryInfo component', () => {
  test('renders CountryInfo component: Country Name in Heading and Recommended Countries', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CountryInfo />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Country 1', { selector: 'h3.country-name' })).toBeInTheDocument();
    expect(screen.getByText('Country 3', { selector: 'p.recom-country-name' })).toBeInTheDocument();
    expect(screen.getByText('See More Countries')).toBeInTheDocument();
  });

  test('renders CountryInfo component: Details = Capital', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CountryInfo />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Capital')).toBeInTheDocument();
    expect(screen.getByText('Capital 1')).toBeInTheDocument();
  });

  test('renders CountryInfo component: Details = Population', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CountryInfo />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Population')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
  });

  test('renders CountryInfo component: Details = Area', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CountryInfo />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Area')).toBeInTheDocument();
    expect(screen.getByText('100 km²')).toBeInTheDocument();
  });

  test('renders CountryInfo component: Details = Location', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CountryInfo />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('20.00lat, 10.00long')).toBeInTheDocument();
  });

  test('renders CountryInfo component: Details = Time Zone', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CountryInfo />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Time Zone')).toBeInTheDocument();
    expect(screen.getByText('Timezone 1')).toBeInTheDocument();
  });

  test('renders CountryInfo component: Details: Flag Image', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CountryInfo />
        </MemoryRouter>
      </Provider>,
    );

    const FlagImage = screen.getByTestId('flag-image');
    expect(FlagImage).toBeInTheDocument();
    expect(FlagImage).toHaveAttribute('src', 'flag1.png');
  });

  test('renders CountryInfo component: Return Icon', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CountryInfo />
        </MemoryRouter>
      </Provider>,
    );

    const ReturnIcon = screen.getByTestId('return-arrow');
    expect(ReturnIcon).toBeInTheDocument();

    const PathElement = ReturnIcon.querySelector('path');
    expect(PathElement).toBeInTheDocument();
  });
});
