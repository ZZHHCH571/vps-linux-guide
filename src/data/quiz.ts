import type { QuizQuestion } from '../data/types';

export const quizQuestions: Record<string, QuizQuestion[]> = {
  'what-is-vps': [
    {
      question: 'VPS 的全称是什么？',
      options: ['Virtual Private Server', 'Virtual Public System', 'Very Private Service', 'Visual Processing Server'],
      correctIndex: 0,
    },
    {
      question: 'VPS 和虚拟主机最大的区别是？',
      options: ['VPS 有 root 权限，可以装任何软件', 'VPS 更便宜', 'VPS 只能用 Windows', 'VPS 不需要维护'],
      correctIndex: 0,
    },
  ],
  'vps-buy-guide': [
    {
      question: '搭建个人博客，推荐什么配置？',
      options: ['1核2G，3-5Mbps 带宽', '8核16G，100Mbps 带宽', '16核32G，不限流量', '1核512M，512Kbps'],
      correctIndex: 0,
    },
    {
      question: '选择 VPS 机房时应该考虑什么？',
      options: ['离用户越近越好', '越便宜越好', '必须在国外', '必须在国内'],
      correctIndex: 0,
    },
  ],
  'linux-basics': [
    {
      question: '查看当前所在目录的命令是？',
      options: ['pwd', 'ls', 'cd', 'cat'],
      correctIndex: 0,
    },
    {
      question: '列出当前目录文件的命令是？',
      options: ['ls', 'pwd', 'cd', 'mkdir'],
      correctIndex: 0,
    },
    {
      question: '切换目录的命令是？',
      options: ['cd', 'ls', 'pwd', 'cat'],
      correctIndex: 0,
    },
  ],
  'vps-select': [
    {
      question: '新手推荐选择哪个 Linux 发行版？',
      options: ['Ubuntu LTS', 'Arch Linux', 'Gentoo', 'Slackware'],
      correctIndex: 0,
    },
    {
      question: '查看系统版本信息的命令是？',
      options: ['cat /etc/os-release', 'ls /etc', 'pwd', 'cd /etc'],
      correctIndex: 0,
    },
  ],
  'ssh-basic': [
    {
      question: 'SSH 的默认端口是？',
      options: ['22', '80', '443', '3306'],
      correctIndex: 0,
    },
    {
      question: 'SSH 连接服务器的命令是？',
      options: ['ssh root@ip', 'ftp root@ip', 'http root@ip', 'telnet root@ip'],
      correctIndex: 0,
    },
  ],
  port: [
    {
      question: 'HTTP 的默认端口是？',
      options: ['80', '22', '443', '3306'],
      correctIndex: 0,
    },
    {
      question: 'HTTPS 的默认端口是？',
      options: ['443', '80', '22', '8080'],
      correctIndex: 1,
    },
  ],
  firewall: [
    {
      question: 'Ubuntu 上最常用的防火墙管理工具是？',
      options: ['ufw', 'iptables', 'firewalld', 'nftables'],
      correctIndex: 0,
    },
    {
      question: '查看防火墙状态的命令是？',
      options: ['sudo ufw status', 'sudo ufw list', 'sudo ufw show', 'sudo ufw check'],
      correctIndex: 0,
    },
  ],
  ssh: [
    {
      question: 'SSH 密钥认证比密码认证更安全，因为？',
      options: ['密钥长度远大于密码，暴力破解几乎不可能', '密钥更容易记住', '密钥不需要保管', '密钥可以分享'],
      correctIndex: 0,
    },
    {
      question: '生成 SSH 密钥的命令是？',
      options: ['ssh-keygen', 'ssh-genkey', 'ssh-create', 'ssh-make'],
      correctIndex: 0,
    },
  ],
  root: [
    {
      question: '为什么不应该直接使用 root 用户？',
      options: ['误操作可能破坏整个系统', 'root 用户速度慢', 'root 用户没有权限', 'root 用户不能远程登录'],
      correctIndex: 0,
    },
    {
      question: '以管理员权限运行命令的前缀是？',
      options: ['sudo', 'admin', 'root', 'su'],
      correctIndex: 0,
    },
  ],
  security: [
    {
      question: '服务器安全加固的第一步通常是？',
      options: ['修改 SSH 默认端口', '关闭服务器', '删除所有文件', '公开所有端口'],
      correctIndex: 0,
    },
    {
      question: '自动封禁暴力破解 IP 的工具是？',
      options: ['fail2ban', 'nginx', 'mysql', 'htop'],
      correctIndex: 0,
    },
  ],
  dns: [
    {
      question: 'DNS 的作用是？',
      options: ['将域名解析为 IP 地址', '加密网络通信', '存储文件', '管理用户'],
      correctIndex: 0,
    },
    {
      question: 'A 记录的作用是？',
      options: ['将域名指向 IPv4 地址', '将域名指向 IPv6 地址', '设置邮件服务器', '设置别名'],
      correctIndex: 0,
    },
  ],
  'http-https': [
    {
      question: 'HTTPS 相比 HTTP 多了什么？',
      options: ['SSL/TLS 加密', '更快的速度', '更小的文件', '免费域名'],
      correctIndex: 0,
    },
    {
      question: 'HTTP 状态码 200 表示？',
      options: ['请求成功', '页面未找到', '服务器错误', '需要认证'],
      correctIndex: 0,
    },
  ],
  'domain-binding': [
    {
      question: '绑定域名到服务器需要配置什么记录？',
      options: ['A 记录指向服务器 IP', 'TXT 记录', 'MX 记录', 'CNAME 记录'],
      correctIndex: 0,
    },
  ],
  packages: [
    {
      question: 'Ubuntu 的包管理器是？',
      options: ['apt', 'yum', 'pacman', 'brew'],
      correctIndex: 0,
    },
    {
      question: '更新软件包列表的命令是？',
      options: ['sudo apt update', 'sudo apt install', 'sudo apt remove', 'sudo apt search'],
      correctIndex: 0,
    },
  ],
  webserver: [
    {
      question: '最常用的 Web 服务器软件是？',
      options: ['Nginx 和 Apache', 'MySQL 和 PostgreSQL', 'Docker 和 Kubernetes', 'Git 和 SVN'],
      correctIndex: 0,
    },
    {
      question: 'Nginx 默认的网站文件存放目录是？',
      options: ['/var/www/html', '/home/user', '/etc/nginx', '/tmp'],
      correctIndex: 0,
    },
  ],
  database: [
    {
      question: '最流行的开源关系型数据库是？',
      options: ['MySQL / MariaDB', 'MongoDB', 'Redis', 'Elasticsearch'],
      correctIndex: 0,
    },
  ],
  monitor: [
    {
      question: '查看系统资源使用情况的命令是？',
      options: ['htop', 'ls', 'pwd', 'cat'],
      correctIndex: 0,
    },
    {
      question: '查看磁盘使用情况的命令是？',
      options: ['df -h', 'free -h', 'ps aux', 'netstat'],
      correctIndex: 0,
    },
  ],
  'vim-nano': [
    {
      question: 'Vim 中保存并退出的命令是？',
      options: [':wq', ':q!', ':e', ':s'],
      correctIndex: 0,
    },
    {
      question: 'Nano 编辑器保存文件的快捷键是？',
      options: ['Ctrl+O', 'Ctrl+X', 'Ctrl+S', 'Ctrl+W'],
      correctIndex: 0,
    },
  ],
  crontab: [
    {
      question: 'Crontab 的作用是？',
      options: ['定时执行任务', '编辑文件', '管理用户', '查看日志'],
      correctIndex: 0,
    },
    {
      question: '编辑当前用户 crontab 的命令是？',
      options: ['crontab -e', 'crontab -l', 'crontab -r', 'crontab -d'],
      correctIndex: 0,
    },
  ],
  systemd: [
    {
      question: 'systemd 的作用是？',
      options: ['管理系统服务和启动流程', '编辑文本文件', '管理数据库', '压缩文件'],
      correctIndex: 0,
    },
    {
      question: '查看服务状态的命令是？',
      options: ['systemctl status <service>', 'service check <service>', 'systemd status <service>', 'init status <service>'],
      correctIndex: 0,
    },
  ],
  'file-permissions': [
    {
      question: 'Linux 文件权限中，chmod 755 表示？',
      options: ['所有者可读写执行，组和其他可读可执行', '所有人可读写执行', '只有所有者可读写执行', '所有人都可读'],
      correctIndex: 0,
    },
  ],
  'process-management': [
    {
      question: '查看正在运行的进程的命令是？',
      options: ['ps aux', 'ls -la', 'df -h', 'netstat -tuln'],
      correctIndex: 0,
    },
    {
      question: '强制终止进程的信号是？',
      options: ['SIGKILL (9)', 'SIGTERM (15)', 'SIGHUP (1)', 'SIGINT (2)'],
      correctIndex: 0,
    },
  ],
  backup: [
    {
      question: '最常用的文件同步备份工具是？',
      options: ['rsync', 'ftp', 'scp', 'wget'],
      correctIndex: 0,
    },
  ],
  'network-troubleshoot': [
    {
      question: '测试网络连通性的命令是？',
      options: ['ping', 'ls', 'cd', 'cat'],
      correctIndex: 0,
    },
    {
      question: '追踪数据包路径的命令是？',
      options: ['traceroute', 'ping', 'ssh', 'curl'],
      correctIndex: 0,
    },
  ],
  'disk-space': [
    {
      question: '查看磁盘使用情况的命令是？',
      options: ['df -h', 'free -h', 'ps aux', 'top'],
      correctIndex: 0,
    },
    {
      question: '查找大文件的命令是？',
      options: ['du -sh * | sort -h', 'ls -l', 'df -h', 'cat'],
      correctIndex: 0,
    },
  ],
  'cpu-memory': [
    {
      question: '查看内存使用情况的命令是？',
      options: ['free -h', 'df -h', 'du -sh', 'ls -la'],
      correctIndex: 0,
    },
    {
      question: '实时查看 CPU 和内存使用的命令是？',
      options: ['htop 或 top', 'ls', 'df', 'cat'],
      correctIndex: 0,
    },
  ],
};
