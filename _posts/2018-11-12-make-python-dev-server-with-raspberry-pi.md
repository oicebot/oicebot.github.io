---
layout: post
title: 仅需10步，手把手教你用树莓派打造 Python 开发服务器
tags: Udacity Translate Python
from: https://medium.freecodecamp.org/how-to-make-your-own-python-dev-server-with-raspberry-pi-37651156379f
author: Karan Asher
thumb: "/img/20181112/thumb.png"
excerpt: "基本上一台普通的 Linux 电脑能做的事情，树莓派也能完成。今天这篇教程玩的可能会比较“高级”一丁点，我们将手把手带你用树莓派打造一个你自己的 Python 开发服务器。"
---

<img src="{{site.cdn}}/img/20181112/001.png" alt="" /><br><small>
图片来源： python.org  / wikimedia.org</small>

> 树莓派（Raspberry Pi）基本上就是一台超级便宜的 Linux 电脑，一般就两三百软，大小跟信用卡差不多。

树莓派能做的事情不少，基本上一台普通的 Linux 电脑能做的事情，它也能完成。比如用它连接U盘、鼠标、键盘等外设，上上网，写写代码，编辑一下文档，诸如此类。今天这篇教程玩的可能会比较“高级”一丁点，我们将手把手带你用树莓派打造一个你自己的 Python 开发服务器。

<center>～～～</center>


## 第0步：明确目标

在开始之前，理解我们尝试搭建的目标是很重要的。今天我们的目标是教你用树莓派搭建一个 Python 开发服务器，更具体地说，就是用 Flask 加 Python 在你的局域网里从零打造一个网站！

<img src="/assets/images/code-1839406_640.jpg" alt="" />

## 第1步：前置准备

为了跟上教程的节奏，我们假定你已经做好了以下这些准备：

