import path from 'node:path';
import fs from 'node:fs/promises';

export const saveFileToDir = async (file, dir) => {
  const newPath = path.join(dir, path.basename(file));
  await fs.rename(file, newPath);

  return newPath;
};
