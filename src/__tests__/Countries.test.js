import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter} from 'react-router-dom';
import Countries from '../components/Countries';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

const countryList = [
  { name: 'Country 1', capital: 'Capital 1', flag: 'Flag 1', population: 1000, location: [10, 20], continent: 'Continent 1' },
  { name: 'Country 2', capital: 'Capital 2', flag: 'Flag 2', population: 2000, location: [30, 40], continent: 'Continent 2' },
  { name: 'Country 3', capital: 'Capital 3', flag: 'Flag 3', population: 3000, location: [50, 60], continent: 'Continent 1'}
];

describe('Countries component', () => {
  test('renders Countries component', () => {
    const store = mockStore({
      country: {
        countryList: [],
      },
    });
    render(
      <Provider store={store}>
        <Countries />
      </Provider>
    );

    expect(screen.getByText('Countries')).toBeInTheDocument();
  });

  test('display all countries when continent is set to "All" by default', async () => {
    const store = mockStore({
      country: {
        countryList,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Countries />
        </MemoryRouter>
      </Provider>
    );

    const countryItems = await screen.findAllByTestId('country-item');
    expect(countryItems).toHaveLength(3);
  });

  test('display countries of selected continent: filter', () => {
    const store = mockStore({
      country: {
        countryList,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Countries />
        </MemoryRouter>
      </Provider>
    );

    const dropdown = screen.getByRole('combobox');
    userEvent.selectOptions(dropdown, 'Continent 1');

    expect(screen.getAllByTestId('country-item')).toHaveLength(2);
  });

  test('display countries matching the search input', () => {
    const store = mockStore({
      country: {
        countryList,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Countries />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search country by name');
    fireEvent.change(searchInput, { target: { value: 'Country 1' } });

    expect(screen.getByText('Country 1')).toBeInTheDocument();
    expect(screen.queryByText('Country 2')).not.toBeInTheDocument();
  });
});