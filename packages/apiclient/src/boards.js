const API_URL = import.meta.env.VITE_API_URL;

const getAllBoards = async function () {
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

const getAboard = async function (boardId) {
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

const getLeaderboard = async function (boardId) {
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
