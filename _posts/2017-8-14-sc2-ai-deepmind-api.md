---
layout: post
title: 人工智能转战电竞！《星际2》人机大战要出现了吗？
date: 2017-08-14
tags: guokr AI Game
excerpt_separator: <!--more-->
from: https://www.guokr.com/article/442356/
star: true
origin: true
thumb: "/img/sc2ai/thumb.jpg"
---
最近，Google旗下的人工智能团队，AlphaGo的亲生父亲Deepmind宣布和暴雪娱乐合作，并放出了《星际争霸2》的应用程序接口（API），让AI能够在即时战略游戏环境下进行机器学习。

那么，AI这就要进军电子竞技了吗？还有，这个API到底是什么？我们能玩吗？好玩吗？该怎么玩？
<!--more-->
## 电脑游戏和人工智能的跨界合作

近年来，游戏开发巨头暴雪娱乐一直和开源社区有着不解之缘，除了为一些开源软件贡献了代码之外，暴雪的开发团队先后公开了《魔兽世界》、《暗黑破坏神3》的游戏数据查询API，还开源了《风暴英雄》和《星际争霸2》的游戏回放处理编辑代码库。

2016年，暴雪在嘉年华上承诺放出《星际争霸2》的游戏API，而在第二年8月9日暴雪就实现了自己的诺言<sup>[1]</sup>。

<img src="/img/sc2ai/LtPQQWUw93nFOQkcJlOUuOp1ugfdwOgHC71WDvuoh1isAwAA5QEAAFBO.jpg" class="img-responsive" alt="" /><br><small>图片来源：暴雪娱乐</small>

另一方面，人工智能团队Deepmind从深度学习等人工智能研究的前沿领域着手，在训练AI玩Atari游戏机、走迷宫等项目之后，通过卓越的围棋AI“AlphaGo”连续击败多名世界围棋顶级高手，一鸣惊人。此后，DeepMind官方就表示将研究方向转向即时战略游戏，而首选的就是《星际争霸2》<sup>[2]</sup>。

## 能让AlphaGo去学打星际吗？

不，并不能。

按围棋规则训练出来的AlphaGo很难应对《星际争霸2》这类即时战略游戏。

首先，在《星际争霸2》中，玩家既要拥有快速的战术微操能力，还要有足够高的战略规划水平。如果说围棋每步的可能性有19✕19=361种，那在即时战略游戏中玩家用鼠标点击下达命令的每步可能性则将超过100000000种，还不包括不同的建筑顺序、放置布局、兵种搭配和科技树顺序等等。

而且，对于围棋来说，全盘的信息是完整的，所有的推测可以根据盘面的情况来进行。但在即时战略游戏中，由于有“战争迷雾”这种设定，玩家只能看到自己的部队探索或占据的区域，AI所能获取到的信息是不完整的。

所以对于未知领域的计算就更加困难了，于是Deepmind决定开发新的应用程序接口来进行AI在即时战略游戏上的应用。

<img src="/img/sc2ai/8Ro5iou88FRmIXdWraZN8a7Mcib8h7EkEo89lKEhyJKwAwAAxgEAAFBO.jpg" class="img-responsive" alt="" /><br><small>可以看到，这两种游戏在玩家获得的信息方面的不同。图片来源：维基百科、《星际争霸2》游戏截图</small>

## 这东西到底是什么？

这次的放出的接口，全称叫“星际争霸2机器学习环境”（StarCraft II Learning Environment，以下简称SC2LE），它并不是一个玩家直接打开就能玩的Bot（游戏AI），而是一个让程序员能用来“训练”人工智能的基础环境。和非人工智能的程序不同，人工智能程序并没有硬编码了“要怎么做”的代码，必须通过机器学习的“训练”过程来找到最优的解决方案。

作为一个更新颖也更具挑战性的机器学习环境，SC2LE由两个部分组成：

* 一个是暴雪放出的《星际争霸2》游戏API，让计算机程序能够从类似人类玩家一样的视角，获得当前游戏状态的相关信息——AI能获得的数据和信息和人类玩家是平等的；
* 另一个是Deepmind放出的PySC2，它提供了一个分析处理游戏数据的代码库——可以告诉AI下一步要进行什么操作，是挖矿还是建造兵营。此外，PySC2还能够帮助程序员编写的AI进行强化学习<sup>[3]</sup>。

<img src="/img/sc2ai/HjFpyjVSwr7W2GgwKRWVXQKCDwZtLuKQDZwezCwKMrawAwAA6wEAAFBO.png" class="img-responsive" alt="" /><br><small>SC2LE结构图：星际2客户端本身（左侧黑色）是核心，通过API和PySC2进行沟通，联合成一个整体，玩家的AI（右侧Agent）通过PySC2得到各种观察结果和反馈，然后做出具体的行动命令，以模拟人类操作的方式，输入进PySC2里，形成一个具体的游戏操作。图片来源：Deepmind SC2LE介绍</small>

