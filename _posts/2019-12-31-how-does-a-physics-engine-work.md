---
layout: post
title:  为了送个快递我摔了无数个“狗吃屎”，故意为难我是不？是。
tags: Guokr Science Game
excerpt: 生存不易
from: https://www.guokr.com/article/442356/
star: true
origin: true
thumb: "/img/20191231/thumb.jpg"
---

<img src="{{site.cdn}}/img/20191231/001.gif"><br>
<img src="{{site.cdn}}/img/20191231/002.gif"><br>
<img src="{{site.cdn}}/img/20191231/003.webp"><br><small>
闻者落泪 | 图1、图2作者制作；图3见水印</small>

是的，以上这些**惨无人性**的图均出自今年11月在 PlayStation 4 平台发售的开放世界动作冒险游戏**《死亡搁浅》**，它以令人震惊的视觉表现，充满真实感的游戏体验，以及独特的背景设定吸引了无数玩家的目光。光是游戏发售首周就售出了 18.5 万份，在日本、台湾、韩国、意大利等地都获得了销售冠军。

<img src="{{site.cdn}}/img/20191231/004.webp"><br><small>
《死亡搁浅》宣传图 |  游戏官网</small>

虽然媒体和玩家对《死亡搁浅》的评价呈两极分化态势，<span class="hl">但总体争议都围绕着游戏的“送快递”玩法</span>。游戏本身刻画细致入微，令人不由置身其中的“真实感”，这一点得到广大玩家的普遍承认。一方面，有的玩家认为，《死亡搁浅》的“剧情、音乐、画面、氛围渲染都是满分神作的级别，单单一个游戏性略欠打磨罢了”；另一方面，有的玩家表示，这种“史上最细致的地貌，任何一小块地形都能对你的行走产生影响”以及“背上沉重的货物，**在复杂的地形间维持平衡”的真实性设定，“好像在故意刁难玩家一般”**，让游戏的难度变得相当“令人印象深刻”。

<img src="{{site.cdn}}/img/20191231/005.jpg"><br><small>
《死亡搁浅》游戏截图 | 游戏官网</small>

<span class="hl">这种真实感要归功于制作者使用的游戏引擎“Decima”。</span>

一般来说，游戏引擎中包含了图形渲染引擎、物理引擎与碰撞检测系统、音效播放、脚本控制等多个子系统，有的引擎（比如 Decima）还带有一定程度的人工智能。就《死亡搁浅》来说，除了角色动作大量采用真人动作捕捉技术，超细致地对游戏场景进行建模以外，最重要的是在背后运行着整个游戏世界的，开发者的“神秘魔法”：<span class="hl">物理引擎</span>。

## 物理引擎是什么？

通俗地说，<span class="hl">物理引擎是一个模拟牛顿力学模型的计算机程序</span>，根据给定物体的尺寸、质量、速度、摩擦力，甚至空气阻力等变量，计算出这些物体在不同条件下的运动情况。

在游戏里，**物理引擎负责模拟出游戏场景中出现的所有可交互的实体**，计算出它们彼此之间、它们和游戏场景本身（比如地形、建筑等不可互动的东西）之间的相互运动（以及碰撞、破碎等）情况，再将计算的结果通过游戏引擎的其他部分进行处理（比如生成图像和声音、修改比分、甚至改变场景元素等），最后才呈现在玩家的面前。

<img src="{{site.cdn}}/img/20191231/006.webp"><br><small>
《EVERSPACE》游戏截图 | 作者截图</small>

按照模拟精度的不同，**物理引擎一般分为<span class="hl">实时（real-time）物理引擎</span>和<span class="hl">高精度（high-precision）物理引擎</span>两类**。

**为了保证游戏的流畅与视觉效果的连贯**，物理引擎需要在相当短的一个单位时间内（例如一帧≈1/60秒）计算出接下来一个单位时间内所有物体的运动情况。**由于计算机的运算能力有限，物理引擎往往必须在合理的范围内降低精确度，以保证运算速度**。比如，在建模时把所有可交互的实体当作均质的圆柱体/长方体来处理，射击游戏中不计算子弹的飞行曲线，用半透明贴图代替烟雾颗粒的布朗运动，在计算平方根倒数时用“魔法数” 0x5f3759df 求一个近似值代替等等……我们一般就把这种引擎称为<span class="hl">实时物理引擎</span>。

<img src="{{site.cdn}}/img/20191231/007.webp"><br><small>
《Destiny2》游戏截图 | 作者截图</small>

