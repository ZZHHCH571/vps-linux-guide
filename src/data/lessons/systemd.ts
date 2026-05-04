import type { Lesson } from '../types';

export const systemd: Lesson = {
    id: 'systemd',
    title: 'Systemd服务管理 - 让程序开机自启',
    icon: "Settings",
    description: '管理系统服务，实现开机自启和自动重启',
    content: {
      analogy: 'Systemd就像大楼的物业管理员：你告诉他哪些服务需要24小时运行，他会确保这些服务开机自启、崩溃重启、随时待命。',
      explanation: 'Systemd是Linux的现代服务管理器，负责：\n1. 开机时自动启动服务（如Nginx、MySQL）\n2. 服务崩溃时自动重启\n3. 管理服务之间的依赖关系\n4. 查看服务日志和状态\n\n每个服务都有一个.service文件，定义了：\n- 如何启动服务（ExecStart）\n- 何时启动（After依赖）\n- 崩溃后如何处理（Restart策略）\n- 运行用户和组（User/Group）\n\n常用服务管理命令：\n- systemctl start 服务名：启动服务\n- systemctl stop 服务名：停止服务\n- systemctl restart 服务名：重启服务\n- systemctl enable 服务名：设置开机自启\n- systemctl status 服务名：查看状态',
      terms: [
        { name: 'Systemd', fullName: 'System Daemon', meaning: 'Linux系统和服务管理器' },
        { name: 'Service', fullName: '服务单元', meaning: 'systemd管理的一个后台程序' },
        { name: 'Enable', fullName: '启用服务', meaning: '设置服务开机自启' },
        { name: 'Daemon', fullName: '守护进程', meaning: '在后台持续运行的程序' },
        { name: 'Journal', fullName: '系统日志', meaning: 'systemd收集的系统和应用日志' }
      ],
      tools: [
        { name: 'systemctl', description: '管理服务', usage: 'systemctl status nginx' },
        { name: 'journalctl', description: '查看日志', usage: 'journalctl -u nginx -f' },
        { name: 'service', description: '旧版服务管理', usage: 'service nginx status' }
      ],
      commands: [
        {
          description: '查看服务状态',
          command: 'systemctl status nginx',
          output: '● nginx.service - A high performance web server\n   Active: active (running) since Mon 2024-01-01 00:00:00 UTC\n Main PID: 1234 (nginx)',
          explanation: '这是什么：查看Nginx服务的运行状态。\n为什么要用：确认服务是否正常运行，排查网站无法访问的问题。\n用了会怎么样：显示服务的详细信息，包括状态、PID、启动时间等。\n输出含义：active (running)表示正常运行，inactive表示未启动，failed表示启动失败。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示服务的详细运行状态',
            outputExplanation: 'Active行显示状态，Main PID是进程ID'
          }
        },
        {
          description: '设置服务开机自启',
          command: 'sudo systemctl enable nginx',
          output: 'Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /lib/systemd/system/nginx.service.',
          explanation: '这是什么：将服务设置为开机自动启动。\n为什么要用：确保服务器重启后服务自动运行，无需手动启动。\n用了会怎么样：创建符号链接，下次开机时自动启动该服务。\n输出含义：显示创建的符号链接路径，表示设置成功。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '设置服务开机自动启动',
            outputExplanation: '显示创建的符号链接，表示设置成功'
          }
        },
        {
          description: '实时查看服务日志',
          command: 'sudo journalctl -u nginx -f',
          output: '-- Logs begin at Mon 2024-01-01 00:00:00 UTC. --\nJan 01 12:00:00 server nginx[1234]: Started nginx',
          explanation: '这是什么：实时跟踪查看Nginx服务的日志输出。\n为什么要用：调试服务问题，查看错误信息，监控服务运行状况。\n用了会怎么样：显示历史日志并持续输出新日志，按Ctrl+C退出。\n输出含义：每行包含时间戳、主机名、进程名和日志内容。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '实时显示服务日志，按Ctrl+C退出',
            outputExplanation: '每行是日志记录，包含时间、进程和消息'
          }
        }
      ],
      commonMistakes: [
        { error: '服务重启后没有自启', cause: '忘记执行enable命令', solution: '运行sudo systemctl enable 服务名' },
        { error: '服务启动失败', cause: '配置文件错误或端口被占用', solution: '用journalctl -u 服务名查看错误日志' },
        { error: '修改配置后未生效', cause: '没有重启服务', solution: '运行sudo systemctl restart 服务名' }
      ],
      bestPractices: ['重要服务设置开机自启', '配置服务崩溃自动重启', '定期检查服务日志', '使用systemd管理自定义脚本', '关键服务配置监控告警']
    }
  }
