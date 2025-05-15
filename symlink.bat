@echo off
setlocal enabledelayedexpansion

:: ========================
:: CONFIGURATION
:: ========================
:: Set your extension ID exactly as in manifest.json
set EXTENSION_ID=discord-icon-tracker@example.com

:: Path to your extension folder (relative to git root)
set EXTENSION_SRC=%cd%\Discord notifications WebExtension

:: ========================
:: SCRIPT
:: ========================
echo ====================================================
echo Firefox profile setup started...
echo Extension ID: %EXTENSION_ID%
echo Extension folder: %EXTENSION_SRC%
echo ====================================================

if not exist "%EXTENSION_SRC%\manifest.json" (
    echo ERROR: Extension folder does not contain manifest.json!
    echo Check path: %EXTENSION_SRC%
    pause
    exit /b 1
)

for /D %%G in ("%AppData%\Mozilla\Firefox\Profiles\*") DO (
    echo.
    echo ------------------------------------------------
    echo Processing profile: %%G

    :: Link userchrome.css (chrome folder)
    if exist "%%G\chrome" (
        echo Removing existing chrome folder...
        rmdir /s /q "%%G\chrome"
    )
    echo Creating chrome symlink...
    mklink /d "%%G\chrome" "%cd%\chrome" >nul && echo ✓ chrome symlinked || echo ✗ Failed to link chrome

    :: Link extension
    if not exist "%%G\distribution\extensions" (
        echo Creating extensions folder...
        mkdir "%%G\distribution\extensions"
    )

    if exist "%%G\distribution\extensions\!EXTENSION_ID!" (
        echo Removing existing extension link/folder...
        rmdir /s /q "%%G\distribution\extensions\!EXTENSION_ID!"
    )

    echo Creating extension symlink...
    mklink /d "%%G\distribution\extensions\!EXTENSION_ID!" "%EXTENSION_SRC%" >nul && echo ✓ Extension symlinked || echo ✗ Failed to link extension

    echo Done with profile: %%G
)

echo.
echo ====================================================
echo All profiles processed.
echo Firefox setup completed!
echo ====================================================
pause
