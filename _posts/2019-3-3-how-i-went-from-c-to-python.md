---
layout: post
title: "How I went from C++ to Python: a conceptual change"
tags: udacity python 
author: asya f
from: https://medium.freecodecamp.org/how-i-went-from-c-to-python-a-conceptual-change-8bf29d059428
excerpt_separator: <!--more-->
thumb: "/img/20190221/thumb.png"
---
<img src="/img/20190221/001.jpeg" />

还记得之前说的[对编程语言就不能“从一而终”]({% post_url 2019-2-2-Why-You-Need-to-Learn-More-Languages %})吗？今天要跟大家分享的是一个程序员的跨语言经历。

<!--more-->

## 介绍

有人说，用 Python 写代码实在太简单了，就连 6 岁小孩子都能搞定。是啊，我刚开始转用 Python 编程的时候，心里也是这么认为的。毕竟，我那时已经是有 4 年 C++ 编程经验的全职程序员，而且主要是在 Linux 下用 QT 库进行编程的。然而，我始料未及的是，我一开始差点搞砸了。

差不多 3 年前，我下定决心从 C++ 转到 Python。现在回想起来，这段经历可不仅仅是换个编程语言这么简单。它彻底地改变了我的工作环境，也改变了我思考代码的方式。因此，我要借此机会，回顾一下我这三年的经历和成果，也算对自己的人生有一个阶段性总结。

