import { Stage } from './types';

export const stages: Stage[] = [
  {
    id: 'prepare',
    title: '购买前的认知准备',
    icon: "BookOpen",
    description: '零基础入门，理解概念再动手',
    lessons: ['what-is-vps', 'vps-buy-guide', 'linux-basics', 'vps-select']
  },
  {
    id: 'first-login',
    title: '首次登录的必做配置',
    icon: "Terminal",
    description: 'SSH连接、安全设置、基础命令',
    lessons: ['ssh-basic', 'port', 'firewall', 'ssh', 'root', 'security']
  },
  {
    id: 'network-basics',
    title: '网络基础篇',
    icon: "Network",
    description: 'DNS解析、HTTP协议、域名绑定',
    lessons: ['dns', 'http-https', 'domain-binding']
  },
  {
    id: 'daily',
    title: '日常运维与部署',
    icon: "Settings",
    description: '软件安装、Web服务、数据库、监控',
    lessons: ['packages', 'webserver', 'database', 'monitor']
  },
  {
    id: 'tools',
    title: '实用工具篇',
    icon: "Wrench",
    description: '文本编辑、定时任务、服务管理',
    lessons: ['vim-nano', 'crontab', 'systemd']
  },
  {
    id: 'advanced',
    title: '进阶技能',
    icon: "Zap",
    description: '权限管理、进程控制、备份策略',
    lessons: ['file-permissions', 'process-management', 'backup']
  },
  {
    id: 'troubleshooting',
    title: '故障排查篇',
    icon: "Search",
    description: '网络问题、磁盘空间、性能分析',
    lessons: ['network-troubleshoot', 'disk-space', 'cpu-memory']
  }
];
