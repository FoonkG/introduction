import { BrowserWindow } from "electron";
import { isDev } from "@/utils";

export const createLoginWindow = () => {
	const window = new BrowserWindow({
		width: 355,
		minWidth: 355,
		height: 447,
		minHeight: 447,
		show: false,
		frame: false,
		transparent: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	window.menuBarVisible = false;

	window
		.loadURL(isDev() ? `http://localhost:9000/#/login` : `file://${__dirname}/index.html#/login`)
		.then(() => {
			window.show();
		})
		.catch((err: string) => {
			console.log(err);
		});

	return window;
};

export const createMainWindow = () => {
	const window = new BrowserWindow({
		width: 1335,
		minWidth: 1335,
		height: 850,
		minHeight: 850,
		show: false,
		frame: false,
		transparent: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	window.menuBarVisible = false;

	window
		.loadURL(isDev() ? `http://localhost:9000/#/dashboard` : `file://${__dirname}/index.html#/dashboard`)
		.then(() => {
			window.show();
		})
		.catch((err: string) => {
			console.log(err);
		});

	return window;
};
