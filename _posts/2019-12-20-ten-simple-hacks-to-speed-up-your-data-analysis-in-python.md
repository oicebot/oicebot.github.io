---
layout: post
title: "这10个小技巧，让你的Python数据分析加速50%！"
tags: Udacity Translate Data-Science Python
excerpt: "在编程的世界里，有时候一些小窍门和小技巧，能帮你节省不少时间和生命。"
thumb: "/img/20191220/thumb.jpg"
author: Parul Pandey
from: https://towardsdatascience.com/10-simple-hacks-to-speed-up-your-data-analysis-in-python-ec18c6396e6b
---

<img src="/img/20191220/001.jpeg"><br><small>图片来源：pixabay.com</small>

在编程的世界里，有许多实用的小技巧和小秘技，值得你花时间去掌握。有的时候，一点点黑科技就能帮你节省不少时间和生命，一个不起眼的快捷操作或插件往往会成为救场的及时雨，让生产力突飞猛进。

因此，今天的文章中要分享给大家的就是一些最实用的数据分析小技巧。它们也许有些已经广为人知，有些还比较少见，但我可以保证，它们一定会在你的下一个数据分析项目中大显身手的。

让我们一起来看看吧！

----

## 1. 对 pandas 数据表进行预览分析（Profiling）

**预览分析** 是一个能帮助我们理解数据的过程。**Pandas Profiling** 这个 Python 库就是专门用来进行预览分析的。它能让你简单而快速地对 Pandas 数据表进行探索性数据分析（Exploratory Data Analysis，缩写 EDA）。在 EDA 的第一步，我们往往会用到 pandas 的 `df.describe()` 和 `df.info()` 函数，但它们只给出非常基本的数据概况，在处理大型数据集的时候能起到的帮助十分有限。与之相对的，使用 Pandas Profiling 提供的 `df.profile_report()` 函数，你只需要一行代码就能快速生成一个包含了大量详细信息的交互式 HTML 报告。

对于给出的某个数据库，Pandas Profiling 库能计算出以下这些统计信息：

<img src="/img/20191220/002.png">

### 安装

`pip install pandas-profiling`

或

`conda install -c anaconda pandas-profiling`

### 使用

让我们用古老的泰坦尼克号乘客数据集来展示一下这个预览分析器的强大能力吧。

```python
#导入需要的库
import pandas as pd
import pandas_profiling
#Pandas-Profiling 版本 2.0.0
df = pd.read_csv('titanic/train.csv')
df.profile_report()
```

要在 Jupyter notebook 里显示数据预览分析的结果，你只需要这么一行代码就够了。生成的结果相当详细，包含了各种你可能会需要的图表。

<img src="/img/20191220/003.gif">

你还可以用这样的代码把结果导出成一个交互式 HTML 文件：

```python
profile = df.profile_report(title='Pandas Profiling Report')
profile.to_file(outputfile="Titanic data profiling.html")
```

<img src="/img/20191220/004.gif">

