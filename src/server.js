import dotenv from "dotenv";
import { setupServer } from "./app.js";
import { initMongoConnection } from "./db/initMongoConnection.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

const bootstrap = async () => {
  await initMongoConnection();

  const app = setupServer();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

bootstrap();
