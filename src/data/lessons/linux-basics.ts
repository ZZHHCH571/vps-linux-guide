import type { Lesson } from '../types';

export const linux_basics: Lesson = {
    id: 'linux-basics',
    title: 'Linux基础 - 命令行入门',
    icon: "Terminal",
    description: '学会最基本的Linux命令，告别鼠标操作',
    content: {
      analogy: 'Linux命令行就像和机器人对话。你说"列出文件"（ls），它给你看文件列表；你说"进入房间"（cd），它就带你进去。不用鼠标点点点，直接说话更高效。',
      explanation: 'Linux是服务器最常用的操作系统。命令行（Terminal）是与Linux交互的主要方式。掌握基础命令是管理VPS的必备技能，包括文件操作、目录切换、查看内容等。',
      terms: [
        { name: 'Shell', fullName: '', meaning: '命令解释器，把你输入的命令翻译成电脑能懂的指令' },
        { name: 'Bash', fullName: 'Bourne Again Shell', meaning: '最常用的Shell类型，Ubuntu默认使用' },
        { name: '目录', fullName: 'Directory', meaning: '文件夹，Linux里叫目录' },
        { name: '根目录', fullName: 'Root Directory', meaning: '文件系统的起点，用/表示' }
      ],
      tools: [
        { name: 'Tab键', description: '自动补全命令和文件名', usage: '输入前几个字母按Tab，自动补全' },
        { name: '上下箭头', description: '查看历史命令', usage: '按上箭头显示上一条命令' },
        { name: 'Ctrl+C', description: '终止当前运行的命令', usage: '命令卡住或输错时按Ctrl+C退出' }
      ],
      commands: [
        {
          description: '查看当前位置',
          command: 'pwd',
          output: '/home/username',
          explanation: '这是什么：pwd是"Print Working Directory"的缩写，意思是"打印当前工作目录"。\n为什么要用：当你迷路时，用它看看自己在哪个文件夹。\n用了会怎么样：终端会显示你当前所在的完整路径。\n$符号意思：$是命令提示符，表示系统准备好接收你的命令了，你只需要输入$后面的内容。\n输出含义：/home/username表示你在username用户的家目录下，/是根目录，home是存放用户文件的文件夹。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符，表示等待输入',
            result: '显示当前所在目录的完整路径',
            outputExplanation: '/home/username：/是根目录（类似C盘），home是用户文件夹，username是你的用户名'
          }
        },
        {
          description: '列出文件',
          command: 'ls -la',
          output: 'drwxr-xr-x 2 user user 4096 Jan 1 12:00 Desktop\n-rw-r--r-- 1 user user  123 Jan 1 12:00 file.txt',
          explanation: '这是什么：ls是"list"的缩写，列出目录内容。-l显示详细信息，-a显示隐藏文件。\n为什么要用：看看当前目录下有哪些文件和文件夹。\n用了会怎么样：显示所有文件的名称、权限、大小、修改时间等信息。\n输出含义：第一行drwx...Desktop是一个文件夹（d开头），第二行-rw...file.txt是一个普通文件（-开头）。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '列出当前目录下的所有文件和文件夹',
            outputExplanation: 'd开头=文件夹，-开头=文件；rwx=读写执行权限；user=所有者；4096=文件大小字节；Jan 1=修改日期'
          }
        },
        {
          description: '切换目录',
          command: 'cd /var/www',
          output: '',
          explanation: '这是什么：cd是"Change Directory"的缩写，意思是"改变目录"。\n为什么要用：要进入某个文件夹操作里面的文件。\n用了会怎么样：当前工作目录变为/var/www，之后操作都针对这个目录。\n注意：cd后面没有输出是正常的，可以用pwd确认是否切换成功。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '进入/var/www目录，无输出表示成功',
            outputExplanation: 'cd命令成功时不显示任何内容，用pwd确认当前位置'
          }
        },
        {
          description: '返回上级目录',
          command: 'cd ..',
          output: '',
          explanation: '这是什么：..代表上级目录（父目录）。\n为什么要用：从当前目录退回到上一级。\n用了会怎么样：如果你在/var/www，执行后回到/var。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '返回上一级目录',
            outputExplanation: '..表示父目录，.表示当前目录，~表示家目录'
          }
        },
        {
          description: '查看文件内容',
          command: 'cat filename.txt',
          output: 'Hello World\nThis is a test file.',
          explanation: '这是什么：cat是"concatenate"的缩写，用于显示文件内容。\n为什么要用：快速查看文本文件的内容。\n用了会怎么样：文件内容直接打印在屏幕上。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '在屏幕上显示文件的全部内容',
            outputExplanation: '每一行都是文件中的实际内容，原样输出'
          }
        },
        {
          description: '创建文件夹',
          command: 'mkdir myfolder',
          output: '',
          explanation: '这是什么：mkdir是"Make Directory"的缩写，创建新目录。\n为什么要用：需要新建一个文件夹来组织文件。\n用了会怎么样：在当前目录下创建一个名为myfolder的空文件夹。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '创建名为myfolder的新文件夹',
            outputExplanation: '成功创建无输出，可用ls查看确认'
          }
        }
      ],
      commonMistakes: [
        { error: '命令找不到', cause: '命令输错或没安装', solution: '检查拼写，用which命令查看是否存在' },
        { error: 'Permission denied', cause: '没有权限执行', solution: '命令前加sudo，或检查文件权限' },
        { error: 'No such file or directory', cause: '文件或目录不存在', solution: '用ls查看当前目录内容，确认路径正确' }
      ],
      bestPractices: ['不确定时先用ls看看有什么', '重要操作前先pwd确认位置', '多用Tab补全，避免输错']
    }
  }
