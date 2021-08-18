import { app, BrowserWindow, ipcMain } from "electron";
import { screen, Menu, shell } from "electron";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let mainWindow, menuWin;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 960,
    height: 650,
    transparent: true,
    frame: false,
    useContentSize: true,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  ipcMain.on("min", (e) => mainWindow.minimize());
  ipcMain.on("max", (e) => mainWindow.maximize());
  ipcMain.on("unmax", (e) => mainWindow.unmaximize());
  ipcMain.on("close", (e) => mainWindow.close());

  ipcMain.on("showSuspensionWindow", () => {
    if (menuWin) {
      if (menuWin.isVisible()) {
        createSuspensionWindow();
      } else {
        menuWin.showInactive();
      }
    } else {
      createSuspensionWindow();
    }
  });

  ipcMain.on("createSuspensionMenu", (e) => {
    const rightM = Menu.buildFromTemplate([
      { label: "开始全部任务", enabled: false },
      { label: "暂停全部任务", enabled: false },
      { label: "本次传输完自动关机" },
      { type: "separator" },
      {
        label: "加入qq群",
        click: () => {
          shell.openExternal(
            "tencent://groupwpa/?subcmd=all&param=7B2267726F757055696E223A3831343237303636392C2274696D655374616D70223A313533393531303138387D0A"
          );
        },
      },
      {
        label: "GitHub地址",
        click: () => {
          shell.openExternal("https://github.com/lihaotian0607/auth");
        },
      },
      {
        label: "退出软件",
        click: () => {
          app.quit();
        },
      },
    ]);
    rightM.popup({});
  });

  ipcMain.on("hideSuspensionWindow", () => {
    if (menuWin) {
      menuWin.hide();
    }
  });
}

function createSuspensionWindow() {
  menuWin = new BrowserWindow({
    width: 107, //悬浮窗口的宽度 比实际DIV的宽度要多2px 因为有1px的边框
    height: 27, //悬浮窗口的高度 比实际DIV的高度要多2px 因为有1px的边框
    type: "toolbar", //创建的窗口类型为工具栏窗口
    frame: false, //要创建无边框窗口
    resizable: false, //禁止窗口大小缩放
    show: false, //先不让窗口显示
    webPreferences: {
      devTools: false, //关闭调试工具
    },
    transparent: true, //设置透明
    alwaysOnTop: true, //窗口是否总是显示在其他窗口之前
  });
  const size = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高
  const winSize = menuWin.getSize(); //获取窗口宽高

  //设置窗口的位置 注意x轴要桌面的宽度 - 窗口的宽度
  menuWin.setPosition(size.width - winSize[0], 100);
  const menuWinURL =
    process.env.NODE_ENV === "development"
      ? `http://localhost:9080/#/suspension`
      : `file://${__dirname}/index.html/#/suspension`;
  menuWin.loadURL(menuWinURL);

  menuWin.once("ready-to-show", () => {
    menuWin.show();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
