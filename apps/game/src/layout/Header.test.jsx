import Header from './Header';
import { screen, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { createMemoryRouter, RouterProvider } from 'react-router';

//routing
import routes from '../routes';
const fakeRouter = createMemoryRouter(routes);

//mocking
vi.mock('../features/homepage/Home', () => ({
  default: () => <div>Mocked home</div>,
}));

vi.mock('../features/leaderboard/Leaderboard', () => ({
  default: () => <div>Mocked leaderboard</div>,
}));

vi.mock('../features/gameinfos/GameInfos', () => ({
  default: () => <div>Mocked gameinfos</div>,
}));

//tests
describe('Header component', () => {
  it('is rendered is children', () => {
    render(
      <MemoryRouter>
        <Header>
          <div>header children</div>
        </Header>
      </MemoryRouter>,
    );
    expect(screen.getByText('header children')).toBeInTheDocument();
  });

  it('renders the home link & logo', () => {
    render(
      <MemoryRouter>
        <Header></Header>
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: /waldo/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /logo/i }));
  });

  it('renders help and leaderboard links', () => {
    render(
      <MemoryRouter>
        <Header></Header>
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: /help/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ranking/i })).toBeInTheDocument();
  });

  it('links open the correct pages', async () => {
    render(<RouterProvider router={fakeRouter}></RouterProvider>);

    const user = userEvent.setup();

    const header = screen.getByRole('banner');
    const homeLink = within(header).getByRole('link', { name: /waldo/i });
    const helpLink = within(header).getByRole('link', { name: /help/i });
    const leaderboardLink = within(header).getByRole('link', {
      name: /ranking/i,
    });

    await user.click(homeLink);
    expect(screen.getByText(/mocked home/i)).toBeInTheDocument();

    await user.click(helpLink);
    expect(screen.getByText(/mocked gameinfos/i)).toBeInTheDocument();

    await user.click(leaderboardLink);
    expect(screen.getByText(/mocked leaderboard/i)).toBeInTheDocument();
  });
});
