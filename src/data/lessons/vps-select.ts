import type { Lesson } from '../types';

export const vps_select: Lesson = {
    id: 'vps-select',
    title: '购买VPS - 选择你的第一台服务器',
    icon: "Cloud",
    description: '了解VPS服务商、配置选择和操作系统',
    content: {
      analogy: '买VPS就像租房子。云服务商是房产中介（阿里云、腾讯云、AWS），配置是房型（CPU=卧室数，内存=客厅大小，带宽=门口马路宽度），系统选择是装修风格（Ubuntu像现代简约，CentOS像传统中式）。',
      explanation: 'VPS（Virtual Private Server，虚拟专用服务器）是将物理服务器分割成多个虚拟服务器。选择时需考虑：CPU核心数、内存大小、存储类型（SSD/HDD）、带宽流量、机房位置（影响访问速度）。',
      terms: [
        { name: 'CPU', fullName: 'Central Processing Unit', meaning: '中央处理器，服务器的"大脑"，负责执行计算任务' },
        { name: '内存', fullName: 'RAM / Memory', meaning: '临时存储空间，运行程序时用的' },
        { name: 'SSD', fullName: 'Solid State Drive', meaning: '固态硬盘，比传统硬盘更快更稳定' },
        { name: '带宽', fullName: 'Bandwidth', meaning: '网络传输速度，像马路的宽度' },
        { name: 'LTS', fullName: 'Long Term Support', meaning: '长期支持版本，提供5年安全更新' }
      ],
      tools: [
        { name: '云服务商控制台', description: '购买VPS的网页后台', usage: '创建实例、选择配置、查看IP' },
        { name: '测速工具', description: '测试机房网络速度', usage: 'ping、speedtest-cli' }
      ],
      commands: [
        {
          description: '查看系统版本',
          command: 'cat /etc/os-release',
          output: 'NAME="Ubuntu"\nVERSION="22.04.3 LTS"',
          explanation: '这是什么：cat显示文件内容，/etc/os-release是存储系统信息的文件。\n为什么要用：确认当前运行的是什么操作系统和版本。\n用了会怎么样：显示操作系统的名称、版本号等信息。\n输出含义：NAME="Ubuntu"表示系统是Ubuntu，VERSION="22.04.3 LTS"表示版本是22.04.3长期支持版。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示操作系统的详细信息',
            outputExplanation: 'NAME=系统名称，VERSION=版本号，LTS=长期支持版'
          }
        },
        {
          description: '查看CPU核心数',
          command: 'nproc',
          output: '2',
          explanation: '这是什么：nproc是"number of processors"的缩写，显示CPU核心数。\n为什么要用：了解服务器有多少个处理核心，决定能同时跑多少任务。\n用了会怎么样：显示一个数字，代表CPU核心数量。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示CPU核心数量',
            outputExplanation: '数字2表示有2个CPU核心'
          }
        },
        {
          description: '查看内存大小',
          command: 'free -h',
          output: '              total        used        free\nMem:           2.0Gi       512Mi       1.5Gi',
          explanation: '这是什么：free显示内存使用情况，-h用人类可读格式（G、M）显示。\n为什么要用：看看还剩多少内存可用，防止内存不足。\n用了会怎么样：显示总内存、已用内存、空闲内存。\n输出含义：total=总内存2G，used=已用512M，free=剩余1.5G。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示内存使用统计',
            outputExplanation: 'total=总量，used=已用，free=空闲，Gi=Gibibyte（约等于GB）'
          }
        }
      ],
      commonMistakes: [
        { error: '买了Windows系统不会用', cause: 'Linux服务器更常用且免费', solution: '新手选Ubuntu 22.04 LTS，文档丰富社区活跃' },
        { error: '配置选太低跑不动', cause: '低估了应用资源需求', solution: '入门选2核2G起步，可后续升级' },
        { error: '机房选太远访问慢', cause: '物理距离影响延迟', solution: '选离用户近的机房，国内用户选国内节点' }
      ],
      bestPractices: ['新手从Ubuntu LTS开始', '选择有快照备份功能的服务商', '关注新用户优惠活动', '记录好root密码和IP地址']
    }
  }
