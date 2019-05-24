"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var fluent_ffmpeg_1 = require("fluent-ffmpeg");
var mainwindows;
electron_1.app.on('ready', function () {
    // console.log('app is now ready')
    mainwindows = new electron_1.BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
        }
    });
    mainwindows.loadURL("file://" + __dirname + "/app/index.html");
});
electron_1.ipcMain.on("video:submit", function (event, message) {
    fluent_ffmpeg_1.ffprobe(message, function (err, metadata) {
        // console.log('Duração do video: ', metadata.format.duration)
        mainwindows.webContents.send('video:metadata', metadata.format.duration);
    });
});
