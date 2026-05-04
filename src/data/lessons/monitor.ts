import type { Lesson } from '../types';

export const monitor: Lesson = {
    id: 'monitor',
    title: '监控日志 - 系统运维',
    icon: "Activity",
    description: '系统监控、日志查看和性能分析',
    content: {
      analogy: '监控就像汽车的仪表盘。CPU使用率是转速表，内存是油量表，磁盘空间是里程表。日志是行车记录仪，记录发生了什么。性能分析就像体检报告，告诉你哪里不健康。',
      explanation: '系统监控帮助了解服务器运行状态。常用命令：top/htop看进程，df看磁盘，free看内存。日志在/var/log目录，auth.log记录登录，nginx/access.log记录网站访问。',
      terms: [
        { name: 'htop/top', fullName: '', meaning: '交互式进程查看器，显示系统资源使用' },
        { name: 'df', fullName: 'Disk Free', meaning: '查看磁盘空间使用情况的命令' },
        { name: '日志', fullName: 'Log', meaning: '系统或应用运行记录的文件' },
        { name: 'logrotate', fullName: '', meaning: '日志轮转工具，自动清理旧日志' }
      ],
      tools: [
        { name: 'htop', description: '交互式进程查看器', usage: '彩色显示进程和资源使用' },
        { name: 'tail', description: '查看文件末尾', usage: 'tail -f实时查看日志' }
      ],
      commands: [
        {
          description: '查看磁盘使用',
          command: 'df -h',
          output: '/dev/sda1  20G  8G  12G  40% /\nhelper-fs   1.0G  0  1.0G   0% /dev',
          explanation: '这是什么：df显示磁盘空间，-h用人类可读格式。\n为什么要用：检查磁盘是否快满了，防止服务因磁盘满而崩溃。\n用了会怎么样：显示每个挂载点的总容量、已用、剩余、使用百分比。\n输出含义：/dev/sda1是主硬盘，20G总量，已用8G，剩12G，使用率40%。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示磁盘空间使用情况',
            outputExplanation: 'Filesystem=设备，Size=总量，Used=已用，Avail=可用，Use%=使用率，Mounted on=挂载点'
          }
        },
        {
          description: '查看登录日志',
          command: 'sudo tail -f /var/log/auth.log',
          output: 'sshd[1234]: Accepted password for root from 192.168.1.1',
          explanation: '这是什么：tail -f实时跟踪文件新增内容，auth.log记录认证信息。\n为什么要用：监控谁在登录服务器，发现异常登录。\n用了会怎么样：持续显示新的日志条目，按Ctrl+C停止。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '实时显示认证日志',
            outputExplanation: 'Accepted=登录成功，Failed=登录失败'
          }
        }
      ],
      commonMistakes: [
        { error: '磁盘满了服务崩溃', cause: '日志文件过大未清理', solution: '配置logrotate自动轮转日志，定期清理' },
        { error: '内存不足进程被杀', cause: '没有监控内存使用', solution: '设置内存告警，及时扩容或优化' },
        { error: '找不到错误原因', cause: '没有查看对应日志', solution: '根据服务名找对应日志文件' }
      ],
      bestPractices: ['安装netdata或Prometheus监控', '配置日志自动轮转', '设置磁盘/内存告警阈值', '定期审查安全日志']
    }
  }
