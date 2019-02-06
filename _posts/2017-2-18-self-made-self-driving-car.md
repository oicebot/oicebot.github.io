---
layout: post
title: 天啊！这个大学生居然把破本田升级成了自动驾驶汽车！
date: 2017-02-24
tags: guokr selfdriving translate
from: https://www.technologyreview.com/s/603637/how-a-college-kid-made-his-honda-civic-self-driving-for-700/
author: Tom Simonite
thumb: "/img/Yz19H6il92M9HRO58LbpjGwGcn-ATySitUS9fFGX6OBYAgAAjAEAAEpQ.jpg"
---
内布拉斯加大学的学生布雷万·约根森（Brevan Jorgenson）将一辆2016款本田思域的车内后视镜换成了一个叫做 Comma Neo 的自制电子设备，这个设备可以使用相机识别道路标记和路上的其他车辆，并自动控制刹车，油门和方向盘 —— 换句话说，他把自己的车子升级成了自动驾驶汽车！而这一切的总花费不过 $700 美元左右。

<img src="/img/oWlZrgbkSbIhLATbIdRXCKG8KaSRJBE8RB81ddBFScVJAgAANQEAAFBO.png"><br><small>
（图片来源： comma.ai ）</small>

约根森使用的开源硬件设计和开源软件代码来自一家名叫 Comma 的自动驾驶技术创业公司。该公司创始人是以首位破解 iPhone 和索尼 PlayStation 而知名的天才黑客乔治·霍兹（George Hotz）。他创建的这一 DIY 自动驾驶汽车项目也曾一度因为国家公路和交通安全管理局（NHTSA）的质疑信而暂停。但他并没有因此而放弃，既然销售物理设备行不通，那就干脆将自动驾驶软件开源，并附上配套的硬件——被霍兹称为 Comma Neo ——的设计组装方案，让创客们自己捣鼓去！所有的代码和材料都将免费公开——事实上，软件 [Open Pilot](https://github.com/commaai/openpilot) 和硬件 [Comma Neo](https://github.com/commaai/neo) 已经以 MIT 许可的形式发布在了 Github 上。

在位于旧金山的 Comma.ai 总部的一次新闻发布会上，霍兹称他创造的自动驾驶软件 Open Pilot 是“（特斯拉的）自动驾驶软件的一款开源替代品”。他声称 Open Pilot 和 Comma Neo 的组合能“提供几乎与 Autopilot 7 相同的功能”，而 Autopilot 7 是特斯拉的自动驾驶软件的上一个版本。他认为，Open Pilot 的目标用户是“那些真正热爱自动驾驶技术的爱好者和研究者”，“这是为那些希望推动未来不断前进的人们准备的。”

在那以后，世界各地包括约根森在内的许许多多动手党们——就像弗诺·文奇笔下的“叮当客”一样——有了绞尽脑汁给自己的车辆安装自制自动驾驶设备的基础，这些先行者们逐渐形成了一支迥异于那些高大上的自动驾驶汽车研发团队的“草根自动驾驶试验车队”。

<img src="/img/Yz19H6il92M9HRO58LbpjGwGcn-ATySitUS9fFGX6OBYAgAAjAEAAEpQ.jpg"><br><small>
（图片来源： technologyreview.com ）</small>

对约根森来说，他在霍兹发布 Comma Neo 设计方案的当天，就在网上下单，开始购买各种必备的零件。他一直关注 Comma 公司的动向，而且他刚好拥有一辆2016款本田思域——这是 Open Pilot 软件所支持的两款车型之一（另一款是讴歌ILX）。

Comma Neo 的核心，是一台搭载了开源 Open Pilot 软件的一加3手机，整个设备装在一个3D打印的外壳里，通过一块电路板将手机连接到汽车的电子设备上。约根森通过网络打印服务在线打印了外壳，并自己组装了相应的元器件。

在一月下旬的某天，结束了晚上的课程之后，他打算第一次将自己的生命交到这个他亲手组装的开源设备上。“当时州际公路上十分黑暗，我想我得自己测试它，因为万一要是有什么地方出了问题，我不希望有其他人在车里。”约根森回忆道，“但它的车技真是非凡。”虽然后续的测试表明， Neo 有时会莫名其妙地往右边偏，但 Comma 很快就发布了一个软件更新修复了这个问题。在运行时，Neo 系统的能力和上版本的特斯拉 AutoPilot 系统不相上下。

<img src="/img/pY_ZLEi50qpQrSTJLCEkqLhFFDdxd6yZYodQcav_T640AwAAIwIAAEpQ.jpg">
<br><small>（图片来源：theverge.com ）</small>

南卡罗来纳大学法学教授布赖恩特·史密斯认为，联邦和州法律可能不会对那些希望升级他们的车辆以减轻驾驶压力的人构成太大的障碍，但任何使用自制自动驾驶设备控制车辆的人仍然必须遵守有关机动车驾驶责任的相关法规和规定。

 Comma 的 Open Pilot 软件也在这方面尝试提示驾驶者：如果驾驶员连续5分钟都没有触碰方向盘，软件会发出提示；如果软件对前方路况的分析确定性不高时，会提示要求人工接管驾驶权。
 
 同时，在事故发生时，使用自制自动驾驶设备的驾驶员估计会让别人为之侧目。

“你能合法使用这个设备，并不意味着你能不负相关的民事责任。”史密斯教授总结道。

原作： [{{ page.author }}]({{ page.from }}) 译者：欧剃

_本文已于2017年2月发布于[果壳网](http://jingxuan.guokr.com/pick/79279/)，译文版权归果壳网（guokr.com）所有，禁止转载。如有需要，请联系sns@guokr.com_