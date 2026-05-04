import type { Lesson } from '../types';

export const webserver: Lesson = {
    id: 'webserver',
    title: 'Web服务器 - Nginx部署',
    icon: "Globe",
    description: '部署Nginx、绑定域名、配置SSL证书',
    content: {
      analogy: 'Web服务器就像餐厅服务员。Nginx是专业服务员，客人（浏览器）来了，他根据菜单（配置文件）把对应的菜（网页文件）端上去。SSL证书就像卫生许可证，让客人放心用餐（HTTPS加密）。',
      explanation: 'Nginx（Engine X）是高性能Web服务器和反向代理。通过配置文件定义站点，监听80/443端口，处理HTTP/HTTPS请求。SSL证书由Let\'s Encrypt免费颁发，实现HTTPS加密。',
      terms: [
        { name: 'Nginx', fullName: 'Engine X', meaning: '高性能Web服务器和反向代理软件' },
        { name: 'SSL/TLS', fullName: 'Secure Sockets Layer / Transport Layer Security', meaning: '安全套接层/传输层安全，加密通信协议' },
        { name: '反向代理', fullName: 'Reverse Proxy', meaning: '接收客户端请求并转发给后端服务器' },
        { name: '域名', fullName: 'Domain Name', meaning: '网站的文字地址，如google.com' }
      ],
      tools: [
        { name: 'Nginx', description: 'Web服务器', usage: '处理HTTP请求，托管网站' },
        { name: 'Certbot', description: 'SSL证书工具', usage: '自动申请和续期Let\'s Encrypt证书' }
      ],
      commands: [
        {
          description: '安装Nginx',
          command: 'sudo apt install nginx -y',
          output: 'Setting up nginx ...',
          explanation: '这是什么：安装Nginx Web服务器。\n为什么要用：用来托管网站或作为反向代理。\n用了会怎么样：Nginx被安装并自动启动，访问服务器IP能看到欢迎页面。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '安装并启动Nginx',
            outputExplanation: 'Setting up表示正在配置服务'
          }
        },
        {
          description: '测试配置文件',
          command: 'sudo nginx -t',
          output: 'nginx: configuration file /etc/nginx/nginx.conf test is successful',
          explanation: '这是什么：nginx -t测试配置文件语法是否正确。\n为什么要用：修改配置后先测试，避免重启失败导致网站宕机。\n用了会怎么样：检查配置文件，报告是否有错误。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '验证Nginx配置文件语法',
            outputExplanation: 'successful表示配置正确，failed表示有错误'
          }
        },
        {
          description: '查看Nginx状态',
          command: 'sudo systemctl status nginx',
          output: 'Active: active (running)',
          explanation: '这是什么：systemctl status查看服务运行状态。\n为什么要用：确认Nginx是否正常启动。\n用了会怎么样：显示服务的详细状态信息。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示Nginx服务状态',
            outputExplanation: 'active (running)=正常运行，inactive=未运行'
          }
        }
      ],
      commonMistakes: [
        { error: '403 Forbidden', cause: '网站目录权限不对', solution: '修改目录权限：sudo chown -R www-data:www-data /var/www/html' },
        { error: '502 Bad Gateway', cause: '后端服务未启动', solution: '检查后端服务状态，确保端口正确' },
        { error: '配置文件语法错误', cause: '少写了分号或括号', solution: '用nginx -t测试配置，根据错误提示修改' }
      ],
      bestPractices: ['修改配置前先备份', '每次修改后用nginx -t测试', '使用Certbot自动申请SSL证书', '配置防火墙允许80/443端口']
    }
  }
