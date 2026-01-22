import App from './App';
import Home from './features/homepage/Home';
import Gameboard from './features/gameboard/Gameboard';
import Leaderboard from './features/leaderboard/Leaderboard';
import ErrorPage from './features/error/ErrorPage';
import GameInfos from './features/gameinfos/GameInfos';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/gameinfos', element: <GameInfos /> },
    ],
  },
  {
    path: '/play/:boardId',
    element: <Gameboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/ranking/:boardId',
    element: <Leaderboard />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
