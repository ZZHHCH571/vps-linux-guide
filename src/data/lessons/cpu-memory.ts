import type { Lesson } from '../types';

export const cpu_memory: Lesson = {
    id: 'cpu-memory',
    title: 'CPU/内存占用过高分析 - 服务器变慢怎么办',
    icon: "BarChart3",
    description: '监控系统资源使用，定位性能瓶颈',
    content: {
      analogy: 'CPU和内存就像人的大脑和工作台：CPU是大脑思考速度，内存是工作台大小。大脑转不过来或工作台堆满东西，工作效率就会下降。',
      explanation: '服务器变慢通常由以下原因导致：\n\n**CPU占用高**：\n- 某个程序陷入死循环\n- 大量并发请求\n- 复杂的计算任务\n- 挖矿病毒\n\n**内存占用高**：\n- 内存泄漏（程序bug）\n- 数据库缓存过大\n- 太多进程同时运行\n- 没有swap交换空间\n\n排查思路：\n1. 用top/htop查看整体资源使用\n2. 找出占用最高的进程\n3. 分析该进程是否正常\n4. 采取优化或限制措施',
      terms: [
        { name: 'CPU', fullName: 'Central Processing Unit', meaning: '中央处理器，负责执行计算任务' },
        { name: 'Memory', fullName: '内存/RAM', meaning: '随机存取存储器，临时存储运行中的数据' },
        { name: 'Swap', fullName: '交换空间', meaning: '磁盘上的虚拟内存，内存不足时使用' },
        { name: 'Load Average', fullName: '平均负载', meaning: '系统在1、5、15分钟内的平均负载程度' },
        { name: 'OOM', fullName: 'Out Of Memory', meaning: '内存耗尽，系统会杀死进程释放内存' }
      ],
      tools: [
        { name: 'top', description: '实时进程监控', usage: 'top' },
        { name: 'htop', description: '增强版top', usage: 'htop' },
        { name: 'free', description: '查看内存使用', usage: 'free -h' },
        { name: 'vmstat', description: '虚拟内存统计', usage: 'vmstat 1' }
      ],
      commands: [
        {
          description: '实时查看进程资源占用',
          command: 'top',
          output: 'top - 12:00:00 up 10 days,  3:45,  1 user,  load average: 0.50, 0.30, 0.20\nTasks: 100 total,   1 running,  99 sleeping\n%Cpu(s):  5.0 us,  2.0 sy,  0.0 ni, 92.0 id,  1.0 wa\nMiB Mem :   2000.0 total,    500.0 free,   1200.0 used,    300.0 buff/cache',
          explanation: '这是什么：实时显示系统资源和进程信息，每秒刷新。\n为什么要用：快速定位占用CPU或内存最多的进程。\n用了会怎么样：显示系统摘要和进程列表，按CPU使用率排序。\n输出含义：\n- load average：1/5/15分钟平均负载，数值小于CPU核心数表示正常\n- %Cpu：us用户空间，sy系统空间，id空闲，wa等待IO\n- MiB Mem：总内存、空闲、已用、缓存',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '进入实时监控界面，按q退出',
            outputExplanation: 'load average小于CPU核心数正常，id越高CPU越空闲'
          }
        },
        {
          description: '查看内存使用情况',
          command: 'free -h',
          output: '              total        used        free      shared  buff/cache   available\nMem:          2.0Gi       1.2Gi       500Mi        50Mi       300Mi       700Mi\nSwap:         1.0Gi       100Mi       900Mi',
          explanation: '这是什么：显示物理内存和交换空间的使用情况。\n为什么要用：了解内存是否充足，是否需要增加内存或优化应用。\n用了会怎么样：以人类可读格式显示内存统计。\n输出含义：\n- total：总内存\n- used：已使用\n- free：完全空闲\n- buff/cache：文件系统缓存（可回收）\n- available：可用内存（free + 可回收缓存）',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示内存和交换空间使用情况',
            outputExplanation: 'available是真正可用内存，低于20%需要注意'
          }
        },
        {
          description: '查找占用CPU最高的进程',
          command: 'ps aux --sort=-%cpu | head -10',
          output: 'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nmysql     1234 45.2 30.5 1234567 600000 ?     Ssl  Jan01 100:00 /usr/sbin/mysqld\nwww-data  5678 12.3  5.2  234567 100000 ?     S    Jan01  50:00 nginx: worker',
          explanation: '这是什么：按CPU使用率降序排列进程，显示前10个。\n为什么要用：快速找出导致CPU占用高的罪魁祸首。\n用了会怎么样：显示占用CPU最多的进程列表。\n输出含义：\n- %CPU：CPU使用率百分比\n- %MEM：内存使用率百分比\n- COMMAND：进程命令\n- TIME：累计CPU时间',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示CPU占用最高的10个进程',
            outputExplanation: '%CPU列显示CPU使用率，排第一的是占用最高的'
          }
        },
        {
          description: '查看系统负载历史',
          command: 'uptime',
          output: '12:00:00 up 10 days,  3:45,  1 user,  load average: 0.50, 0.30, 0.20',
          explanation: '这是什么：显示系统运行时间和平均负载。\n为什么要用：快速了解系统整体负载情况，判断是否过载。\n用了会怎么样：显示当前时间、运行时长、登录用户数和负载平均值。\n输出含义：三个数字分别是1/5/15分钟平均负载，对于单核CPU，1.0表示满载。',
          breakdown: {
            symbol: '$',
            meaning: '命令提示符',
            result: '显示系统运行时间和负载',
            outputExplanation: 'load average三个值，越小越好，超过CPU核心数表示过载'
          }
        }
      ],
      commonMistakes: [
        { error: '看到高CPU就kill进程', cause: '可能是正常的高负载业务', solution: '先分析进程是否正常，再决定是否优化或限制' },
        { error: '忽略swap使用', cause: '频繁使用swap会导致性能急剧下降', solution: '监控swap使用率，过高时需要增加内存' },
        { error: '只关注CPU忽略IO等待', cause: '磁盘IO瓶颈也会让系统变慢', solution: '用top查看wa（IO等待）百分比' }
      ],
      bestPractices: ['设置资源使用告警阈值', '定期分析性能趋势', '为关键服务设置资源限制（cgroup）', '优化慢查询和代码逻辑', '考虑水平扩展分担负载']
    }
  }
