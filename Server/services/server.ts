import express, { Express } from "express";
import cors from "cors";
import path from "path";

const host = process.env.LOCAL_PATH;
const port = Number(process.env.LOCAL_PORT);

export function initServer(): Express {
  const app = express();

  const jsonMiddleware = express.json();
  app.use(jsonMiddleware);

  app.use(cors());

  // Обслуживание статических файлов
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("/api/data", (req, res) => {
    res.json({ message: "CORS is enabled for all origins!" });
  });

  // Для SPA - отдаем index.html для всех остальных маршрутов
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });

  app.listen(port, host, () => {
    console.log(`Server running on port ${port}`);
  });

  return app;
}