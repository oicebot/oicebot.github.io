---
layout: post
title: 这件神器，每个 Python 学习者都值得一试
date: 2018-7-14
tags: udacity translate python
from: https://medium.com/codingthesmartway-com-blog/getting-started-with-jupyter-notebook-for-python-4e7082bd5d46
author: Sebastian Eschweiler
---
<img src="/img/20180714/image1.png">

不论你是刚开始学 Python，还是正在啃数据分析的骨头，对你来说，不断在各种命令行窗口和编辑器里切来切去，或者不断打开各种窗口查看 matplotlib 的输出之类的繁琐操作，一定是家常便饭了。哎呀，这都 8102 年了，除了又大又笨重的 IDE，难道就没有什么简单而直观的办法，让我们这些新手能管理和运行代码吗？

<img src="/img/20180714/image2.png">

当然有啊，还是免费的咧！

这款神器就叫 `Jupyter Notebook`，它一定能拯救你于水深火热之中！

Jupyter Notebook 是一款 Web 应用，它能让用户将上面说的各种窗口里的东西，全部组合到一个可读性好，易于共享，且对新手友好的文档中。这个文档里可以包括：

* 可执行的代码，比如我们需要的 Python 代码
* 可视化的数据库图表，或者代码执行之后生成的可视化效果，比如 matplotlib 输出的图像等
* 各种解释性文字，例如用 markdown 语法写的格式化说明文本，Latex写的数学方程等

因此，你可以方便地一边写代码，一边写许多带格式的注释文本，还能让运行结果实时在页面内显示出来。所以，Jupyter Notebook 很适合以下一些用途使用：

* 学习并尝试运行 Python 代码，观察其效果
* 数据处理和转换
* 数值模拟分析
* 统计建模
* 机器学习

吹了这么多，你是不是心动了？那接下来就让我一步步介绍 Jupyter Notebook 的安装和使用，以及一些基础的功能，你还可以自己开一个 Jupyter Notebook 试试手！
 
那么，让我们开始吧！

## 安装  Jupyter Notebook

首先访问 Jupyter Notebook 的官网 http://www.jupyter.org ，往下稍微拉一点，可以看到这样的选项：

<img src="/img/20180714/image26.png">

这里有两个按钮：
* 一个是“Try it in your browser”，也就是能让你直接在浏览器里试用
* 另一个“Install the Notebook”，是让你在电脑上安装部署你自己的 Jupyter Notebook 运行环境
 
如果你还不确定 Jupyter Notebook 会不会成为你的真爱，你可以选择直接在浏览器里试用。点击之后，你可以选择想要在体验的 Jupyter Notebook 里使用哪种语言（当然，我们选Python），然后你将跳转到一个已经搭建好了的 Jupyter Notebook 云平台上，可以在这里直接体验各项功能，而无需下载安装一大堆软件。
 
<img src="/img/20180714/image25.png">
 
选第二个选项，它就将一步一步教你如何在自己的电脑上安装 Jupyter Notebook 本体。主要有两种方法：
 
* 先安装Python环境，然后通过 Python 的 pip 包管理工具安装 Jupyter Notebook 软件包
* 通过 Anaconda 管理器，一键安装 Python 环境和 Jupyter Notebook （还带有许多科学计算所需的 Python 库）
 
如果你是初学 Python ，希望从头搭建一个合适的运行环境，那 Anaconda 管理器一定是最适合你的。因为它提供了一个一站式的 Python 环境安装管理解决方案，还自带一个很方便的图形界面，让你根据需要为每个项目定制一个运行环境。

<img src="/img/20180714/image17.png">

在 https://www.anaconda.com/download/ 上下载适合你电脑系统的安装包（支持 Windows、MacOS 及 Linux，需区分32位或64位），双击安装，一路 Next 到底。之后，你就能在命令行界面运行这个命令来启动 Jupyter Notebook 的后台服务了：
 
