const API_URL = import.meta.env.VITE_API_URL;

const startRound = async function (boardId) {
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

const validateXY = async function (clickData, boardId) {
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

const submitScore = async function (playerName, boardId) {
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
