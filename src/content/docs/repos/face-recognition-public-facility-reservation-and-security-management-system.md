---
title: Face-Recognition-Public-Facility-Reservation-and-Security-Management-System
description: Python face recognition access app with a PHP facility reservation website, on one MySQL database.
repo: workingyuanyuan/Face-Recognition-Public-Facility-Reservation-and-Security-Management-System
appliesTo: Commit 779bb1e on branch main. Python 3.8 on Windows. The repository has no tagged release.
caveat: Not safe to deploy as is. Passwords are stored as plain text, SQL is built by string interpolation, and the default database account is root with an empty password. A venv folder is committed in the repository and should be recreated. The repository has no LICENSE file.
effectiveDate: 2026-06-26
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 779bb1e
    url: https://github.com/workingyuanyuan/Face-Recognition-Public-Facility-Reservation-and-Security-Management-System/blob/779bb1e95da42db9ed78f377909c3bf1e14e7693/README.md
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Python desktop application with PySide2, plus a PHP web module in `reserve/` |
| License | No LICENSE file. GitHub detects no license |
| Python | 3.8 |
| Face detection | OpenCV Haar Cascade classifiers |
| Face recognition | OpenCV LBPH face recognizer, `cv2.face.LBPHFaceRecognizer_create()` |
| Database | MySQL or MariaDB, database name `face` |
| Operating system | Windows is recommended, because the desktop app uses the Python `winsound` module |
| Hardware | A webcam or compatible camera |
| Releases | None |

## Install

```bash
python -m venv venv
venv\Scripts\activate
pip install numpy pillow pymysql PySide2 opencv-contrib-python
```

Use `opencv-contrib-python`. With only `opencv-python`, the `cv2.face` module may be missing.

Then start MySQL or MariaDB and create the database:

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

Connection settings in the current code:

| Setting | Value |
| --- | --- |
| host | `localhost` |
| user | `root` |
| password | empty |
| database | `face` |

Change them in `sqls.py` and in the PHP files for any other account or environment.

Confirm that these exist in the project:

```text
config/totalUser.txt
config/idlists.txt
config/userdic.txt
haarcascades/haarcascade_frontalface_alt2.xml
model/
data/
```

For the reservation website, place or map the `reserve/` directory under the document root of a PHP web server with the `mysqli` extension.

## Run

```bash
python main.py
```

The reservation website is then at a URL such as:

```text
http://localhost/reserve/index.php
```

| Desktop function | Purpose |
| --- | --- |
| Face management | Capture face samples, train the model, register users, delete face data |
| Open Webcam1, Open Webcam2 | Start camera recognition for the configured locations |
| Close Webcam | Stop camera use |
| Log | Query recognition and access logs |
| Reservation | Query or clear reservation records |
| User List | Show registered users and sample images |

## Recognition flow

1. The administrator captures face samples in the desktop app.
2. The app detects faces with Haar Cascade and stores cropped greyscale samples.
3. The app trains an LBPH model and writes it to `model/model.yml`.
4. During monitoring, the app predicts detected faces against the model.
5. A recognised user with a matching reservation for the place and time is logged as `Open`.
6. A recognised user without a matching reservation is logged as `Closed`.
7. Repeated unknown faces create a `Warning` record and save a snapshot under `data/Unknown/`.

## Limits

- Recognition quality depends on the number of samples, lighting, camera angle and how clearly the face is visible.
- The PHP pages reference remote background images, so they may need network access to load.
- The committed virtual environment may point to an old local Python path.
