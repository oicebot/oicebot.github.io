---
layout: post
title: "我们拿到了代码优化的 5 个原则，可第一条就叫你别优化了"
tags: Udacity Translate 
author: Ravi Shankar Rajan
from: https://medium.com/swlh/5-powerful-ways-to-make-your-code-run-faster-b99ef1e20626
excerpt: "好的代码必须首先干净，接着稳定，最后才是快速。"
thumb: "/img/20190921/thumb.jpg"
---

<img src="{{site.cdn}}/img/20190921/001.jpeg"><br><small>
图片来源: Unsplash.com</small>

“**让这代码跑得快一点**！！”——我碰到的第一件代码优化任务就是这么开始的。那个项目是一个巨大的 SAP 云平台应用程序，总共含有超过 3 万行的代码。

整个 App 加载数据的过程非常之慢，显然用户并不喜欢这种体验。

然而，我必须承认，这个项目的代码写的挺不错，数据库调用很合适，只在有需要的地方进行循环，模组化也实现的很到位。我花了两天时间，绞尽脑汁地进行各种测试，审查代码逻辑，但完全没发现到底是什么地方让这个程序变得如此之慢。

就在第三天，在我穷尽了所有的办法，最后一点理智也快要消失的时候，我终于发现了问题所在。

在其中的一个读取页面上，被塞了一个等待语句，程序到这里就停上 20 秒。

<img src="{{site.cdn}}/img/20190921/002.jpg">

？？？

这大约是原来调试这段代码的程序员在排查的过程中插入的等待命令，结果在将代码合并进生产环境的时候忘记把这行东西去掉了。而在生产代码中，每次调用读取的时候，这段等待命令都会被执行，这就进一步放大了产生的问题。

于是，我把这行代码删掉了。好家伙，一切都正常了！

## 有人说，代码优化是一把双刃剑

优化你的软件是一件好事，但这并不能保证它永远都会有好结果。

如你是在错误的原因驱动下，或是通过错误的方法进行代码优化，这种所谓的优化往往可能增加成本，减缓生产速度，甚至可能会让软件的质量下降。

此外，大多数时候，优化并不是没有代价的，你必须做出谨慎的权衡。例如，提高速度可能会使你在资源利用方面付出代价，更高效地利用存储则很容易减慢运行速度。你需要仔细考虑你在其他方面做出的权衡，这样你的软件才能够实现它的主要目标。

也许你会问，那我该怎么办？

下面是一些值得你考虑的要点，遵循这些原则，可以让你的代码更具响应性，也能减少你给用户的设备以及它们连接到的数据库带来的额外压力。

<img src="{{site.cdn}}/img/20190921/003.jpg"><br><small>
图片来源: pixabay.com</small>

## 1. <b>不要</b>进行优化

代码优化的第一条原则就是，“**不要**”优化它。

这个程序是不是已经足够好了？你要去理解这个程序将会被如何使用，知道它是在怎样的环境下运行的，明白如果让它运行的更快到底有没有好处。在真正开始代码优化之前，你必须要问自己这几个问题。

没错，代码优化所耗费的经历和成本，只有在这样的情况下是有意义的：

1. 这个软件很重要
2. 它运行的确实很慢
3. 在保证代码健壮、正确、清楚的情况下，它确实还有改进的余地

一个程序，就算它运行得再快，如果无法得到正确的结果，那就毫无用处。有效的优化，给软件带来的好处应该总要比坏处多。但如果你的优化走错了路，那往往还不如别动它。

所以，你要做的第一件事，应该是设置一个合理的优化目标：

1. 你需要清楚地了解你要达成的目标是什么，以及各种优化手段与这个目标之间的关系。
2. 你需要明确而简单地说明这个目标，简单到就算技术理解能力最差的部门经理也能够理解和复述它。
3. 你需要在整个过程中坚持这些目标。

<span class="hl">要开始这项工作，最好的办法是，根据对目标的影响确定每项任务的优先顺序。你要做的每一件事情，都必须是可计量的。不要相信直觉，它基本上总是把你引向非常糟糕的方向。</span>

## 2. 使用一个分析器

在没有经过分析之前，不要贸然调整任何东西。最常见的错误做法就是，花了一整天去重构优化一段代码，结果在运行的时候发现，这段代码平时根本用不到。

分析器能精确地测量出你的程序把时间都花在什么步骤上了。有些分析器能列出每一个函数，包括它们被调用的次数，以及每次执行的时候耗时的占比等。

还有的分析器能列出每个命令的执行次数，被频繁执行的那些命令，在总占用时间上的权重肯定更高，而完全没被运行的那些命令，往往就是一些无用的代码，或者没有经过合适测试的代码。

一个好的分析工具，最有用的地方就是能让你发现软件中的“<span class="hl">热点</span>”，也就是消耗了最多运行时间的那些函数或者命令语句。基本上如果你发现了一个热点，你也就发现了问题所在。

<span class="hl">性能分析的最佳使用方法就是识别出“热点”，然后尽可能地优化它们，接着再次测量，以查看是不是有新的热点冒了出来。</span>

## 3. 启用编译器优化

