import React from 'react';
import { platform } from 'os';
import { changFreemem } from '../public';

const os = require('os');

console.log(os);

// 仅在 Windows 上。
const { spawn } = require('child_process');
const path = require('path');

const url = path.join(__dirname, 'components/Cmd/my.bat');
console.log(url);

class Index extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      info: {
        platform: platform() /* win32 */,
        cpus: os.cpus() /* i7 */,
        freemem: os.freemem(),
        hostname: os.hostname(),
        ipconfig: '666'
      }
    };
  }

  // exec cmd
  /* cmd = () => {
    spawn(url, (err: any, stdout: any, stderr: any) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      this.setState({
        info:
          {
            ...this.state.info,
            ipconfig: stdout
          }
      });
    });
  }; */
  // spawn cmd
  cmd = () => {
    const ls = spawn(url, []);
    ls.stdout.on('data', (data: any) => {
      console.log(data.toString());
      this.setState({
        info: {
          ...this.state.info,
          ipconfig: data.toString()
        }
      });
    });
    ls.on('close', (code: number) => {
      console.log(`子进程退出，使用退出码 ${code}`);
    });
  };

  componentDidMount() {
    this.cmd();
  }

  render() {
    const { info } = this.state;
    return (
      <div>
        <ul>
          <li>
            操作平台:
            {info.platform}
            {`${os.arch()}位`}
          </li>
          <li>
            Cpu:
            {info.cpus[0].model}
          </li>
          <li>
            总内存:
            {changFreemem(os.totalmem())}
            空闲内存:
            {changFreemem(info.freemem)}
          </li>
          <li>
            主机名:
            {info.hostname}
          </li>
          <li>
            网络接口列表：
            {info.ipconfig}
          </li>
        </ul>
      </div>
    );
  }
}

export default Index;
