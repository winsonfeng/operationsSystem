@echo off
chcp 65001
set cmdInfoName=cmdInfo
set rootPath='C:'
echo %1
rem %1=== baseUrl = path.join(__dirname,'components',"Cmd （默认值，可修改）")
rem %2=== 第二个参数fileName 默认值cmdInfo
ipconfig > %1\%2.txt
PowerShell -Command "& {get-content %1\%2.txt | set-content %1\%2Utf8.txt -encoding utf8}"
exit
