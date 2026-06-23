@echo off
echo ===================================================
echo PUSHING CODE TO GITHUB - BONZER GYM
echo ===================================================
echo.
"C:\Program Files\Git\cmd\git.exe" push -u origin main --force
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed!
    echo Please make sure you have added your SSH public key to your GitHub account settings.
    echo.
    echo Your public SSH Key is:
    echo ---------------------------------------------------
    type "%USERPROFILE%\.ssh\id_rsa.pub"
    echo ---------------------------------------------------
    echo.
) else (
    echo.
    echo [SUCCESS] Code pushed successfully to git@github.com:monikaritgithub/BonzerGym.git!
    echo.
)
pause
