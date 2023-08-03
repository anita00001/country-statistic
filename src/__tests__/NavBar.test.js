import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBar from '../components/NavBar';

const originalDate = Date;
const mockDate = new Date('2023-08-03T01:49:30');

beforeEach(() => {
  global.Date = jest.fn(() => mockDate);
  global.Date.now = originalDate.now;
});

afterEach(() => {
  global.Date = originalDate;
});

jest.useFakeTimers();

describe('NavBar component', () => {
  test('renders NavBar component: Heading', () => {
    const {getByText} = render(<NavBar />);

    const heading = getByText('statistics');
    expect(heading).toBeInTheDocument();
  });

  test('renders NavBar component: Time', () => {
    const { queryByTestId } = render(<NavBar />);
    const timeElement = queryByTestId('time-element');
    expect(timeElement).toBeInTheDocument();
  });

  test ('renders Navbar component: Microphone Icon', () => {
    const { queryByTestId } = render(<NavBar />);
    const microphoneElement = queryByTestId('microphone-icon');
    expect(microphoneElement).toBeInTheDocument();
  });

  test ('renders Navbar component: Setting Icon', () => {
    const { queryByTestId } = render(<NavBar />);
    const settingElement = queryByTestId('setting-icon');
    expect(settingElement).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<NavBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
