import type { Lesson } from '../types';

export const process_management: Lesson = {
    id: 'process-management',
    title: '进程管理 - 控制运行中的程序',
    icon: "Cpu",
    description: '学会查看、启动、停止进程',
    content: {
      analogy: '进程就像正在运行的机器。有的机器一直在转（守护进程），有的用一次就停（普通进程）。你可以查看有多少机器在转（ps），可以关掉卡住的机器（kill），可以设置开机自动启动（systemctl）。',
      explanation: '进程是正在运行的程序实例。Linux使用systemd管理系统服务，可以启动、停止、重启服务。ps查看进程，kill终止进程，systemctl管理服务。',
      terms: [
        { name: 'PID', fullName: 'Process ID', meaning: '进程标识号，每个进程的唯一编号' },
        { name: 'systemd', fullName: '', meaning: 'Linux系统和服务管理器' },
        { name: '守护进程', fullName: 'Daemon', meaning: '后台运行的服务程序' },
        { name: 'systemctl', fullName: '', meaning: '控制systemd服务的命令' }
      ],
      tools: [
        { name: 'ps', description: '查看进程', usage: 'ps aux查看所有进程' },
        { name: 'kill', description: '终止进程', usage: 'kill PID结束进程' },
        { name: 'systemctl', description: '服务管理', usage: 'start/stop/restart/status' }
      ],
      commands: [
        {
          description: '查看所有进程',
          command: 'ps aux',
          output: 'USER PID %CPU %MEM COMMAND\nroot 1234 0.5 1.2 nginx: master process',
          explanation: '这是什么：ps显示进程，aux显示所有用户的所有进程。\n为什么要用：查看哪些程序在运行，占用多少资源。\n用了会怎么样：列出所有进程的详细信息。\n输出含义：USER=运行用户，PID=进程ID，%CPU=CPU使用率，%MEM=内存使用率，COMMAND=命令。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '列出所有运行中的进程',
            outputExplanation: 'USER=用户，PID=进程ID，%CPU/%MEM=资源占用，COMMAND=程序名'
          }
        },
        {
          description: '终止进程',
          command: 'kill 1234',
          output: '',
          explanation: '这是什么：kill发送终止信号给指定PID的进程。\n为什么要用：结束卡住或不需要的进程。\n用了会怎么样：进程收到信号后正常退出。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '向PID为1234的进程发送终止信号',
            outputExplanation: '无输出表示成功，进程已结束'
          }
        },
        {
          description: '启动服务',
          command: 'sudo systemctl start nginx',
          output: '',
          explanation: '这是什么：systemctl start启动指定服务。\n为什么要用：启动Web服务器、数据库等服务。\n用了会怎么样：Nginx服务开始运行。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '启动Nginx服务',
            outputExplanation: '无输出表示成功启动'
          }
        }
      ],
      commonMistakes: [
        { error: 'kill没反应', cause: '进程忽略终止信号', solution: '用kill -9强制终止' },
        { error: '服务启动失败', cause: '配置错误或端口被占', solution: '查看日志：journalctl -u nginx' },
        { error: '找不到进程', cause: '进程名输错或已结束', solution: '用ps aux确认PID' }
      ],
      bestPractices: ['先用kill，不行再用kill -9', '服务用systemctl管理', '定期查看进程资源占用', '设置服务自动重启']
    }
  }
