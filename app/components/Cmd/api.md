```
chcp 65001 //页面转化编码
ipconfig
winver //检查windows的版本
wmimgmt.msc //打开windows管理体系结构(WMI)
nslookup
```
### PowerShell
> https://www.pstips.net/manage-firewall-using-powershell.html
```batch
Get-Command -Noun "*Firewall*" | Select -ExpandProperty Name
Set-NetFirewallProfile -Profile Domain -Enabled True
```
### Sever 2003
```batch
netstat -na
netsh firewall 
```
