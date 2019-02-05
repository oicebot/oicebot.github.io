---
layout: post
title: Facebook的人工智能开发出了自己的秘密语言？还早着呢
date: 2017-08-14
tags: guokr ai
from: https://www.guokr.com/article/442345/
star: true
origin: true
---
近日，一条略带诡异的消息传遍了社交网络：“Facebook 的人工智能开发出了自己的秘密语言，吓得工程师把它们的插头给拔了。” 啥！？这太有科幻片既视感了吧？难道《终结者》里要灭绝人类的AI“天网”就要出现了吗？

<img src="http://3-im.guokr.com/C4SHebF9b_IukTzh_9AJ-oYxTU21BeeLvGB_aYIFMl1XAgAAbwIAAFBO.png" class="img-responsive" alt="" /><br><small>
一则宣称“Facebook AI开发出自己的语言”的报道。图片来源：bgr.com</small>

## Facebook AI的“秘密语言”长啥样？

让许多网络媒体受惊的“AI的秘密语言”长这样<sup>[1]</sup>：

```
智能体B：I can i i everything else
智能体A：balls have zero to me to me to me to me to me to me to me to me to
智能体B：you i everything else
智能体A：balls have a ball to me to me to me to me to me to me to me to me
```

看起来每个字母都认识对吧，但连在一起完全不知道是什么意思。然后两个AI之间还说得兴高采烈的？

这样两段不明所以的对话，让不少媒体一下炸开了锅。一家英国的通俗小报甚至引用了一名所谓“机器人学教授”的话，说这次事件“揭示了人工智能的危险性”，还说如果这种技术被用于军用机器人“将导致致命的后果”……联想起不到半个月前，SpaceX 的老板伊隆·马斯克可是刚刚警告过大家，人工智能将会从“根本上威胁人类的存在”<sup>[2]</sup>。

## 说出这种对话的AI来自哪里？

说出上述谜样对话的AI来自Facebook旗下的人工智能实验室（Facebook Artificial Intelligence Research，简称 FAIR）。人工智能属于扎克伯格提到过的 Facebook 将来三大主要方向之一，一直备受重视。在2013年9月，他们就成立了 FAIR。

<img src="http://1-im.guokr.com/r29YlGci1gILZlpGg2cSmW5E218RldXpXXYtUr64TUKwAwAA5QEAAFBO.png" class="img-responsive" alt="" /><br><small>FAIR团队。图片来源：research.fb.com</small>

FAIR基本上是一个只有投入而几乎没有近期产品压力的团队。他们致力于研究和开发高水平的人工智能技术，解决人工智能领域的一些前沿问题。例如运用机器学习进行人脸识别的DeepFace、在机器学习中加入长期记忆来构建自然语言的问答系统等，都是这个团队的研究成果。

## FAIR做这个会对话的人工智能是为了什么？

难道真的是要造出个“天网”吗？不，起码现在还不是这样的。

FAIR的研究人员表示，现在我们常见的语义分析程序（比如 Siri ）已经可以胜任一些简单的对话，帮人类完成诸如导航、订外卖之类的简单任务，而他们希望在此基础上再进一步。

利用神经网络和机器学习算法，FAIR希望能做出一个能胜任复杂对话的聊天AI（类似微软小冰那样的，不过要比小冰聪明得多），程序不但要“理解”聊天内容，并根据现有数据生成有意义的句子，还要能通过对话和其他参与者达成某个设定好的目标。

确切地说，他们希望赋予聊天机器人跟人谈判或者协商的能力<sup>[3]</sup>。

想想平时人类是怎么做的：每个人都有自己不同的目标，互相之间产生分歧，然后通过协商达成一个双方都认可的折中方案。研究表明，工程师可以让经过训练的神经网络AI模仿人类的谈判行为，带着各自不同的“目标”参与一个完整的协商过程，最后和其他AI或者人类达成一个共同的决定。他们就此发布了一篇预印本论文<sup>[4]</sup>，还把这个“谈判者”AI的机器学习代码给开了源。

## 然后，他们的AI就失控了？

并没有。并没有。并没有。

实际情况是这样的：

为了模拟人类的协商行为，研究者首先训练了两个能处理英文对话的AI，然后给它们设置了一个坐地分赃（大误）的场景，给出了若干种数量不同的物品。同时，两个AI对于不同物品的“价值”被设置了不同的值，所以它们所看重的物品可能是不同的。它们需要通过互相对话来达成一致的分配办法，同时让获得物品的总“价值”在自己看来尽可能的高。

<img src="http://2-im.guokr.com/5ZRSteXYY3MCvXw6Nbr8OIrpz-IOcv0l4NVYNIY8FlcACgAAoAUAAEdJ.gif" class="img-responsive" alt="" /><br><small>训练过程。图片来源：code.facebook.com</small>

