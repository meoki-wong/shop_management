const { app, BrowserWindow } = require("electron");
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

function createWindow() {
	const win = new BrowserWindow({
		width: 800,

		height: 600,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			webSecurity: false
			// 更多 webPreferences 配置可以加在这里
		  }
	}); // 加载应用----适用于 react 项目

	win.loadURL("http://localhost:3000/");
}
// 播放音频
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
