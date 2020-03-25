---
layout: post
title: LABO 编程，从入门到收购废纸皮
star: true
origin: true
thumb: "/img/labo/thumb_img1.jpg"
tags: Udacity Game
excerpt: "我读书少，你不要骗我啊！这个 Labo 到底是个啥，这么牛逼？"
---
<img src="{{site.cdn}}/img/labo/img1.jpg">

在去年，全球知名扑克牌生产企业任天堂凭借 Nintendo Switch 主机又大火了一把，首发的《塞尔达传说：旷野之息》、《超级马里奥：奥德赛》分别获得美国《时代》杂志评选出的“年度十大游戏”的冠亚军，可谓大获全胜。

而今年，任天堂又搞了个大新闻，开发了一套名为 Nintendo Labo 的破纸皮，给 Switch 带来了更加丰富独特的体感游戏体验，有些人评论说这货就像是种“魔术”，还有人说它能吊打索尼微软的最新科技……

“又一次，任天堂用一个成本并不高、本身也非前沿的技术的 Labo 产品，告诉世界，游戏创意本身比技术要重要的多了。” —— 科技媒体 PingWest 品玩

喂，我读书少，你不要骗我啊！这个 Labo 到底是个啥，真的这么牛逼？

## 你从没van过的“船新”纸模

<img src="{{site.cdn}}/img/labo/img2.png">

Nintendo Labo 是任天堂开发的一系列手工DIY纸模套件的总称，套件里包含纸模所需的各种零件和一个任天堂 Switch 平台的配套游戏软件。组装完成后的纸模可与 Switch 的 Joy-Con 手柄以及本体装配在一起，组合成名为 Toy-Con 的玩具套件，再配合相应软件进行体感互动游戏。

2018年4月20日发售的第一批 Labo 套件包含两款不同的纸模包：一是“机器人套件”，能打造一副简单的穿戴式体感设备，让玩家大屏幕上体验驾驶高达的感觉；另一个就是我们要讨论的重点，“五合一游戏套装”。

<img src="{{site.cdn}}/img/labo/img3.jpg">

按说明，这款套件中包含遥控车、钓鱼、宠物小屋、竞速摩托和纸板钢琴5个体感互动游戏所需的纸模和零件。

任天堂官方介绍中用的三个关键词，就很好地概括了这些 Toy-Con 游戏套件的游戏体验：Make（制作）、Play（游玩）、Discover（探索）。

玩家开箱后，需要自己按照附带游戏软件里的动态装配图解，动手制作出每一件游戏纸模。拜任天堂设计精巧的纸板结构所赐，全程几乎不需要胶水黏贴和裁剪（手残党表示这可以说非常贴心了）。

之后，玩家将 Switch 的 Joy-Con 控制器装在纸模上，通过各种纸板零件，能和游戏中的角色或其他纸模零件产生互动。

你以为这就是全部的游戏内容？太小看任天堂啦！这 5 款小游戏全部带有自定义编程等“船新的玩法”呢！

## 编程功能其实并不是 Switch 的首创

寓教于乐，可谓是任天堂多年一贯的传统。还记得小时候玩过的各种XXXX学习机吗？它们其实都多多少少山寨了任天堂FC红白机在1984年推出的一款 Family BASIC 编程套件。

<img src="{{site.cdn}}/img/labo/img4.jpg">

↑这个大家应该都认得（图片来源：电子发烧友网）

<img src="{{site.cdn}}/img/labo/img5.jpg">

↑这个就是当年任天堂FC红白机的外设： Family BASIC 编程键盘和程序卡带（图片来源：维基百科）

<img src="{{site.cdn}}/img/labo/img6.jpg">

↑为了让FC能支持更多扩展存储，任天堂还出过配套的磁带存储器。（图片来源：维基百科）

<img src="{{site.cdn}}/img/labo/img7.jpg">

↑Family BASIC 在模拟器上的运行截图（程序来源：metopal.com ）

虽然我没有玩过 Family BASIC，但小霸王上的编程、编乐谱等功能也曾给我留下深刻的印象，那些按照指令在屏幕上漂移的迷宫、像素马里奥等形象，几乎可以算是建立了我对计算机编程最初的好奇和憧憬。

## LABO 的新花样可不少

<img src="{{site.cdn}}/img/labo/img8.jpg">

如今的 Nintendo Labo ，依然很好地继承了前辈们“在玩中学”的优良传统。

即使对编程毫无概念的小朋友，在 Discover 页面也能通过互动动画实时了解这5个游戏各自蕴含的科技原理，比如纸板钢琴的内部其实是中空的，那 Joy-Con 是如何识别按键的？这类问题都在对应的小书本图标里有所解答。

在做好至少一个 Toy-Con，并且了解了其原理之后，神秘的 Labo 编程实验室才会对玩家开放。

<img src="{{site.cdn}}/img/labo/img9.jpg">

看到上图中的井盖了吗？从那里跳下去，你会来到一片前所未有的独特天地：

<img src="{{site.cdn}}/img/labo/img10.jpg">

我们常见到面向对象，面向过程的编程方式，而 Labo 采用的是已经封装好的事件触发驱动的编程方式。简单来说，就是设定好当你对 Joy-Con 、 Toy-Con 或是机器本体做了什么事的时候，该触发什么效果。编程的方式也简单明了，把代表事件的 Input 方块，和代表触发效果的 Output 方块用线连起来就可以了。

<img src="{{site.cdn}}/img/labo/img11.jpg">

内置可用的 Input 类型有 8 大类：

