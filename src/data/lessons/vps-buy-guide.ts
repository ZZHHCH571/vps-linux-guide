import type { Lesson } from '../types';

export const vps_buy_guide: Lesson = {
    id: 'vps-buy-guide',
    title: '服务器购买推荐 - 怎么选不踩坑',
    icon: "ShoppingCart",
    description: '国内大厂推荐、不同场景的配置建议',
    content: {
      analogy: '买VPS就像买车。跑滴滴（博客）选省油小车，跑长途货运（代理/游戏）选大马力车，日常代步（学习）选性价比高的。别花跑车的钱买自行车，也别用自行车拉货。',
      explanation: '选择VPS需要考虑用途、预算、用户位置。国内用户首选阿里云、腾讯云等大厂，稳定可靠。不同用途对配置要求不同：博客轻量，代理需要带宽，AI应用需要内存。',
      terms: [
        { name: 'CPU核心', fullName: 'CPU Cores', meaning: '处理器核心数，越多能同时处理的任务越多' },
        { name: '内存', fullName: 'RAM', meaning: '运行内存，决定能同时开多少程序' },
        { name: '带宽', fullName: 'Bandwidth', meaning: '网络速度，像水管粗细，决定下载上传速度' },
        { name: '流量', fullName: 'Traffic', meaning: '每月允许传输的数据总量' }
      ],
      recommendations: [
        {
          scenario: '搭建个人博客/小型网站',
          provider: '阿里云/腾讯云',
          config: '1核2G或2核2G，3-5Mbps带宽',
          reason: '博客访问量不大，1核2G足够运行WordPress或静态网站。2核更流畅，适合偶尔安装插件。带宽3-5M保证图片加载速度。',
          price: '约50-100元/月'
        },
        {
          scenario: '配置网络加速/CDN服务',
          provider: '阿里云/腾讯云（海外节点）',
          config: '2核4G，10Mbps以上带宽，不限流量',
          reason: '跨境业务需要处理大量网络请求，2核保证并发处理能力，4G内存防止OOM。高带宽确保网速快，不限流量避免超额费用。建议选新加坡、日本等低延迟节点用于合法合规的跨境业务。',
          price: '约100-200元/月'
        },
        {
          scenario: '配置Hermes Agent/AI应用',
          provider: '阿里云/腾讯云',
          config: '4核8G或更高，SSD硬盘',
          reason: 'AI应用需要较大内存处理模型推理，4核8G是起步配置。SSD硬盘加快读写速度。如果运行本地大模型，建议8核16G以上。',
          price: '约200-400元/月'
        },
        {
          scenario: '学习Linux/练手',
          provider: '阿里云/腾讯云（学生优惠）',
          config: '1核1G或1核2G，1Mbps带宽',
          reason: '学习用途不需要高性能，1核1G足够练习命令。学生认证可享大幅优惠，甚至免费试用。',
          price: '约10-30元/月（学生价更低）'
        }
      ],
      commands: [],
      commonMistakes: [
        { error: '买了国内服务器想翻墙', cause: '国内服务器无法访问外网加速', solution: '代理需求选海外节点，如新加坡、日本' },
        { error: '配置选太低跑不动', cause: '低估了应用资源需求', solution: '宁可稍高一点，云服务器可随时升级' },
        { error: '没看流量计费方式', cause: '按流量计费和按带宽计费不同', solution: '流量大选按带宽，流量小选按流量' }
      ],
      bestPractices: ['新用户关注优惠活动，首年很便宜', '选择支持随时升降配的服务商', '重要数据开启自动快照备份', '记录好登录信息和账单周期']
    }
  }