这里的“强化学习”，是一种基于决策和交互的机器学习方式。在“训练”过程中，程序针对当前需要解决的问题，建立一个模型，然后基于当前环境给定的各种规则和条件作出决策，并且通过探索各种可能性，根据获得的反馈（可能是“奖励”或“惩罚”，比如成功开了分矿，或者在战斗中损失了一支部队等等情况）来调整下一步决策，通过不断的试错和修正，来寻求最优的对策。

通过这样的方法，训练出来的AI能够以模拟人类观察和操作的方式来进行游戏，而不是靠直接读取游戏数据和APM碾压的作弊办法。是不是很有挑战性？

## 普通玩家也能尝试

这种高端的项目，是不是只有程序员才能使用？

不，即使你不是程序员，也能玩这个东西！而且我可以负责任的告诉你，这并不难！

首先当然是通过暴雪游戏平台，下载星际争霸2的客户端。如果你已经有了能进游戏的客户端，那就不需要额外下载了。另外，免费版也可以运行AI程序。

其次是要准备好代码运行所需的软件环境，也就是 Python 语言的解释器。这可以在 Python 开源项目的官方网站上下载： www.python.org

接下来，我们先看暴雪放出的代码<sup>[4]</sup>：

<img src="/img/sc2ai/5D5QBl354KsRnSSqn7Pesno73UcUQP5j198k4TmNxMlKAwAAuwMAAFBO.png" class="img-responsive" alt="" />

在下载区，前三个是API的编程说明书、C++的代码库和Linux版的《星际争霸2》AI用客户端——不是程序员的你可以安全的忽略它们。第四个是地图包，第五个是65000个游戏回放数据。如果只是想看看AI怎么玩，并不打算实际调教一个AI的话，你只需要下载几个地图包即可。下载后解压压缩包里的东西到星际争霸2的 StarCraft II/Maps 文件夹里，解压密码是 iagreetotheeula 。

解压完之后，你的 StarCraft II 文件夹里应该有这些子文件夹：

<img src="/img/sc2ai/q0IKBf8epWomNIbhyPNMQXLQsPJhD0Dfx6e8b0cQnrbpAAAAGQEAAFBO.png" class="img-responsive" alt="" />

然后，你需要从 Deepmind 的开源页面上安装PySC2模块<sup>[5]</sup>。

如果你已经装好了 Python 环境，只需要在系统的“命令提示符”里输入以下命令就可以在联网状态下一键自动完成安装了：

```
pip install pysc2
```

<img src="/img/sc2ai/OMgyUvaisvG5WHf7LDVi1ytLyYskKwtFHMWXfPPzMtz0AgAAaAEAAEdJ.gif" class="img-responsive" alt="" />

