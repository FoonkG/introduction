import { app, BrowserWindow } from "electron";
import { createLoginWindow, createMainWindow } from "@/browserWindows";

import "./ipc.ts";

declare global {
	namespace NodeJS {
		interface Global {
			loginWindow: BrowserWindow | null;
			mainWindow: BrowserWindow | null;
		}
	}
}

const createWindow = () => {
	//global.loginWindow = createLoginWindow();
	global.mainWindow = createMainWindow();
};

app.on("ready", createWindow);