别担心，我不会给你长篇大论什么“两种语言的区别”之类的技术问题，这类文章[网上到处都是](https://www.educba.com/python-vs-c-plus-plus/)，我就不再重复了。我只是希望分享我自己的一些经验，希望给遇到类似问题的读者带来一点点启发。

<img src="/img/20190221/002.jpeg" />

## 如果 C++ 是深潜，那 Python 就是浮潜

C++ feels like diving into the magical mysteries of the sea - it is beautiful, but requires more learning and practice, and overall, the distance that you cover is not that big. Python is a bit like snorkeling - you see the beauty as soon as you stick your head into the water, but you don’t go much further down. You keep on swimming in shallow waters, and can cover a long distance easily. From this description it is clear, that each of these languages should be used at its right place and time.

从某种意义上说，使用 C++ 就像是深潜进入神秘的魔法海洋——它充满梦幻，但需要更多的知识和练习才能达成，同时，就算你成功进行了一两次深潜，你能覆盖到的面也不大。另一方面，Python 就像是浮潜，你只要戴好面罩，把脑袋扎进水里，就能看到清澈明亮的海底——然而，你很难再潜入更深的底层，你更多地在浅海里游泳，能轻松接触到很大一片范围。

从这种对比来看，很明显，每种语言都有它独特的长处，必须用在正确的时间和地点，才能发挥最大的效果。

## C++: 不畏艰险勇探深海

相对而言，C++ 对程序员的要求更加严格，它会对你的错误报以更严厉的惩罚。如果你连一次**段错误**都没碰到过，那么你根本算不上用过 C++。所以，它需要你对计算机、编译器和编程语言有更深入的了解。当你潜到足够深的时候，你才能真正看到那些美丽而神秘的“魔法”，并被它们所打动。没错，我说的就是编译过程和内存管理。

作为一名 C++ 程序员，我更关心代码语法的细微调整和一些特殊案例的细节。我必须保证自己总是知道该在哪里分配内存，以及何时释放内存。我的程序基本上都是我自己独立完成的，因为我希望自己清楚代码中发生了什么。一个主要原因是，其他人写的代码往往不太可靠，更容易出错，并且可能会弄爆你的内存。

我日常使用的编程工具是：装了许多插件的 `Vim` 用来写代码，`GDB` 用来调试，而  `Valgrind` 用来分析内存使用情况和捕捉错误。我用 `g++` 来编译， `Makefiles` 也是自己写。在那时候，我并不喜欢 IDE，觉得它们没什么用处，只是会让各种过程变慢，影响我掌控我的代码。回想起来，那时我相当依赖编译器来排查可能发生的类型错误。

<img src="/img/20190221/003.jpeg" />

## Python: 马尔代夫浮潜之旅

转换到 Python 时，你要学会的第一件事就是如何放手——你并不知道底层发生了什么，不知道内存如何被分配和释放，而且这完全 OK。此外，你还被鼓励使用由其他人编写的代码，这些代码将打包到库中，因为它可以节省你的时间，帮助你更快地编写出复杂的功能。这并不意味着你只能编写那些像蜗牛一样慢的代码，或是不得不依赖一些缺乏维护、功能不全的库，重点完全不在这里。

当我刚开始用 Python 的时候，我写的最早的几个程序基本上相当于把 C++ 代码换下语法就喂给 Python 解释器。有意思的是，它们确实能跑，只不过我没有利用好 Python 语言的特性罢了。后来，我逐步开始写一些更加“Python 风格”的代码，试着利用现有的库，以及用上了许多更高级的特性——比如生成器、装饰器和上下文管理等。那时候，我才感受到 Python 的威力。

如今，作为 Python 程序员，我倾向于使用能直接解决问题的库来完成手头的任务。Python 拥有丰富的第三方库生态系统，以及支持它们的社区。基本上，对于任何可能的任务，都有对应的库存在。以下是我每天使用的一些方便的库：用于数字计算的 `NumPy`，用于计算机视觉的 `OpenCV`，用于读取 json 文件的 `json`，用于科学计算的 `SciPy`，用于处理数据库的 `sqlite3`。简直棒呆了。

My everyday tool is `PyCharm` (yes, an IDE) with `IdeaVim` plugin. I started using it mainly due to the fact that it’s a powerful debugger, which is much friendlier than the default Python debugger, `pdb`. I also use `pip` for installing libraries that I need. I don’t monitor my memory usage anymore unless I really have to.

现在，我每天必备的工具是 `PyCharm` （没错，是个 IDE），装了 `IdeaVim` 插件，以便符合我原来的习惯。它是一个功能强大的调试器，它比默认的 Python 调试器 `pdb` 更友好。我还使用 `pip` 包管理工具来安装我需要的库。现在，除非我真的需要，我不再需要监视我的内存使用情况啦。

<img src="/img/20190221/004.jpeg" />

## 一些有用的小建议

如果你是个 C++ 程序员，而且有考虑开始用 Python 写代码，我有一些建议给你：

* <span class="hightlight_words"><b>抛弃旧的习惯</b></span> ——别再用 C++ 编译器当调试器，无需过度优化内存使用，避免写出 C++ 风格的代码，并且无论如何，尽量不要依赖类型。
* <span class="hightlight_words"><b>养成新的习惯</b></span> ——试着使用现有的库，写一些 Python 风格的代码（但也别用的过火了），保持良好的可读性，使用一些更高级的概念，比如生成器/装饰器/上下文等，以及，试试 PyCharm。
* <span class="hightlight_words"><b>采用一些 C++ 和 Python 共有的库</b></span> ——有些 C++ 库，比如 OpenCV 和 QT 等，也都有 Python 接口。如果你在 Python 里也用这些你已经用熟悉了的库，那会比从头学一个完全陌生的库简单得多。
* <span class="hightlight_words"><b>别忘记了自己的初衷</b></span> ——有的时候，Python 的速度太慢，或者并不适合完成某个目标的时候，别为了用 Python 而用 Python，是时候拿出你的 C++ 技术了。而且，有许多办法（比如 `SIP` 和 `ctypes` 等）可以让你在 Python 里调用你的 C++ 代码，别犹豫，放手干吧。

## 结语

No matter what other people say, switching to a different programming language, especially to a language that is fundamentally different than the one you are used to, is not easy. Take the time to learn, to dig in, to discover. But most importantly, understand that not only the language should change, but also your coding style and work methodology.

不管其他人怎么说，切换到一门不同的编程语言，尤其是与你原来的习惯完全不同的语言，并不是件容易的事。你必须花时间去学习、去挖掘、去发现。但最重要的是，要明白你改变的不仅仅是语言，还有你的编码风格和工作方法。

祝你好运！以及，如果你对这方面有你的想法，欢迎留言分享！

_（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）_