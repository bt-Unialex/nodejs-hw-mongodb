import fs from 'node:fs';

export const createDirIfNotExists = (path) => {
  try {
    fs.accessSync(path);
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        fs.mkdirSync(path, { recursive: true });
      } catch (mkdirErr) {
        console.error("Can't make directory:", mkdirErr);
      }
    } else {
      console.error('File system error', error);
    }
  }
  return path;
};
