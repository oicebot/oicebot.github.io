---
layout: post
title: 这次，我们把导师打包进 Notebook 里，手把手写代码给你看！
tags: Udacity Nanodegree Translate
from: https://blog.udacity.com/2019/04/interactive-screencasts-jupyter-graffiti-c-plus-plus-nanodegree.html
author: Will Kessler
thumb: "/img/20190426/thumb.jpg"
excerpt: 你的导师快递到了，请注意查收
---
<img src="{{site.cdn}}/img/20190426/001.jpg"><br><small>
（图片来源：pixabay.com）</small>

无论是基础编程、数据科学还是一路学到高级人工智能，[Jupyter Notebook](https://jupyter.org/) 都是你学习技术课程的[绝佳工具](https://oicebot.github.io/2018/07/14/jupyter-notebook-for-python.html)，没有之一。它既像网页一样，可以直观地阅读和查看学习内容，又和传统的编程环境一样，可以“动手”在页面上运行代码，在公式和图形旁边拿代码与数据单元格做实验。

但是，当你被困在某个问题之中时，你是否也希望过一位导师能坐在你旁边，“向你展示问题应该如何解决”？

如今，这个愿望已经变成了现实。优达学城在[最新的《C++ 程序设计纳米学位》课程](https://cn.udacity.com/course/c-plus-plus-nanodegree--nd213)中引入了装有 Graffiti 交互式课件的 Jupyter Notebook。也就是说，我们把你的课程导师打包压进了课件里，手把手指导你解决一个个难题——这将会是一段前所未有的超棒学习体验！

<img src="{{site.cdn}}/img/20190426/002.png"><br><small>
Jupyter Notebook 加载了 Graffiti 迷你终端用于交互式执行 C++ 代码（图片来源：blog.udacity.com）</small>

## Graffiti 能把预先录好的互动演示与你的 Notebook 页面结合在一起

通过 Jupyter Graffiti，优达学城的导师能直接在页面上向你展示如何解决每个问题。通过这种方式，他们可以逐段讲解课程内容，指出、选中、键入和执行各种代码，添加删除代码单元格，全程还可以录下语音指导内容。作为学生，你可以根据需要有选择地播放这些记录，随时可以暂停、回放、快进，以便反复观看对应段落的讲解内容。

<img src="{{site.cdn}}/img/20190426/003.gif"><br><small>
正在播放讲解内容。（图片来源：github.com/willkessler）</small>

由于 Graffiti 的“视频”本质上其实是一个交互式演示，而不是截屏，所以当你暂停演示的时候，你可以运行当前时刻的代码，或是对代码进行编辑、复制、修改，然后再次执行，查看结果。等到你觉得已经理解透彻的时候，只需要点一下，就能从刚才暂停的地方继续下去。

无人车之父、GoogleX 实验室缔造者、优达学城联合创始人 Sebastian Thrun 先生是这样评价的：

> 「想要彻底“抓住”知识，你必须看一点、试一下，观察发生了什么，然后继续看更多…… Graffiti 创造的这种增量式学习体验，正是我们每一个想要成为优秀程序员的人所需要的。」

除了“视频”以外，你还能看到许多可视化的标注，例如高亮、图形、符号、箭头和文本注释，以帮助你理解课件里的代码是怎么工作的。嵌入式的 Graffiti 迷你终端还能记录下命令行的行为。而“ Graffiti 按钮”能用于交互式地显示出解决方案，配上详细解释这些答案的录音，简直完美。

<img src="{{site.cdn}}/img/20190426/004.png"><br><small>
Graffiti “迷你终端”和显示着“compile and execute（编译并运行）”的按钮一起使用，直观地展示出导师代码的运行过程和结果。（图片来源：blog.udacity.com）</small>

Graffiti 已经在优达学城的的《[R语言数据科学编程纳米学位](https://www.udacity.com/course/programming-for-data-science-nanodegree--nd104)》课程中提供服务了，但这只是小试牛刀罢了。目前最新的《C++ 程序设计纳米学位》课程里已经大规模地采用 Graffiti 进行教学，在课程中，你可以详细地看到优达学城的导师是如何编辑、编译和运行 C++ 代码的。

> 「我可以向学生展示一个更复杂的程序的所有组件——头文件、cpp 和 makefile 等——是如何被串联在一起，协同工作的。而学生可以立即调整我正在展示的代码。」C++ 课程主管 David Silver 介绍说，「对于学生来说，由于 Graffiti 非常容易编辑、尝试，我可以比以往更加详细地解释那些更难的概念。」

最后，因为优达学城从 Jupyter Notebook 中确实受益匪浅，所以我们决定把 Graffiti 也开源给广大编程社区使用。

你可以在这里访问开源的 Graffiti 代码：<https://github.com/willkessler/jupytergraffiti>

我们相信任何使用 Jupyter Notebook 的人都会喜欢上使用 Graffiti，我们也很期待看到大家都会怎样利用它，并渴望听到学生们对这种新学习工具的看法。

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」，标题为编辑修改。 原作： [{{ page.author }}]({{ page.from }}) 译者：欧剃 转载请保留此信息）_