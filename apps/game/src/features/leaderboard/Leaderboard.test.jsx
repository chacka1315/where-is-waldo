import Leaderboard from './Leaderboard';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import apiclient from '@waldogame/apiclient';

vi.spyOn(apiclient, 'getLeaderboard').mockResolvedValue({
  rankings: [
    { playerName: 'Siaka', time: 1999, boardId: 3, createdAt: new Date() },
  ],
  board: {
    id: 1,
    name: 'Board_1',
    level: 1,
    complexity: 'Easy',
    imageUrl: '/testing_board.jpeg',
  },
});

vi.spyOn(apiclient, 'getAllBoards').mockResolvedValue([
  {
    id: 1,
    name: 'Board_1',
    level: 1,
    complexity: 'Easy',
    imageUrl: 'board_1',
  },
  {
    id: 2,
    name: 'Board_2',
    level: 2,
    complexity: 'Easy',
    imageUrl: 'board_2',
  },
]);

describe('Leaderboard component', () => {
  it('renders all ranks lines', async () => {
    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    );
    const ranks = await screen.findAllByTestId('rank-card');
    expect(ranks).toHaveLength(1);
    expect(within(ranks[0]).getByText(/siaka/i)).toBeInTheDocument();
  });

  it('renders corrrectly the sidebar links', async () => {
    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    );
    const sidebar = await screen.findByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
    expect(
      within(sidebar).getByRole('link', { name: /level 1/i }),
    ).toBeInTheDocument();
    expect(
      within(sidebar).getByRole('link', { name: /level 2/i }),
    ).toBeInTheDocument();
  });
});
