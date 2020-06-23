@echo off
chcp 65001
PowerShell -Command "& {Set-NetFirewallProfile -Profile Domain -Enabled False}"
exit