比如，当书、帽子和篮球分别值0、7和1分时，对话可能是这样的：
> “我想要帽子和球。”
> “我也想要帽子，但我可以把书给你。”
> “我不在乎书，你可以把书拿走，再拿一个球。”
> “两个球。”
> “行，成交。”

在运行过程中，每个AI并不能直接知道某个物品在对方的“价值列表”里的数字多少，但能够通过对话来进行判断——如果你声称想要那个球，那这个球在你看来一定价值比较高嘛。

为了让AI学会如何沟通，FAIR的研究者建立了一个能解析和构建英文句子，以理解或传递某个意思的AI模型（这也是采用机器学习的方法构建的）。然后，研究人员让AI模型和它的一个副本一起，在上面所说的场景里，采用强化学习的方式做了数千次的协商训练。

在每轮协商训练的双方达成一致时，一个自动的评分程序将根据本轮的分配结果，对AI模型的表现进行评分。协商得到的物品价值越高，得分就越多。AI模型以评分结果为标杆，不断调整模型的各项参数，以尽可能高的效率和尽可能多的获利为目标完成协商训练。

同时，研究人员还给AI引入了预期机制，让AI模型在面对输入的句子时，能够逐一评估模型所学习到的每种可行的回应方式，逐一推测这种回应可能从对方处得到的答复，并计算对应收益的期望，以此判断实际要作出什么样的回应。

<img src="http://3-im.guokr.com/44cGdCJavqAC_mBLdsXEOH-WX5d_1htiHvr5QAMKjw7gAgAAuwAAAEpQ.jpg" class="img-responsive" alt="" /><br><small>AI模型能够根据对谈判结果的预期做出收益最大化的决策。图片来源：code.facebook.com</small>

而正是在这个过程中，研究人员出了一点小小的纰漏。

该项目负责人迈克尔·路易斯（ Michael Lewis ）在接受媒体采访时表示<sup>[5]</sup>：“在早期的实验中，我们只对完成目标与否和获得的价值多高设置了奖励，**并没有管AI是否用的是符合英语语法的句子**。由于AI们输出给对方的英文句子只需要让另一个AI能解析就可以通过训练，于是在几千次重复的对话训练之后，AI们发展出了一套只有它们自己能解析的用词方式。”

所以，对设置了训练场景的研究人员来说，文章开头的出现的“秘密对话”实际上毫不神秘：

<img src="http://2-im.guokr.com/x5wgSgIlK9C62NHU11oGUof9HAoyB8UErSTCxqcCxLFUAgAAMQEAAFBO.png" class="img-responsive" alt="" /><br><small>智能体Alice和Bob的对话。图片来源：FAIR</small>

从对物品赋值可以看到，对Bob来说，它对书和帽子毫无所求，只要球。所以可以推测，它尝试表示可以给出其他的所有东西；对Alice来说，尽管书和帽子都有价值，但那一个球的价值也更高。显然，他们就是在为了最大化自己的得分而在激烈地讨价还价。不难猜测，在这一对AI的用法中，重复某个单词或句子的某个部分可能是用以表达出强调的程度。当然，从文字上看，这和平时人类的沟通方式可是大相径庭。

“智能体将渐渐偏离可理解的语言，发明出自己的暗号。”FAIR的访问研究员、佐治亚理工的副教授巴特拉（Dhruv Batra）说<sup>[6]</sup>。简而言之，这整件事其实就是在机器学习的调教过程中，有疏漏的训练参数训练出了跑偏的人工智能程序，仅此而已。

## 后来这些AI被调教得怎么样了？

“从某种意义上来说，它们创造出了一套对AI来说更简单的沟通工具。因为高效的完成目标是被奖励的，即使这并不符合人类的使用习惯。为此我们在后续的实验中引入了新的技术，增加了一些额外的机制，给正确使用英语进行沟通的行为给予了奖励。”迈克尔·路易斯说。

目前从开源了的代码的运行截图上来看，这个项目已经可以调教出能和人一样用英语讨价还价的AI了。

<img src="http://2-im.guokr.com/Ae39CwXzWQTPTbp-hFpOy3Ol5UxiT5kTSp8h8llmSSKwAwAA4wIAAFBO.png" class="img-responsive" alt="" /><br><small>一次讨价还价的过程。图片来源：Github</small>

物品总数量：书1；帽子2；球2。
对人类来说：书价值2；帽子价值2；球价值2。
对智能体Alice来说 ：书价值4；帽子价值0；球价值3。

