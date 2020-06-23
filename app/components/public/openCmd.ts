export default function(myBaseUrl: string, fileName: string) {

  /*
  @param myBaseUrl 自定义存储读取cmd文件以及log文件的路径。示例path.join(__dirname, 'components', 'Cmd', 'Firewall')
  @param fileName 自定义log日志文件名
 */
  return new Promise((resolve, reject) => {
    // 仅在 Windows 上。
    const { spawn } = require('child_process');
    const path = require('path');

    //读取存储在当前目录下的cmd文件
    const url = path.join(myBaseUrl, `${fileName}.bat`);

    const ls = spawn(url, [myBaseUrl, fileName]);
    ls.stdout.on('data', (data: any) => {
      console.log(data.toString());
    });
    ls.on('close', (code: number) => {
      console.log(`子进程退出，使用退出码 ${code}`);
      resolve('success');
    });
  });
}
