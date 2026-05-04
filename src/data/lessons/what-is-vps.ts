import type { Lesson } from '../types';

export const what_is_vps: Lesson = {
    id: 'what-is-vps',
    title: '什么是VPS - 先搞懂概念',
    icon: "Server",
    description: '零基础入门，先理解VPS是什么、能做什么',
    content: {
      analogy: 'VPS就像租公寓。整栋楼（物理服务器）被分成很多小公寓（VPS），每个公寓有自己的门牌号（IP地址）、水电表（资源配额）。你租下其中一间，可以按自己喜好装修（装软件）、邀请朋友（部署网站），但不用买整栋楼。',
      explanation: 'VPS（Virtual Private Server，虚拟专用服务器）是通过虚拟化技术将一台物理服务器分割成多个独立的虚拟服务器。每个VPS拥有独立的操作系统、IP地址、磁盘空间和计算资源，可以像独立服务器一样使用，但成本远低于购买物理服务器。',
      terms: [
        { name: 'VPS', fullName: 'Virtual Private Server', meaning: '虚拟专用服务器，将一台物理服务器虚拟化成多台独立服务器' },
        { name: '虚拟化', fullName: 'Virtualization', meaning: '用软件模拟硬件，让一台电脑变成多台' },
        { name: '物理服务器', fullName: 'Physical Server', meaning: '真实的电脑主机，放在机房里' },
        { name: 'IP地址', fullName: 'Internet Protocol Address', meaning: '服务器在网络上的门牌号，用于定位' }
      ],
      tools: [
        { name: '云服务商控制台', description: '购买和管理VPS的网页界面', usage: '创建、重启、重装系统、查看监控' },
        { name: 'VNC远程桌面', description: '网页版的远程控制', usage: '当SSH连不上时救急用' }
      ],
      commands: [],
      commonMistakes: [
        { error: '以为VPS和虚拟主机一样', cause: '虚拟主机是共享环境，VPS是独立环境', solution: 'VPS有root权限，可以装任何软件' },
        { error: '不知道VPS需要维护', cause: '以为买了就能一直用', solution: '需要定期更新系统、监控资源、备份数据' }
      ],
      bestPractices: ['先理解概念再买，避免浪费钱', '从最低配置开始，不够再升级', '选择有快照功能的服务商，方便回滚']
    }
  }
