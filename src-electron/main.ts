import { app, BrowserWindow,globalShortcut  } from "electron";

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  //process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

  if (process.env.NODE_ENV === "development") {
    // Load the Vite dev server
    await mainWindow.loadURL("http://localhost:5173");
    //mainWindow.webContents.openDevTools(); // optional
  } else {
    // Load production build
    await mainWindow.loadFile("dist/index.html");
  }

 app.whenReady().then(() => {
    globalShortcut.register("CommandOrControl+=", () => {
      const currentZoom = mainWindow?.webContents.getZoomFactor() ?? 1;
      mainWindow?.webContents.setZoomFactor(currentZoom + 0.1);
    });

    globalShortcut.register("CommandOrControl+-", () => {
      const currentZoom = mainWindow?.webContents.getZoomFactor() ?? 1;
      mainWindow?.webContents.setZoomFactor(Math.max(currentZoom - 0.1, 0.3));
    });

    globalShortcut.register("CommandOrControl+0", () => {
      mainWindow?.webContents.setZoomFactor(1.0);
    });
  });
}

app.on("ready", createWindow);


app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