相对的，为了保证**计算结果的精确性**，建模时进行了**足够细致的划分**，并设定对应的物理参数，让计算机耗费更多的处理能力和处理时间，更精确地模拟物体的运动情况。这样的物理引擎就是<span class="hl">高精度物理引擎</span>，它常常在科学研究和电脑动画制作方面大显身手。

<img src="{{site.cdn}}/img/20191231/008.webp"><br><small>
ADAMS物理模拟器 | Youtube 视频题图</small>

为了直观地感受两种物理引擎的效果，我们拿《魔兽世界》（World of Warcraft）游戏做个例子：

<img src="{{site.cdn}}/img/20191231/009.jpg"><br><small>
上：《魔兽世界》游戏片头动画中的矮人形象，下：游戏角色创建页面中的矮人形象 | 作者截图</small>

在片头动画中，这个矮人角色细致的发须在凌冽风雪的吹拂下不断挥动。这看起来是用高精度物理引擎建模的，而且开发者预先完成了动画的渲染工作，计算机只是简单地播放渲染好的视频流，不涉及任何游戏引擎的计算。在游戏内，经过三维建模时的简化，实时物理引擎把整个胡须作为一个整体进行考虑，经过渲染器实时计算出角色的动作。

## 游戏里的“真实世界”

早在1972年11月，电子游戏史上第一个街机电子游戏《乓》（Pong）里就带有一个简单的实时物理引擎，负责计算那个代表小球的光点移动速度和方向，以及在屏幕边缘或是玩家控制的长条板上碰撞之后的反弹角度。

<img src="{{site.cdn}}/img/20191231/010.gif"><br><small>
《乓》游戏界面 | giphy</small>

随着计算机运算能力的增长和显示能力的提升，游戏中能呈现的内容也更加丰富，物理引擎能支撑的游戏玩法也变得五花八门。<span class="hl">有些游戏就把模拟真实世界的物理引擎作为其主要玩法</span>。下面，我们一起来看看几个有特色的电子游戏吧：

### 坎巴拉太空计划（Kerbal Space Program）

<img src="{{site.cdn}}/img/20191231/011.webp"><br><small>
《坎巴拉太空计划》宣传图 |  游戏商店页面</small>

作为一个轻松愉快（并不）的航天发射模拟游戏，《坎巴拉太空计划》的画风比较清新明快，甚至还有点卡通，**但它的物理引擎相当硬核**。

在游戏中，你可以使用各式各样的部件，来“根据**现实中的空气动力学和轨道物理学原理**组装能够飞行的全功能航天器”。把你的小绿人送入轨道及太空中，并保证他们存活下来。

<img src="{{site.cdn}}/img/20191231/012.webp"><br><small>
《坎巴拉太空计划》游戏截图 |  游戏商店页面</small>

当欧空局的罗塞塔号在彗星上放出登陆器“菲莱”的时候，**果壳网友 WAVECHASER X 用《坎巴拉太空计划》极为逼真地模拟出了罗塞塔号从地面发射到菲莱号登陆的全过程**。

<img src="{{site.cdn}}/img/20191231/013.webp"><br><small>
用《坎巴拉太空计划》模拟的罗塞塔号任务。没错就是这么硬核。| WAVECHASER X 的视频截图</small>

甚至连 SpaceX 的老板伊隆·马斯克也半开玩笑地说，他也在这个游戏里测试 SpaceX 的宇宙飞船呢。

### 红色派系（Red Faction Guerrilla）

<img src="{{site.cdn}}/img/20191231/014.webp"><br><small>
《红色派系》宣传图 | 游戏商店页面</small>

《红色派系》是一个动作射击游戏，它和其他射击游戏的不同之处在于，**游戏中的几乎一切建筑物、构筑物、掩体、路障都是可破坏的**。游戏的物理引擎把建筑物的各种梁、柱、墙面结构都作为单独的实体进行追踪，爆炸时产生的大片碎块和粉尘等粒子都能以非常真实的方式四散飞开。

<img src="{{site.cdn}}/img/20191231/015.webp"><br><small>
《红色派系》游戏截图 | 游戏商店页面</small>

敌人守住了门口？没关系，从墙上炸个洞进去！敌人火力太猛？还是没关系，把整座房子端掉！

然而，炸炮楼这件事还有讲究。在游戏中，你可不是像小兵张嘎一样，把炸药包往那一丢就完事了。你在游戏中也得**找准承重的梁和柱子**，才能最大化炸药的效率。

<img src="{{site.cdn}}/img/20191231/016.webp"><br><small>
《红色派系》游戏截图 | 作者截图</small>

### 尘埃（Dirt）系列

