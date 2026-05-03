import fs from 'fs/promises';
import path from 'path';

const emotionsPath = path.resolve('src/db/data/emotions.json');

export const getAllEmotions = async () => {
  const data = await fs.readFile(emotionsPath, 'utf-8');
  return JSON.parse(data);
};

export const getEmotionById = async (id) => {
  const emotions = await getAllEmotions();

  return emotions.find(
    (emotion) => String(emotion.id) === String(id)
  );
};