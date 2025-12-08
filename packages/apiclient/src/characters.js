const API_URL = import.meta.env.VITE_API_URL;

const getAllCharacters = async function () {
  const res = await fetch(`${API_URL}/characters`, {
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

const getACharacter = async function (characterId) {
  const res = await fetch(`${API_URL}/characters/${characterId}`, {
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
export { getAllCharacters, getACharacter };
