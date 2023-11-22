# KclabWeb3.UniApp

> 基於 uniapp 集成 Web3 相關功能，專為區塊鏈 Web3 量身定制的跨多端前端框架；理論上 uniapp 支援的平臺本前端框架都支援。

## 支援平臺

|Android App|iOS App|H5|微信小程式|支付寶小程式|百度小程式|抖音小程式|飛書小程式|QQ小程式|快手小程式|京東小程式|華為快應用|360小程式|
|--|--|--|--|--|--|--|--|--|--|--|--|--|
|√|√|√|√|√|√|√|√|√|√|√|√|√|

## 效果預覽

訪問網址：https://ketchuplab.github.io/KclabWeb3.UniApp/

預覽效果：[KclabWeb3.UniApp](https://ketchuplab.github.io/KclabWeb3.UniApp/)

## 功能說明

1. 整合基礎的get/post http請求。
2. 整合需要鑑權請求和無需鑑權請求。
3. 整合獨立配置管理。
4. 內建Web3 UI風格。
5. 內建常用的Web3風格介面（登入、註冊、賬號找回、首頁、訊息、設定、引導屏）。
6. 內建自定義Web3底部導航。
7. 內建免費英文字型及圖示字型。
8. 內建可透過簡單調整顏色的全域性css配置。
9. 內建移動端下console除錯日誌。
10. 內建全域性異常監控及傳送至機器人功能（需與後臺配合）
11. 內建介面鑑權、引數防篡改安全防護（需與後臺配合）


## 目錄說明

```目錄說明

├—— components （組件目錄）
├————— Navbar （自定義底部導航組件）
├—— pages（源碼）
├————— about （關於我們）
├————— forgot （找回密碼）
├————— home （首頁）
├————— login （登入）
├————— message （短訊）
├————— register （註冊）
├————— settings （設定）
├————— start （開屏）
├————— wallet （錢包）
├—— static（文字、圖示、樣式、圖片、外掛、音訊等媒體資源）
├————— images （圖片）
├————— fonts （字型）
├————— styles （樣式）
├————————— global.scss （全局樣式）
├————————— iconfont.css （字體樣式）
├————————— uni.scss （uniapp樣式）
├—— unpackage （打包後的程式碼）
├—— utils（工具類）
├————— api.js （網路請求相關）
├————— util.js （相關工具）
├————— config.js （相關配置）
├—— .gitignore（Git配置）
├—— App.vue（應用程式入口）
├—— index.html（靜態首頁）
├—— LICENSE （協議）
├—— main.js（主要入口）
├—— manifest.json（Web應用程式的清單檔案）
├—— package.json (外部引用到的包)
├—— pages.json （路由、原生菜單配置）
├—— README.md （幫助文檔）
└—— uni.promisify.adaptor.js （Promise適配器 ）

```
## 開源說明

|Android端|iOS端|Web端|H5端|后端|
|--|--|--|--|--|
|可定制|可定制|可定制|[开源](https://github.com/ketchuplab/KclabWeb3.UniApp.git)|可定制|

## 特別說明

1. KclabWeb3.UniApp 框架對應的後臺請求介面需要自行實現，也可以聯絡我們購買。
2. 原始碼中呼叫安卓的一些操作需要使用到安卓客戶端方可正常使用，如無需要刪除程式碼即可。
3. KclabWeb3.UniApp 已滿足一般Web3應用開發，uniapp對於連線錢包沒有支援，所以需要使用我們自己研發的客戶端才可以。 安卓端、蘋果端喚出錢包APP、連線錢包是透過原生APP端實現，需要安卓端、蘋果端原始碼（暫不開源，如有需要可聯絡我們）

## 聯繫我們

網址：[https://kclab.xyz](https://kclab.xyz)

Twiiter：[https://twitter.com/ketchupRepublic](https://twitter.com/ketchupRepublic)

GitHub：[https://github.com/ketchuplab](https://github.com/ketchuplab)

Eth Wallet Address：0x7476c197C61492C50417dDBB5d1359E3fF8C614a
