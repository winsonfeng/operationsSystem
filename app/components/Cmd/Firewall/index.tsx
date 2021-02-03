import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../constants/routes.json';
import axios from 'axios';
import { filter, cmd, openCmd } from '../../public';


const path = require('path');
/*function Firewall() {
  const [fireLog,setFireLog] = useState(0)

  // @ts-ignore
  const fireLogFromCmd = new cmd()
  fireLogFromCmd.then(data =>{
    useEffect(()=>{
      setFireLog(data)
    })
  }).catch(err=>{
    console.log(err)
  })
  return <div>
    <Link to={routes.HOME}>to Home</Link>
    {fireLog}
  </div>
}*/

const reName = {
  '0': '未开启/未配置',
  '1': '已开启',
  '2': '未开启/未配置'
};
const baseUrl = path.join(__dirname, 'components', 'Cmd', 'Firewall');

class Firewall extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      fireLog: '',
      fireData: {}
    };
  }

  openFireWall() {
    if (this.state.fireData.Enabled === '未开启/未配置') {
      const openFirewallFromCmd = openCmd(baseUrl, 'openFireWall');
      openFirewallFromCmd.then(() => {
        this.setState({
          fireData: {
            ...this.state.fireData,
            'Enabled': '开启中，请稍等...'
          }
        });
        this.getFireLogFromCmd();
      });
    }
  }

  closeFireWall() {
    if (this.state.fireData.Enabled === '已开启') {
      const closeFirewallFromCmd = openCmd(baseUrl, 'closeFireWall');
      closeFirewallFromCmd.then(() => {
        this.setState({
          fireData: {
            ...this.state.fireData,
            'Enabled': '关闭中，请稍等...'
          }
        });
        this.getFireLogFromCmd();

      });
    }
  }

  getFireLogFromCmd() {
    const fireLogFromCmd = cmd(baseUrl, 'fireLog');
    fireLogFromCmd.then((data: any) => {
      this.setState({ fireLog: data });
    }).then(() => {
      this.getFireLogFromLoacl();
    }).catch((err: any) => {
      console.log(err);
    });
  }

  getFireLogFromLoacl() {
    axios.get(baseUrl + '\\fireLog.json').then(response => {
      const { data } = response;
      let filterdData = filter(data, reName);
      this.setState({
        fireData: filterdData
      });
    }).catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.getFireLogFromCmd();
  }

  render() {
    return <div>
      <Link to={routes.HOME}>to Home</Link>
      <ul>
        <li>防火墙状态：{this.state.fireData.Enabled}</li>
        <li>一键开启防火墙：
          <button onClick={() => {
            this.openFireWall();
          }}>open</button>
        </li>
        <li>一键关闭防火墙：
          <button onClick={() => {
            this.closeFireWall();
          }}>close</button>
        </li>
      </ul>
      <p dangerouslySetInnerHTML={{ __html: this.state.fireLog }} style={{ fontSize: '14px' }}/>
    </div>;
  }
}

export default Firewall;
