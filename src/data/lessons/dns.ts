import type { Lesson } from '../types';

export const dns: Lesson = {
    id: 'dns',
    title: 'DNS解析 - 域名怎么变成IP地址',
    icon: "Network",
    description: '理解域名系统，让网站更容易访问',
    content: {
      analogy: 'DNS就像手机通讯录：你存的是联系人名字（域名），但拨号需要电话号码（IP地址）。DNS就是帮你把名字查成号码的服务。没有它，你得背下所有朋友的电话号码才能打电话。',
      explanation: 'DNS（Domain Name System）是互联网的电话簿。当你输入www.example.com时，浏览器不知道这个网站在哪台服务器上，它需要DNS服务器帮忙查询这个域名对应的IP地址（如192.168.1.1）。没有DNS，你就得记住一串数字才能访问网站。\n\nDNS解析过程详解：\n1. 浏览器先查本地缓存（之前访问过吗？有就直接用）\n2. 没找到就问操作系统（电脑自己的DNS缓存）\n3. 再问路由器或ISP的DNS服务器（电信/联通提供的）\n4. 最终找到权威DNS服务器拿到IP地址（域名注册商管理的）\n5. 浏览器用这个IP地址连接服务器，开始加载网页\n\n整个过程通常只需几毫秒到几百毫秒，但你感觉不到，因为浏览器会缓存结果。',
      terms: [
        { name: 'DNS', fullName: 'Domain Name System', meaning: '域名系统，把域名翻译成IP地址的全球分布式数据库' },
        { name: 'A记录', fullName: 'Address Record', meaning: '将域名指向IPv4地址的记录类型，最常用' },
        { name: 'AAAA记录', fullName: 'IPv6 Address Record', meaning: '将域名指向IPv6地址的记录，下一代IP协议' },
        { name: 'CNAME', fullName: 'Canonical Name', meaning: '别名记录，将一个域名指向另一个域名，不能指向IP' },
        { name: 'TTL', fullName: 'Time To Live', meaning: '生存时间，DNS记录在缓存中保存的秒数，到期后重新查询' },
        { name: 'NS记录', fullName: 'Name Server Record', meaning: '指定哪个DNS服务器负责解析该域名' },
        { name: 'MX记录', fullName: 'Mail Exchange', meaning: '邮件交换记录，指定接收邮件的服务器' }
      ],
      tools: [
        { name: 'nslookup', description: '基础DNS查询工具', usage: 'nslookup example.com' },
        { name: 'dig', description: '专业DNS查询工具', usage: 'dig example.com A +short' },
        { name: 'ping', description: '测试域名解析和连通性', usage: 'ping example.com' },
        { name: 'host', description: '简单DNS查询', usage: 'host example.com' }
      ],
      commands: [
        {
          description: '查询域名的IP地址',
          command: 'nslookup example.com',
          output: 'Server: 8.8.8.8\nAddress: 8.8.8.8#53\n\nNon-authoritative answer:\nName: example.com\nAddress: 93.184.216.34',
          explanation: '这是什么：nslookup是DNS查询工具，用来查找域名对应的IP地址。\n为什么要用：验证域名是否正确解析，排查网站无法访问的问题。\n用了会怎么样：显示域名解析到的IP地址和使用的DNS服务器。\n输出含义：\n- Server: 8.8.8.8 表示使用的是Google的公共DNS服务器\n- Address: 8.8.8.8#53 表示DNS服务器的IP和端口（53是DNS标准端口）\n- Non-authoritative answer 表示这是缓存结果，不是直接从权威服务器获取\n- Name: example.com 是查询的域名\n- Address: 93.184.216.34 是解析到的IP地址',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符，表示等待你输入命令',
            result: '显示域名对应的IP地址和DNS服务器信息',
            outputExplanation: 'Server=使用的DNS服务器，Address=IP地址，Name=查询的域名'
          }
        },
        {
          description: '查看详细的DNS记录',
          command: 'dig example.com A',
          output: ';; ANSWER SECTION:\nexample.com. 300 IN A 93.184.216.34\n\n;; Query time: 45 msec\n;; SERVER: 8.8.8.8#53(8.8.8.8)',
          explanation: '这是什么：dig是更强大的DNS查询工具，可以查看各种类型的DNS记录。\n为什么要用：比nslookup提供更详细信息，适合调试DNS问题。\n用了会怎么样：显示完整的DNS响应，包括TTL、记录类型、查询时间等。\n输出含义：\n- 300 是TTL（秒），表示这条记录可以缓存300秒\n- IN 表示Internet类\n- A 是记录类型（IPv4地址）\n- 93.184.216.34 是IP地址\n- Query time: 45 msec 表示查询耗时45毫秒',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示详细的DNS记录信息和查询统计',
            outputExplanation: '300=缓存时间(秒)，A=记录类型，后面是IP地址，Query time=查询耗时'
          }
        },
        {
          description: '快速获取IP地址（简洁模式）',
          command: 'dig example.com +short',
          output: '93.184.216.34',
          explanation: '这是什么：dig +short只显示IP地址，省略其他信息。\n为什么要用：脚本中需要快速获取IP时使用，输出简洁。\n用了会怎么样：只输出一行IP地址，没有其他信息。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '只显示域名对应的IP地址',
            outputExplanation: '仅输出IP地址，适合脚本处理'
          }
        },
        {
          description: '测试域名是否可访问',
          command: 'ping -c 4 example.com',
          output: 'PING example.com (93.184.216.34) 56(84) bytes of data.\n64 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=45.2 ms\n64 bytes from 93.184.216.34: icmp_seq=2 ttl=56 time=43.8 ms\n\n--- example.com ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss, time 3005ms',
          explanation: '这是什么：ping发送ICMP数据包测试网络连接，-c 4表示发送4个包后停止。\n为什么要用：快速验证域名是否能解析且服务器是否在线，同时测量延迟。\n用了会怎么样：显示域名解析的IP和每个包的响应时间。\n输出含义：\n- 括号内(93.184.216.34)是解析的IP地址\n- icmp_seq=1 是第1个数据包\n- ttl=56 是生存时间\n- time=45.2 ms 是响应时间（毫秒），越小越快\n- 0% packet loss 表示没有丢包，网络正常',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '发送4个测试包并统计结果',
            outputExplanation: 'time=延迟(毫秒)，packet loss=丢包率，0%表示网络正常'
          }
        }
      ],
      commonMistakes: [
        { error: '修改DNS后网站还是旧IP', cause: 'DNS有缓存，需要等待TTL过期或清除缓存', solution: '清除本地DNS缓存：sudo systemd-resolve --flush-caches，或等待TTL时间过去' },
        { error: 'ping不通但网站能访问', cause: '服务器禁用了ICMP协议（防攻击）', solution: '用curl https://example.com或浏览器直接访问测试' },
        { error: '不同地区解析结果不同', cause: '使用了CDN或智能DNS（GeoDNS）', solution: '这是正常现象，CDN会根据用户位置返回最近的服务器IP' },
        { error: 'DNS污染导致解析错误IP', cause: '被劫持或污染，常见于某些网络环境', solution: '更换为公共DNS如8.8.8.8(Google)或1.1.1.1(Cloudflare)' },
        { error: '忘记添加www子域名', cause: '只配置了example.com，没配www.example.com', solution: '同时添加A记录和CNAME记录，或设置URL重定向' }
      ],
      bestPractices: ['设置合理的TTL值（常用300-3600秒），重要变更前先降低TTL到60秒', '使用多个DNS服务商提高可靠性（主备方案）', '定期检查DNS记录是否正确，避免配置错误', '为www和非www域名都配置解析记录', '使用DNS监控服务及时发现解析异常']
    }
  }
