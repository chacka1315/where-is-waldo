const API_URL = import.meta.env.VITE_API_URL;
import type { RoundCharacter } from './boards.js';

export interface Character extends RoundCharacter {
  imageUrl: string;
  description: string;
}

const getAllCharacters = async function (): Promise<Character[]> {
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

const getACharacter = async function (characterId: number) {
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
