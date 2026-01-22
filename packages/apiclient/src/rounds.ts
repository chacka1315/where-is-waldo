const API_URL = import.meta.env.VITE_API_URL;
import type { Board } from './boards.js';

const startRound = async function (boardId: number): Promise<Board> {
  const res = await fetch(`${API_URL}/round?boardid=${boardId}`, {
    method: 'GET',
    credentials: 'include',
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

export interface ClickData {
  x: string;
  y: string;
  charId: string;
}

export interface ValidationResponse {
  match: boolean;
  remainedIds: number[];
  finished: boolean;
  msg: string;
}

const validateXY = async function (
  clickData: ClickData,
  boardId: number,
): Promise<ValidationResponse> {
  const params = new URLSearchParams({ ...clickData }).toString();
  const res = await fetch(
    `${API_URL}/round/validatexy?boardid=${boardId}&${params}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  let data;

  try {
    data = await res.json();
  } catch {
    throw new Error('Unexpected error encountered.');
  }

  if (!res.ok) throw data;
  return data;
};

const submitScore = async function (
  playerName: { playerName: string },
  boardId: number,
) {
  const res = await fetch(`${API_URL}/boards/${boardId}/ranking`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(playerName),
    credentials: 'include',
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
export { startRound, validateXY, submitScore };
