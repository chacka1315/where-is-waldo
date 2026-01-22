const API_URL = import.meta.env.VITE_API_URL;

export interface RoundCharacter {
  id: number;
  name: string;
  iconUrl: string;
  found?: boolean;
}

export interface Board {
  id: number;
  name: string;
  level: number;
  complexity: 'Easy' | 'Normal' | 'Hard';
  imageUrl: string;
  coordinates: { character: RoundCharacter }[];
}

const getAllBoards = async function (): Promise<Board[]> {
  const res = await fetch(`${API_URL}/boards`, {
    method: 'GET',
  });

  let data;

  try {
    data = await res.json();
  } catch {
    throw new Error('Unexpected error encountered.');
  }

  if (!res.ok) throw data;
  return data;
};

const getAboard = async function (boardId: number): Promise<Board> {
  const res = await fetch(`${API_URL}/boards/${boardId}`, {
    method: 'GET',
  });

  let data;

  try {
    data = await res.json();
  } catch {
    throw new Error('Unexpected error encountered.');
  }

  if (!res.ok) throw data;
  return data;
};

export interface Rank {
  id: number;
  boardId: Number;
  playerName: string;
  time: number;
  createdAt: string;
}

export interface Rankings {
  board: Board;
  rankings: Rank[];
}

const getLeaderboard = async function (boardId: number): Promise<Rankings> {
  const res = await fetch(`${API_URL}/boards/${boardId}/ranking`, {
    method: 'GET',
  });

  let data;

  try {
    data = await res.json();
  } catch {
    throw new Error('Unexpected error encountered.');
  }

  if (!res.ok) throw data;
  return data;
};
export { getAllBoards, getAboard, getLeaderboard };
