---
layout: post
title: "学 Python 有啥用？自动帮你干活了解一下"
tags: Udacity Translate Python
author: Markus Rene Pae
from: https://medium.com/datadriveninvestor/automating-your-job-with-python-f1952b6b640d
excerpt: "还能玩出许多不同花样呢！"
thumb: "/img/20200316/thumb.jpg"
---

今天的文章，主要围绕 <span class="hl">PyAutoGUI</span> 这个简单而强大的自动化工具进行。PyAutoGUI 是一个 Python 库，它能让你用代码来控制鼠标键盘，替你完成许多机械化的工作。如果你已经有一些编程方面的知识（或是对 Python 数据结构的一般性了解）那是最好不过了，但就算你是完全的新手，这篇文章也不会太难懂。

![图片来源：Pixabay](./001.jpg)

总的来说，今天的文章分成四个部分：

1. 简单介绍自动化工作的概念及优势
2. PyAutoGUI 工具的安装和设置
3. 使用 PyAutoGUI 控制鼠标键盘的教程
4. 一些自动化脚本例子

有经验的老鸟请自行跳过“无聊”的部分，可以直接从**“上阵实操”**一节开始阅读

## 简介

我过去的工作经历中，经常会碰到许多数据采集和录入方面的工作。大部分的数据录入工作差不多都可以归类为以下两种：

1. 从表格里提取数据（比如 Excel 文件或者 Google 表格中），并输入到其他地方（比如一个网页，或者干脆是其他的表格文件里）。
2. 从网页（电商网站）或杂志上收集数据和文件（如文本、图像），并将它们放进数据库里。

干这活可不是固定时薪的，我的收入完全取决于工作效率：录入数据越多，报酬也越多。一般来说，每次刚开始的时候，我忙上一小时只能完成 4~6 欧，但等我愈来愈熟练，不断优化工作流程，提供效率之后，最高能达到 15~20 欧每小时。

这些不同的任务具体是怎么做的并无关紧要。重要的是你得问自己，<span class="hl">“还能不能再快一些？”</span>

因此，我开始向 Python 的各种自动化模块寻求帮助。我的结论是<span class="hl">“当然可以！”</span>。

## 工具准备

