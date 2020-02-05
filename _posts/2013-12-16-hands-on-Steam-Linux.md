---
layout: post
title: SteamOS Beta 动手玩
date: 2013-12-16
tags: Linux Game
origin: true
thumb: "/img/20131216/thumb.jpg"
from: http://www.omgubuntu.co.uk/2013/12/hands-on-steamos-beta
---
在大家翘首以盼到纷纷睡着(大雾)之后，Valve终于发布了SteamOS的Beta版本。于是我们就在第一时间把玩了一下这个基于Debian的衍生版系统。

<img src="{{site.cdn}}/img/20131216/000.jpg" />

SteamOS的发布总体来说有点鱼龙混杂。一方面这是由一家向Linux平台提供了众多给力驱动和杀手级游戏的公司研发出的最新Debian衍生版系统，另一方面，整个Beta版的安装略显凌乱。当然，Valve官方在放出Beta测试版的两个zip包（以及鲜明的警示：“安装此系统将会清空你的整个硬盘”）之时，就已经反复强调SteamOS现在还是在Beta测试阶段，而且并不推荐给除了“强悍的Linux折腾党”之外的朋友。

对于大部分玩家来说，没有尝试一下这次的SteamOS也许是因为你无法达到Valve提出的特殊的系统要求，又或者你不想冒险把自己的pc全部清空，所以我们就在这里快速地分享一下这个新系统的各个方面，让大家可以安全地围观一下Valve的最新作品。

## 安装过程

由于我们也不是太有耐心，我们选择了960MB的Debian安装版zip包，而不是那个2.4GB的系统恢复镜像。总体来说，这个安装程序还算比较成熟的，大部分工作可以无人值守自动完成。

<img src="{{site.cdn}}/img/20131216/001.jpg" /><br><small>
Debian安装器的Grub引导界面</small>

<img src="{{site.cdn}}/img/20131216/002.jpg" /><br><small>
无人值守安装进行中…</small>

<img src="{{site.cdn}}/img/20131216/003.jpg" /><br><small>
登录界面背后有个大大的Debian标志</small>

## 桌面环境

大家之前也许对于SteamOS桌面环境抱有疑问，它到底是一个独立可用的桌面操作系统，还是只能限制在Steam“大屏幕”+部分游戏自带界面的桌面环境呢？现在这个问题基本可以解决了，尽管Debian Wheezy源中很早就带了Gnome 3.4.2，SteamOS自带的还是Gnome 3桌面环境，也就是对“强悍的Linux折腾党”来说，很不幸，客户端侧（本地）窗口装饰管理器不能用了。

<img src="{{site.cdn}}/img/20131216/004.jpg" /><br><small>
原生的 Gnome Shell 桌面</small>

<img src="{{site.cdn}}/img/20131216/005.jpg" /><br><small>
自带冰鼬浏览器</small>

<img src="{{site.cdn}}/img/20131216/006.jpg" /><br><small>
自带的本地应用列表</small>

安装完成后，SteamOS自带的本地应用程序相当的少，唯一的桌面应用就是Valve的Steam本身，以及一个Valve的系统问题报告器——不过Valve很早就在GitHub上搭了个开发者社区 <https://github.com/ValveSoftware/SteamOS>

## SteamOS界面

SteamOS的系统界面基本上就是Steam“大屏幕”模式加上一些Steam Machine主机用的系统选项，比如在Steam界面设置里带了一个访问Linux桌面的选项什么的。如果你之前就用过Steam“大屏幕”模式，那这些操作你应该不会陌生。如果你不喜欢，那么Valve的“10英尺界面”对鼠标键盘（乃至Steam控制器）的支持也还算流畅舒适——毕竟我们广大群众还没有办法享用到Steam Machine原型机。

下面是一些图片：

<img src="{{site.cdn}}/img/20131216/007.jpg" />

<img src="{{site.cdn}}/img/20131216/008.jpg" />

<img src="{{site.cdn}}/img/20131216/009.jpg" />

<img src="{{site.cdn}}/img/20131216/010.jpg" />

<img src="{{site.cdn}}/img/20131216/011.jpg" />

<img src="{{site.cdn}}/img/20131216/012.jpg" />

## 杂项

虽然正常的桌面模式在SteamOS里也是可以用的，但Valve在这个系统里只包含了它自己的源： repo.steampowered.com ，也就是你无法通过这个源安装大多数的Debian包。比如Banshee、Rythmbox或者KDE库之类的东西。

虽然Valve明确提出SteamOS beta需要64-bit处理器才能跑，不过我们在SteamOS官方源里也发现了i386的包，所以也许你等到SteamOS正式版发布的时候，就能得到32-bit版SteamOS系统了。

对于那些关注SteamOS的系统授权的朋友们，Valve表示“基本的操作系统组件”将保持开源，但Valve自己的Steam客户端以及其他第三方驱动将还是闭源的。

不过既然这是一个基于Debian的衍生版Linux系统，你想要自己安装驱动应该是不会太麻烦——比如更新nVidia驱动、安装本次版本并未附带的AMD或者Intel驱动，甚至想办法引入同类硬件的开源驱动等——不过你得明白，一切后果自负。话是这么说，不过Valve还是表示将会尽可能地保持和Debian包管理系统的兼容性，如果用户真的希望用自己的驱动来跑的话。

_“...我们期望继续与 debian 的包管理系统在很大程度上兼容。”_

<hr>

_本文已发布于[纯美苹果园](http://www.goddessfantasy.net/bbs/index.php?topic=64299.0)，作者：欧剃。转载请保留此行_


