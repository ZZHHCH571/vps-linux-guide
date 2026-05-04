import type { Lesson } from '../types';

export const backup: Lesson = {
    id: 'backup',
    title: '备份恢复 - 数据安全第一',
    icon: "HardDrive",
    description: '学会备份重要数据和灾难恢复',
    content: {
      analogy: '备份就像买保险。平时花钱买保险（占用存储空间），出事时获得赔偿（恢复数据）。快照是时间胶囊，可以回到过去的某个时刻。异地备份是把复印件存到朋友家，防止自己家着火。',
      explanation: '备份是防止数据丢失的关键措施。Linux常用tar打包备份，rsync增量同步，云服务商提供快照功能。重要数据要遵循3-2-1原则：3份副本、2种介质、1份异地。',
      terms: [
        { name: 'tar', fullName: 'Tape Archive', meaning: '打包压缩工具' },
        { name: 'rsync', fullName: 'Remote Sync', meaning: '远程同步工具，支持增量备份' },
        { name: '快照', fullName: 'Snapshot', meaning: '某一时刻的完整备份' },
        { name: 'crontab', fullName: 'Cron Table', meaning: '定时任务表' }
      ],
      tools: [
        { name: 'tar', description: '打包压缩', usage: 'tar -czvf backup.tar.gz /data' },
        { name: 'rsync', description: '增量同步', usage: 'rsync -avz local remote' },
        { name: 'crontab', description: '定时任务', usage: 'crontab -e编辑定时任务' }
      ],
      commands: [
        {
          description: '打包备份',
          command: 'tar -czvf backup.tar.gz /var/www',
          output: '/var/www/\n/var/www/index.html',
          explanation: '这是什么：tar打包压缩，-c创建，-z gzip压缩，-v显示过程，-f指定文件名。\n为什么要用：将多个文件打包成一个压缩包，方便备份和传输。\n用了会怎么样：创建backup.tar.gz文件，包含/var/www目录所有内容。\n输出含义：每行显示被打包的文件路径。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '创建压缩备份文件',
            outputExplanation: '每行显示正在打包的文件路径'
          }
        },
        {
          description: '解压恢复',
          command: 'tar -xzvf backup.tar.gz',
          output: '',
          explanation: '这是什么：tar解压，-x解压，-z gzip格式，-v显示，-f文件。\n为什么要用：从备份恢复文件。\n用了会怎么样：将压缩包内容解压到当前目录。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '解压备份文件到当前目录',
            outputExplanation: '无输出或显示解压的文件列表'
          }
        }
      ],
      commonMistakes: [
        { error: '备份文件太大', cause: '备份了不需要的文件', solution: '用--exclude排除日志和缓存' },
        { error: '备份失败没发现', cause: '没有检查备份结果', solution: '定期检查备份日志和文件' },
        { error: '恢复时发现备份损坏', cause: '没有验证备份完整性', solution: '定期测试恢复流程' }
      ],
      bestPractices: ['遵循3-2-1备份原则', '定期测试恢复流程', '备份前清理无用文件', '设置备份完成通知']
    }
  }
