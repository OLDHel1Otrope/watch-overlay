import { app, BrowserWindow } from "electron";

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 100,
    height: 100,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    // Load the Vite dev server
    await mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools(); // optional
  } else {
    // Load production build
    await mainWindow.loadFile("dist/index.html");
  }
}

app.on("ready", createWindow);