通常情况下，有种比较靠谱的优化方式，那就是打开编译器提供的那些内置的优化选项。

编译器优化通常会给你的程序带来几个百分点到两倍的运行速度提升。但某些情况下，这也可能反而降低速度，所以你需要在最终交付之前仔细测量性能优化的结果。不过总的来说，现代的编译器在这方面已经做的足够好了，程序员基本上再也不需要像以前那样，不停地对编译参数做各种频繁的小调整。

一些现代的编译器还具备全局优化能力，可以分析你的整个程序，以获得潜在的提升。如果你的系统中有这样的编译器，请一定要试试。它可能会把运行时间减少个几秒钟。

<span class="hl">注意：编译器的优化设置越激进，最终编译出来的程序中出现不明 Bug 的可能性也越高。所以，强烈建议你在开启编译器的优化选项后，务必重新进行回归测试，以避免出现一些奇怪的意外。</span>

## 4. 调整代码

只有到这时，你才真正开始修改调整代码。在此之前，你必须已经通过第二步的性能分析发现了“热点”，并且试过使用编译器进行优化——毕竟绝大多数这些问题能让编译器帮你解决，也避免了你把这些代码弄得过于复杂。

那么，一般来说，有几种比较成熟的方法来处理这些“热点”。再次提醒，你必须非常谨慎，确保在提交每个更改之前，对它产生的影响进行测量。

那么，让我们看看这几个方法吧。

### 将常用的表达式计算归集在一起

如果同一个非常消耗性能的计算在多个地方重复出现，最好能只在一个地方进行计算，然后记住计算结果。除非必要，否则不要在循环中进行这样的计算。

### 用简单的计算代替消耗性能的算法

字符串处理对于任何一个程序来说，都算是非常常见的运算了。但如果你用错误的办法去处理字符串，它们也有可能消耗大量的性能。类似的，在某些情况下，你可以用一系列移位操作来代替乘法运算。但请务必注意，这种方式或许能带来一些性能提升(其实并不一定)，也有可能让你写出非常崎岖复杂的代码。所以在重构的时候，你必须非常注意代码可读性，以免写出无法维护的代码。

### 消灭循环

循环，往往是开销最大的行为，没有之一。在允许的情况下（例如迭代数量不太多的时候），尽量避免使用循环。

### 缓存常用的值

缓存能有效地利用本地性——也就是程序（以及用户）更倾向于重用最近的数据。你只需要缓存最常用的字符或数据，就能大大提高程序的性能。

### 使用一种更低层次的语言重写

**警告：不到万不得已，不要这样玩。**

更低层次的语言在利用硬件设备性能方面往往更具效率（看看 Python 里的内置函数是用 C 写的就知道了），但要写好这些东西，将会消耗更多的编程开发时间。有时，通过用低层次的编程语言重写关键代码，能获得较大的性能提升，但这是以降低可移植性为代价的，也会让以后的维护变得非常困难。因此，请谨慎做出决定。

<span class="hl">请记住：在优化工作中，做出选择这件事占了90％的权重。值得花时间来决定你要做什么，以及怎样才能做的对。当然，这也正是编程的黑科技之处！</span>

## 5. 在你的管理模型中加入代码审查环节

这条是同时写给开发者和管理者的。对于软件工程的管理者，你必须确保代码审查是项目开发过程的一部分；对于开发者，你应当将代码审查作为最佳编程做法中的必备环节。

低效的代码不会对系统的日常运行造成太大影响。由于这个明显的理由，我们往往会倾向于让效率低下的代码通过审查——因为它并没有产生任何真正的伤害，不是吗？这可不对。随着时间的推移，代码效率将会越来越低下，并且导致执行速度变慢，最终使客户端的处理时间大大超过可以接受的范围。

是的，引入常规代码检查，删除效率低下的代码片段，或许会给你增加许多工作量。但从长远来看，如果你把那些低效的代码留在原地，未来你将不得不付出成倍的工作量，去检查为什么代码的运行要花上这么长的时间——那时的你一定会感激现在的自己。所以说，不要让现在的偷懒成为你未来的痛苦。尽可能检查并优化你的代码效率。

一定要让别人检查你的代码。理想的情况下，检查者是你所钦佩的某个大佬，但基本上任何开发者都能互相检查。不过，如果某人根本看不懂你的某些代码，那可要非常警惕了——要么是检查者的水平问题，要么就是你的代码可读性实在太烂了。

## 结语

最后，任何代码的改进，都是从你自身开始的。在编程的世界里，你不可能从第一遍就非常完美地写出代码。你总需要对代码进行更改、修正错误，甚至有时代码无论如何都无法按照你想要的方式工作。这没什么问题，这完全就是成为一名程序员的必经之路。让写出干净的代码，成为你的习惯吧。

正如极限编程的创始者，设计模式的先驱肯特·贝克（Kent Beck）指出的那样：

> “我不是一个伟大的程序员，我只是一个不错的程序员，加上伟大的习惯。”

<img src="{{site.cdn}}/img/20190921/004.jpg"><br><small>
图片来源: pixabay.com</small>

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) ，译者：欧剃 转载请保留此信息）_