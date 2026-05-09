import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock database for dynamic redirect codes
  const redirectMap = new Map<string, string>();

  // API Routes
  app.post("/api/links", (req, res) => {
    const { url } = req.body;
    const shortCode = Math.random().toString(36).substring(2, 8);
    redirectMap.set(shortCode, url);
    res.json({ shortCode });
  });

  app.get("/r/:shortCode", (req, res) => {
    const { shortCode } = req.params;
    const targetUrl = redirectMap.get(shortCode);
    if (targetUrl) {
      // In a real app, we'd log the scan analytics here
      res.redirect(targetUrl);
    } else {
      res.status(404).send("Link expired or not found");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
