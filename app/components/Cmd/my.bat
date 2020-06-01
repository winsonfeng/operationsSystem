@echo off
chcp 65001
set cmdInfoName=cmdInfo
echo %1
rem %1=== baseUrl = path.join(__dirname,'components',"Cmd")
ipconfig > %1\%cmdInfoName%.txt
PowerShell -Command "& {get-content %1\%cmdInfoName%.txt | set-content %1\cmdInfoUtf8.txt -encoding utf8}"
exit
