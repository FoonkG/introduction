import { BrowserWindow } from "electron";
import { isDev } from "@/utils";

export const createMainWindow = () => {
	const window = new BrowserWindow({
		width: 1800,
		minWidth: 1800,
		height: 1000,
		minHeight: 1000,
		maximizable: false,
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
		.loadURL(isDev() ? `http://localhost:9000/#/` : `file://${__dirname}/index.html#/`)
		.then(() => {
			window.show();
		})
		.catch((err: string) => {
			console.log(err);
		});

	return window;
};

export const createCaptchaWindow = () => {
	const window = new BrowserWindow({
		width: 350,
		minWidth: 350,
		height: 543,
		minHeight: 543,
		maximizable: false,
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
		.loadURL(isDev() ? `http://localhost:9000/#/captcha` : `file://${__dirname}/index.html#/captcha`)
		.then(() => {
			window.show();
		})
		.catch((err: string) => {
			console.log(err);
		});

	return window;
};
