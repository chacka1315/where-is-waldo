import Home from './Home';
import {
  render,
  screen,
  act,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter, MemoryRouter } from 'react-router';

//routing
import routes from '../../routes';
const fakeRouter = createMemoryRouter(routes);

//mockings
const boards = [
  {
    id: 1,
    name: 'Board_1',
    level: 1,
    complexity: 'Easy',
    imageUrl: 'board_1',
    coordinates: [
      {
        character: {
          id: 1,
          name: 'Odin',
          iconUrl: 'odin',
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Board_2',
    level: 2,
    complexity: 'Easy',
    imageUrl: 'board_2',
    coordinates: [
      {
        character: {
          id: 1,
          name: 'Thor',
          iconUrl: 'thor',
        },
      },
    ],
  },
];

vi.mock('../gameboard/Gameboard', () => ({
  default: () => <div>Mocked gameboard</div>,
}));

beforeEach(() => {
  window.fetch = vi.fn(() => {
    return Promise.resolve({ ok: true, json: () => Promise.resolve(boards) });
  });
});

describe('Home component', () => {
  it('renders the loading when fetching data', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  });

  it('renders, all boards links', async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>,
      ),
    );

    const homepage = screen.getByTestId('homepage');

    expect(within(homepage).getAllByRole('link')).toHaveLength(2);
  });

  it('go to the gameboard page when user click on a board', async () => {
    await act(async () =>
      render(
        <RouterProvider router={fakeRouter}>
          <Home />
        </RouterProvider>,
      ),
    );

    const homepage = screen.getByTestId('homepage');
    const links = within(homepage).getAllByRole('link');
    const user = userEvent.setup();

    await user.click(links[0]);

    expect(screen.getByText(/mocked gameboard/i)).toBeInTheDocument();
  });

  it('render the error when data fetching fails', async () => {
    window.fetch.mockImplementationOnce(() => {
      return Promise.reject({ msg: 'API is down' });
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId('loading')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    expect(screen.getByText(/api is down/i)).toBeInTheDocument();
  });
});
