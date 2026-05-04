import type { Lesson } from '../types';

export const file_permissions: Lesson = {
    id: 'file-permissions',
    title: '文件权限 - 谁可以做什么',
    icon: "FileText",
    description: '理解Linux文件权限，学会chmod和chown',
    content: {
      analogy: '文件权限就像房间的门禁系统。读权限（r）是只能看不能摸，写权限（w）是可以修改，执行权限（x）是可以进入。owner是房主，group是家庭成员，others是陌生人。',
      explanation: 'Linux每个文件都有权限设置，分为读（r=4）、写（w=2）、执行（x=1）三种。权限针对三类用户：owner（文件所有者）、group（所属组）、others（其他人）。',
      terms: [
        { name: 'chmod', fullName: 'Change Mode', meaning: '修改文件权限的命令' },
        { name: 'chown', fullName: 'Change Owner', meaning: '修改文件所有者的命令' },
        { name: 'rwx', fullName: 'Read Write Execute', meaning: '读、写、执行三种权限' },
        { name: '755/644', fullName: '', meaning: '数字表示的权限，r=4,w=2,x=1' }
      ],
      tools: [
        { name: 'chmod', description: '修改权限', usage: 'chmod 755 file' },
        { name: 'chown', description: '修改所有者', usage: 'chown user:group file' }
      ],
      commands: [
        {
          description: '查看文件权限',
          command: 'ls -la',
          output: '-rw-r--r-- 1 user group 123 Jan 1 12:00 file.txt',
          explanation: '这是什么：ls -la显示文件详细信息，包括权限。\n为什么要用：查看文件的权限设置。\n用了会怎么样：显示权限字符串。\n输出含义：-rw-r--r--：第一个-表示普通文件，rw-表示所有者可读写，r--表示组成员可读，r--表示其他人可读。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示文件详细信息和权限',
            outputExplanation: '第1位=类型(d目录/-文件)，2-4位=所有者权限，5-7位=组权限，8-10位=其他人权限'
          }
        },
        {
          description: '修改文件权限',
          command: 'chmod 755 script.sh',
          output: '',
          explanation: '这是什么：chmod修改权限，755是数字表示法。\n为什么要用：让脚本可执行，或限制文件访问。\n用了会怎么样：所有者rwx(7)，组r-x(5)，其他人r-x(5)。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '设置文件权限为755',
            outputExplanation: '7=rwx(读写执行), 5=r-x(读执行), 4=r--(只读)'
          }
        }
      ],
      commonMistakes: [
        { error: 'Permission denied', cause: '当前用户没有执行权限', solution: 'chmod +x file添加执行权限' },
        { error: '403 Forbidden', cause: 'Web服务器用户没有权限', solution: 'chown www-data:www-data修改所有者' },
        { error: 'chmod 777太危险', cause: '给所有人所有权限', solution: '最小权限原则，只给必要的权限' }
      ],
      bestPractices: ['使用最小权限原则', 'Web文件用755/644', '敏感文件用600', '定期审计权限设置']
    }
  }