正如前面说过的，今天我们主要介绍的就是 PyAutoGUI 这个工具。你可以在[这里](https://pyautogui.readthedocs.io/en/latest/)找到它的官方文档。你只需要使用这样的命令即可完成安装：

`pip install pyautogui`

要在代码中使用这个库，你只需要这样导入：

```python
import pyautogui as pag
```

结尾的 `as peg` 是一个简化输入的小技巧，用 `pag.click()` 代替 `pyautogui.click()` 能省不少时间，对吧？

安装完毕之后，我们就可以来玩一些小花样啦~

> 注：下面的教程内容是基于 PyAutoGUI 的官方文档。我们使用的例子也主要来自那边，对于有兴趣探索的读者，可以详细阅读官方代码。本文将重点介绍键盘控制函数，简要讲解一下鼠标控制，在最后的代码实例中还会涉及一些其他函数。

## 控制键盘 

要控制键盘，最重要的一个函数就是 `typewrite()`。例如：

```python
pag.typewrite("Hello world!")
```

这将会自动帮你输入“Hello world!”，而无需你碰键盘。酷！

如果需要在每次输入的字符之间加上短暂的停顿，可以用 `interval` 参数：

```python
pag.typewrite('Hello world!', interval=0.25)
```

这样，在每个字符之间将会有 1/4 秒的停顿。

> 注：在此函数中，你只能输入字符信息。你不能用 `typewrite()` 函数输入回车或是 Shift 键等。

### 键盘按键列表

要想实现回车、Shift、Ctrl 等按键模拟，你需要使用诸如 `press()`、`keyUp()`、`keyDown()` 或 `hotkey()` 等函数。别担心，我们马上就会详细介绍这些函数。

下面是可用按键的列表：

```python
['\t', '\n', '\r', ' ', '!', '"', '#', '$', '%', '&', "'", '(',
')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e','f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', 'accept', 'add', 'alt', 'altleft', 'altright', 'apps', 'backspace', 'browserback', 'browserfavorites', 'browserforward', 'browserhome', 'browserrefresh', 'browsersearch', 'browserstop', 'capslock', 'clear', 'convert', 'ctrl', 'ctrlleft', 'ctrlright', 'decimal', 'del', 'delete', 'divide', 'down', 'end', 'enter', 'esc', 'escape', 'execute', 'f1', 'f10', 'f11', 'f12', 'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19', 'f2', 'f20', 'f21', 'f22', 'f23', 'f24', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'final', 'fn', 'hanguel', 'hangul', 'hanja', 'help', 'home', 'insert', 'junja', 'kana', 'kanji', 'launchapp1', 'launchapp2', 'launchmail', 'launchmediaselect', 'left', 'modechange', 'multiply', 'nexttrack', 'nonconvert', 'num0', 'num1', 'num2', 'num3', 'num4', 'num5', 'num6', 'num7', 'num8', 'num9', 'numlock', 'pagedown', 'pageup', 'pause', 'pgdn', 'pgup', 'playpause', 'prevtrack', 'print', 'printscreen', 'prntscrn', 'prtsc', 'prtscr', 'return', 'right', 'scrolllock', 'select', 'separator', 'shift', 'shiftleft', 'shiftright', 'sleep', 'space', 'stop', 'subtract', 'tab', 'up', 'volumedown', 'volumemute', 'volumeup', 'win', 'winleft', 'winright', 'yen', 'command', 'option', 'optionleft', 'optionright']
```

`keyDown()` 和 `keyUp()` 分别模拟按下和松开按键时的事件。比如：

```python
pag.keyDown("enter")
pag.keyUp("enter")
```

这就按下并松开回车。千万记得<span class="hl">按完要松手</span>，别一直按下去啦~ 😊

`press()` 则把这两个命令结合在一起，调用一下，就按一次然后松开：

```python
pag.press("enter")
```

这和前面那段代码的效果是一样的。

要想连续按好几下，就放个列表到函数里作为参数：

```python
pag.press(['enter', 'tab', 'enter'])
```

最后一个键盘控制函数是 `hotkey()` 这让你可以更方便地按下快捷键。你只需要传入需要的多个快捷键，就能实现同时按下它们的效果。比如：

```python
pag.hotkey('ctrl', 'alt', 'delete')
```

就等于：

```python
pag.keyDown('ctrl')
pag.keyDown('alt')
pag.keyDown('delete')
pag.keyUp('delete')
pag.keyUp('alt')
pag.keyUp('ctrl')
```

## 控制鼠标

屏幕上的任意位置，都能用一个由 X 和 Y 坐标构成的直角坐标系表示。屏幕的原点（0，0）在左上角，X 坐标从原点开始，往右不断增长；Y 坐标也从原点开始，往下不断增加。

![屏幕坐标示意图](./002.jpg)

想要知道你的屏幕尺寸，你需要用 `size()` 函数：

```python
pag.size()
```

这将返回一个<span class="hl">元组</span>对象，比如： `(1920,1080)`。它代表了你当前屏幕的最大分辨率。

这里还有一些其他的鼠标函数：

```python
pag.moveTo(600, 600)   # 将鼠标移动到 X = 600、Y = 600 的位置
pag.moveTo(100, 200, 2)   # 将鼠标在 2 秒内平滑移动到 X = 100, Y = 200 的位置
pag.move(0, 50)       # 将鼠标以当前位置为准，向下移动 50 像素
pag.dragTo(100, 200, button='left')     # 按下鼠标左键，并拖动到 X = 100、Y = 200 的位置
pag.dragTo(300, 400, 2, button='left')  # 按下鼠标左键，并在 2 秒内平滑拖动到 X = 300、Y = 400 的位置
pag.click()    # 单击鼠标左键
pag.click(x=100, y=200)  # 移动到 X = 100, Y = 200 的位置，然后单击鼠标左键
pag.click(button='right')  # 单击鼠标右键
pag.doubleClick()  # 双击鼠标左键
pag.click(clicks=2)  # 也可以这样双击鼠标左键
pag.click(clicks=2, interval=0.25)  # 按两下鼠标左键，两次之间暂停 0.25 秒
pag.scroll(10)   # 向上滚动滚轮 10 次
pag.scroll(-10)   # 向下滚动滚轮 10 次
pag.hscroll(10)   # 向右滚动 10 次
pag.hscroll(-10)   # 向左滚动 10 次
```

更多相关的函数和用法也请参照官方文档。

## 上阵实操

如果你觉得自己的工作重复性很多，试试 PyAutoGUI 吧！对我自己来说，我真的希望自己在接那些数据录入的活之前就已经掌握了 PyAutoGUI。

假设你是一名就职于大企业的勤劳 HR，你老板要你给全体 1000000 名员工都在某个网站——比如优达学城——上注册账户。其中一种办法，是一个个手动填写注册。

假设注册一个账户需要 30 秒，那你 24 小时不眠不休不吃不喝的话，完成这件事大概需要 <span class="hl">347 天零几个小时</span>。是不是很疯狂？相反，如果你用程序来帮你做的话，你只需要花上个把小时写代码，剩下的就都交给电脑来做啦。这样你就赢得了 8330 多个小时，是不是一本万利？

让我们开始吧！

首先，你需要准备好所有人注册用的电子邮件地址，一般来说把它们放在一个列表里就行了：

```python
emails = ["joe1@company.address", "linda2@company.address", "greg3@company.address", "hanna4@company.address", "oscar5@company.address", "helen6@company.address", ...]
```

接着，让我们导入代码运行所需的库，并且让脚本连上需要注册账号的网站（这里以 udacity.com 为例，但实际上，你得根据自己的需求找到对应的网址）。

```python
import pyautogui as pag
import webbrowser
webbrowser.open_new("udacity.com")
```

然后，我们需要添加一些处理注册过程的代码。假设注册过程是这样的：

1. 首页 -> 点击“注册”按钮
2. 弹出窗口 -> 点击“使用邮箱注册”链接
3. 点击邮箱地址输入框 -> 输入电子邮件地址并按回车
4. 完成，关闭当前窗口，让用户本人在注册确认邮件中按要求填写个人信息即可。

于是，我们的代码最后类似这样：

```python
import pyautogui as pag
import webbrowser
emails = ["joe1@company.address", "linda2@company.address", "greg3@company.address", "hanna4@company.address", "oscar5@company.address", "helen6@company.address", ...]
for email in emails:                   # 对列表中的每一个邮箱地址都循环一次
    webbrowser.open_new("udacity.com") # 打开新窗口
    pag.click(x=xcoord1, y=ycoord1)    # 点击“注册”按钮的位置
    pag.click(x=xcoord2, y=ycoord2)    # 点击“使用邮箱注册”链接的位置
    pag.typewrite(email)               # 输入邮箱地址
    pag.press("enter")                 # 按下回车键
    pag.hotkey('ctrl', 'w')            # 按下 Ctrl+W 关闭弹出的页面

```

搞定！是不是很简单？如果你已经知道每一步要点什么位置，就把对应的坐标填到参数里（也就是 `xcoord1`, `ycoord1`, `xcoord2` 和 `ycoord2`），程序就能正常运行了！请务必谨慎使用这个技术，切勿用于发小广告（……）。

> 注：在实际的自动化操作中，你必须<span class="hl">小心考虑每部操作所需的时间</span>。因为你永远无法预计读取文件或是载入网页会需要多少时间。你需要留出足够的时间间隔，或是<span class="hl">使用一些其他的工具</span>来判断当前页面是否已经载入完毕了（比如你可以让 PyAutoGUI 读取屏幕上某些位置的像素颜色，以判断是否载入完毕——白色往往代表页面还没载入，而其他颜色可能代表了其他情况）。

当然，实际的数据采集与录入工作，并不会像上面的例子这么简单，实际从 A 处获得数据的方式往往各不相同，输入 B 的时候也可能会碰到各种问题。但总体做法和思路并没有太大的变化，<span class="hl">只是数据结构和获取的资源</span>不同罢了。

## 来点创意

PyAutoGUI 可不只是用来输入数据这一种用法。比如，有些电脑游戏需要用户精确控制自己的输入。你觉得自己拖动鼠标/按下按钮的精确性能超过程序脚本吗？让我们看看下面这几个有趣的玩法：

### 恐怖迷宫游戏 Scary maze game

![恐怖迷宫游戏 ](./003.png)

大概在 2010 年前后，有个朋友让我玩了个“恐怖迷宫游戏”。这个小游戏的基本操作就是控制鼠标光标从蓝色的路上通过，同时不能碰到任何黑色的墙面。并不怎么恐怖，对吧。

我觉得最难的地方在于每一关的结尾处，在那里路变得非常窄，手一抖基本就前功尽弃了。那么，作为练习，你要如何写一个脚本，让 Python 控制鼠标自己完成这些迷宫呢？

### 谷歌小恐龙 Google Dino game

另外一个例子：你见过它了吗？

![谷歌小恐龙](./004.png)

对于 Chrome 浏览器用户来说，这只小恐龙大概是最不受欢迎的卡通形象了吧。毕竟它的出现意味着你断网了。这个小游戏的目标很简单：控制小恐龙跳过各种障碍物。

从程序的角度来看，你可以不断对游戏界面进行截图，并分析下面这些信息：

* 障碍物移动速度有多快？
* 障碍物有多高？
* 当前是白天还是晚上？（注：游戏中的图案在黑色和白色之间切换）
* 当前有多少障碍物出现在画面上？
* 你应该在障碍物运动到什么位置时，触发跳跃/蹲下的指令以躲开障碍物？

![](./005.png)

在上图中，识别出的障碍物用红色方框框起来了。当红色框碰到绿色线的时候，恐龙就要跳起来。这里需要进行一些数学计算，但我们现在不必纠结于这些细节。欢迎大家在下面留言分享自己的最高分！从上面的截图可以看到，我用手打达到的最高分是 2449 分，希望你的脚本能轻易超过我。

### 延迟发信

你有没有遇到过这样一种情况：加班到凌晨 3 点才改完文件，却不知道应不应该马上把东西发给对方？

<span class="hl">“我是不是应该等到天亮再发，才比较礼貌？”</span>

这有一个解决方案：

```python
import pyautogui as pag
import time
time.sleep(21600)     # 等待差不多六个小时
pag.press("enter")    # 按下回车键
```

这个脚本可以让你在随便哪个通讯工具里实现延迟发送的功能（具体延迟时间请自己修改 `sleep()` 里的数字）。

### 图表识读

好几年前，我和我的朋友发现了一个很棒的投资机会。

![假设某网站上有这样一个价格表](./006.jpg)

总的来说，我们需要判断从当前价格到红线位置的价格，到底是涨是跌。低买高卖是永恒的追求，对吧？

但在实际操作中，我发现用户并不能从网站提供的图表里精确获得当前价格和每个时间节点的历史价格。于是我打算写一个脚本，从屏幕上逐像素地读取并分析图表。

总的思路很简单：我从 x 轴开始，遍历每一个像素。对于每一个确定的 X 坐标，都从下往上沿着 Y 轴方向循环读取，一直到碰到一个白色（而不是橙色）的像素为止。这样我就能把整张表格中每一个点的相对高度都读取到程序中。之后就只需要根据相对高度来计算对应的价格即可。

对应的代码差不多类似这样：

```python
def get_price_data(screen):
    price_data = np.array([])
    for x in range(var.xstart, var.xend):
        for y in range(var.ystart, var.yend):
            pixel_color = screen.getpixel((x, y))
            if pixel_color == (43, 171, 63):
                price_data = np.append(price_data, -y)
                return price_data
            elif pixel_color == (255, 167, 77):
                price_data = np.append(price_data, -y)
                break
```

## 总结 Conclusion

在自动化方面，PyAutoGUI 是一个超棒的工具，如果你的脑洞足够大，就没有什么做不到的啦~ 如果你有什么特别的自动化技巧，也欢迎在下面留言分享！

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 翻译：欧剃 转载请保留此信息）_