对话如下：
>人类：你好，我要帽子和球。
>Alice：我要拿球和书。
>人类：不，我需要球。
>Alice：我要拿球和书。
>人类:  我需要球。
>Alice：如果把球和书给我，帽子可以归你。
>人类：不，我就要球，其他的都给你。
>Alice：我要拿所有的球，以及一本书。
>人类：不，不给你球。
>Alice：好吧，你拿两个帽子和一个球。
>人类：好吧，成交。
>Alice：<作出选择> 

最终，人类获得 书x0 帽子x2 球x1 = 6分；Alice获得 书x1 帽子x0 球x1 = 7分。 

对于部分媒体声称的该项目因为这事已经被关闭，AI们都被拔了插头的说法，迈克尔·路易斯表示这也是对实际情况的误传：“这个项目并没有被关闭。我们的目标是做出能和人类沟通的机器人，而在一些实验中，我们发现这些机器人并不能像人类一样使用英语单词，于是我们把程序停下来，分析奖励函数，改一改运行环境的参数，用一些额外的技术让程序按照我们期望的那样工作。”

说的是啊，如果这样也算拔插头的话，那果壳网的AI不是每天都被拔好多次么。

## 机器学习能给人类带来什么？

机器学习是人工智能研究的一种途径，人们通过设计和分析一些让计算机可以自动“学习”的算法，来完成一些诸如推理、规划、交流这样的任务，以解决人工智能领域中的问题。

和非人工智能的程序不同，机器学习程序需要一个“学习”的过程，也就是在基础的模型建立好之后，通过人工喂数据给程序，让程序在给定的不同设定条件和规则下不断运行，不断改进这个模型，最后得到一个可以用于某个特定方面的函数或模型的过程。

这次FAIR团队用到的机器学习技术，叫做“强化学习”，是一种基于决策和交互的机器学习方式。在“训练”过程中，程序要基于给定的各种规则和条件作出决策，并且通过反馈的“奖励”或“惩罚”来调整下一步决策，以产生能获得最大利益的决策<sup>[7]</sup>。换句话说，AI所能学会的决策，完全依赖于调教它的人类对完成什么样的目标进行奖励，而不可能自作主张。

话说回来，Facebook做的这项工作虽然说起来简单，但的确是整个人工智能研究领域的重要一步，这代表着人类向创造出能辩论、能沟通、能交涉的高级聊天机器人又近了一大步，向创造出诸如钢铁侠的贾维斯或者士官长的柯塔娜那样极具个性的数字助理AI又近了一点点。

<img src="http://2-im.guokr.com/ZtywxS5t52TNTG0LzMn06l90bRBjQHUz-88mdpOx0DTiAgAAnwEAAFBO.png" class="img-responsive" alt="" /><br><small>做出能与人类进行协商或谈判的聊天机器人是FAIR的工作目标之一。图片来源：techcrunch.com</small>

不仅如此，目前机器学习已广泛应用于数据挖掘、计算机视觉、自然语言处理、生物特征识别、搜索引擎、医学诊断、检测信用卡欺诈、证券市场分析、DNA序列测序、语音和手写识别、战略游戏和机器人等领域。

机器学习这么厉害，那它会不会突然弄出一个有自我意识的AI，把人类给团灭了啊？至少现在是不会。机器学习跟真正的人工智能的概念还差得挺远，它所制造出的程序只能完成人类预设好的，给出了具体训练目标的任务，而并不是真正的思考。

如果真的要说有谁会因为这次 Facebook 的研究成果而感到恐慌的话，大概就是那些快要失业的谈判专家们吧。

<img src="http://2-im.guokr.com/D9o_tUZ5btSnYdm5aEkWcyVjE7_Lb1zHe70Ja8IlwiOjBAAA9gIAAEpQ.jpg" class="img-responsive" alt="" />

参考资料：
1. https://www.theatlantic.com/technology/archive/2017/06/what-an-ais-non-human-language-actually-looks-like/530934/
2. http://www.npr.org/2017/07/17/537686649/elon-musk-warns-governors-artificial-intelligence-poses-existential-risk
3. https://code.facebook.com/posts/1686672014972296/deal-or-no-deal-training-ai-bots-to-negotiate/
4. https://arxiv.org/abs/1706.05125
5. http://www.snopes.com/facebook-ai-developed-own-language/
6. http://gizmodo.com/no-facebook-did-not-panic-and-shut-down-an-ai-program-1797414922
7. https://en.wikipedia.org/wiki/Reinforcement_learning
8. 文章题图：gizmodo.in

（编辑：Calo）

_本文已于2017年8月发布于[果壳网](https://www.guokr.com/article/442345/)，译文版权归果壳网（guokr.com）所有，禁止转载。如有需要，请联系sns@guokr.com_