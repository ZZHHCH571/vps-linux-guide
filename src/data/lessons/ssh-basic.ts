import type { Lesson } from '../types';

export const ssh_basic: Lesson = {
    id: 'ssh-basic',
    title: '首次连接 - SSH基础入门',
    icon: "Wifi",
    description: '学会SSH连接、终端使用和文件传输',
    content: {
      analogy: 'SSH就像远程开门的对讲机。你在家（本地电脑）按下号码（ssh命令），对方服务器听到铃声（22端口监听），确认身份（密码/密钥）后开门让你进去操作。',
      explanation: 'SSH（Secure Shell，安全外壳协议）是加密远程登录协议，默认端口22。通过SSH可以安全地远程执行命令、传输文件。Windows可用PowerShell或PuTTY，Mac/Linux直接用终端。',
      terms: [
        { name: 'SSH', fullName: 'Secure Shell', meaning: '安全外壳协议，加密远程登录和命令执行' },
        { name: 'SCP', fullName: 'Secure Copy Protocol', meaning: '安全复制协议，基于SSH的文件传输' },
        { name: 'PuTTY', fullName: '', meaning: 'Windows上流行的SSH客户端软件' },
        { name: 'Terminal', fullName: '', meaning: '终端，命令行界面，用于输入命令' }
      ],
      tools: [
        { name: 'Windows Terminal', description: 'Windows自带的终端', usage: 'Win11自带，Win10需安装' },
        { name: 'PuTTY', description: '老牌SSH客户端', usage: '输入IP和端口连接' },
        { name: 'Termius', description: '跨平台SSH客户端', usage: '支持Windows/Mac/手机' }
      ],
      commands: [
        {
          description: 'SSH连接服务器',
          command: 'ssh root@192.168.1.100',
          output: 'root@192.168.1.100 password:',
          explanation: '这是什么：ssh是远程登录命令，root是用户名，@后面是服务器IP。\n为什么要用：从你的电脑连接到远程服务器。\n用了会怎么样：提示输入密码，输入正确后进入服务器命令行。\n注意：第一次连接会问是否保存指纹，输入yes。',
          breakdown: {
            symbol: '$',
            meaning: '本地电脑的命令提示符',
            result: '尝试连接到指定IP的服务器',
            outputExplanation: 'password:提示你输入该用户的登录密码'
          }
        },
        {
          description: '指定端口连接',
          command: 'ssh -p 2222 root@server-ip',
          output: 'Connected to server',
          explanation: '这是什么：-p指定SSH端口，默认是22，这里改成2222。\n为什么要用：为了安全，很多人会修改默认SSH端口。\n用了会怎么样：连接到非标准端口的SSH服务。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '使用2222端口连接SSH',
            outputExplanation: '连接成功后显示欢迎信息'
          }
        },
        {
          description: '退出SSH会话',
          command: 'exit',
          output: 'logout\nConnection closed',
          explanation: '这是什么：exit命令退出当前登录会话。\n为什么要用：完成操作后安全断开连接。\n用了会怎么样：关闭与服务器的连接，回到本地电脑。',
          breakdown: {
            symbol: '$',
            meaning: '服务器上的命令提示符',
            result: '退出当前登录',
            outputExplanation: 'logout表示登出，Connection closed表示连接已关闭'
          }
        }
      ],
      commonMistakes: [
        { error: 'Connection timed out', cause: 'IP地址错误或服务器未开机', expectedResult: '终端等待约2分钟后显示 Connection timed out，连接失败', solution: '检查IP是否正确，确认服务器在云控制台显示"运行中"', recoveryMethod: '1. 登录云服务商控制台确认服务器状态\n2. 核对IP地址是否输入正确\n3. ping IP地址测试网络连通性\n4. 如果ping不通，可能是本地网络问题或服务器未开机' },
        { error: 'Permission denied', cause: '密码错误或root被禁用', expectedResult: '终端显示 Permission denied, please try again，输入3次错误密码后断开连接', solution: '检查密码大小写，或通过VNC重置root密码', recoveryMethod: '1. 确认密码拼写（区分大小写）\n2. VNC登录重置密码：sudo passwd root\n3. 如果root登录被禁用，用普通用户登录后 sudo -i 切换' },
        { error: 'Port 22: Connection refused', cause: 'SSH服务未启动或端口被改', expectedResult: '终端立即显示 Connection refused，端口拒绝连接', solution: 'VNC登录检查SSH服务：sudo systemctl status sshd', recoveryMethod: '1. VNC登录服务器\n2. 检查SSH状态：sudo systemctl status sshd\n3. 如果未启动：sudo systemctl start sshd\n4. 设置开机自启：sudo systemctl enable sshd\n5. 检查防火墙：sudo ufw status' }
      ],
      bestPractices: ['第一次连接会提示保存指纹，输入yes确认', '使用SCP或SFTP传输文件，不要用FTP', '连接失败时先ping测试网络连通性', '记录常用服务器的IP和登录信息']
    }
  }
