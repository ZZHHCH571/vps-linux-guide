import type { Lesson } from '../types';

export const disk_space: Lesson = {
    id: 'disk-space',
    title: '磁盘空间不足处理 - 硬盘满了怎么办',
    icon: "HardDrive",
    description: '诊断和清理磁盘空间，避免服务器因磁盘满而瘫痪',
    content: {
      analogy: '磁盘空间就像仓库容量：东西太多会放不下新货物。需要定期清理垃圾、整理货架，必要时扩建仓库。',
      explanation: '磁盘空间不足会导致：\n- 无法写入新文件\n- 数据库无法运行\n- 日志无法记录\n- 服务崩溃\n\n常见占用大户：\n1. 日志文件（/var/log）：应用和系统日志累积\n2. 缓存文件（/var/cache）：包管理器缓存\n3. 临时文件（/tmp）：未清理的临时数据\n4. 旧内核：系统升级后保留的旧版本\n5. Docker镜像：未清理的容器和镜像\n\n处理步骤：\n1. 找出占用最多的目录\n2. 清理不必要的文件\n3. 设置日志轮转\n4. 考虑扩容或挂载新磁盘',
      terms: [
        { name: 'df', fullName: 'Disk Free', meaning: '显示文件系统磁盘使用情况' },
        { name: 'du', fullName: 'Disk Usage', meaning: '显示目录或文件的磁盘占用' },
        { name: 'Logrotate', fullName: '日志轮转', meaning: '自动切割、压缩、删除旧日志的工具' },
        { name: 'Inode', fullName: '索引节点', meaning: '文件系统存储文件元信息的结构，inode耗尽也无法创建文件' }
      ],
      tools: [
        { name: 'df', description: '查看磁盘使用', usage: 'df -h' },
        { name: 'du', description: '查看目录大小', usage: 'du -sh /var/*' },
        { name: 'ncdu', description: '交互式磁盘分析', usage: 'ncdu /' },
        { name: 'logrotate', description: '日志管理', usage: '配置/etc/logrotate.d/' }
      ],
      commands: [
        {
          description: '查看磁盘使用情况',
          command: 'df -h',
          output: 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/vda1        50G   45G  5G   90% /\ntmpfs           2.0G     0  2.0G   0% /dev/shm',
          explanation: '这是什么：显示所有文件系统的磁盘使用情况。\n为什么要用：快速了解整体磁盘使用率，发现哪个分区快满了。\n用了会怎么样：列出所有挂载点的总容量、已用、可用和使用率。\n输出含义：Size是总容量，Used是已用，Avail是可用，Use%是使用率，Mounted on是挂载点。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示所有分区的磁盘使用情况',
            outputExplanation: 'Use%超过80%需要注意，超过90%需要立即清理'
          }
        },
        {
          description: '查找大文件',
          command: 'sudo du -ah / | sort -rh | head -20',
          output: '15G /var/lib/mysql\n8.2G /var/log/syslog\n3.1G /home/user/videos',
          explanation: '这是什么：找出系统中占用空间最大的文件和目录。\n为什么要用：定位占用磁盘空间的主要来源，有针对性地清理。\n用了会怎么样：按大小排序显示前20个最大的项目。\n输出含义：每行显示大小和路径，从大到小排列。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示最大的20个文件或目录',
            outputExplanation: '第一列是大小，第二列是路径，按从大到小排序'
          }
        },
        {
          description: '清理包管理器缓存',
          command: 'sudo apt clean && sudo apt autoremove',
          output: 'Reading package lists... Done\nRemoving unused packages...',
          explanation: '这是什么：清理apt下载的包缓存和不再需要的依赖。\n为什么要用：释放被缓存的安装包占用的空间，通常能释放几百MB到几GB。\n用了会怎么样：删除/var/cache/apt中的.deb文件，卸载不再需要的包。\n输出含义：显示清理过程和释放的空间。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '清理包缓存和无用依赖',
            outputExplanation: '显示清理的包数量和释放的空间'
          }
        },
        {
          description: '清理系统日志',
          command: 'sudo journalctl --vacuum-size=100M',
          output: 'Vacuuming done, freed 2.1G of archived journals from /var/log/journal.',
          explanation: '这是什么：限制systemd日志占用的最大空间。\n为什么要用：日志文件可能增长到几GB，定期清理释放空间。\n用了会怎么样：删除旧日志，只保留最近的日志，总大小不超过100MB。\n输出含义：显示释放的空间大小。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '清理旧日志，限制日志总大小为100MB',
            outputExplanation: '显示释放的空间大小'
          }
        }
      ],
      commonMistakes: [
        { error: '直接rm删除大文件但空间未释放', cause: '文件仍被进程占用', expectedResult: '执行 rm 删除了大文件，但 df -h 显示空间没有释放，磁盘使用率不变', solution: '重启占用该文件的服务，或用 > filename 清空文件内容而不是删除', recoveryMethod: '1. 查找占用文件的进程：sudo lsof | grep deleted\n2. 重启对应服务：sudo systemctl restart 服务名\n3. 验证空间释放：df -h\n4. 预防：清空日志用 > /var/log/file.log 而不是 rm' },
        { error: '清理后很快又满了', cause: '没有解决根本原因', expectedResult: '清理后磁盘使用率下降，但几小时或几天后又达到90%以上', solution: '配置logrotate自动轮转日志，设置日志大小限制，找出日志快速增长的原因', recoveryMethod: '1. 监控磁盘增长速度：watch -n 60 df -h\n2. 找出增长最快的目录：sudo du -ah /var | sort -rh | head -10\n3. 配置logrotate限制日志文件大小和保留数量\n4. 修改应用日志级别减少输出' },
        { error: '误删重要系统文件', cause: '不清楚文件用途就删除', expectedResult: '删除后某些服务启动失败或系统功能异常', solution: '删除前确认文件作用，重要文件先备份到其他目录', recoveryMethod: '1. 如果服务异常，查看日志定位：journalctl -xe\n2. 重新安装对应软件包恢复文件：sudo apt install --reinstall 包名\n3. 从备份恢复：如果有备份文件，解压恢复\n4. 预防：删除前用 file 命令确认文件类型' }
      ],
      bestPractices: ['设置磁盘使用率告警（80%警告，90%紧急）', '配置日志轮转自动清理', '定期清理包缓存和临时文件', '监控大文件增长趋势', '重要数据定期备份到外部存储']
    }
  }
