import type { Lesson } from '../types';

export const ssh: Lesson = {
    id: 'ssh',
    title: 'SSH密钥认证 - 免密登录',
    icon: "Key",
    description: '配置SSH密钥，实现安全便捷的免密码登录',
    content: {
      analogy: '密码登录像用钥匙开门，但钥匙可能被偷看或复制。SSH密钥像是指纹锁——你有一把私钥（藏在口袋里），服务器存着公钥（贴在门上）。只有匹配的指纹才能开门。',
      explanation: 'SSH密钥对包含私钥（id_rsa）和公钥（id_rsa.pub）。私钥必须保密，公钥可以公开。登录时，服务器用公钥验证私钥签名，无需传输密码。',
      terms: [
        { name: 'RSA', fullName: 'Rivest-Shamir-Adleman', meaning: '一种非对称加密算法，用于生成密钥对' },
        { name: 'ed25519', fullName: '', meaning: '现代椭圆曲线加密算法，比RSA更安全更快' },
        { name: '私钥', fullName: 'Private Key', meaning: '必须保密的密钥，存在本地电脑' },
        { name: '公钥', fullName: 'Public Key', meaning: '可以公开的密钥，存在服务器上' }
      ],
      tools: [
        { name: 'ssh-keygen', description: '生成SSH密钥对', usage: 'ssh-keygen -t ed25519' },
        { name: 'ssh-copy-id', description: '复制公钥到服务器', usage: 'ssh-copy-id user@server' }
      ],
      commands: [
        {
          description: '生成SSH密钥对',
          command: 'ssh-keygen -t ed25519 -C "your_email@example.com"',
          output: 'Generating public/private ed25519 key pair...\nEnter file in which to save the key (/home/user/.ssh/id_ed25519):',
          explanation: '这是什么：ssh-keygen生成密钥对，-t指定算法，-C添加注释。\n为什么要用：创建用于免密登录的密钥。\n用了会怎么样：在~/.ssh/目录生成私钥和公钥文件。\n注意：可以直接按回车使用默认路径，passphrase可选设置。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '生成一对SSH密钥',
            outputExplanation: '提示选择保存路径和密码短语'
          }
        },
        {
          description: '复制公钥到服务器',
          command: 'ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server-ip',
          output: 'Number of key(s) added: 1',
          explanation: '这是什么：ssh-copy-id自动将公钥复制到服务器的authorized_keys文件。\n为什么要用：让服务器认识你的公钥，实现免密登录。\n用了会怎么样：公钥被添加到服务器，下次登录无需密码。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '将公钥复制到远程服务器',
            outputExplanation: 'added: 1表示成功添加1个密钥'
          }
        }
      ],
      commonMistakes: [
        { error: 'Permission denied (publickey)', cause: 'authorized_keys权限不对', solution: 'chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys' },
        { error: '密钥生成后找不到', cause: '不知道默认保存位置', solution: '默认在~/.ssh/目录' },
        { error: 'ssh-copy-id失败', cause: '服务器还没设置密码登录', solution: '先用密码登录服务器' }
      ],
      bestPractices: ['使用ed25519算法', '给私钥设置passphrase', '每个设备生成独立的密钥对', '配置好后禁用密码登录']
    }
  }
