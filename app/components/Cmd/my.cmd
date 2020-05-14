chcp 65001
ipconfig > C:\cmdInfo.txt
cd C://
PowerShell -Command "& {get-content cmdInfo.txt | set-content cmdInfoUtf8.txt -encoding utf8}"
