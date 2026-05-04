import type { Lesson } from '../types';

export const port: Lesson = {
    id: 'port',
    title: '端口 - 服务器的"门牌号"',
    icon: "Server",
    description: '理解端口概念，学会配置和管理服务器端口',
    content: {
      analogy: '想象你的VPS是一栋公寓楼，端口就是每个房间的门牌号。HTTP服务住在80号房间，HTTPS住在443号，SSH住在22号。快递员（数据包）根据门牌号把包裹送到正确的房间。',
      explanation: '端口是网络通信的端点，范围从0到65535。0-1023是知名端口（如80、443），1024-49151是注册端口，49152-65535是动态端口。每个服务通过特定端口监听和响应请求。',
      terms: [
        { name: 'HTTP', fullName: 'HyperText Transfer Protocol', meaning: '超文本传输协议，用于传输网页' },
        { name: 'HTTPS', fullName: 'HTTP Secure', meaning: '加密的HTTP，使用SSL/TLS保护数据传输' },
        { name: 'TCP', fullName: 'Transmission Control Protocol', meaning: '传输控制协议，可靠的面向连接传输' },
        { name: 'UDP', fullName: 'User Datagram Protocol', meaning: '用户数据报协议，快速但不可靠传输' }
      ],
      tools: [
        { name: 'ss命令', description: '查看端口状态', usage: 'ss -tuln查看监听端口' },
        { name: 'nc命令', description: '测试端口连通', usage: 'nc -zv IP 端口' }
      ],
      commands: [
        {
          description: '查看当前监听的端口',
          command: 'sudo ss -tuln',
          output: 'State  Recv-Q Send-Q Local Address:Port\nLISTEN 0      128    0.0.0.0:22\nLISTEN 0      128    0.0.0.0:80',
          explanation: '这是什么：ss是socket statistics，查看网络连接。-t TCP，-u UDP，-l监听中，-n数字显示。\n为什么要用：看看哪些端口正在被使用，有没有异常开放。\n用了会怎么样：显示所有正在监听的网络端口。\n输出含义：LISTEN表示监听状态，0.0.0.0:22表示在所有IP的22端口监听（SSH），0.0.0.0:80表示80端口监听（HTTP）。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符，sudo表示以管理员权限运行',
            result: '显示所有正在监听的网络端口',
            outputExplanation: 'State=状态(LISTEN=监听)，Local Address:Port=监听的IP和端口'
          }
        },
        {
          description: '测试端口连通性',
          command: 'nc -zv your-server-ip 22',
          output: 'Connection to your-server-ip 22 port succeeded!',
          explanation: '这是什么：nc是netcat，网络工具。-z扫描模式，-v显示详情。\n为什么要用：测试某个端口是否能连通，排查网络问题。\n用了会怎么样：显示端口是否可达。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '测试指定IP的指定端口是否连通',
            outputExplanation: 'succeeded!表示端口连通，refused表示拒绝'
          }
        }
      ],
      commonMistakes: [
        { error: 'Connection refused', cause: '服务没启动，或端口被防火墙拦截', solution: '检查服务状态：sudo systemctl status sshd' },
        { error: 'Port already in use', cause: '另一个程序已经在使用该端口', solution: '找出占用进程：sudo lsof -i :端口号' },
        { error: 'Permission denied', cause: '1024以下端口需要root权限', solution: '使用sudo运行命令' }
      ],
      bestPractices: ['生产环境避免使用默认端口', '只开放必要的端口', '使用端口扫描工具定期检查', '记录每个端口用途']
    }
  }
