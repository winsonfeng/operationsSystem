export default function() {
  const fs = require('fs');
// 仅在 Windows 上。
  const { spawn } = require('child_process');
  const path = require('path');

  const baseUrl = path.join(__dirname, 'components', 'Cmd');
//读取存储在当前目录下的cmd文件
  const url = path.join(__dirname, 'components/Cmd/my.bat');
//读取强制存储在C盘的txt文件目录
  const urlInfo = 'C:\\cmdInfoUtf8.txt';


  // @ts-ignore
  /**
   * readTxt方法是基于Node fs.readFile()构建，主要是用于获取读取本地txt文件，返回给UI
   */
  let readTxt = () => {
    // let txt:any = 0;
    /*fs.readFile(urlInfo, { encoding: 'utf8' }, (err: any, dirent: Buffer) => {
      if (err) {
        console.log(err);
      }
      /!*this.setState({
        info: {
          ...this.state.info,
          //这里是以正则保证换行
          txt: dirent.toString().replace(/\r\n/g, '<br />')
        }
      });*!/
      txt = dirent.toString().replace(/\r\n/g, '<br />')
  });*/
    return fs.readFileSync(urlInfo, { encoding: 'utf8'});
  }
// spawn cmd
  /**
   * cmd方法是基于Node子进程spawn构建，主要是用于调用my.cmd文件，获得一个存储控制台信息的txt，再读取txt内容返回给State，详细看下面的my.cmd文件
   */
  const ls = spawn(url, [baseUrl, '第二个参数']);
  ls.stdout.on('data', (data: any) => {
    console.log(data.toString());
    /*this.setState({
      info: {
        ...this.state.info,
        ipconfig: this.state.info.ipconfig += data.toString().replace(/\r\n/g, '<br />')
      }
    });*/
  });
  ls.on('close', (code: number) => {
    console.log(`子进程退出，使用退出码 ${code}`);
    readTxt()
  });
  return readTxt()
}
