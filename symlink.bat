@echo off
for /D %%G in ("%AppData%\Mozilla\Firefox\Profiles\*") DO (
    rmdir /s /q "%%G\chrome"
    mklink /d "%%G\chrome" "%cd%\chrome"
    start "" "%%G"
)
