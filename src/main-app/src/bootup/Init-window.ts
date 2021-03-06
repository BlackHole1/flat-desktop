import { app, BrowserWindow } from "electron";

export default async (context: Context) => {
    await new Promise(resolve => {
        app.on("ready", resolve);
    });

    const mainWin = new BrowserWindow({
        width: 375,
        height: 668,
        center: true,
        resizable: false,
        show: false,
        webPreferences: {
            autoplayPolicy: "no-user-gesture-required",
            nodeIntegration: true,
            preload: context.runtime.preloadPath,
            webSecurity: false,
        },
    });

    mainWin.center();

    if (context.runtime.isDevelopment) {
        mainWin.webContents.openDevTools();
    }

    void mainWin.loadURL(context.runtime.startURL);

    context.wins.main = mainWin;
};
