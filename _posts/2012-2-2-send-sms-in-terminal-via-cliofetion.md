---
layout: post
title: 命令行下发送飞信到好友爪机
tags: linux
origin: true
thumb: "/assets/images/code-1839406_640.jpg"
---

最近爱上终端命令行界面的软件，搭配SSH + Tmux的远程使用，挂irc啥的完全无压力。但是跟人短信聊天还是免不了要开个图形界面的飞信，太蛋痛了，怎么办？

经寻觅，找到了这个玩意。可以搭配Tmux/Screen使用，在命令行下发短信的效果很棒。

> cliofetion 是 libofetion 的一个实现，可以支持中国移动的飞信协议，往你的飞信好友的手机上发短信。
> 目前可以在大多数 POSIX 兼容系统上编译通过，已测试的环境有 Linux，FreeBSD 和 Mac OSX。

* 项目主页： http://code.google.com/p/ofetion 和 http://basiccoder.com/openfetion 
* 下载点： http://code.google.com/p/ofetion/downloads/list

最新版本是 cliofetion-standalone-2.2.2.tar.gz，需要libofetion库。

不过，这货每次都需要手动填写登录账户信息和对方发送，太麻烦了，于是手写了一个简单的 python 脚本，调用cliofetion，给人发短信。

```python
#!/usr/bin/python
# -*- coding: UTF-8 -*- 
# FileName: SendSMS.py

import commands

MOBILENUM = 12345678901   #你的移动电话号码
PASSWD = '******'         #你的飞信密码
EMPTYNAME = '张三'          #默认发信对象

#filename = SendSMS
NumDict = { 'self':MOBILENUM,
            '自己':MOBILENUM,
            '张三':77777777777,
            '李四':33333333333,
            '赵五':22222222222,
            '钱咪':11111111111,
            '孙凌':22222223123,
            #可以按此格式继续添加通讯录
          } 


QuitFlag = True

while(QuitFlag):
   ErrorStatus = True
   targetname = ''
   targerNumber = ''
   print ''
   print '--------------CliOpenFetion v2.2.2---------------'
   targetname = raw_input('  * 请输入要发信的号码(输入quit退出)：')
   
   if targetname == 'quit' or targetname == 'exit':
      QuitFlag = False
      ErrorStatus = False
   elif targetname == 'help':
      print '  * 目前通讯录中含有：'
      print '  *','、'.join(i for i in NumDict.keys())
      ErrorStatus = False
   elif targetname == '':
      targetname = EMPTYNAME
   elif targetname.isdigit():
      targetNumber = targetname
      if NumDict.values().__contains__(targetname):
         for i in NumDict.items():
            if i[1] == targetname:
               targetname = i[0]
               break
   else:
      ErrorStatus = False
      targetNumber = ' <错误的输入，请输入一个手机号码，或可用的昵称。>'
   

   if NumDict.__contains__(targetname):
      ErrorStatus = True
      targetNumber = NumDict.get(targetname)

   if ErrorStatus:
      print '  * 发信目标为：%s(%s)' % (targetname,targetNumber)
   elif targetname == 'help':
      print
      #do nothing
   elif targetname == 'quit':
      print '',
      #do nothing
   elif targetname == 'exit':
      print '',
      #do nothing
   else:
      print targetNumber

   if QuitFlag and ErrorStatus:
      print '  * 请输入要发送的信息，按回车结束：'
      sendMSG = raw_input('\> ')
      if len(sendMSG) > 0:
         OUTCMD = 'cliofetion -f %s -p %s -t %s -d "%s"' % (MOBILENUM,PASSWD,targetNumber,sendMSG)
         print '  * 消息发送中，请稍候……'
         SendResult = commands.getstatusoutput(OUTCMD)
         if SendResult[0] == 0:
            print '  * 已经成功发送至 %s(%s)！' % (targetname,targetNumber) #, SendResult
            print
         else:
            print '  * 出现错误: ' ,SendResult[0]
            print '-------------------------------------------------'
            print SendResult[1:]

      else:
         print ' <无信息内容，取消发送……>'

print ' * 关闭程序...'
print '-------------------------------------------------'
```

_本文已发布于[纯美苹果园](http://www.goddessfantasy.net/bbs/index.php?topic=45527.msg399567#msg399567)，作者：欧剃。转载请保留此行_
