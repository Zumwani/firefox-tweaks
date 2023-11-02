@echo off
for /D %%G in ("%AppData%\Mozilla\Firefox\Profiles\*") DO ( 

echo %%~nxG

rmdir "%AppData%\Mozilla\Firefox\Profiles\%%~nxG\chrome"
mklink /d "%AppData%\Mozilla\Firefox\Profiles\%%~nxG\chrome" "%cd%\chrome"

)