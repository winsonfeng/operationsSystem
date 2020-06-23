@echo off
chcp 65001
rem %1=== baseUrl = path.join(__dirname,'components',"Cmd （默认值，可修改）")
rem %2=== 第二个参数fileName 默认值cmdInfo
PowerShell Get-NetFirewallProfile -name Domain > %1\%2.txt
PowerShell -Command "& {Get-NetFirewallProfile -name Domain | convertTo-Json > %1\%2.json}"
rem PowerShell -Command "& {get-content %1\%2.txt | set-content %1\%2Utf8.txt -encoding utf8}"
exit
