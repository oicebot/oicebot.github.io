---
layout: post
title:  为保护隐私不在网上透露真名？想找到你，只要3个匿名数据就够了
tags: Guokr AI Machine-Learning Data-Science
thumb: "/img/20190808/thumb.jpg"
origin: true
star: true
excerpt: “安全”的匿名化数据，并不能保护你的隐私
---
在大数据、云计算、人工智能技术迅猛发展的今天，数据科学技术在科研、医疗、商业、管理等各种领域大显身手，给我们带来了便利，提高了效率，改善了生活质量。然而，这些技术的存在与发展**依赖于大规模的详细个人数据**，收集和共享这些数据的过程则引发了人们对于**个人隐私泄漏**的担忧。

<img src="{{site.cdn}}/img/20190808/001.jpg"><br><small>
技术的存在与发展依赖于大规模的详细个人数据 | Pixabay</small>

针对这个问题，世界各国都纷纷出台了相关的隐私法案，比如欧洲《通用数据保护条例》（General Data Protection Regulation，GDPR），美国《加州消费者隐私法案》（California Consumer Privacy Act，CCPA）等，要求在使用、分享、传播这些数据之前，**需要对数据进行匿名化处理，或是只公开完整数据集的一小部分样本**。

但这样处理之后就够安全了吗？

## 州长隐私也被人肉

早在1997年，时任马萨诸塞州州长的威廉·韦尔德（William Weld）向公众保证说，马萨诸塞州集团保险委员会（Massachusetts Group Insurance Commission，缩写为GIC）向研究者公开的医疗数据**已经完全去除了可识别的信息**，能有效保护公民的个人隐私。

然而，当时还是研究生的拉塔妮娅·斯威尼，却**利用几个简单的已知信息**（州长的生日、性别、居住地邮编等），经过排查，<span class="hl">从公开的GIC数据中查到了州长本人的医疗记录</span>，甚至还把那些诊断结果与处方都打印出来寄给了州长的办公室。简直是正面打脸啊。

<img src="{{site.cdn}}/img/20190808/002.jpg"><br><small>
威廉·韦尔德（左）| flickr.com</small>

也许有人会说，这不过是针对某个个人的蓄意攻击，不能代表整个数据库的问题。但近期发表在《自然·通讯》上的一项研究表明，<span class="hl">目前我们使用的匿名化数据共享方法还不够安全</span>。

## 让我们用AI分析一下

来自英国伦敦帝国理工学院计算机系、数据科学研究所的伊夫-亚历山大·德·蒙鸠依（Yves-Alexandre de Montjoye）和他的同事利用**网上公开获取的数据库**——包括年度人口普查数据以及UCI机器学习数据库的问卷数据等——训练出了一个机器学习模型（也就是我们一般说的AI程序）。

这个程序能读取并分析匿名数据库中的每一个条目，根据给出的各种属性值，预测每条记录在整个数据集中的“独特性”（uniqueness），并估算整个数据集的总体“独特性”。

<img src="{{site.cdn}}/img/20190808/003.jpg"><br><small>
图 | Pixabay</small>

接下来，研究者让这个AI根据推测出的“独特性”来**判断某条记录被攻击者识别出来的几率和可信度**。他们随机选取了人口普查数据库中1％的数据训练AI，并从整体中取出1000个独立的条目，让AI进行判断。结果在各种情况下，AI给出的识别几率都相当准确。在识别几率阈值超过95％的情况下，**错误识别率仅为5.26%**，基本上一抓一个准。

最后，研究者将网上公开的匿名人口信息数据库PUMS（只含有5％的采样）喂给这个AI，再放入“出生日期1945年7月31日，性别男，居住地邮编02138”的查询条件（这三个数据正是当年斯威尼用过的），于是**果然又与我们熟悉的韦尔德州长相遇了**。

根据AI的判断，威廉·韦尔德的识别几率为58％，准确率为77％。也就是说，按照这三点数据识别出韦尔德州长的医疗数据，正确的概率为77％。此外，如果在数据中加上“拥有5个孩子”这个属性的话，**识别的准确率会达到99.8%**。

## 这又说明了什么呢？

这意味着<span class="hl">只需要几个简单的属性，就能以很高的可信度重新识别出匿名数据库中的个人身份</span>。比如上面州长的例子，只用出生日期、性别、居住地、子女数量这4个属性，就能识别出马萨诸塞州79.4%的人，可信度达到了80%以上；而如果增加到15个人口统计学属性，则能有效识别出全州99.98%的人口。

<img src="{{site.cdn}}/img/20190808/004.jpg"><br><small>
图 | Pixabay</small>

此外，**AI也能分析处理残缺不全的数据集**。研究者对只含有10％、5％、1％，甚至是只含有全部数据0.5％内容的不完整数据集都进行了试验，结果AI对这些条目的预测和识别还是非常准确的，其平均绝对误差（MAE）都小于0.05。也就是说，<span class="hl">即使只公布总量中的一小部分数据，这些信息还是很容易被攻击者识别出来</span>。

针对这样的新技术与新威胁，研究者认为，当前国际通用的匿名化处理标准需要进一步提高，包括欧盟在内的各个国家和地区的信息安全机构也应进一步完善隐私保护体系，实施安全措施，以求既保证数据可用，又能保护人们的隐私安全。

<small>
参考文献：</small>
> <small>1. Estimating the success of re-identiﬁcations in incomplete datasets using generative models，NATURE COMMUNICATIONS，https://doi.org/10.1038/s41467-019-10933-3</small>
> 
> <small>2. The "Re-identification" of Governor William Weld's Medical Information: A Critical Re-examination of Health Data Identification Risks and Privacy Protections, Then and Now，Daniel C. Barth-Jones. https://fpf.org/wp-content/uploads/The-Re-identification-of-Governor-Welds-Medical-Information-Daniel-Barth-Jones.pdf</small>

_本文已于2019年8月投稿给[果壳网](https://mp.weixin.qq.com/s?__biz=MTg1MjI3MzY2MQ==&mid=2651714553&idx=2&sn=c55f4dd4365d2fc751d4dcf034960b90&chksm=5da1d76b6ad65e7d980894621ecacd2b1309e33c3c5bc55e362b5d04cb11677749f26c2d1627&mpshare=1&scene=1&srcid=&sharer_sharetime=1565570162503&sharer_shareid=a48de0c3d1189e25e378906db559509f#rd)并发表，作者：欧剃 编辑：八云。译文版权归果壳网（guokr.com）所有，禁止转载。如有需要，请联系sns@guokr.com_