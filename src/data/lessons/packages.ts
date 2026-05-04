import type { Lesson } from '../types';

export const packages: Lesson = {
    id: 'packages',
    title: '软件安装 - 包管理器使用',
    icon: "Package",
    description: '学会apt包管理器，安装常用软件和环境',
    content: {
      analogy: '包管理器就像手机应用商店。apt是Ubuntu的软件商店，里面有各种软件（微信=nginx，抖音=mysql）。你只需说"安装微信"（apt install nginx），它会自动下载安装，不用去官网找安装包。',
      explanation: 'apt（Advanced Package Tool，高级包管理工具）是Debian/Ubuntu系统的包管理器，负责软件的安装、更新、卸载。软件源是软件仓库的地址，可以更换为国内镜像加速下载。',
      terms: [
        { name: 'apt', fullName: 'Advanced Package Tool', meaning: '高级包管理工具，Ubuntu的软件安装器' },
        { name: '软件源', fullName: 'Repository', meaning: '软件仓库，存储软件包的服务器' },
        { name: '依赖', fullName: 'Dependency', meaning: '软件运行需要的其他软件包' },
        { name: 'dpkg', fullName: 'Debian Package', meaning: 'Debian底层的包管理工具' }
      ],
      tools: [
        { name: 'apt', description: '包管理器', usage: 'install安装、remove卸载、update更新源' },
        { name: 'dpkg', description: '底层包管理', usage: 'apt底层调用dpkg' }
      ],
      commands: [
        {
          description: '更新软件源列表',
          command: 'sudo apt update',
          output: 'Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease\nGet:2 http://archive.ubuntu.com/ubuntu jammy-updates InRelease',
          explanation: '这是什么：apt update更新本地软件包列表，从软件源获取最新信息。\n为什么要用：安装软件前必须先update，确保知道有哪些最新版本。\n用了会怎么样：连接软件源服务器，下载最新的软件包列表。\n输出含义：Hit表示缓存命中（没变化），Get表示获取了新信息。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '更新本地软件包索引',
            outputExplanation: 'Hit=无变化，Get=获取新信息，Ign=忽略'
          }
        },
        {
          description: '安装软件',
          command: 'sudo apt install nginx -y',
          output: 'Reading package lists... Done\nSetting up nginx ...',
          explanation: '这是什么：apt install安装指定软件，-y自动回答Yes。\n为什么要用：安装需要的软件包。\n用了会怎么样：下载并安装nginx及其依赖。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '安装nginx Web服务器',
            outputExplanation: 'Done表示完成，Setting up表示正在配置'
          }
        },
        {
          description: '自动清理无用依赖',
          command: 'sudo apt autoremove',
          output: '0 upgraded, 0 newly installed, 0 to remove',
          explanation: '这是什么：autoremove自动删除不再需要的依赖包。\n为什么要用：卸载软件后，其依赖可能还残留，清理节省空间。\n用了会怎么样：列出并删除孤立的依赖包。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '清理不再需要的依赖包',
            outputExplanation: 'to remove=将要删除的数量'
          }
        }
      ],
      commonMistakes: [
        { error: 'E: Unable to locate package', cause: '软件源没有这个包，或软件源未更新', solution: '先运行sudo apt update更新源' },
        { error: '下载速度很慢', cause: '默认源在国外', solution: '更换为国内镜像源（阿里云、清华）' },
        { error: '依赖冲突无法安装', cause: '已安装软件版本不兼容', solution: '尝试sudo apt -f install修复依赖' }
      ],
      bestPractices: ['安装前先apt update', '使用-y参数自动确认', '定期apt upgrade更新软件', '卸载后用autoremove清理依赖']
    }
  }
