import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 5000;

app.use(cors());

// Helper to read JSON
const readJSON = (filename: string) => {
  const filePath = path.join(__dirname, "data", filename);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

app.get("/api/customer-type", (req: Request, res: Response) => {
  res.json(readJSON("Customer Type.json"));
});

app.get("/api/account-industry", (req: Request, res: Response) => {
  res.json(readJSON("Account Industry.json"));
});

app.get("/api/team", (req: Request, res: Response) => {
  res.json(readJSON("Team.json"));
});

app.get("/api/acv-range", (req: Request, res: Response) => {
  res.json(readJSON("ACV Range.json"));
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
