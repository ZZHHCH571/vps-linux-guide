import type { Lesson } from '../types';

export const network_troubleshoot: Lesson = {
    id: 'network-troubleshoot',
    title: '网络故障排查 - 连不上服务器怎么办',
    icon: "Search",
    description: '系统化排查网络连接问题，快速定位故障原因',
    content: {
      analogy: '网络排查就像找水管漏水：从源头开始，一段段检查，直到找到问题所在。可能是水龙头坏了（本地网络）、水管破了（中间路由）、或者水表堵了（服务器防火墙）。',
      explanation: '当无法连接服务器时，按照以下步骤逐步排查：\n\n1. **检查本地网络**：能否访问其他网站？\n2. **检查DNS解析**：域名是否正确解析为IP？\n3. **检查服务器是否在线**：ping服务器IP\n4. **检查端口是否开放**：telnet或nc测试端口\n5. **检查防火墙规则**：服务器和云服务商的防火墙\n6. **检查服务是否运行**：服务器上服务是否在运行\n\n每一步都能缩小问题范围，避免盲目尝试。',
      terms: [
        { name: 'Ping', fullName: 'Packet Internet Groper', meaning: '测试网络连通性的工具，发送ICMP包' },
        { name: 'Traceroute', fullName: '路由追踪', meaning: '显示数据包经过的所有路由节点' },
        { name: 'Telnet', fullName: '远程登录协议', meaning: '测试TCP端口是否开放的工具' },
        { name: 'Netstat', fullName: 'Network Statistics', meaning: '显示网络连接、路由表、接口统计' },
        { name: 'SS', fullName: 'Socket Statistics', meaning: 'netstat的现代替代品，显示socket信息' }
      ],
      tools: [
        { name: 'ping', description: '测试连通性', usage: 'ping 192.168.1.1' },
        { name: 'traceroute', description: '路由追踪', usage: 'traceroute example.com' },
        { name: 'telnet', description: '测试端口', usage: 'telnet example.com 80' },
        { name: 'ss', description: '查看网络连接', usage: 'ss -tlnp' }
      ],
      commands: [
        {
          description: '测试服务器连通性',
          command: 'ping -c 4 192.168.1.100',
          output: 'PING 192.168.1.100 (192.168.1.100) 56(84) bytes of data.\n64 bytes from 192.168.1.100: icmp_seq=1 ttl=64 time=0.5 ms\n\n--- ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss',
          explanation: '这是什么：发送4个ICMP包测试服务器是否可达。\n为什么要用：快速判断服务器是否在线，网络是否通畅。\n用了会怎么样：显示每个包的响应时间和丢包率。\n输出含义：time是延迟（毫秒），packet loss是丢包率，0%表示网络正常。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '发送4个测试包并统计结果',
            outputExplanation: 'time是延迟，packet loss是丢包率，0%表示正常'
          }
        },
        {
          description: '追踪网络路由',
          command: 'traceroute example.com',
          output: '1  192.168.1.1  1.2 ms\n2  10.0.0.1  5.3 ms\n3  93.184.216.34  45.2 ms',
          explanation: '这是什么：显示数据包从本地到目标经过的所有路由节点。\n为什么要用：定位网络中断发生在哪一跳，判断是本地问题还是服务器问题。\n用了会怎么样：逐行显示每个路由节点的IP和响应时间。\n输出含义：每行是一个路由节点，时间是到达该节点的延迟。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示数据包经过的所有路由节点',
            outputExplanation: '每行是一个节点，数字是跳数，时间是延迟'
          }
        },
        {
          description: '测试端口是否开放',
          command: 'telnet example.com 80',
          output: 'Trying 93.184.216.34...\nConnected to example.com.\nEscape character is \'^]\'.',
          explanation: '这是什么：尝试连接到服务器的指定端口。\n为什么要用：确认特定端口（如80、443、22）是否开放并可连接。\n用了会怎么样：如果端口开放，显示Connected；如果关闭，显示Connection refused。\n输出含义：Connected表示端口开放，可以建立连接。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '测试指定端口是否可连接',
            outputExplanation: 'Connected表示端口开放，refused表示关闭'
          }
        },
        {
          description: '查看服务器监听端口',
          command: 'sudo ss -tlnp',
          output: 'State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process\nLISTEN 0      128    0.0.0.0:80         0.0.0.0:*     users:(("nginx",pid=1234,fd=6))\nLISTEN 0      128    0.0.0.0:443        0.0.0.0:*     users:(("nginx",pid=1234,fd=7))',
          explanation: '这是什么：显示服务器上所有监听的TCP端口。\n为什么要用：确认服务是否在正确的端口上监听，排查端口占用问题。\n用了会怎么样：列出所有监听端口、进程名和PID。\n输出含义：LISTEN表示监听状态，Local Address是监听地址，Process是进程信息。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示所有监听的TCP端口和进程',
            outputExplanation: '每行是一个监听端口，显示地址、端口号和进程'
          }
        }
      ],
      commonMistakes: [
        { error: 'ping不通就认为服务器挂了', cause: '服务器可能禁用了ICMP', solution: '用telnet测试具体端口，或用curl访问网站' },
        { error: '本地能ping通但网站打不开', cause: 'Web服务未启动或防火墙阻止', solution: '检查服务状态和防火墙规则' },
        { error: '某个地区无法访问', cause: '可能是当地网络问题或CDN故障', solution: '用多地ping工具测试，检查CDN状态' }
      ],
      bestPractices: ['从本地到远程逐层排查', '先检查简单问题（电源、网线）', '记录故障现象和解决步骤', '建立监控告警提前发现问题', '准备备用连接方式（SSH备用端口）']
    }
  }
