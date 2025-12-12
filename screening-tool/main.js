import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    // Dev server
    win.loadURL("http://localhost:5173");
  } else {
    // Production: load static files
    const indexPath = path.join(__dirname, "dist", "index.html"); // <-- adjust if needed
    win.loadFile(indexPath);
  }
}

app.whenReady().then(createWindow);
