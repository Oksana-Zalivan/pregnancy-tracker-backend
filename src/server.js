import dotenv from "dotenv";
import { setupServer } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = setupServer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
