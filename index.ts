import { app, BrowserWindow, ipcMain } from 'electron'
import { ffprobe, FfprobeData } from 'fluent-ffmpeg'

let mainwindows: BrowserWindow

app.on('ready', () => {
    // console.log('app is now ready')
    mainwindows = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
        }
    })
    mainwindows.loadURL(`file://${__dirname}/app/index.html`)
})

ipcMain.on("video:submit", (event: any, message: any) => {

    ffprobe(message, (err, metadata: FfprobeData) => {
        // console.log('Duração do video: ', metadata.format.duration)
        mainwindows.webContents.send(
            'video:metadata',
            metadata.format.duration
        )
    })

});