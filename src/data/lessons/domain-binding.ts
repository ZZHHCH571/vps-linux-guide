import type { Lesson } from '../types';

export const domain_binding: Lesson = {
    id: 'domain-binding',
    title: '域名绑定 - 让域名指向服务器',
    icon: "Cloud",
    description: '学习如何将域名关联到VPS，让用户通过域名访问',
    content: {
      analogy: '域名绑定就像给房子挂门牌号：你的VPS是房子（有IP地址但难记），域名是门牌号（好记的name.com），DNS解析是指路牌（告诉别人门牌号对应哪栋房子）。三者配合，客人才能找到你家。',
      explanation: '域名绑定是将你购买的域名指向VPS的IP地址，让用户可以通过域名访问你的网站。这个过程分为两步：\n\n**第一步：DNS解析设置**\n在域名管理后台（阿里云/腾讯云控制台）添加A记录，将域名指向VPS的IP地址。例如：\n- 主机记录：@ 表示example.com\n- 主机记录：www 表示www.example.com\n- 记录值：你的VPS IP地址（如192.168.1.100）\n\n**第二步：服务器配置**\n在Nginx中配置虚拟主机，告诉服务器这个域名对应哪个网站目录。\n\n注意：DNS解析生效需要时间（取决于TTL设置），通常几分钟到几小时不等。可以用nslookup验证是否生效。',
      terms: [
        { name: 'A记录', fullName: 'Address Record', meaning: '将域名指向IPv4地址的DNS记录，最常用' },
        { name: 'CNAME', fullName: 'Canonical Name', meaning: '别名记录，将一个域名指向另一个域名，不能指向IP' },
        { name: '虚拟主机', fullName: 'Virtual Host', meaning: '一台服务器托管多个网站的配置方式，每个域名对应一个站点' },
        { name: 'server_name', fullName: 'Nginx指令', meaning: '指定Nginx响应的域名，可以写多个用空格分隔' },
        { name: 'root', fullName: '网站根目录', meaning: '存放网站文件的目录路径，Nginx从这里读取文件' },
        { name: 'listen', fullName: 'Nginx指令', meaning: '指定监听的端口，80是HTTP，443是HTTPS' }
      ],
      tools: [
        { name: 'Nginx', description: 'Web服务器软件', usage: '配置虚拟主机绑定域名' },
        { name: '域名管理平台', description: '阿里云/腾讯云DNS控制台', usage: '添加A记录指向VPS IP' },
        { name: 'nslookup', description: '验证DNS解析', usage: 'nslookup yourdomain.com' },
        { name: 'curl', description: '测试网站访问', usage: 'curl -I http://yourdomain.com' }
      ],
      commands: [
        {
          description: '创建Nginx虚拟主机配置',
          command: 'sudo nano /etc/nginx/sites-available/example.com',
          output: '',
          explanation: '这是什么：在Nginx中创建新的网站配置文件。\n为什么要用：告诉Nginx当用户访问example.com时，应该提供哪个目录的文件。\n用了会怎么样：打开nano编辑器，可以编写虚拟主机配置。\n\n完整配置示例：\nserver {\n    listen 80;\n    server_name example.com www.example.com;\n    root /var/www/example.com;\n    index index.html index.htm;\n\n    location / {\n        try_files $uri $uri/ =404;\n    }\n}\n\n配置说明：\n- listen 80：监听HTTP端口\n- server_name：响应的域名，可以写多个\n- root：网站文件存放目录\n- index：默认首页文件\n- location /：处理所有请求，找不到文件返回404',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '打开nano编辑器创建配置文件',
            outputExplanation: '无输出，直接进入编辑器界面，按Ctrl+O保存，Ctrl+X退出'
          }
        },
        {
          description: '启用虚拟主机配置',
          command: 'sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/',
          output: '',
          explanation: '这是什么：创建符号链接，将配置文件从available链接到enabled。\n为什么要用：Nginx只读取sites-enabled目录中的配置，这样可以在不删除配置的情况下禁用网站。\n用了会怎么样：配置文件被激活，下次重载Nginx时生效。\n\n如果想禁用某个网站：\nsudo rm /etc/nginx/sites-enabled/example.com\nsudo systemctl reload nginx',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '创建符号链接激活配置',
            outputExplanation: '无输出表示成功，可用ls /etc/nginx/sites-enabled/确认'
          }
        },
        {
          description: '测试并重载Nginx配置',
          command: 'sudo nginx -t && sudo systemctl reload nginx',
          output: 'nginx: the configuration file /etc/nginx/nginx.conf syntax is ok\nnginx: configuration file /etc/nginx/nginx.conf test is successful',
          explanation: '这是什么：先测试配置语法是否正确，然后重载Nginx使配置生效。\n为什么要用：避免配置错误导致Nginx无法启动，平滑重载不影响现有连接。\n用了会怎么样：如果配置正确，Nginx重新加载配置，新域名立即生效。\n输出含义：\n- syntax is ok：语法正确\n- test is successful：测试通过\n\n如果测试失败，会显示具体错误行号，根据提示修改配置。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '测试配置并重载Nginx',
            outputExplanation: '两行都表示配置测试通过，可以安全重载。如果有错误会显示错误位置'
          }
        },
        {
          description: '验证域名解析和网站访问',
          command: 'curl -I http://example.com',
          output: 'HTTP/1.1 200 OK\nServer: nginx/1.18.0\nContent-Type: text/html',
          explanation: '这是什么：用curl测试域名是否能正常访问。\n为什么要用：确认域名绑定是否成功，网站是否正常响应。\n用了会怎么样：显示HTTP响应头，200表示成功。\n输出含义：\n- HTTP/1.1 200 OK：请求成功\n- Server: nginx：服务器软件是Nginx\n- Content-Type：返回内容类型',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '测试域名HTTP响应',
            outputExplanation: '200=成功，404=未找到，500=服务器错误，502=网关错误'
          }
        }
      ],
      commonMistakes: [
        { error: '域名解析了但网站打不开', cause: 'Nginx未配置或未重载，或防火墙阻止80端口', solution: '检查Nginx配置并执行sudo systemctl reload nginx，确认ufw allow 80/tcp' },
        { error: '访问域名显示默认页面', cause: 'server_name配置错误或默认站点优先级更高', solution: '确认server_name与访问的域名完全一致，或删除/etc/nginx/sites-enabled/default' },
        { error: 'DNS解析一直不生效', cause: 'TTL太长或DNS服务器问题', solution: '用nslookup验证，或联系域名服务商，等待TTL过期' },
        { error: '403 Forbidden错误', cause: '网站目录权限不对或没有index文件', solution: 'sudo chown -R www-data:www-data /var/www/example.com，确保有index.html' },
        { error: 'www和非www访问结果不同', cause: '只配置了一个域名', solution: 'server_name同时写example.com和www.example.com' }
      ],
      bestPractices: ['同时绑定带www和不带www的域名', '配置HTTP到HTTPS的重定向', '设置合理的TTL值便于快速切换（变更前降低到60秒）', '定期检查DNS解析是否正常', '为每个网站创建独立的配置文件', '配置完成后用curl测试验证']
    }
  }