<img src="{{site.cdn}}/img/20191231/017.webp"><br><small>
《尘埃·拉力赛》宣传图 | 游戏商店页面</small>

《尘埃》系列是顶尖的越野赛车模拟竞速游戏，作为世界拉力锦标赛（World Rallycross Championship）的官方指定游戏，**它的物理引擎在拟真方面做到了极致**。

<img src="{{site.cdn}}/img/20191231/018.webp"><br><small>
《尘埃4》游戏截图 | 游戏商店页面</small>

游戏中的 50 多辆赛车都具有其特定的加速性能、惯量、重心和操控性，多变的天气、不同的赛道路面，**甚至连轮胎花纹的选择都会直接反映在操控的感觉之中**。除了飙车漂移外，车辆之间的剐蹭，车辆和赛道设施的碰撞，**连车身的磨损和破坏都被完美的模拟了出来**。

<img src="{{site.cdn}}/img/20191231/019.webp"><br><small>
《尘埃4》游戏截图 | 游戏商店页面</small>

看我排水沟过弯呀嘿！

### 桥梁建造师（Bridge Constructor）

<img src="{{site.cdn}}/img/20191231/020.webp"><br><small>
《桥梁建造师》宣传图 | 游戏商店页面</small>

在这个游戏里，你作为一名桥梁工程师，要利用有限的预算，在各种奇形怪状、条件简陋的地貌上建桥，方便车辆通过。

<img src="{{site.cdn}}/img/20191231/021.webp"><br><small>
《桥梁建造师》游戏截图 | 游戏商店页面</small>

在游戏中，你要考虑**材料自重、抗拉/压强度、平衡性以及瞬时最大载荷等各种物理问题**，还得想方设法节约经费（太抠门了吧）。好在最终测试的时候，你的桥最低只要能撑住两辆小轿车活着通过就算过关（就算过关的同时桥马上塌了也行）。

<img src="{{site.cdn}}/img/20191231/022.webp"><br><small>
《桥梁建造师》游戏截图 | 游戏商店页面</small>

但如果你有强迫症，希望达到最大限度的支撑强度的话，那可要费不少脑子呢。


## 和现实并不完全相同的体验
 
当然，根据游戏的玩法和设定不同，游戏里的物理引擎也不一定就得完全模拟现实世界。有些游戏里，**物理引擎带给我们的是一个和现实并不完全相同的体验**，玩家可以体验一个有着不同物理属性的世界。

### 围攻（besiege）

<img src="{{site.cdn}}/img/20191231/023.webp"><br><small>
《围攻》宣传图 | 游戏商店页面</small>

《围攻》是一款以物理机械建造为基础的沙盒式建造游戏。按官方说法，“玩家可以在游戏里建造中世纪的攻城机械，将巨型堡垒及宁静村落夷为废墟”。但玩家可建造的东西可并不局限在中世纪范围里。事实上，**能够限制你的只有你脑洞的大小**。

<img src="{{site.cdn}}/img/20191231/024.gif"><br><small>
在《围攻》中建造机械 | 游戏商店页面</small>

从柴油朋克的喷火装甲车，到两足步行战斗机甲，甚至星战里天行者的飞梭赛车，你都能用这堆木头、金属块，加上各种齿轮和皮带传送组件拼装出来。

<img src="{{site.cdn}}/img/20191231/025.webp"><br><small>
玩家制作并分享的《围攻》机械 | 游戏创意工坊页面</small>

没错，在现实中，一个木头上装个风扇并不能让它直接飞起来，**但现实中你也没法享受开自己拼装的 B-52 轰炸机把敌人堡垒炸平的快感**啊~

### 人类：一败涂地（Human: Fall Flat）

<img src="{{site.cdn}}/img/20191231/026.webp"><br><small>
《人类：一败涂地》宣传图 | 游戏商店页面</small>

《人类：一败涂地》是一款特色非常明显的，基于物理特性的解谜探索游戏。

游戏中，你操控的是一坨软绵绵晃悠悠的白色人偶，跳也跳不高，跑也跑不快，除了从多高摔下来都不会有事以外，没什么超能力。

<img src="{{site.cdn}}/img/20191231/027.webp"><br><small>
《人类：一败涂地》游戏截图 | 作者截图</small>


游戏的物理引擎忠实地还原了每个物件，可以充分互动，你可以把任何想拿的东西拿起来（如果它没有被固定在地上），爬到任何你软绵绵的双手能攀上的地方。但鬼畜的是，**你得用两个鼠标按键独立控制双手的抓握和放松，并用鼠标的移动来控制手部的推拉用力**，并想办法解决制作者堆在你面前的一个又一个场景谜题。

