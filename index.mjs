import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { readdirSync } from "fs";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ تحميل كل الـ routes تلقائيًا
const routesPath = path.resolve("./routes");
const routeFiles = readdirSync(routesPath);

routeFiles.map(async (file) => {
  const routeModule = await import(`./routes/${file}`);
  app.use("/api", routeModule.default);
});

app.get("/", (req, res) => {
  res.send("✅ Server is running successfully!");
});

console.log("🔑 Stripe Key:", process.env.STRIPE_SECRET_KEY ? "Loaded ✅" : "Missing ❌");

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
