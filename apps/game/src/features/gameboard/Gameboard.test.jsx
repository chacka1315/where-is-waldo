import Gameboard from './Gameboard';
import { GameProvider } from './GameProvider';
import { render, screen, within } from '@testing-library/react';
import { waitForElementToBeRemoved, act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import apiclient from '@waldogame/apiclient';

//mockings
vi.mock('../leaderboard/Leaderboard', () => ({
  default: () => <div>Mocked leaderboard</div>,
}));

const board = {
  imageUrl: '/testing_board.jpeg',
  name: 'testing_board',
  level: 2,
  coordinates: [
    {
      character: {
        id: 1,
        name: 'Thor',
        iconUrl: 'thor',
      },
    },
    {
      character: {
        id: 2,
        name: 'Odin',
        iconUrl: 'odin',
      },
    },
  ],
};

beforeEach(() => {
  window.fetch = vi.fn(() => {
    return Promise.resolve({ ok: true, json: () => Promise.resolve(board) });
  });
});

describe('Gameboard component', () => {
  it('renders the loading when fetching data', async () => {
    render(
      <MemoryRouter>
        <GameProvider>
          <Gameboard />
        </GameProvider>
      </MemoryRouter>,
    );

    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  });

  it('render the error when data fetching fails', async () => {
    window.fetch.mockImplementationOnce(() => {
      return Promise.reject({ msg: 'API is down' });
    });

    render(
      <MemoryRouter>
        <GameProvider>
          <Gameboard />
        </GameProvider>
      </MemoryRouter>,
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.getByText(/api is down/i)).toBeInTheDocument();
  });

  it('renders the board', async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <GameProvider>
            <Gameboard />
          </GameProvider>
        </MemoryRouter>,
      ),
    );

    const gameboard = screen.getByTestId('gameboard');

    expect(
      within(gameboard).getByRole('img', { name: /level 2 board/i }),
    ).toBeInTheDocument();
  });

  it('show and hide target box correctly', async () => {
    render(
      <MemoryRouter>
        <GameProvider>
          <Gameboard />
        </GameProvider>
      </MemoryRouter>,
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const user = userEvent.setup();
    const board = within(screen.getByTestId('gameboard')).getByRole('img', {
      name: /level 2 board/i,
    });

    expect(screen.getByTestId('target-box')).not.toBeVisible();
    await user.click(board);
    expect(screen.getByTestId('target-box')).toBeVisible();
    await user.click(board);
    expect(screen.getByTestId('target-box')).not.toBeVisible();
  });
});

//------------target box----------------
vi.spyOn(apiclient, 'validateXY').mockResolvedValue({
  match: true,
  msg: 'Correct, he was there!',
  remainedIds: [2],
});

describe('Target box', () => {
  it('renders all to find characters', async () => {
    render(
      <MemoryRouter>
        <GameProvider>
          <Gameboard />
        </GameProvider>
      </MemoryRouter>,
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const user = userEvent.setup();
    const board = screen.getByRole('img', {
      name: /level 2 board/i,
    });

    await user.click(board);
    const box = screen.getByTestId('target-box');
    expect(within(box).getAllByRole('button')).toHaveLength(2);
  });

  it('triggers validation when click on the target box', async () => {
    render(
      <MemoryRouter>
        <GameProvider>
          <Gameboard />
        </GameProvider>
      </MemoryRouter>,
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const user = userEvent.setup();
    const board = screen.getByRole('img', {
      name: /level 2 board/i,
    });

    await user.click(board);
    const box = screen.getByTestId('target-box');
    const buttons = within(box).getAllByRole('button');

    await user.click(buttons[0]);
    expect(screen.getByText(/correct, he was there!/i)).toBeInTheDocument();
  });
});
