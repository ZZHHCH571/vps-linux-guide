import type { Lesson } from '../types';

export const database: Lesson = {
    id: 'database',
    title: '数据库 - MySQL/PostgreSQL',
    icon: "Database",
    description: '安装数据库、基础操作和备份策略',
    content: {
      analogy: '数据库就像图书馆。MySQL是大型公共图书馆，有严格的分类系统（表结构），图书管理员（SQL语句）帮你找书。备份就是复印所有图书存到另一个地方，防止火灾烧掉原书。',
      explanation: '数据库用于结构化存储数据。MySQL是最流行的开源关系型数据库，使用SQL语言操作。生产环境需定期备份，可使用mysqldump导出数据。',
      terms: [
        { name: 'MySQL', fullName: '', meaning: '流行的开源关系型数据库管理系统' },
        { name: 'SQL', fullName: 'Structured Query Language', meaning: '结构化查询语言，操作数据库的语言' },
        { name: '表', fullName: 'Table', meaning: '数据库中存储数据的二维表格' },
        { name: 'mysqldump', fullName: '', meaning: 'MySQL数据库备份工具' }
      ],
      tools: [
        { name: 'mysql', description: 'MySQL客户端', usage: '命令行操作数据库' },
        { name: 'mysqldump', description: '备份工具', usage: '导出数据库到文件' }
      ],
      commands: [
        {
          description: '安装MySQL',
          command: 'sudo apt install mysql-server -y',
          output: 'Setting up mysql-server ...',
          explanation: '这是什么：安装MySQL数据库服务器。\n为什么要用：存储应用数据，如用户信息、文章内容等。\n用了会怎么样：MySQL被安装并启动。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '安装MySQL数据库',
            outputExplanation: 'Setting up表示正在配置'
          }
        },
        {
          description: '登录MySQL',
          command: 'sudo mysql -u root',
          output: 'Welcome to the MySQL monitor...',
          explanation: '这是什么：mysql是MySQL客户端，-u指定用户。\n为什么要用：进入数据库命令行进行操作。\n用了会怎么样：进入MySQL交互界面，可以执行SQL语句。',
          breakdown: {
            symbol: '$',
            meaning: '系统命令提示符',
            result: '以root用户登录MySQL',
            outputExplanation: 'Welcome表示成功进入MySQL命令行'
          }
        },
        {
          description: '备份数据库',
          command: 'mysqldump -u root myapp > backup.sql',
          output: '',
          explanation: '这是什么：mysqldump导出数据库，>重定向输出到文件。\n为什么要用：定期备份防止数据丢失。\n用了会怎么样：将myapp数据库的所有数据导出到backup.sql文件。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '导出数据库到SQL文件',
            outputExplanation: '>表示输出重定向，数据写入backup.sql'
          }
        }
      ],
      commonMistakes: [
        { error: 'Access denied for user', cause: '密码错误或权限不足', solution: '使用sudo登录或重置root密码' },
        { error: 'Can\'t connect to MySQL', cause: 'MySQL服务未启动', solution: 'sudo systemctl start mysql' },
        { error: '数据库被删除无法恢复', cause: '没有定期备份', solution: '设置定时任务自动备份：crontab -e' }
      ],
      bestPractices: ['生产环境不要用root账户', '定期执行备份并异地存储', '限制数据库远程访问', '监控数据库性能指标']
    }
  }
