import { readFile, writeFile } from 'fs';
import { resolve } from 'path';

function createRepository(name) {
  const path = resolve(__dirname, `../../data/${name}.json`);

  return {
    read: () =>
      new Promise((resolve, rejects) => {
        readFile(path, (error, data) => {
          if (error) {
            rejects(error);
          }
          resolve(JSON.parse(data));
        });
      }),

    write: (data) =>
      new Promise((resolve, rejects) => {
        writeFile(path, JSON.stringify(data), (error) => {
          if (error) {
            rejects(error);
            return;
          }
          resolve();
        });
      }),
  };
}

export default createRepository;
