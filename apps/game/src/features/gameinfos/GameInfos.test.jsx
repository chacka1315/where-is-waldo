import GameInfos from './GameInfos';
import {
  screen,
  render,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react';

//fake data
const characters = [
  {
    id: 1,
    name: 'Odin',
    description: "Thor's dad",
    imageUrl: 'odin',
  },
  {
    id: 2,
    name: 'Thor',
    description: "Odin's son",
    imageUrl: 'odin',
  },
];

beforeEach(() => {
  window.fetch = vi.fn(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(characters),
    });
  });
});

describe('GameInfos component', () => {
  it('renders loading when fetching', async () => {
    render(<GameInfos />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  });

  it('renders game presentation and rules', async () => {
    await act(async () => render(<GameInfos />));

    expect(
      screen.getByRole('heading', { name: /game presentation/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /game rules/i }),
    ).toBeInTheDocument();
  });

  it('renders ccharacter presentation', async () => {
    await act(async () => render(<GameInfos />));

    screen.debug();
    expect(screen.getByRole('link', { name: /odin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /thor/i })).toBeInTheDocument();
    expect(screen.getByText(/odin's son/i)).toBeInTheDocument();
    expect(screen.getByText(/thor's dad/i)).toBeInTheDocument();
  });
});
