import React from 'react';
import {Link} from 'react-router-dom';
import routes from '../../constants/routes.json'
import { platform } from 'os';
import { changFreemem } from '../public';
import './index.css'
import firewall from './Firewall'

const os = require('os');
const fs = require('fs');

// 仅在 Windows 上。
const { spawn } = require('child_process');
const path = require('path');

const baseUrl = path.join(__dirname,'components',"Cmd")
//读取存储在当前目录下的cmd文件
const url = path.join(__dirname, 'components/Cmd/my.bat');
//读取强制存储在C盘的txt文件目录
const urlInfo = 'C:\\cmdInfoUtf8.txt';


class Index extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      info: {
        platform: platform() /* win32 */,
        cpus: os.cpus() /* i7 */,
        freemem: os.freemem(),
        hostname: os.hostname(),
        ipconfig: '',
        txt: ''
      }
    };
  }

  // exec cmd
  /* cmd = () => {
    exec(url, (err: any, stdout: any, stderr: any) => {
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
  /**
   * cmd方法是基于Node子进程spawn构建，主要是用于调用my.cmd文件，获得一个存储控制台信息的txt，再读取txt内容返回给State，详细看下面的my.cmd文件
   */
  cmd = () => {
    const ls = spawn(url, [baseUrl,'第二个参数']);
    ls.stdout.on('data', (data: any) => {
      console.log(data.toString());
      this.setState({
        info: {
          ...this.state.info,
          ipconfig: this.state.info.ipconfig += data.toString().replace(/\r\n/g, '<br />')
        }
      });
    });
    ls.on('close', (code: number) => {
      this.readTxt();
      console.log(`子进程退出，使用退出码 ${code}`);
    });
  };
  /**
   * readTxt方法是基于Node fs.readFile()构建，主要是用于获取读取本地txt文件，返回给UI
   */
  readTxt = () => {
    fs.readFile(urlInfo, { encoding: 'utf8' }, (err: any, dirent: Buffer) => {
      if (err) {
        console.log(err);
      }
      this.setState({
        info: {
          ...this.state.info,
          //这里是以正则保证换行
          txt: dirent.toString().replace(/\r\n/g, '<br />')
        }
      });
      // console.log(this.state.info.txt);
    });
  };

  //这里要在componentDidMount调用方法，不能在render中调用,不然会无限循环渲染，
  // 实测用ReactHooks不行，所以才用了原生的React.Component
  componentDidMount() {
    firewall()
    this.cmd();
  }

  render() {
    const { info } = this.state;
    return (
      <div>
        <ul>
          <Link to={routes.HELLO}>Hello</Link>
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
          <li >
            <p dangerouslySetInnerHTML={{ __html: info.ipconfig }} />

          </li>
          {/*在React中设置dangerouslySetInnerHTML，保证<br/>起作用*/}
          <li>
            <p dangerouslySetInnerHTML={{ __html: info.txt }} />
          </li>
        </ul>
      </div>
    );
  }
}

export default Index;