<img src="/img/20180714/image6.png" height="100px" >

执行这行命令后，你会看到类似这样的提示信息：

<img src="/img/20180714/image18.png">

此时 Jupyter Notebook 的后台服务就开始运行，一小会儿之后，系统会自动打开浏览器，显示 Jupyter Notebook 的 web 界面，类似这样：
 
<img src="/img/20180714/image24.png">

这个界面是用来管理电脑上的多个 Notebook 文件的。在顶端，有三个不同的标签：
* Files（文件），该标签内显示当前工作路径下的文件
* Running（运行），该标签内显示当前正在后台运行的 Notebook 文件
* Clusters（集群），用来进行并行计算的，咱们暂时还用不到它
 
默认显示的是 Files 标签页，其中可以运行的 Notebook 文件（扩展名是 . ipynb ）以灰色或绿色的笔记本图标显示，绿色表示这个文件已经被打开。
 
## 创建一个新的 Notebook 文件

创建一个新的 Notebook 文件很简单，点击右上角的 New（新建）按钮，就会弹出一个这样的下拉菜单：

<img src="/img/20180714/image19.png">

选择 Notebook 里的 Python 3 选项，新建一个可运行 Python 3 代码的 Notebook 文件。这个文件将会被打开，你的浏览器也会自动切换到 Notebook 文件应用的界面：
 
<img src="/img/20180714/image13.png">

目前这个 notebook 还是“未命名”状态，点击顶部的标题“Untitled”，就可以重命名这个文件。重命名之后，这个文件就会保存成“文件名.ipynb”这样的格式。
 
比如，我把文件名改成 notebook01 ：

<img src="/img/20180714/image11.png">

切换到前面一个浏览器页面，你就会发现，刚新建的 notebook01.ipynb 文件已经在目录里了：
 
<img src="/img/20180714/image16.png">

正如前面所述，已打开文件的图标是绿色的，如果你选中它，上面还会有一个 Shutdown（关闭）按钮，你可以点击按钮来关闭一个运行中的 notebook 文件。
 
不过先不急着关闭它，让我们切回 notebook 文件里，好好玩弄一下它（…），熟悉一下各种功能吧！
 
## 如何使用

<img src="/img/20180714/image21.png">
 
回到 notebook 界面，可以看到，从上到下分别是：
* 当前文件的标题，以及最后一次保存的时间
* 菜单栏，包括文件操作，各种编辑选项，内核控制，以及帮助等菜单
* 工具栏，从左到右分别是：保存文件、新增单元格（Cell），剪切、复制、粘贴，上移下移当前格，以及运行停止等控制按钮。
* 最下面一个大空白是 notebook 文件的主要区域。
 
你应该注意到了，notebook 文件是由一系列单元格（Cell）构成的，目前这个新文件里只有一个空白的格子：
 
<img src="/img/20180714/image5.png">

右上角显示了当前这个单元格的类型是“代码（Code）”。在这种类型的单元格里，你可以直接输入希望运行的 Python 代码。每个格子里可以放上一行或者多行的代码。
 
当你点击右上角的运行按钮<img src="/img/20180714/image20.png">，或者按`Shift + 回车`组合键，该单元格里的代码将会被运行。
 
<img src="/img/20180714/image7.png">

运行之后的输出结果将会显示在单元格内容的正下方，然后输入光标就会跳转到下一个格子，方便你继续写更多的代码。当然，你随时可以点击上面的格子，修改或者添加更多的代码。
 
再看一个例子：
 
<img src="/img/20180714/image22-s.png">

在后面的格子里，我写了一个循环，让它输出一系列数字。运行一下，就能直观地看到运行结果出现在代码下方。

此外，你还可以把单元格的类型从“代码（Code）”改成“文本（Markdown）”，这样你可以方便地用 markdown 语法写出带格式的注释或说明文本，方便你整理归纳代码，或是在数据分析时描述需要处理的数据信息等。
 