最后， PySC2 还提供了一套测试基本AI学习功能的“迷你游戏”的地图包，在[Deepmind的github页面](https://github.com/deepmind/pysc2/releases/download/v1.0/mini_games.zip)上可以下载到 ，将其放进 Maps 文件夹里即可。

<img src="/img/sc2ai/WRA51mc_gK6B3jeLwfRZTm54H3EnqyEVXueiuQkkF9msAwAAOwIAAFBO.jpg" class="img-responsive" alt="" />

安装好了最基本的SC2LE运行环境后，你就可以通过 python 命令激活一个新的AI开始游戏了！

## 来看看AI的实力吧！

在命令提示符输入以下命令，就可以打开一场新游戏，看AI的行动了：

`python -m pysc2.bin.agent --map Simple64`

上面的命令是在一张简单的1v1地图上，用一个随机AI进行游戏。如果你装了上面的“迷你游戏”地图包，还可以调用 Deepmind 已经调教好的范例AI玩收集资源的小游戏：

`python -m pysc2.bin.agent --map CollectMineralShards --agent pysc2.agents.scripted_agent.CollectMineralShards`

游戏效果如下：

<img src="/img/sc2ai/fgjsL-bvglxrtOfQTVS03krufIX9Vl0I6ijbh7wfqbe2AQAA7QAAAEdJ.gif" class="img-responsive" alt="" />

背景是游戏画面，而中间我切出来的那个窗口则是PySC2本身的AI工作窗口，里面显示了从AI的角度所看到的游戏数据是什么样的。

动图闪太快看不清？让我们开一局新的完整游戏看看：

<img src="/img/sc2ai/oirEzKKhKUyog8A1lq8eTeJfs05aUCMMDacM2ObkO5G2BQAAzAIAAFBO.png" class="img-responsive" alt="" /><br><small>上图左边是经过简化的游戏图像，可以看到中间（大绿圆）是星灵的枢纽（Nexus），带着一群探机（小绿圆）在采矿（蓝圆）。右侧则是各个分层数据，包括地形高度、当前视野、小地图数据，当前窗口上的各个单位类型、血量，已选中的单位数据等等。图片来源：SC2LE程序界面</small>

过了一会，显然目前的实验AI基本就是乱来：

<img src="/img/sc2ai/Lefv2pCvWozMzF8TX-JiXsXcF2nVlpLl4cPr0G_CFH-gBQAAvAIAAFBO.png" class="img-responsive" alt="" /><br><small>建造顺序和建筑摆放的方式可以说是十分混乱了。 图片来源：SC2LE程序界面</small>

根据deepmind的资料显示，目前各家训练开发出来的AI（PySC2中附带了好几个不同的范例）在完成采矿、控制单位移动、造兵等基础操作方面没有太大的问题，但在整个游戏上还很难和暴雪内置的简单敌人抗衡。大部分的AI能做到的都只是机械的随机重复已有的行为而已。看来要玩的好，这门槛也还不低啊，想要“做一个AI打败电竞高手赚钱”还是挺任重道远的。

目前，表现优秀的是加拿大纽芬兰纪念大学计算机科学系助理教授大卫·丘吉尔（David Churchill）开发的AI：CommandCenter，它虽然只会一种固定套路，但已经几乎能打败暴雪内置的简单电脑敌人了<sup>[6]</sup>。

你现在下载[这个软件](https://github.com/davechurchill/CommandCenter)，也可以在你电脑上模拟一场：

<img src="/img/sc2ai/hCeq8so5S1CaqB6YnOmf_NHFQTz0r8zLiDQ-BN4wCtWsAwAAJAIAAFBO.jpg" class="img-responsive" alt="" /><br><small>
这盘，被CommandCenter杀光农民的电脑敌人打出了gg。 图片来源：星际争霸2AI运行截图</small>

大卫·丘吉尔表示，接下来他将让这个AI学会建造附属建筑、适时升级相应的科技，未来还会尝试让AI能对战斗情况进行预判，以及在主动进攻、积极防御、游击骚扰等策略中灵活选择。

最后，Deepmind和暴雪在SC2LE的发布说明中表示，希望通过这次开源的代码和范例，能给广大星际玩家和自制AI爱好者提供更多的便利，更好地发挥出创造力，也希望能给人工智能领域的研究者一个更强有力的研究工具，以便推进未来人工智能技术的发展和进步。或许在不久以后，我们就能看到星际争霸AI版的《机器人大战》节目了吧？

<img src="/img/sc2ai/utyii6vk0BV1JdlTU2IapCGxyuOrSZz-Oj2A9gEYrZisAwAAEQIAAFBO.jpg" class="img-responsive" alt="" /><br><small>
在《机器人大战》这个暴露年龄的节目中，参赛者用自己制造的机器人下场决斗，把对方摧毁的一方获胜。图片来源： Battlebots.com</small>

无独有偶，8月12日早上，特斯拉老板伊隆·马斯克（Elon Musk）旗下的人工智能OpenAI在Dota2的1v1比赛中，以三战两胜的成绩首次击败了人类职业选手Dendi<sup>[7]</sup>。

<img src="/img/sc2ai/wKlt87ch97A47gyk6D0GBENFOI9dlt3_XufNcLrLuw4gAwAAvAEAAEdJ.gif" class="img-responsive" alt="" /><br><small>
被AI单杀的Dendi小哥。图片来源：Dota2比赛视频</small>

据OpenAI团队介绍，他们的AI并不是靠微操数量取胜，他们的AI通过自己和自己比赛的机器学习方式，花了两周时间达到了目前的水平。

不过，虽然这个AI看起来比星际2的AI厉害了许多，但这种控制单一英雄、中路对单的Dota 2里，AI需要处理的信息和进行的操作都比完整的星际2对战简单很多，表现良好也算是情理之中。

在此之前，这个AI也打败过SumaiL、Arteezy等职业选手。不过OpenAI CTO Greg Brockman表示，1V1的胜利并不是他们的最终目的，OpenAI希望能在2018年的国际邀请赛上与职业选手进行5V5的比赛。说不定到时候的全明星赛将会是一场新纪元的人机大战！

不知道OpenAI会不会开源相关代码，让我们一饱眼福呢？对于电竞玩家来说，能够和人工智能对战还是非常令人期待的！（编辑：Lyroat）

<p style="color:grey">参考资料：<small>
1.    http://us.battle.net/sc2/en/blog/20944009
2.    https://deepmind.com/blog/deepmind-and-blizzard-open-starcraft-ii-ai-research-environment/
3.    https://deepmind.com/documents/110/sc2le.pdf
4.    https://github.com/Blizzard/s2client-proto
5.    https://github.com/deepmind/pysc2
6.    https://github.com/davechurchill/CommandCenter
7.    https://blog.openai.com/dota-2/
</small></p>

_本文已于2017年8月发布于[果壳网](https://www.guokr.com/article/442356/)，译文版权归果壳网（guokr.com）所有，禁止转载。如有需要，请联系sns@guokr.com_
