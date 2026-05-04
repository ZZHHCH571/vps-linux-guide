import type { Lesson } from '../types';

export const http_https: Lesson = {
    id: 'http-https',
    title: 'HTTP/HTTPS - 网页是怎么传输的',
    icon: "Globe",
    description: '理解网页通信协议，保障数据传输安全',
    content: {
      analogy: 'HTTP就像寄明信片：内容大家都看得见，邮递员、邻居都能偷看。HTTPS就像寄加密信件：只有收件人有钥匙能打开，中途被截获也看不懂内容。',
      explanation: 'HTTP（HyperText Transfer Protocol）是浏览器和服务器之间传输网页的规则。当你访问网站时，浏览器发送HTTP请求，服务器返回HTML页面。\n\nHTTP的问题：数据明文传输，容易被窃听或篡改。比如在咖啡馆连WiFi，黑客可以截获你输入的密码。\n\nHTTPS的改进：在HTTP基础上加了SSL/TLS加密层，所有数据都加密传输，防止中间人攻击。即使被截获，看到的也是一堆乱码。\n\nHTTPS工作流程详解：\n1. 浏览器请求HTTPS连接（输入https://或点击链接）\n2. 服务器发送SSL证书（包含公钥和身份信息）\n3. 浏览器验证证书有效性（是否过期、是否由可信机构颁发）\n4. 双方协商加密密钥（用非对称加密交换对称密钥）\n5. 后续通信全部用对称密钥加密（速度快）\n\n整个过程在毫秒级完成，用户几乎感觉不到延迟。',
      terms: [
        { name: 'HTTP', fullName: 'HyperText Transfer Protocol', meaning: '超文本传输协议，网页传输的基础协议，默认端口80' },
        { name: 'HTTPS', fullName: 'HTTP Secure', meaning: '安全的HTTP协议，使用SSL/TLS加密，默认端口443' },
        { name: 'SSL', fullName: 'Secure Sockets Layer', meaning: '安全套接层，加密协议的前身，已被TLS取代' },
        { name: 'TLS', fullName: 'Transport Layer Security', meaning: '传输层安全，SSL的升级版，目前主流版本是TLS 1.3' },
        { name: '证书', fullName: 'SSL Certificate', meaning: '证明网站身份的数字证书，由CA机构（如Let\'s Encrypt）颁发' },
        { name: 'CA', fullName: 'Certificate Authority', meaning: '证书颁发机构，负责验证网站身份并签发证书' },
        { name: 'HSTS', fullName: 'HTTP Strict Transport Security', meaning: '强制浏览器始终使用HTTPS访问该网站的安全头' }
      ],
      tools: [
        { name: 'curl', description: '命令行HTTP客户端', usage: 'curl -I https://example.com' },
        { name: 'openssl', description: 'SSL/TLS诊断工具', usage: 'openssl s_client -connect example.com:443' },
        { name: 'certbot', description: '免费SSL证书自动化工具', usage: 'certbot --nginx -d example.com' },
        { name: 'SSL Labs', description: '在线SSL测试工具', usage: '访问ssllabs.com测试网站SSL等级' }
      ],
      commands: [
        {
          description: '检查网站的HTTP响应头',
          command: 'curl -I https://example.com',
          output: 'HTTP/2 200\ncontent-type: text/html; charset=utf-8\nstrict-transport-security: max-age=31536000; includeSubDomains\nx-frame-options: DENY',
          explanation: '【命令作用】\ncurl -I 只获取HTTP响应头，不下载页面内容。就像敲门只问"有人在吗"，不进屋。\n\n【为什么要用这个命令】\n快速检查网站状态、HTTPS配置是否正确、安全头是否设置。不用打开浏览器，命令行一秒出结果。\n\n【输出结果逐行解释】\n\n📌 HTTP/2 200\n   → HTTP/2：网站使用的协议版本（比HTTP/1.1更快）\n   → 200：状态码，表示请求成功（404=找不到，500=服务器错误）\n\n📌 content-type: text/html; charset=utf-8\n   → 告诉浏览器：这是HTML网页，用UTF-8编码显示\n   → 如果是图片会显示 image/png，JSON会显示 application/json\n\n📌 strict-transport-security: max-age=31536000; includeSubDomains\n   → HSTS安全头，强制浏览器必须用HTTPS访问（不能偷偷用HTTP）\n   → max-age=31536000：有效期1年（31536000秒）\n   → includeSubDomains：所有子域名也强制HTTPS\n\n📌 x-frame-options: DENY\n   → 防止"点击劫持"攻击\n   → DENY表示：禁止其他网站用<iframe>嵌入你的页面\n   → 保护用户不被钓鱼网站欺骗',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示网站的HTTP响应头信息',
            outputExplanation: '第一行是协议版本和状态码，下面是各种响应头，200=成功，404=未找到，500=服务器错误'
          }
        },
        {
          description: '测试SSL证书有效期',
          command: 'echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -dates',
          output: 'notBefore=Jan 1 00:00:00 2024 GMT\nnotAfter=Dec 31 23:59:59 2024 GMT',
          explanation: '【命令作用】\n用openssl工具检查SSL证书的有效期，就像查看身份证的有效期限。\n\n【为什么要用这个命令】\n证书过期会导致网站无法访问，浏览器会显示"不安全"警告。提前检查可以避免网站突然打不开。\n\n【输出结果解释】\n\n📌 notBefore=Jan 1 00:00:00 2024 GMT\n   → 证书生效时间：2024年1月1日开始有效\n   → GMT表示格林威治标准时间（世界标准时间）\n\n📌 notAfter=Dec 31 23:59:59 2024 GMT\n   → 证书过期时间：2024年12月31日到期\n   → 过了这个时间，浏览器会显示红色警告"证书已过期"\n\n💡 建议：在到期前30天续期，避免服务中断',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示SSL证书的有效期',
            outputExplanation: 'notBefore=开始时间，notAfter=过期时间，GMT表示格林威治标准时间'
          }
        },
        {
          description: '安装免费SSL证书',
          command: 'sudo certbot --nginx -d example.com -d www.example.com',
          output: 'Congratulations! Your certificate and chain have been saved at /etc/letsencrypt/live/example.com/fullchain.pem',
          explanation: '【命令作用】\ncertbot自动申请并安装Let\'s Encrypt免费SSL证书，一键搞定HTTPS配置。\n\n【为什么要用这个命令】\n1. 免费：Let\'s Encrypt提供完全免费的SSL证书\n2. 自动：自动配置Nginx，不用手动改配置文件\n3. 安全：启用HTTPS后，数据传输加密，防止被窃听\n4. SEO：Google优先收录HTTPS网站\n\n【参数说明】\n- --nginx：自动检测并配置Nginx\n- -d example.com：为example.com申请证书\n- -d www.example.com：同时为www子域名申请\n\n【输出结果】\n证书保存在 /etc/letsencrypt/live/example.com/ 目录下：\n- fullchain.pem：完整证书链\n- privkey.pem：私钥文件\n\n💡 自动续期：certbot会自动设置定时任务，每60天自动续期，无需人工干预',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '自动安装SSL证书并配置Nginx',
            outputExplanation: '显示证书保存路径和配置成功的确认信息'
          }
        },
        {
          description: '检查HTTPS重定向',
          command: 'curl -I http://example.com',
          output: 'HTTP/1.1 301 Moved Permanently\nLocation: https://example.com/',
          explanation: '【命令作用】\n测试HTTP请求是否会自动跳转到HTTPS，检查重定向配置是否正确。\n\n【为什么要用这个命令】\n确保用户访问http://时自动跳转到https://，避免明文传输数据，提升安全性。\n\n【输出结果解释】\n\n📌 HTTP/1.1 301 Moved Permanently\n   → 301：永久重定向状态码（告诉浏览器以后直接访问HTTPS）\n   → Moved Permanently：表示该地址已永久迁移\n\n📌 Location: https://example.com/\n   → 告诉浏览器：请访问这个HTTPS地址\n   → 浏览器会自动跳转，用户几乎感知不到\n\n💡 常见状态码：\n- 301：永久重定向（SEO友好，搜索引擎会更新索引）\n- 302：临时重定向\n- 307：临时重定向（不允许改变请求方法）',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '检查HTTP是否重定向到HTTPS',
            outputExplanation: '301=永久重定向，Location=重定向目标地址'
          }
        }
      ],
      commonMistakes: [
        { error: '混合内容警告', cause: 'HTTPS页面加载了HTTP资源（图片、CSS、JS）', solution: '确保所有资源都使用HTTPS，或用相对路径//example.com/resource' },
        { error: '证书过期网站打不开', cause: '忘记续期SSL证书', solution: '设置certbot自动续期：sudo crontab -e添加0 0 * * * certbot renew' },
        { error: '重定向循环', cause: 'HTTP和HTTPS配置冲突', solution: '检查Nginx配置，确保只在HTTP块中重定向到HTTPS' },
        { error: '浏览器显示不安全警告', cause: '证书域名不匹配或自签名证书', solution: '确保证书覆盖所有子域名，使用正规CA颁发的证书' },
        { error: 'HTTPS访问很慢', cause: '未启用HTTP/2或TLS优化', solution: 'Nginx配置启用http2 on，使用TLS 1.3' }
      ],
      bestPractices: ['始终使用HTTPS，即使是内部网站', '设置HSTS头强制HTTPS（max-age至少1年）', '定期更新SSL证书，设置自动续期', '使用强加密套件，禁用TLS 1.0/1.1', '启用HTTP/2提高性能', '定期检查SSL等级（A+为目标）']
    }
  }
