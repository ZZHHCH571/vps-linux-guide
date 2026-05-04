import type { Lesson } from '../types';

export const security: Lesson = {
    id: 'security',
    title: '安全加固 - 锁住大门',
    icon: "Lock",
    description: '系统安全加固，防范常见攻击',
    content: {
      analogy: '刚买的VPS就像新搬进的房子，门锁是默认的，窗户开着。安全加固就是换把好锁、关好窗、清理备用钥匙。',
      explanation: '新VPS默认配置较开放，需要及时加固：修改SSH端口、禁用root登录、使用密钥认证、配置防火墙、自动更新、安装fail2ban防暴力破解等。',
      terms: [
        { name: 'fail2ban', fullName: '', meaning: '自动封禁暴力破解IP的安全工具' },
        { name: '暴力破解', fullName: 'Brute Force', meaning: '用字典不断尝试密码的攻击方式' },
        { name: 'VNC', fullName: 'Virtual Network Computing', meaning: '远程桌面，服务器提供商的网页控制台' },
        { name: 'SELinux', fullName: 'Security-Enhanced Linux', meaning: 'Linux强制访问控制安全模块' }
      ],
      tools: [
        { name: 'fail2ban', description: '防暴力破解工具', usage: '自动封禁多次失败登录的IP' },
        { name: 'unattended-upgrades', description: '自动更新工具', usage: '自动安装安全更新' }
      ],
      commands: [
        {
          description: '修改SSH端口',
          command: 'sudo nano /etc/ssh/sshd_config',
          output: '# 找到Port 22，改为Port 2222',
          explanation: '这是什么：nano是文本编辑器，/etc/ssh/sshd_config是SSH配置文件。\n为什么要用：修改默认SSH端口增加安全性。\n用了会怎么样：打开配置文件，找到Port行修改数字，Ctrl+O保存，Ctrl+X退出。\n注意：修改后需要重启SSH服务并更新防火墙规则。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '用nano编辑器打开SSH配置文件',
            outputExplanation: '进入编辑界面，修改后保存退出'
          }
        },
        {
          description: '重启SSH服务',
          command: 'sudo systemctl restart sshd',
          output: '',
          dangerous: true,
          explanation: '这是什么：systemctl管理系统服务，restart重启sshd服务。\n为什么要用：让SSH配置修改生效。\n用了会怎么样：SSH服务重新启动，使用新配置。\n注意：重启前确保新端口已在防火墙开放，否则可能连不上！',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '重启SSH服务使配置生效',
            outputExplanation: '无输出表示成功，有错误会显示错误信息'
          }
        },
        {
          description: '安装fail2ban',
          command: 'sudo apt install fail2ban -y',
          output: 'Reading package lists... Done',
          explanation: '这是什么：apt install安装软件，fail2ban是防暴力破解工具。\n为什么要用：自动封禁多次登录失败的IP地址。\n用了会怎么样：安装fail2ban，默认保护SSH服务。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '安装fail2ban防暴力破解工具',
            outputExplanation: 'Done表示安装完成'
          }
        }
      ],
      commonMistakes: [
        { error: '修改SSH端口后连不上', cause: '防火墙没开放新端口', expectedResult: 'SSH连接被拒绝，提示 Connection refused，原端口和新端口都无法连接', solution: 'VNC登录检查配置：sudo ufw allow 新端口/tcp && sudo ufw reload', recoveryMethod: '1. VNC登录服务器\n2. 检查 /etc/ssh/sshd_config 中 Port 配置\n3. 开放新端口：sudo ufw allow 新端口/tcp\n4. 重载防火墙：sudo ufw reload\n5. 确认SSH服务运行：sudo systemctl status sshd\n6. 用新端口重新SSH连接' },
        { error: 'fail2ban把自己锁外面', cause: '测试登录失败次数太多', expectedResult: 'SSH连接被拒绝，即使密码正确也无法登录，提示 Connection refused', solution: 'VNC登录：sudo fail2ban-client set sshd unbanip 你的IP', recoveryMethod: '1. VNC登录\n2. 查看被封IP：sudo fail2ban-client status sshd\n3. 解封自己的IP：sudo fail2ban-client set sshd unbanip 你的公网IP\n4. 或将IP加入白名单：在 /etc/fail2ban/jail.local 中添加 ignoreip' },
        { error: '配置修改不生效', cause: '忘记重启服务', expectedResult: '修改了配置文件但行为没有变化，仍然使用旧配置', solution: 'sudo systemctl restart sshd', recoveryMethod: '每次修改SSH配置后执行 sudo systemctl restart sshd，然后用另一个终端窗口测试新连接，保留原有连接以防万一' }
      ],
      bestPractices: ['修改默认SSH端口', '完全禁用密码登录', '安装fail2ban自动封禁暴力破解IP', '启用自动安全更新']
    }
  }
