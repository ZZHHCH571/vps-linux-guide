import type { Lesson } from '../types';

export const crontab: Lesson = {
    id: 'crontab',
    title: 'Crontab定时任务 - 自动执行脚本',
    icon: "Clock",
    description: '设置定时任务，让服务器自动执行重复工作',
    content: {
      analogy: 'Crontab就像手机的闹钟：你设定时间（比如每天早上7点），它就会自动执行任务（比如备份数据库）。不用每天手动操作。',
      explanation: 'Crontab是Linux的定时任务管理器，可以让你在指定时间自动执行命令或脚本。非常适合：\n- 每天凌晨备份数据库\n- 每小时清理临时文件\n- 每周生成报告\n- 定期更新SSL证书\n\nCron表达式格式：分 时 日 月 星期 命令\n例如：0 2 * * * /backup.sh 表示每天凌晨2点执行备份脚本\n\n特殊符号：\n* = 每个（每分钟/每小时/每天...）\n*/2 = 每隔2个\n1-5 = 范围（周一到周五）\n, = 列举（1,3,5 = 周一三五）',
      terms: [
        { name: 'Cron', fullName: 'Chronicle', meaning: '定时任务守护进程，每分钟检查是否有任务要执行' },
        { name: 'Crontab', fullName: 'Cron Table', meaning: '存储定时任务的表格文件' },
        { name: 'Cron表达式', fullName: 'Cron Expression', meaning: '定义任务执行时间的格式：分 时 日 月 星期' },
        { name: 'systemd timer', fullName: 'Systemd定时器', meaning: 'systemd提供的现代定时任务替代方案' }
      ],
      tools: [
        { name: 'crontab', description: '管理定时任务', usage: 'crontab -e编辑任务' },
        { name: 'systemctl', description: '管理cron服务', usage: 'systemctl status cron' },
        { name: 'journalctl', description: '查看cron日志', usage: 'journalctl -u cron' }
      ],
      commands: [
        {
          description: '编辑定时任务',
          command: 'crontab -e',
          output: '',
          explanation: '这是什么：打开当前用户的crontab文件进行编辑。\n为什么要用：添加、修改或删除定时任务。\n用了会怎么样：用默认编辑器（通常是nano）打开crontab文件。\n添加任务示例：\n# 每天凌晨2点备份数据库\n0 2 * * * /usr/local/bin/backup.sh\n# 每小时清理临时文件\n0 * * * * /usr/local/bin/cleanup.sh\n# 每5分钟检查一次服务\n*/5 * * * * /usr/local/bin/check-service.sh',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '打开crontab编辑器',
            outputExplanation: '无输出，直接进入编辑器界面'
          }
        },
        {
          description: '查看当前定时任务',
          command: 'crontab -l',
          output: '0 2 * * * /usr/local/bin/backup.sh\n0 * * * * /usr/local/bin/cleanup.sh',
          explanation: '这是什么：列出当前用户的所有定时任务。\n为什么要用：确认任务是否正确配置，排查定时任务问题。\n用了会怎么样：显示所有已配置的定时任务。\n输出含义：每行是一个任务，格式为：分 时 日 月 星期 命令。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示所有已配置的定时任务',
            outputExplanation: '每行一个任务，前面是时间表达式，后面是命令'
          }
        },
        {
          description: '查看cron服务状态',
          command: 'systemctl status cron',
          output: '● cron.service - Regular background program processing daemon\n   Active: active (running) since Mon 2024-01-01 00:00:00 UTC',
          explanation: '这是什么：检查cron守护进程是否正在运行。\n为什么要用：确认定时任务服务是否正常，任务不执行时排查问题。\n用了会怎么样：显示cron服务的运行状态。\n输出含义：active (running)表示服务正常运行，inactive表示未启动。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示cron服务的运行状态',
            outputExplanation: 'Active行显示服务状态，active表示正常运行'
          }
        }
      ],
      commonMistakes: [
        { error: '任务没有按时执行', cause: 'cron服务未启动或表达式错误', solution: '用systemctl status cron检查服务，用crontab -l检查表达式' },
        { error: '脚本手动执行成功但cron失败', cause: '环境变量不同或路径问题', solution: '脚本中使用绝对路径，或在crontab顶部设置PATH' },
        { error: '收到大量邮件通知', cause: 'cron默认将输出发邮件', solution: '在任务末尾加 > /dev/null 2>&1 丢弃输出' }
      ],
      bestPractices: ['使用绝对路径执行命令', '在脚本开头设置PATH环境变量', '定期用crontab -l检查任务', '重要任务添加日志记录', '测试时先用*/1每分钟执行验证']
    }
  }