你可以在这个库的[官方文档](https://pandas-profiling.github.io/pandas-profiling/docs/)中查询到更详细的用法和实例代码。

----

## 2. 创建可交互的 Pandas 图表

**Pandas** 库已经为数据表（DataFrame 类）内置了一个 `.plot()` 的绘图函数。然而，用这个函数生成的可视化结果并不支持交互，也就没那么引人瞩目。而另一方面，`pandas.DataFrame.plot()` 函数生成图表的便利性也是无可取代的。

那么，我们能不能在不对代码进行太多修改的情况下，用 Pandas 绘制出交互式图表呢？事实上，你可以通过 **Cufflinks** 库来实现这个目的。

Cufflinks 库结合了 **plotly** 库的强大能力和 **pandas** 的灵活性，能够方便地制作交互式图表。看看下面的例子：

### 安装

安装 cufflinks 前，要先安装它依赖的 Plotly 库：

```
pip install plotly
pip install cufflinks
```

### 使用

```python
#导入 Pandas 库
import pandas as pd
#在离线模式下导入 plotly 和 cufflinks 库
import cufflinks as cf
import plotly.offline
cf.go_offline()
cf.set_config_file(offline=False, world_readable=True)
```

还是以泰坦尼克号数据集为例，用这一行代码演示一下黑魔法：

`df.iplot()`

<img src="/img/20191220/005.gif"><br>
<img src="/img/20191220/006.png"><br><small>df.iplot() 和 df.plot() 的对比</small>

比起下图的静态图表，上图的交互式图表能显示出更详细的信息，而这一切并不需要太多的语法变化。

你可以在[官方示例](https://github.com/santosjorge/cufflinks/blob/master/Cufflinks%20Tutorial%20-%20Pandas%20Like.ipynb)中看到更详细的例子。

----

## 3. 来一点“魔法”

Jupyter Notebooks 中的“魔法命令”是一系列便捷的函数，用于解决标准数据分析时的一些常见问题。你可以用 `%lsmagic` 命令来列出所有的“魔法命令”。

<img src="/img/20191220/007.png"><br><small>所有可用魔法命令的列表</small>

魔法命令又分成两类，一种是**行魔法**，前缀为单个 `%` 字符，只作用于单行代码；另一种是 **单元格魔法**，以 `%%` 为前缀，能作用于整个单元格。如果 Notebook 的 Automagic 选项设置为1 ，你可以省略单行魔法命令的前缀 `%`。

让我们看看几个在通常的数据分析中十分有用的命令吧：

### %pastebin

`%pastebin` 命令将一段代码上传到 *Pastebin* 上，并返回对应的链接。Pastebin 是一个在线剪贴板分享服务，用户可以在上面存储各种纯文本内容（比如代码片段），然后将对应的链接分享给其他人。事实上 Github gist 也是一个类似 pastbin 的服务，只不过它带有版本控制功能。

假设有一个 python 脚本文件 `file.py`，内容如下：

```python
#file.py
def foo(x):
    return x
```

在 Jupyter Notebook 里用 `%pastebin` 生成一个分享链接：

<img src="/img/20191220/008.png">

### %matplotlib notebook

`%matplotlib inline` 命令会让静态的 matplotlib 图表在 Jupyter notebook 的运行结果区域内显示。如果你把命令中的 `inline` 换成 `notebook`，你还能轻松获得一个可缩放和调整大小的图表。你应当在导入 matplotlib 库之前先运行 `%matplotlib` 命令。

<img src="/img/20191220/009.png"><br><small>%matplotlib inline 和 %matplotlib notebook 的对比</small>

### %run

`%run` 命令可以在 notebook 中运行外部 python 脚本：

```
%run file.py
```

### %%writefile

`%%writefile` 能将一个单元格的内容保存成文件。下面这段代码就会被写入 `foo.py` 文件中，并保存在当前目录下。

<img src="/img/20191220/010.png">

### %%latex

The `%%latex` function renders the cell contents as LaTeX. It is useful for writing mathematical formulae and equations in a cell.

`%%latex` 命令让你可以用 LaTeX 语法渲染单元格的内容。在编写数学公式和方程的时候很好用。

<img src="/img/20191220/011.png">

----

## 4. 排查代码错误

**交互式调试器**（interactive debugger）本身也是一个魔法命令，但我把它单独拿出来说。

如果你在运行一个代码单元格的时候出现了异常，你可以新起一行，运行 `%debug` 命令。这将打开一个交互式的调试环境，把你带到异常发生的位置。你可以在此检查程序中各个变量的值，并执行各种操作。输入 `q` 退出调试器。

<img src="/img/20191220/012.gif">

----

## 5. 美化 print 输出

如果你想为数据结构生成美观的输出信息，**pprint** 就是首选的模块。它在输出字典对象或 JSON 数据的时候特别有用。下面是一个用 `print` 和 `pprint` 输出信息的例子：

<img src="/img/20191220/013.png">

----

## 6. 显示醒目的注释

在 Jupyter Notebooks 中，你可以用警告/注释框来高亮显示一些重要或需要注意的信息。注释框的颜色取决于你指定的警告类型。你可以在需要的地方试试下面几种代码： 

### 蓝色框：提示

```html
<div class="alert alert-block alert-info">
<b>提示:</b> 使用蓝色提示框(属性为alert-info)来显示提示和注释。
如果是注释，则可以省略上面的“提示”字样。
</div>
```
### 黄色框：示例

```html
<div class="alert alert-block alert-warning">
<b>示例：</b> 使用黄色提示框（属性为alert-warning）来显示额外的示例或数学公式。
</div>
```

### 绿色框：相关

```html
<div class="alert alert-block alert-success">
绿色提示框（属性为alert-success）一般只在必要的时候使用，来显示和内容相关的链接等。
</div>
```

### 红色框：警告

```html
<div class="alert alert-block alert-danger">
<b>警告：</b> 红色提示框（属性为alert-danger）一般不常用，不过可以用在警告用户不要删除一些重要代码等情况。
</div>
```

下面是几种提示的运行效果：

<img src="/img/20191220/014.png">

----

## 7. 把一个单元格中的所有输出都显示出来

假设有一个Jupyter Notebook 的单元格里，有这样一段代码：

```python
In  [1]: 10+5          
         11+6
Out [1]: 17
```

对代码单元格来说，通常只输出单元格最后一个表达式的结果。如果需要显示其他表达式的结果，则需要手动加上 `print()` 函数。不过，也可以通过在 notebook 的开头运行这样一段代码，让单元格显示所有表达式的结果：

```python
from IPython.core.interactiveshell import InteractiveShell
InteractiveShell.ast_node_interactivity = "all"
```

再运行下，就会发现所有表达式的值都被依次打印出来了：

```python
In  [1]: 10+5          
         11+6
         12+7
Out [1]: 15
Out [1]: 17
Out [1]: 19
```

要恢复成默认设置，可以用：

```python
InteractiveShell.ast_node_interactivity = "last_expr"
```

----

## 8. 使用 '-i' 参数运行 python 脚本

运行一个 Python 脚本的典型做法是在命令行下输入 `python hello.py`。然而，如果你多加一个 `-i` 参数，也就是用 `python -i hello.py` 来运行脚本，会带来一些额外的好处：

* 首先，当程序运行结束，或是异常退出的时候，python 解释器并不会被关闭。在这种情况下，我们可以检查变量的值，核对函数是否正常工作等。

    <img src="/img/20191220/015.gif">

* 其次，既然解释器还在，我们可以很容易地调用 Python 调试器来排查问题：

```python
import pdb
pdb.pm()
```

这将会带我们到程序出错的地方，方便我们检查并修改代码。

----

## 9. 自动注释掉当前行

`Ctrl/Cmd + /` comments out selected lines in the cell by automatically. Hitting the combination again will uncomment the same line of code.

在编辑器中按下 `Ctrl + /`（Mac用户是 `⌘ + /`）快捷键，可以自动注释掉光标所在的行。再按一次取消注释。

<img src="/img/20191220/016.gif">

----

## 10. 手残误删，这样能救


你是否也曾不小心误删了 Jupyter Notebook 中的某个单元格？记住这个快捷键，你还有救：

* 如果你是不小心删除了单元格中的一部分内容，可以用 `Ctrl + Z` 快捷键（Mac用户是 `⌘ + Z`）撤销。
* 如果你需要恢复整个被删除的单元格，请按 `ESC+Z`，或在菜单上选择编辑（EDIT）-> 撤销删除（Undo Delete Cells）

    <img src="/img/20191220/017.png">

----

## 结语

上面这些就是我收集的一些数据分析小技巧，我在日常使用 Python 和 Jupyter Notebooks 进行数据分析的时候经常用它。希望它们也能让你更快更高效地完成数据分析工作。如果你有更加黑科技的数据分析技巧，欢迎在下面留言分享！

最后，祝编码顺利！

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）_