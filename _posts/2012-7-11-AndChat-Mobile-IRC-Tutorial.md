---
layout: post
title: 手机跑团软件 AndChat 简明教程
tags: Linux Game
origin: true
thumb: "/img/20120711/thumb.png"
---

## AndChat 是什么

<img src="{{site.cdn}}/img/20120711/001.png" />

### 简介

_（以下翻译自软件在Google电子市场里的介绍）_

AndChat 是一个支持多服务器登录的手机IRC客户端，支持各种运行安卓1.6及以上版本的手持设备，如手机，平板电脑等。它还为平板电脑专门配置了界面。软件更新历史见： http://min.ie/2rk

### 特性
* 多服务器登录支持
* 多种编码支持
* UTF-8 字符集探测
* 聊天记录
* 昵称自动完成功能：可以按搜索按钮或者长按输入框来自动补完昵称。在HoneyComb或更高版本的Android系统里，还可以用点击输入框旁白的搜索图标的方式来补完昵称。
* 打字历史反查（使用轨迹球上下滑动）
* 显示时间戳
* 支持对多个昵称的高亮显示
* 兼容安卓系统通知模块
* SSL 加密连接支持
* 显示用户列表

### 如何获取
AndChat目前支持几乎所有 Android 1.6 以上的设备，
* 免费获取：https://play.google.com/store/apps/details?id=net.andchat
* 支持作者：https://market.android.com/details?id=net.andchat.donate
* 官方IRC频道: irc.ext3.net, #andchat

## AndChat的使用

<img src="{{site.cdn}}/img/20120711/002.png" />

在功能表中点按图标以启动AndChat，就是右上角的那个绿色井号图标。

打开以后，会进入First Run欢迎界面。英文好的同学可以点Next，按照提示设置昵称什么的。

* Nick 1-3 是你希望使用的昵称，UserName和realname需要是英文，可以随便设置。
* Encoding 就是你使用的编码，推荐使用utf-8
* Enable Log 就是开启日志记录，推荐开启。

以上欢迎界面的设置也可以Skip，无影响。

<img src="{{site.cdn}}/img/20120711/003.png" />

一路Next到底，或者Skip之后，就到了上图的主界面了。

在右上角点那个+号按钮，进入添加新服务器的设置界面。（ +号右边的圆形图标是设置按钮，最右边的“...”中，藏着帮助和退出按钮。）

<img src="{{site.cdn}}/img/20120711/004.png" />

点击+号以后，在Basic Settings里，设置服务器的信息：
* Name是一个显示的名称，可以随便填
* Address是服务器地址 irc2.eastgame.org 或 irc3.ourirc.com ，Port是端口号（加密连接用7001，非加密连接使用6668）
* 在Extra Settings里可以设置个人信息（如果你在欢迎界面设置过了，这里将会自动使用你的设置）
* 关于服务器的设置，可以参考本文的“连接到服务器”一节。

<img src="{{site.cdn}}/img/20120711/005.png" />

接下来是：
* AutoJoin, 就是你进入这个服务器的时候需要自动进入的频道的名字（可不填），用英文逗号隔开。
* Autorun是你进入这个服务器以后需要自动运行的irc命令（可不填），每行一个命令。
* Password是你的昵称密码（Nickserv密码）
* Encoding 就是你使用的编码，推荐使用utf-8

填完记得点上方的软盘图标保存喔～

<img src="{{site.cdn}}/img/20120711/006.png" />

保存完后，又回到了上面的主界面。于是点击你刚添加的服务器，进入。

进入后如上图的界面。

* 在频道名上滑动手指可以在不同的多个频道间来回。
* 上面的按钮分别为（从左往右） 断开/重联服务器、显示用户列表、复制聊天记录、设置。
* 在下面的输入框可以使用各种irc命令。在#新兵训练营打 !get irc学堂 可以获得一个关于irc命令的介绍。
* 使用轨迹球上下滑动会显示你上次打字的历史，按下轨迹球就发出去了
* 可以按搜索按钮或者长按输入框来自动补完昵称。在HoneyComb或更高版本的Android系统里，还可以用点击输入框旁白的搜索图标的方式来补完昵称。

<hr>

嗯，有什么具体的问题欢迎留言。也欢迎其他客户端的爱好者分享经验～～

目前AndChat的主要问题是…… 它似乎不显示自定义的颜色…… 嗯，这似乎是个难题…… @@

_本文已发布于[纯美苹果园](http://www.goddessfantasy.net/bbs/index.php?topic=49557.msg449509#msg449509)，作者：欧剃。转载请保留此行_
