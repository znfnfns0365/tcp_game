import { loadProtos } from './loadProtos.js';

export const initServer = async () => {
  try {
    await loadProtos();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