<img src="{{site.cdn}}/img/20191231/028.webp"><br><small>
《人类：一败涂地》游戏截图 | 作者截图</small>

对我来说，谜题没什么难度，主要难度在控制这个东西…

### 蜡笔物理学（Crayon Physics）

<img src="{{site.cdn}}/img/20191231/029.webp"><br><small>
《蜡笔物理学》宣传图 | 游戏商店页面</small>

这是个把“**物理学**”写在标题中的游戏。《蜡笔物理学》是一个二维解谜游戏，你需要在关卡中用蜡笔画出各种图形，画出的图形会自动变成二维实体，通过与谜题中的其他物件产生物理碰撞，让一个红色小圆圈滚动到制定的目的地。

<img src="{{site.cdn}}/img/20191231/030.webp"><br><small>
《蜡笔物理学》游戏截图 | 游戏商店页面</small>

**游戏里的各种物件在互相作用的时候，能很好地遵循牛顿定律**。地面有摩擦力，有的谜题会用到铆钉和连杆，根据你画出的图形的大小，生成的实体的重量也会不一样……这个游戏世界的拟真度还真的挺高——除了它们都是蜡笔画出来的之外。

<img src="{{site.cdn}}/img/20191231/031.webp"><br><small>
《蜡笔物理学》游戏截图 | 游戏商店页面</small>

## 驱动世界的引擎

在游戏世界之外，物理引擎（不管是高精度的还是实时的）<span class="hl">在现实世界的教育、生产、科研中都大有用武之地</span>。

<img src="{{site.cdn}}/img/20191231/032.webp"><br><small>
《互动物理学》（Interactive Physics）教学软件截图 | 软件官网</small>

在教学上，**物理实验模拟软件本身几乎就可以被看作是一个游戏**。通过计算机仿真实验，学生可以方便地在理想条件下重复许多物理实验，直观地进行分析和讨论。像《宇宙沙盒》（Universe Sandbox）这样的模拟游戏，就几乎可以直接当作<span class="hl">天体物理模拟器</span>，用来学习天文学、物理学方面的知识。

<img src="{{site.cdn}}/img/20191231/033.webp"><br><small>
《宇宙沙盒》游戏截图 | 游戏商店页面</small>

在飞行器和汽车的生产过程中，为了测试和优化设备的空气动力学特性，往往需要在风洞中进行测试。然而，真实风洞的架设和使用成本都很高，而且难以长时间持续工作，也放不下特别巨大的飞机，人们开发出了**基于物理引擎的虚拟风洞测试软件**，以便在设计阶段就能快速地迭代测试各种空气动力学外形。

<img src="{{site.cdn}}/img/20191231/034.webp"><br><small>
CFD 风洞模拟软件对起落架的空气动力学分析示意图 | simscale.com</small>

最后，在军事和航天科研领域，**利用计算机物理引擎进行轨道计算、姿态调整**，甚至**利用行星/太阳的引力弹弓效应进行加减速等**复杂计算都已经是司空见惯的事情了。在1989年8月，经过大量的预先计算和测试模拟，计算机精确地操纵旅行者2号，以最佳的轨道飞掠过海王星，同时还对海卫一进行了探测。按照美国宇航局的说法，这伟大的成就离不开探测器上搭载的三台双冗余计算机的密切配合。

<img src="{{site.cdn}}/img/20191231/035.gif"><br><small>
旅行者2号在空间中的飞行轨迹（粉色）以及几大行星的相对位置（从内到外：太阳、地球、木星、土星、天王星、海王星）| 维基百科</small>

嗯，这么说来，物理引擎不但驱动虚拟的世界，也驱动着我们的真实世界呢！

<p style="color:grey">参考资料：<small>
1.   https://en.wikipedia.org/wiki/Physics_engine <br>
2.   https://en.wikipedia.org/wiki/Decima_(game_engine) <br>
3.   http://buildnewgames.com/gamephysics/ <br>
4.   https://www.bilibili.com/read/cv3883664/ <br>
5.   https://www.bilibili.com/video/av74914988?from=search&seid=1798812522776411984<br>
6.   https://store.steampowered.com/ <br>
7.   https://www.simscale.com/blog/2019/06/virtual-wind-tunnel-online/ <br>
8.   https://history.nasa.gov/computers/Ch6-2.html
</small></p>

> 一个AI：春节有的玩儿了

<img src="{{site.cdn}}/img/20191231/036.webp">

_（本文已投稿给「[果壳网](https://www.guokr.com/)」。 作者：欧剃 编辑：八云 转载请保留此信息）_



