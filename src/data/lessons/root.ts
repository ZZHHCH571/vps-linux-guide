import type { Lesson } from '../types';

export const root: Lesson = {
    id: 'root',
    title: 'root权限 - 超级管理员',
    icon: "Terminal",
    description: '理解root用户和普通用户，学会安全地使用管理员权限',
    content: {
      analogy: 'root就像酒店的万能钥匙，能打开所有房间。普通用户只有自己的房卡。平时用普通用户操作（安全），需要修水管时才拿出万能钥匙（sudo）。',
      explanation: 'root是Linux的超级用户，拥有系统最高权限。日常使用普通账户，需要特权时通过sudo临时获取。这样可以防止误操作，也便于审计和权限管理。',
      terms: [
        { name: 'root', fullName: '', meaning: 'Linux系统的超级管理员账户，拥有最高权限' },
        { name: 'sudo', fullName: 'Superuser Do', meaning: '以超级用户身份执行命令' },
        { name: 'su', fullName: 'Switch User', meaning: '切换用户，su - 切换到root' },
        { name: 'wheel/sudo组', fullName: '', meaning: '拥有sudo权限的用户组' }
      ],
      tools: [
        { name: 'sudo', description: '临时获取root权限', usage: 'sudo 命令' },
        { name: 'su', description: '切换用户', usage: 'su - 切换到root' }
      ],
      commands: [
        {
          description: '切换到root用户',
          command: 'sudo -i',
          output: 'root@server:~#',
          explanation: '这是什么：sudo -i以root身份登录，获得完整的root环境。\n为什么要用：需要连续执行多个管理员命令时。\n用了会怎么样：提示符从$变成#，表示现在是root用户。\n注意：#是root的命令提示符，$是普通用户的。',
          breakdown: {
            symbol: '$/#',
            meaning: '$=普通用户提示符，#=root提示符',
            result: '切换到root用户身份',
            outputExplanation: '#表示当前是root用户'
          }
        },
        {
          description: '以root执行单条命令',
          command: 'sudo apt update',
          output: 'Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease...',
          explanation: '这是什么：sudo后面跟命令，只在这条命令使用root权限。\n为什么要用：安装软件、修改系统配置等需要管理员权限的操作。\n用了会怎么样：以root身份执行apt update，更新软件源列表。',
          breakdown: {
            symbol: '$',
            meaning: '普通用户提示符，sudo临时提权',
            result: '以root权限执行apt update',
            outputExplanation: 'Hit表示成功获取软件源信息'
          }
        },
        {
          description: '查看当前用户',
          command: 'whoami',
          output: 'root',
          explanation: '这是什么：whoami显示当前登录的用户名。\n为什么要用：确认自己当前是什么身份。\n用了会怎么样：显示当前用户名。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示当前用户名',
            outputExplanation: 'root表示当前是超级管理员'
          }
        }
      ],
      commonMistakes: [
        { error: 'sudo: command not found', cause: '用户不在sudo组', expectedResult: '终端显示 sudo: command not found 或 user is not in the sudoers file', solution: '切换到root后执行：usermod -aG sudo username，然后重新登录', recoveryMethod: '1. 切换到root：su -\n2. 添加用户到sudo组：usermod -aG sudo 你的用户名\n3. 退出root：exit\n4. 重新登录使sudo权限生效\n5. 验证：sudo whoami 应该显示 root' },
        { error: 'Permission denied', cause: '普通用户尝试执行特权命令', expectedResult: '终端显示 Permission denied，命令拒绝执行', solution: '命令前加sudo，或以root身份执行', recoveryMethod: '1. 普通操作不加sudo\n2. 系统管理操作用 sudo 命令\n3. 需要连续管理员操作时用 sudo -i 切换到root\n4. 完成后用 exit 退出root' },
        { error: 'rm -rf / 误删系统', cause: '在root下执行危险命令', expectedResult: '系统文件被删除，命令无法执行，系统逐渐崩溃，最终无法启动', solution: '永远不要以root身份执行删除命令，使用前再三确认路径', recoveryMethod: '误删后几乎无法恢复：\n1. 立即停止一切操作防止数据覆盖\n2. 如果有快照，回滚快照\n3. 如果没有备份，只能重装系统\n4. 预防：平时用普通用户，重要目录设置只读权限' }
      ],
      bestPractices: ['禁止root直接SSH登录', '日常使用普通用户', 'sudo命令执行前仔细确认', '定期审计sudo日志']
    }
  }