1. 你已经有一台树莓派，装好了 Raspbian 系统，如果你还没准备好，这里有一个[安装指南](https://www.raspberrypi.org/documentation/setup/)。
2. 树莓派已经连上了你家里的WiFi（或有限网络），你知道树莓派的 IP 地址。
3. 如果你已经准备好了前两点，那你就不需要給树莓派接一个显示屏了。否则，你可能需要一个显示器以便进行一些设置。

我们将会用到 [VS Code 编辑器]({{ site.url -}}/2019/02/15/5-best-code-editors.html#VSCode)，还需要 Remote VSCode 插件，以便远程编辑树莓派上的文件。我强烈推荐你使用这个编辑器和插件，这样会让修改编辑服务器上的文件方便不少，算是个优势吧。

<img src="{{site.cdn}}/img/20190215/006.jpg" alt="" />

## 第2步：找到树莓派的 IP 地址

首先，给树莓派接上电，确保它能正常启动并连上你的 Wifi/有线网络（可能需要互联网连接）。

接下来，我们要获得树莓派的 IP 地址，以便通过 SSH 连接上去。你可以访问你家里的路由器（或网关）的设置页面（比如类似 http://192.168.0.1 这样的地址，不同的网络设备不一样），通过连接上路由的设备地址来判断树莓派的 IP 地址。

当然你也可以直接给树莓派接上一个显示器，在 Raspbian 的图形界面上就能看到当前的 IP 地址。

通常情况下，你会找到一个类似 192.168.0.12 这样的地址。但还是那句话，对不同的人，不同的网络环境，这个地址肯定是不会一样的。请务必确认你找到的 IP 地址是指向你的树莓派的。

接下来的教程中，我们将会用 <span style="color:red"><b>192.168.0.12</b></span> 作为范例 IP 地址。

## 第3步：连接树莓派

在你的电脑上，打开 VS Code 内置的命令行窗口。假设树莓派的 IP 地址是 192.168.0.12 ，请键入如下命令：

```bash
ssh -R 52698:localhost:52698 pi@192.168.0.12
```

以上命令将在你的电脑和树莓派之间建立一个双向的 SSH 通道。如果你是第一次通过 SSH 连上树莓派，请使用默认密码 raspberry。连接成功之后，你会收到一个更改默认密码的提示。强烈建议你自己设置一个安全的密码。

<img src="{{site.cdn}}/img/20181112/002.png" alt="" /><br><small>
成功连接上树莓派之后，命令行窗口会出现类似这样的信息。</small>

## 第4步：建立一个工作文件夹

你现在应该已经在树莓派的 `home` 文件夹中了。让我们先创建一个工作文件夹，之后网站的所有内容都会在这里面。用下面这个命令新建一个文件夹：

```bash
mkdir MyFlaskWebsite
```
使用 `ls` 命令检查一下，你可以看到一个名为 MyFlaskWebsite 的文件夹已经生成了。

<img src="{{site.cdn}}/img/20181112/003.png" alt="" /><br><small>
创建并检查你的工作文件夹</small>

## 第5步：安装 Flask

我们将用 Flask 来搭建一个简单的网站。Flask 是一个基于 Python 的简易网页框架。它使用 Jinja（一个基于 Python 的模版引擎）作为模板引擎，可用性高，功能强大。使用下面这个命令，在树莓派上安装 Flask：

```bash
sudo apt-get install python3-flask
```
<img src="{{site.cdn}}/img/20181112/004.png" alt="" /><br><small>
安装 Flask</small>

## 第6步：来点简单的代码

安装完 Flask 之后，我们可以开始创建文件，写点简单的代码啦。首先，进入你最近创建的文件夹（参见第4步）：

```bash
cd MyFlaskWebsite
```

我们需要用到的所有文件都将放在这个文件夹中。现在，用下面这个命令新建你的第一个代码文件（`app.py`）吧：

```bash
touch app.py
```

再用 `ls` 命令检查一下，你应该能看到文件夹里多了一个文件：

<img src="{{site.cdn}}/img/20181112/005.png" alt="" /><br><small>
进入文件夹，并创建一个新文件</small>

现在，按下 `F1` 键，选择 “Remote: Start Server”。这将使你可以用电脑远程编辑树莓派上的文件。

<img src="{{site.cdn}}/img/20181112/006.png" alt="" /><br><small>
启动远程服务器</small>

下一步，用这个命令编辑你新建的 `app.py` 文件：

```bash
rmate app.py
```

第一次载入可能需要几秒钟时间，但这个空文件很快就会在上面的窗口中显示了。

<img src="{{site.cdn}}/img/20181112/007.png" alt="" /><br><small>
开始远程编辑这个文件</small>

参照下图的代码，编写你的 app.py 文件。在下面这个例子中，我们指定了一个路径，它指向网站首页 '/'，并让它显示一行文字：“This is my flask website and it is so cool.（这是我的 Flask 网站，是不是很酷啊）”。请注意， `host='0.0.0.0'` 参数将让整个局域网中的所有设备都能访问这个网站。

<img src="{{site.cdn}}/img/20181112/008.png" alt="" /><br><small>
创造一个简单的网页</small>

现在，保存文件，并用下面的代码在树莓派上运行你的网站服务：

```bash
python app.py
```

运行效果如下：

<img src="{{site.cdn}}/img/20181112/009.png" alt="" /><br><small>
运行网站服务软件</small>

看到上面的输出之后，你就可以用局域网内的任意设备，打开浏览器，访问树莓派的 IP（我们这个例子中是 192.168.0.12 ）加上上面的端口号（5000），来访问刚才这个服务程序建立的网页。完整地址应该是 <http://192.168.0.12:5000/>

如果一切正常，你应该能在网页上看到上面代码中的那行字：“This is my flask website and it is so cool.”

<img src="{{site.cdn}}/img/20181112/010.png" alt="" /><br><small>
在浏览器中查看网页内容</small>

这表示你的开发服务器已经激活，并且运行着你刚建立的网站。

## 第7步：增加更多的路径

目前这个代码只有一个路径，也就是网站的首页。按照下面的代码，你可以增加一个新的路径。你可以在开发服务器上动态调整代码，它会自动捕获代码变更，当你刷新浏览器的时候，它会自动运行一个更新过的版本。

<img src="{{site.cdn}}/img/20181112/011.png" alt="" /><br><small>
增加一个 meow 的路径</small>

为了检查新添加的路径是否正常工作，你可以访问 <http://192.168.0.12:5000/meow> ，如果一切正常，网页上将会显示一个大大的 MEOW（喵）。

<img src="{{site.cdn}}/img/20181112/012.png" alt="" /><br><small>
检查新增的路径是否正常工作</small>

## 第8步：整理项目结构

当然，你可以继续增加更多的路径，这看起来很酷。但把所有代码都放在同一个 app.py 文件里并不是什么好主意。一个好的网站应该有良好的结构。

通常，我们会用一个文件夹存储 HTML 模板，一个文件夹放 CSS 文件，另一个文件夹放 JS 文件。让我们试着把这些文件夹添加进去，把对应的代码放到相应的文件夹里，让整个项目结构清晰。你可以用下面这些代码来新建所需的文件夹：

```bash
mkdir templates
mkdir tatic
```

同样，你可以用 `ls` 命令检验一下文件夹是否被正确创建了。

<img src="{{site.cdn}}/img/20181112/013.png" alt="" /><br><small>
增加结构，可以让项目更有条理</small>

现在，我们可以给首页添加一个 HTML 模板文件啦。用下面的代码，进入对应的文件夹，并且新建一个 `index.html` ，再用 rmate 命令来编辑：

```bash
cd templates
touch index.html
rmate index.html
```

<img src="{{site.cdn}}/img/20181112/014.png" alt="" />

接下来，在 index.html 里写一些首页所需的基本 HTML 代码：

<img src="{{site.cdn}}/img/20181112/015.png" alt="" /><br><small>
首页中将要显示的 HTML 代码

在 app.py 中进行修改，让首页使用 index.html 文件作为模板。下面的代码将会让服务器从默认的模板文件夹中读取 index.html 文件：

<img src="{{site.cdn}}/img/20181112/016.png" alt="" /><br><small>
使用新的 index.html 文件，并用 app.py 进行渲染</small>

现在回到上一层目录，再次运行网站服务。

<img src="{{site.cdn}}/img/20181112/017.png" alt="" />

在浏览器里重新访问首页，你就能看到 index.html 的内容啦。

<img src="{{site.cdn}}/img/20181112/018.png" alt="" /><br><small>

接下来，我们通过在 static 文件夹里添加 main.css 文件，给网站加上 CSS 样式。和之前一样，用 `cd` 命令进入对应文件夹，用 `touch` 命令创建新文件，再用 `rmate` 命令来编辑。

<img src="{{site.cdn}}/img/20181112/019.png" alt="" /><br><small>
创建并编辑 CSS 样式文件</small>

给 h4 标签加一些样式。注意目前 index.html 里只有一个 h4 标签，我们添加的这个样式应该就会这个标签的样式产生影响。

<img src="{{site.cdn}}/img/20181112/020.png" alt="" /><br><small>
一些 CSS 代码</small>

和上面一样，再用这个命令重新运行一下网站服务：

```bash
python3 app.py
```

刷新浏览器看看，这段文字的颜色是不是也改变了？

<img src="{{site.cdn}}/img/20181112/021.png" alt="" />

## 第9步：利用好 Jinja 引擎

**Jinja** 是一个基于 Python 的模板引擎，它能为网页增加许多非常有用的特性。虽然我们今天的课程主要不是介绍 Jinja 的，但我们还是通过几个简单的例子来展示一下 Jinia 的威力吧。

首先，我们在 app.py 里创建一个包含了几种水果的列表，并把这个列表当作参数传给 index.html 。接下来，我们可以让 index.html 在网页上显示这个列表。

对 app.py 和 index.html 做如下改动：

<img src="{{site.cdn}}/img/20181112/022.png" alt="" /><br><small>
将 my_list 变量作为参数传给 index.html</small>

<img src="{{site.cdn}}/img/20181112/023.png" alt="" /><br><small>
在网页上显示 my_list 的内容</small>

刷新一下页面，你应该能见到这个水果列表出现在了屏幕上。

<img src="{{site.cdn}}/img/20181112/024.png" alt="" />


怎么样，是不是很简单便捷？Jinja 的强大和便捷可不仅如此呢，你可以在[这里看到更多关于 Jinja 的介绍](http://jinja.pocoo.org/)。

## 第10步：进阶准备

现在，你已经有了一台全功能的 Python 开发服务器，它的未来拥有无限的可能，唯一的限制只是你的创意（和编程技术）。下面有一些有用的进阶做法，在进一步深入之前，你可以试着在自己的项目里应用一下：

1. 目前你的树莓派只能在本地局域网中访问，为了让它变一个真正的服务器，你还需要让互联网上的设备能访问到这台树莓派。因此，你需要一种叫做端口转发的技术。基本上，你得有一个固定的 IP 地址，和一个域名，并把它们指向你树莓派上的网站端口。
2. 大部分应用都需要一个数据库服务，以满足基本的增删查改（CRUD，Create、Read、Update 和 Delete 的缩写）操作。Python 支持即开即用的 SQlite ，你可以在这里找到关于如何把 SQlite 和 Flask 一起用的教程。 
3. 你能在电商网站上找到一些很酷的树莓派新手入门套装。这基本上包含了所有你入门所需的所有设备，节省了大笔自己搜索购买的时间和精力。
4. 因为你没有给树莓派外接显示器，请务必记得在关掉树莓派之前，先在命令行里执行关机操作。这样能保证树莓派和存储卡的安全：

```bash
sudo shutdown -h now
```

<center>～～～</center>

恭喜你！你已经学会了基本的树莓派服务器搭建，编写了第一个 Flask 网站，还渲染了 Jinja 模板！祝你未来的编程之路更加有趣！

我们下次再见～

_（本文已投稿给「[优达学城](https://cn.udacity.com)」并发表在[知乎专栏](https://zhuanlan.zhihu.com/p/49748475)，原作：[{{ page.author }}]({{ page.from }}) ,译者：欧剃。转载请保留此信息）_
