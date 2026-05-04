import type { Lesson } from '../types';

export const firewall: Lesson = {
    id: 'firewall',
    title: '防火墙 - 服务器的"保安"',
    icon: "Shield",
    description: '配置防火墙保护服务器，防止未授权访问',
    content: {
      analogy: '防火墙就像小区的门卫大爷。他手里有一份"允许进出名单"，只有名单上的人（IP和端口）才能进出。陌生人（未授权请求）一律挡在门外，保护小区（服务器）的安全。',
      explanation: '防火墙是网络安全的第一道防线，通过规则控制进出流量。Linux常用ufw（Uncomplicated Firewall，简单防火墙）或firewalld。默认策略是拒绝所有入站，允许所有出站。',
      terms: [
        { name: 'ufw', fullName: 'Uncomplicated Firewall', meaning: '简单防火墙，Ubuntu自带的防火墙管理工具' },
        { name: 'firewalld', fullName: '', meaning: 'CentOS/RHEL系统的动态防火墙管理器' },
        { name: 'IP', fullName: 'Internet Protocol', meaning: '互联网协议地址，服务器的网络身份标识' },
        { name: 'iptables', fullName: '', meaning: 'Linux内核的防火墙规则系统，ufw是其前端工具' }
      ],
      tools: [
        { name: 'ufw', description: 'Ubuntu防火墙管理工具', usage: '简单命令管理防火墙规则' },
        { name: 'iptables', description: '底层防火墙规则', usage: 'ufw底层就是iptables' }
      ],
      commands: [
        {
          description: '查看防火墙状态',
          command: 'sudo ufw status verbose',
          output: 'Status: active\nDefault: deny (incoming)\n22/tcp ALLOW IN Anywhere',
          explanation: '这是什么：ufw status查看防火墙状态，verbose显示详细信息。\n为什么要用：确认防火墙是否开启，有哪些规则。\n用了会怎么样：显示防火墙状态和所有规则。\n输出含义：active表示已启用，deny (incoming)表示默认拒绝入站，22/tcp ALLOW表示允许22端口TCP连接。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示防火墙当前状态和规则',
            outputExplanation: 'Status=状态，Default=默认策略，ALLOW/DENY=允许/拒绝'
          }
        },
        {
          description: '允许SSH端口',
          command: 'sudo ufw allow 22/tcp',
          output: 'Rules updated',
          explanation: '这是什么：allow允许某个端口通过防火墙，22/tcp表示TCP协议的22端口。\n为什么要用：开放SSH端口才能远程登录。\n用了会怎么样：添加一条允许22端口的规则。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '添加允许22端口TCP连接的规则',
            outputExplanation: 'Rules updated表示规则已更新'
          }
        },
        {
          description: '启用防火墙',
          command: 'sudo ufw enable',
          output: 'Firewall is active',
          dangerous: true,
          explanation: '这是什么：enable启用防火墙。\n为什么要用：配置好规则后开启防火墙保护。\n用了会怎么样：防火墙开始生效，按规则过滤流量。\n警告：启用前确保已允许SSH端口，否则会把自己锁在外面！',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '启用防火墙',
            outputExplanation: 'active表示防火墙已激活'
          }
        }
      ],
      commonMistakes: [
        { error: '启用防火墙后SSH断开', cause: '忘记允许SSH端口就启用了防火墙', expectedResult: 'SSH连接立即断开，所有新的SSH连接都被拒绝，提示 Connection refused 或 Connection timed out', solution: '通过VNC登录服务器，执行 sudo ufw allow 22/tcp && sudo ufw reload', recoveryMethod: '1. 打开云服务商控制台的VNC远程桌面\n2. 用root登录\n3. 执行 sudo ufw allow 22/tcp\n4. 执行 sudo ufw reload\n5. 确认SSH端口开放后，重新用SSH连接' },
        { error: 'ufw命令找不到', cause: 'ufw未安装', expectedResult: '终端提示 ufw: command not found', solution: '安装ufw：sudo apt install ufw -y', recoveryMethod: '执行 sudo apt update && sudo apt install ufw -y 安装后继续配置' },
        { error: '规则不生效', cause: '修改后没有reload', expectedResult: '添加了允许规则但端口仍然无法访问', solution: '重新加载防火墙规则：sudo ufw reload', recoveryMethod: '执行 sudo ufw reload 重新加载所有规则，用 sudo ufw status verbose 确认规则已生效' }
      ],
      bestPractices: ['先配置规则，最后才启用防火墙', '定期审查规则，删除不再需要的', '使用limit规则防止暴力破解']
    }
  }