要改变单元格的类型，只需要在下拉菜单里选择 Markdown 即可：

<img src="/img/20180714/image23.png">
 
改了单元格类型之后，你会发现前面的 In [ ]: 标记不见了。你在这个单元格中输入 markdown 标记时，会自动解析成不同大小，不同格式的文字标记：

<img src="/img/20180714/image3.png">

当你写完这些文本时，你可以“运行”这个单元格，或是按【Shift + 回车】快捷键，于是那些 markdown 格式的记号会被渲染成文本。效果如下：
 
<img src="/img/20180714/image22.png">
 
当你的鼠标指向标题的时候，还会自动出现一个链接，点击之后，你的浏览器地址栏会更新成指向这个标题的链接：
 
<img src="/img/20180714/image12.png">
 
如果你想要改一改 markdown 文本，只需要双击单元格中的文字，则编辑框又会重新出现。
 
## 编辑模式和命令模式

按照你选中一个单元格时的方式，单元格有两种不同的激活模式：编辑模式和命令模式。
 
如果你点击一个单元格的周边空白处或是输出部分，你选中的这个单元格就进入了命令模式，左边的指示条是蓝色：
 
<img src="/img/20180714/image21.png">

如果你点击代码区域，则单元格就进入编辑模式，光标将在你点击的位置闪烁，而左边的指示条也变成绿色，表示你正在编辑代码内容：
 
<img src="/img/20180714/image14.png">

在编辑时，你可以按 ESC 键退出编辑模式，回到命令模式。
 
这两种模式的区别在于，在编辑模式下，代码编辑框接收你所有的键盘输入，让你对代码/文本进行编辑。而在命令模式下，Jupyter Notebook 页面能响应你的各种键盘快捷命令。
 
想了解编辑模式和命令模式下可用的键盘快捷键都有哪些，你可以在菜单栏选择 Help（帮助） -> Keyboard Shortcuts（键盘快捷键），系统会列出具体的命令清单：
 
<img src="/img/20180714/image15.png">

## 保存记录点

Jupyter Notebook 还有一个很酷的功能：记录点。你可以为当前的 notebook 文件创建一个记录点，保存当前文件的所有状态。创建记录点之后，你可以随时返回到当前的状态，撤销这期间做出的任何修改。
 
要创建一个新的记录点，你只需要在菜单栏上选择 File（文件）-> Save and Checkpoint（保存记录点）即可。点完之后，你就会在标题旁看到 Checkpoint 保存的提示：
 
<img src="/img/20180714/image4.png">
 
如果你想要返回到之前的 Checkpoint，你只需要在菜单栏上选择 File（文件）-> Revert to Checkpoint（返回到记录点），并点击对应的记录点的时间戳即可。
 
## 导出 Notebook 数据

Jupyter Notebook 提供了几种不同的数据导出方式。你可以在菜单栏上选择 File（文件）-> Download as（下载为），在弹出的菜单里看到具体支持的导出格式。
 
<img src="/img/20180714/image9.png">

## 之后该怎么玩

至此，我想你对 Jupyter Notebook 的基本操作已经有了初步的了解，你可以试着新建一个自己的 notebook 文件，在接下来的 Python 学习、项目编写中用到它。Jupyter Notebook 能很好地兼容许多科学计算、数据分析等领域常用的 Python 库，比如 numpy、pandas 以及 matplotlib 等，还能直观易懂地把这些数据显示给你看。
 
当然，如果你是纯纯的 Python 萌新，也不用着急，优达菌已经已经给你准备了许多 Python 学习材料，带好你的 Jupyter Notebook，一起踏上愉快的学习之旅吧！

（本文已投稿给「[优达学城](https://cn.udacity.com)」并发表。 原作： [{{ page.author }}]({{ page.from }}) 译者：欧剃 转载请保留此信息）