* Toy-Con： 用 Labo 游戏的纸模来触发事件
* If an IR Marker is Seen： 当红色手柄的红外线摄像头捕获到红外标记时触发的事件
* Console：由 Switch 主机的状态触发
* If the Joy-Con is Face Up：当某个手柄静止在某个特定的姿态时触发
* If a Control Stick is Moved： 推动某个手柄的摇杆时触发
* If a Button is Pressed：按下某个按钮时触发
* If Shaken：摇晃某个手柄时触发
* If Touched：点击主机屏幕上的 Input 方块时触发

Output 则简单的多，只有4种：
* Emit IR Light：激活某个手柄的红外摄像头，放出红外照明光
* LightUpScreen：点亮屏幕上的 Output 方块
* Make Sound：主机发出特定的声音
* Vibrate：手柄震动

此外，还提供了6种中间方块，用于逻辑运算：
* Comment：注释方块，我知道你们都不看它
* Bullseye：和红外标记联动，当红外摄像头捕捉到的标记位于 Bullseye 方块内时触发
* Counter：计数器，当 input 触发的次数达到指定数字时触发，可以设置 input 触发时将增加，减少数字，还是将计数器归零
* Timer：计时器，定时触发事件
* NOT：非运算，当 Input 方块没触发时，触发连接到的 Output 方块
* AND：与运算，当连接到的多个 Input 方块都触发时，触发连接到的 Output 方块

你也许会问，那“或运算 OR ”去哪里了？由于每个 Input 方块可以连接到多个 Output 方块，反之亦然，所以不用 And 方块的时候，就默认是 OR 的关系，也就是当连接到的多个 Input 方块中的任意一个被触发时，对应的 Output 方块就被触发。

<img src="{{site.cdn}}/img/labo/img12.jpg">

具体每一大类中都有许多代表不同事件的触发方块可选：

<img src="{{site.cdn}}/img/labo/img13.jpg">

各种事件方块还可以进行详细设置，比如按下按钮的方块，可以设定具体哪个手柄的哪个按钮按下才触发：

<img src="{{site.cdn}}/img/labo/img14.jpg">

听起来是不是非常有意思？没错，兼顾了趣味丰富、简明直观、功能全面，还有多种传感器和 Toy-Con 加持的 Nintendo Labo 真是老少（码农）咸宜，特别适合家长和孩子一起学编程！（不，我真的不是为了自己玩买的 Switch！）

<img src="{{site.cdn}}/img/labo/img15.jpg">

## 他们怎么玩的这么6啊

Labo才发售两天，微博上的 @NS新闻速报 就马上搞出了个山寨 Quick Draw （对，就是 1-2-Switch》里的快枪手游戏，对战双方需要在倒计时结束后迅速拔枪对射），自称总共用了40个节点，包含了倒计时，提示音……

游戏界面是这样的：

<img src="{{site.cdn}}/img/labo/img16.jpg">

游戏“代码”一览：

<img src="{{site.cdn}}/img/labo/img17.jpg">

无独有偶，不满足于 Labo 只能弹钢琴的音乐大佬 @刘毅宁 直接开发出了一款大师之……二胡！利用 Joy-Con 的按键，加上动作感应，再区分内弦外弦，演奏的感觉相当逼真！

<img src="{{site.cdn}}/img/labo/img18.jpg">

<img src="{{site.cdn}}/img/labo/img19.jpg">

<img src="{{site.cdn}}/img/labo/img20.jpg">

除了纯玩，还有人把 Labo 的编程入门功能用于改善人们的生活质量。比如一般的电动轮椅，在有些手部不方便的人士看来，必须通过按钮控制还是挺辛苦的。日本的オリィ研究所和任天堂合作，拿 Labo 的摩托车部件，做了一个电动轮椅控制器！用户只需要左右前后摇晃摩托车 Toy-Con ，即可实现前进后退转弯等功能——要是这个功能得以推广，也是特别贴心了～

<img src="{{site.cdn}}/img/labo/img21.jpg">

此外，任天堂还放出了许多Toy-Con图纸，你可以自己收购一堆废纸皮来打印，组装成额外的 Toy-Con 部件，可以说是特别贴心了……

<img src="{{site.cdn}}/img/labo/img22.jpg">

## 编程 ＝ 玩 ＋ 创造

看了这么多，你心动了吗？是不是也打算自己买一套回来玩？但这其实并不是重点，因为虽然 Switch 花样繁多，但它自带的编程功能毕竟比较简单，在应对复杂的过程和对象时往往力不从心，也缺乏 NAND 、 XOR 等数据分析功能，输出也只有简单的几种… 啊，扯远了，真正的重点在于， Labo 通过简单的“低科技”技术，和非凡的创意，实现了相当魔幻的体感游戏效果，真正把编程分解成了“玩”和“创造”，将编程学习的门槛又放低了许多。

曾几何时，编程还是只有专门的计算机专家才能完成的，在黑黢黢的屏幕上上下闪烁着诡异文字的神秘技术。但随着新的编程工具不断出现，以及 Scratch、乐高编程机器人等不断普及，编程思想和编程技术也逐步为大家（特别是少年儿童）所熟悉，所掌握。而 Labo ，正是这片全新的星辰大海中，最耀眼闪亮的新星。

嗯，不打算买《给宝宝的 C++ 教程》了，先去买套 Labo 吧。（逃

<img src="{{site.cdn}}/img/labo/img23.jpg">

_（本文已投稿给「[优达学城](https://cn.udacity.com)」并[发表](https://cn.udacity.com/blog/post/27)。 作者：欧剃 转载请保留此信息）_