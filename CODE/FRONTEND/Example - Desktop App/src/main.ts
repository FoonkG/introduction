import { app, BrowserWindow, ipcMain } from "electron";
import { createMainWindow, createCaptchaWindow } from "@/browserWindows";

import "./ipc.ts";
import { loadTheme } from "./ipc";

declare global {
	namespace NodeJS {
		interface Global {
			mainWindow: BrowserWindow | null;
			captchaWindow: BrowserWindow | null;
		}
	}
}

const createWindow = () => {
	global.mainWindow = createMainWindow();
	loadTheme(global.mainWindow);
};

app.on("ready", createWindow);
