---
title: Face-Recognition-Public-Facility-Reservation-and-Security-Management-System
description: Python 人臉辨識門禁程式，搭配 PHP 公設預約網站，共用一個 MySQL 資料庫。
repo: workingyuanyuan/Face-Recognition-Public-Facility-Reservation-and-Security-Management-System
appliesTo: main 分支的 commit 779bb1e。環境為 Windows 上的 Python 3.8。這個專案沒有任何已標記的發行版。
caveat: 不宜直接上線部署。密碼以明文儲存、SQL 以字串插值組合，預設資料庫帳號為無密碼的 root。專案內已 commit 一份 venv 資料夾，應重新建立。專案沒有 LICENSE 檔案。
effectiveDate: 2026-06-26
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 779bb1e
    url: https://github.com/workingyuanyuan/Face-Recognition-Public-Facility-Reservation-and-Security-Management-System/blob/779bb1e95da42db9ed78f377909c3bf1e14e7693/README.md
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | 使用 PySide2 的 Python 桌面應用程式，加上位於 `reserve/` 的 PHP 網頁模組 |
| 授權 | 沒有 LICENSE 檔案，GitHub 未偵測到授權 |
| Python | 3.8 |
| 人臉偵測 | OpenCV Haar Cascade 分類器 |
| 人臉辨識 | OpenCV LBPH 人臉辨識器，`cv2.face.LBPHFaceRecognizer_create()` |
| 資料庫 | MySQL 或 MariaDB，資料庫名稱 `face` |
| 作業系統 | 建議使用 Windows，因為桌面程式會使用 Python 的 `winsound` 模組 |
| 硬體 | 網路攝影機或相容的相機 |
| 發行版 | 無 |

## 安裝

```bash
python -m venv venv
venv\Scripts\activate
pip install numpy pillow pymysql PySide2 opencv-contrib-python
```

請使用 `opencv-contrib-python`。若只安裝 `opencv-python`，可能會缺少 `cv2.face` 模組。

接著啟動 MySQL 或 MariaDB 並建立資料庫：

```sql
CREATE DATABASE IF NOT EXISTS face
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE face;

CREATE TABLE IF NOT EXISTS login (
  username VARCHAR(100) PRIMARY KEY,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS log (
  name VARCHAR(100) NOT NULL,
  place VARCHAR(100) NOT NULL,
  state VARCHAR(20) NOT NULL,
  time DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS reserve (
  name VARCHAR(100) NOT NULL,
  place VARCHAR(100) NOT NULL,
  start DATETIME NOT NULL,
  end DATETIME NOT NULL
);

INSERT IGNORE INTO login (username, password)
VALUES ('admin', 'admin');
```

目前程式碼中的連線設定：

| 設定 | 內容 |
| --- | --- |
| host | `localhost` |
| user | `root` |
| password | 空字串 |
| database | `face` |

若要使用其他帳號或環境，請修改 `sqls.py` 與 PHP 檔案中的設定。

請確認專案內存在以下項目：

```text
config/totalUser.txt
config/idlists.txt
config/userdic.txt
haarcascades/haarcascade_frontalface_alt2.xml
model/
data/
```

預約網站請將 `reserve/` 目錄放置或對應到已啟用 `mysqli` 擴充套件的 PHP 網頁伺服器文件根目錄底下。

## 執行

```bash
python main.py
```

預約網站可於類似如下的網址開啟：

```text
http://localhost/reserve/index.php
```

| 桌面端功能 | 用途 |
| --- | --- |
| 人臉管理 | 擷取人臉樣本、訓練模型、註冊使用者、刪除人臉資料 |
| Open Webcam1, Open Webcam2 | 為設定的地點啟動攝影機辨識 |
| Close Webcam | 停止使用攝影機 |
| 紀錄 | 查詢辨識與門禁紀錄 |
| 預約 | 查詢或清除預約紀錄 |
| 使用者清單 | 顯示已註冊使用者與樣本圖片 |

## 辨識流程

1. 管理員在桌面程式中擷取人臉樣本。
2. 程式以 Haar Cascade 偵測人臉並儲存裁切後的灰階樣本。
3. 程式訓練 LBPH 模型並寫入 `model/model.yml`。
4. 監控期間，程式將偵測到的人臉與模型進行比對預測。
5. 辨識出的使用者若在該地點與時段有符合的預約，紀錄為 `Open`。
6. 辨識出的使用者若無符合的預約，紀錄為 `Closed`。
7. 反覆出現未知人臉時會建立 `Warning` 紀錄，並將快照存於 `data/Unknown/`。

## 限制

- 辨識品質取決於樣本數量、光線、攝影機角度與人臉清晰度。
- PHP 頁面會參照遠端背景圖片，載入時可能需要網路連線。
- 專案內已 commit 的虛擬環境可能指向舊的本機 Python 路徑。
