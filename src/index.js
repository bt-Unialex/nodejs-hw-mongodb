import { initMongoDB } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

// initMongoDB()
//   .then(setupServer);

const bootstrap = async () => {
  await initMongoDB();
  setupServer();
};

void bootstrap();
