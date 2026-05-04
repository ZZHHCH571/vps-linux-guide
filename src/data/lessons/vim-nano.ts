import type { Lesson } from '../types';

export const vim_nano: Lesson = {
    id: 'vim-nano',
    title: 'Vim/Nano编辑器 - 在服务器上改文件',
    icon: "Edit",
    description: '掌握命令行文本编辑器，远程修改配置文件',
    content: {
      analogy: 'Vim/Nano就像服务器上的记事本：Nano是简单版，像Windows记事本，容易上手；Vim是专业版，功能强大但需要学习快捷键。',
      explanation: '在Linux服务器上，你没有图形界面的记事本，必须使用命令行文本编辑器。最常用的两个是：\n\n**Nano**：简单易用，底部显示快捷键提示，适合新手。\n- 编辑：直接打字\n- 保存：Ctrl+O，回车确认\n- 退出：Ctrl+X\n\n**Vim**：功能强大，有三种模式（普通模式、插入模式、命令模式），适合熟练用户。\n- 进入编辑：按i键\n- 退出编辑：按Esc键\n- 保存退出：输入:wq回车\n- 不保存退出：输入:q!回车\n\n建议：新手先用Nano，熟悉后再学Vim。',
      terms: [
        { name: 'Nano', fullName: 'Nano Text Editor', meaning: '简单的命令行文本编辑器，适合新手' },
        { name: 'Vim', fullName: 'Vi Improved', meaning: '强大的命令行文本编辑器，支持多种模式' },
        { name: '插入模式', fullName: 'Insert Mode', meaning: 'Vim中可以输入文字的模式，按i进入' },
        { name: '普通模式', fullName: 'Normal Mode', meaning: 'Vim的默认模式，用于导航和执行命令' },
        { name: '命令模式', fullName: 'Command Mode', meaning: 'Vim中输入冒号后进入，执行保存、退出等命令' }
      ],
      tools: [
        { name: 'nano', description: '简单文本编辑器', usage: 'nano filename' },
        { name: 'vim', description: '强大文本编辑器', usage: 'vim filename' },
        { name: 'cat', description: '查看文件内容', usage: 'cat filename' }
      ],
      commands: [
        {
          description: '用Nano编辑文件',
          command: 'nano /etc/nginx/nginx.conf',
          output: '',
          explanation: '这是什么：用Nano打开Nginx配置文件进行编辑。\n为什么要用：修改服务器配置、编辑脚本文件等。\n用了会怎么样：打开文件，底部显示快捷键提示，可以直接编辑。\n操作说明：\n- 移动光标：方向键\n- 保存：Ctrl+O，然后回车\n- 退出：Ctrl+X\n- 搜索：Ctrl+W',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '打开Nano编辑器编辑文件',
            outputExplanation: '无输出，直接进入编辑器界面，底部有快捷键提示'
          }
        },
        {
          description: '用Vim编辑文件',
          command: 'vim /etc/nginx/nginx.conf',
          output: '',
          explanation: '这是什么：用Vim打开文件进行编辑。\n为什么要用：Vim功能更强大，适合复杂编辑任务。\n用了会怎么样：打开文件，初始处于普通模式。\n操作步骤：\n1. 按i进入插入模式（左下角显示-- INSERT --）\n2. 编辑文件内容\n3. 按Esc退出插入模式\n4. 输入:wq保存并退出\n5. 输入:q!不保存退出',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '打开Vim编辑器',
            outputExplanation: '无输出，进入Vim界面，左下角显示文件名和模式'
          }
        },
        {
          description: '查看文件内容',
          command: 'cat /etc/nginx/nginx.conf',
          output: 'user www-data;\nworker_processes auto;\npid /run/nginx.pid;',
          explanation: '这是什么：cat命令显示文件全部内容。\n为什么要用：快速查看文件内容，不需要编辑时。\n用了会怎么样：在终端显示文件所有行。\n输出含义：每行都是文件的实际内容。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '在终端显示文件全部内容',
            outputExplanation: '每一行都是文件的实际内容'
          }
        }
      ],
      commonMistakes: [
        { error: 'Vim卡住退不出去', cause: '不知道如何退出Vim', solution: '按Esc，然后输入:q!回车强制退出' },
        { error: '编辑后忘记保存', cause: '直接关闭编辑器', solution: 'Nano用Ctrl+O保存，Vim用:wq保存' },
        { error: '权限不足无法保存', cause: '没有用sudo打开文件', solution: '用sudo nano或sudo vim打开文件' }
      ],
      bestPractices: ['编辑前先备份原文件', '不熟悉Vim时先用Nano', '编辑配置文件前先用cat查看', '保存后用cat再次确认修改']
    }
  }
