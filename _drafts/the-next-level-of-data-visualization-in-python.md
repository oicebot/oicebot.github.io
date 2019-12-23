---
layout: post
title: "The Next Level of Data Visualization in Python"
tags: Udacity Translate Data-Science Python
excerpt: "How to make great-looking, fully-interactive plots with a single line of Python"
thumb: "/img/20191226/thumb.jpg"
author: Will Koehrsen
from: https://towardsdatascience.com/the-next-level-of-data-visualization-in-python-dd6e99039d5e
---

[]
图片来源：pexels.com

The sunk-cost fallacy is one of many [harmful cognitive biases](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow#Heuristics_and_biases) to which humans fall prey. It refers to our tendency to continue to devote time and resources to a lost cause because we have already spent — sunk — so much time in the pursuit. The sunk-cost fallacy applies to staying in bad jobs longer than we should, slaving away at a project even when it’s clear it won’t work, and yes, continuing to use a tedious, outdated plotting library — matplotlib — when more efficient, interactive, and better-looking alternatives exist.

“沉没成本谬误”是人们常犯的几种认知偏差之一。它指的是人们倾向于继续把时间和金钱投入一件已经注定要失败的事情，只因为他们在这件事上已经投入了（“沉没”）太多的成本。沉没成本谬误同样适用于在不好的职位上待了比正常更长的时间，在一个明显不可能的项目上埋头苦干，以及（你猜的没错）继续用一个陈旧、枯燥的绘图库——matplotlib——即使当更高效、更美观、可互动性更好的替代品已经出现的时候。

Over the past few months, I’ve realized the only reason I use `matplotlib` is the hundreds of hours I’ve sunk into learning the convoluted syntax. This complication leads to hours of frustration on StackOverflow figuring out how to *format dates* or *add a second y-axis*. Fortunately, this is a great time for Python plotting, and after exploring the options, a clear winner — in terms of ease-of-use, documentation, and functionality — is the [plotly Python library](https://plot.ly/python/). In this article, we’ll dive right into `plotly`, learning how to make better plots in less time — often with one line of code.

在过去的几个月里，我意识到我还守着 `matplotlib` 的唯一原因，不过就是因为我已经“沉没"在里面的几百个小时的时间成本——这都是为了学会它那复杂的语法。这也导致我花费了不知多少个深夜，在 StackOverflow 上搜索如何**格式化日期**或**增加第二个Y轴**。幸运的是，随着数据分析技术的不断进步和开源软件的不断发展，如今我们有了更多更好的选择。纵观这些选项，很容易就能发现一款易于使用、文档健全、功能强大的开源 Python 绘图库—— [Plotly](https://plot.ly/python/)。在今天的文章里，请跟我们一起深入体验 `plotly`，了解它如何用超简单的（甚至只要一行！）代码，绘制出更棒的图表。

All of the code for this article is [available on GitHub](https://github.com/WillKoehrsen/Data-Analysis/blob/master/plotly/Plotly%20Whirlwind%20Introduction.ipynb). The charts are all interactive and can be viewed on **NBViewer**.

本文中所有代码都已经在 Github 上开源，所有的图表都是可交互的，请使用**NBViewer**查看 。

Github 源代码地址： https://github.com/WillKoehrsen/Data-Analysis/blob/master/plotly/Plotly%20Whirlwind%20Introduction.ipynb 

[]
plotly 绘制的范例图表。图片来源：plot.ly

## Plotly Brief Overview
## Plotly 概述

The `plotly` Python package is an open-source library built on **plotly.js** which in turn is built on **d3.js**. We’ll be using a wrapper on plotly called `cufflinks` designed to work with Pandas dataframes. So, our entire stack is cufflinks > plotly > plotly.js > d3.js which means we get the efficiency of coding in Python with the incredible interactive graphics capabilities of d3.

`plotly` 的 Python 软件包是一个开源的代码库，它基于 **plot.js**，而后者基于 **d3.js**。我们实际使用的则是一个对 plotly 进行封装的库，名叫 `cufflinks`，它能让你更方便地使用 plotly 和 Pandas 数据表协同工作。

(Plotly itself is a graphics company with several products and open-source tools. The Python library is free to use, and we can make unlimited charts in offline mode plus up to 25 charts in online mode to share with the world.)

（注：Plotly 本身是一个拥有多个不同产品和开源工具集的可视化技术公司。Plotly 的 Python 库是可以免费使用的，在离线模式可以创建数量不限的图表，在线模式因为用到了 Plotly 的共享服务，只能生成并分享 25 张图表。）

All the work in this article was done in a Jupyter Notebook with **plotly + cufflinks** running in offline mode. After installing plotly and cufflinks with `pip install cufflinks plotly` import the following to run in Jupyter:

本文中的所有可视化图表都是在 Jupyter Notebook 中使用离线模式的 plotly + cufflinks 库完成的。在使用  `pip install cufflinks plotly`  完成安装后，你可以用下面这样的代码在 Jupyter 里完成导入：

```python
# 导入 plotly 库
import plotly.plotly as py
import plotly.graph_objs as go
from plotly.offline import iplot, init_notebook_mode
# 在离线模式使用 plotly + cufflinks 库
import cufflinks
cufflinks.go_offline(connected=True)
init_notebook_mode(connected=True)
```

## Single Variable Distributions: Histograms and Boxplots
## 单变量分布：柱状图和箱形图

Single variable — univariate — plots are a standard way to start an analysis and the histogram is a go-to plot (although it has some issues) for graphing a distribution. Here, using my Medium article statistics (you can see how to get your own stats here or use mine [here](https://github.com/WillKoehrsen/Data-Analysis/tree/master/medium)) let’s make an interactive histogram of the number of claps for articles ( `df` is a standard Pandas dataframe):

单变量分析图往往是开始数据分析时的标准做法，而柱状图基本上算是单变量分布分析时必备的图表之一（虽然它还有一些不足）。

就拿我的博客文章点赞总数为例（原始数据见 Github：https://github.com/WillKoehrsen/Data-Analysis/tree/master/medium ），让我们做一个简单的交互式柱状图（代码中的 `df` 是标准的 Pandas dataframe 对象）：

```python
df['claps'].iplot(kind='hist',
                  xTitle='claps',
                  yTitle='count', 
                  title='Claps Distribution')
```

[]
使用 plotly+cufflinks 创建的交互式柱状图

For those used to `matplotlib`, all we have to do is add one more letter ( `iplot` instead of `plot`) and we get a much better-looking and interactive chart! We can click on the data to get more details, zoom into sections of the plot, and as we’ll see later, select different categories to highlight.

对于已经习惯 `matplotlib` 的同学，你们只需要多打一个字母（把 `.plot` 改成 `.iplot` ），就能获得看起来更加美观的交互式图表！点击图片上的元素就能显示出详细信息、随意缩放，还带有（我们接下来会提到的）高亮筛选某些部分等超棒功能。

If we want to plot overlaid histograms, that’s just as simple:

如果你想绘制堆叠柱状图，也只需要这样：

```python
df[['time_started', 'time_published']].iplot(
    kind='hist',
    histnorm='percent',
    barmode='overlay',
    xTitle='Time of Day',
    yTitle='(%) of Articles',
    title='Time Started and Time Published')
```

[]

With a little bit of `pandas` manipulation, we can do a barplot:

对 `pandas` 数据表进行简单的处理，并生成条形图：

```python
# Resample to monthly frequency and plot 
df2 = df[['view','reads','published_date']].\
         set_index('published_date').\
         resample('M').mean()
df2.iplot(kind='bar', xTitle='Date', yTitle='Average',
    title='Monthly Average Views and Reads')
```

[]

as we saw, **we can combine the power of pandas with plotly + cufflinks**. For a boxplot of the fans per story by publication, we use a `pivot` and then plot:

就像上面展示的那样，**我们可以将 plotly + cufflinks 和 pandas 的能力整合在一起**。比如，我们可以先用 `pivot` 进行数据透视表分析，然后再生成条形图。

比如统计不同发表渠道中，每篇文章带来的新增粉丝数：

```python
df.pivot(columns='publication', values='fans').iplot(
        kind='box',
        yTitle='fans',
        title='Fans Distribution by Publication')
```

[]

The benefits of interactivity are that we can explore and subset the data as we like. There’s a lot of information in a boxplot, and without the ability to see the numbers, we’ll miss most of it!

交互式图表带来的好处是，我们可以随意探索数据、拆分子项进行分析。箱型图能提供大量的信息，但如果你看不到具体数值，你很可能会错过其中的一大部分！

## Scatterplots
## 散点图

The scatterplot is the heart of most analyses. It allows us to see the evolution of a variable over time or the relationship between two (or more) variables.

散点图是大多数分析的核心内容，它能让我们看出一个变量随着时间推移的变化情况，或是两个（或多个）变量之间的关系变化情况。

### Time-Series
### 时间序列分析

A considerable portion of real-world data has a time element. Luckily, plotly + cufflinks was designed with time-series visualizations in mind. Let’s make a dataframe of my TDS articles and look at how the trends have changed.

在现实世界中，相当部分的数据都带有时间元素。幸运的是，plotly + cufflinks 天生就带有支持时间序列可视化分析的功能。

以我在“Towards Data Science”网站上发表的文章数据为例，让我们以发布时间为索引构建一个数据集，看看文章热度的变化情况：

```python
# 构建一个包含 Towards Data Science 上的文章数据的数据集
tds = df[df['publication'] == 'Towards Data Science'].\
         set_index('published_date')
# 将读取的时间绘制为时间序列图形
tds[['fans', 'word_count', 'title']].iplot(
    y='fans',
    mode='lines+markers',
    secondary_y = 'word_count',
    secondary_y_title='Word Count',
    opacity=0.8,
    size=8,
    symbol=1,
    xTitle='Date',
    yTitle='Claps',
    text='title',
    title='Fans and Word Count over Time')
```

[]

Here we are doing quite a few different things all in one line:

在上图中，我们用一行代码完成了几件事情：

* Getting a nicely formatted time-series x-axis automatically
* 自动生成美观的时间序列 X 轴
* Adding a secondary y-axis because our variables have different ranges
* 增加第二条 Y 轴，因为两个变量的范围并不一致
* Adding in the title of the articles as hover information
* 把文章标题放在鼠标悬停时显示的标签中
  
For more information, we can also add in text annotations quite easily:

如果想要更多数据，可以简单地添加文本注释：

```python
tds_monthly_totals.iplot(
    mode='lines+markers+text',
    text=text,
    y='word_count',
    opacity=0.8,
    xTitle='Date',
    yTitle='Word Count',
    title='Total Word Count by Month')
```

[]
Scatterplot with annotations
带有文本注释的散点图

For a two-variable scatter plot colored by a third categorical variable we use:
下面的代码中，我们将一个双变量散点图按第三个分类变量进行着色：

```python
df.iplot(
    x='read_time',
    y='read_ratio',
    # 指定分类变量
    categories='publication',
    xTitle='Read Time',
    yTitle='Reading Percent',
    title='Reading Percent vs Read Ratio by Publication')
```

[]

Let’s get a little more sophisticated by using a log axis — specified as a plotly layout — (see the [Plotly documentation](https://plot.ly/python/reference/) for the layout specifics) and sizing the bubbles by a numeric variable:

接下来我们要玩点复杂的：对数坐标轴。我们通过指定 plotly 的布局（layout）参数来实现这一点（关于不同的布局，请参考官方文档 https://plot.ly/python/reference/ ），同时我们把点的 size 和一个数值变量 `read_ratio` （阅读比例）绑定，比例越大，泡泡的尺寸也越大。

```python
tds.iplot(
    x='word_count',
    y='reads',
    size='read_ratio',
    text=text,
    mode='markers',
    # 对数坐标轴
    layout=dict(
        xaxis=dict(type='log', title='Word Count'),
        yaxis=dict(title='Reads'),
        title='Reads vs Log Word Count Sized by Read Ratio'))
```

[]

With a little more work (see notebook for details), we can even put four variables ([this is not advised](https://serialmentor.com/dataviz/aesthetic-mapping.html)) on one graph!

如果想要更复杂一些（详见我放在 Github 的源代码），我们甚至可以在一张图里塞进 4 个变量！（并不推荐你们这么做）

[]

As before, we can combine pandas with plotly+cufflinks for useful plots:

和前面一样，我们可以将 pandas 和 plotly+cufflinks 结合起来，实现许多有用的图表：

```python
df.pivot_table(
    values='views', 
    index='published_date',
    columns='publication').cumsum().iplot(
        mode='markers+lines',
        size=8,
        symbol=[1, 2, 3, 4, 5],
        layout=dict(
            xaxis=dict(title='Date'),
            yaxis=dict(type='log', title='Total Views'),
            title='Total Views over Time by Publication'))
```

[]

See the notebook or the documentation for more examples of added functionality. We can add in text annotations, reference lines, and best-fit lines to our plots with a single line of code, and still with all the interaction.

建议你查看官方文档，或者我的源代码，里面有更多的范例和函数实例。只需要简单的一两行代码，就可以为你的图表加上文字注释，辅助线，最佳拟合线等有用的元素，并且保持原有的各种交互式功能。

## Advanced Plots
## 高级绘图功能
Now we’ll get into a few plots that you probably won’t use all that often, but which can be quite impressive. We’ll use the plotly `figure_factory`, to keep even these incredible plots to one line.

接下来，我们要详细介绍几种特殊的图表，平时你可能并不会很经常用到它们，但我保证只要你用好了它们，一定能让人刮目相看。我们要用到 plotly 的 `figure_factory` 模块，只需要一行代码，就能生成超棒的图表！ 

### Scatter Matrix
### 散点图矩阵

When we want to explore relationships among many variables, a scattermatrix (also called a **splom**) is a great option:

假如我们要探索许多不同变量之间的关系，散点图矩阵（也被称为SPLOM）就是个很棒的选择：

```python
import plotly.figure_factory as ff
figure = ff.create_scatterplotmatrix(
    df[['claps', 'publication', 'views',      
        'read_ratio','word_count']],
    diag='histogram',
    index='publication')
```

[]

Even this plot is completely interactive allowing us to explore the data.

即使是这样复杂的图形，也是完全可交互的，让我们能更详尽地对数据进行探索。

### Correlation Heatmap
### 关系热图

To visualize the correlations between numeric variables, we calculate the correlations and then make an annotated heatmap:
为了体现多个数值变量间的关系，我们可以计算它们的相关性，然后用带标注热度图的形式进行可视化：

```python
corrs = df.corr()
figure = ff.create_annotated_heatmap(
    z=corrs.values,
    x=list(corrs.columns),
    y=list(corrs.index),
    annotation_text=corrs.round(2).values,
    showscale=True)
```

[]

### 自定义主题

The list of plots goes on and on. Cufflinks also has several themes we can use to get completely different styling with no effort. For example, below we have a ratio plot in the “space” theme and a spread plot in “ggplot”:

除了层出不穷的各种图表外，Cufflinks 还提供了许多不同的着色主题，方便你轻松切换各种不同的图表风格。下面两张图分别是“太空”主题和“ggplot”主题：

[] []

We also get 3D plots (surface and bubble):
此外，还有 3D 图表（曲面和泡泡）：

[] []

For those who are so inclined, you can even make a pie chart:
对有

[]

### Editing in Plotly Chart Studio

When you make these plots in the notebook, you’ll notice a small link on the lower right-hand side on the graph that says “Export to plot.ly”. If you click that link, you are then taken to the [chart studio](https://plot.ly/create/) where you can touch up your plot for a final presentation. You can add annotations, specify the colors, and generally clean everything up for a great figure. Then, you can publish your figure online so anyone can find it with the link.

Below are two charts I touched up in Chart Studio:

[]

[]

With everything mentioned here, we are still not exploring the full capabilities of the library! I’d encourage you to check out both the plotly and the cufflinks documentation for more incredible graphics.

[]
Plotly interactive graphics of wind farms in United States (Source)

## Conclusions
The worst part about the sunk cost fallacy is you only realize how much time you’ve wasted after you’ve quit the endeavor. Fortunately, now that I’ve made the mistake of sticking with `matploblib` for too long, you don’t have to!

When thinking about plotting libraries, there are a few things we want:

1. One-line charts for rapid exploration
2. Interactive elements for subsetting/investigating data
3. Option to dig into details as needed
4. Easy customization for final presentation

As of right now, the best option for doing all of these in Python is **plotly**. Plotly allows us to make visualizations quickly and helps us get better insight into our data through interactivity. Also, let’s admit it, plotting should be one of the most enjoyable parts of data science! With other libraries, plotting turned into a tedious task, but with plotly, there is again joy in making a great figure!

[]
A plot of my enjoyment with plotting in Python over time

Now that it’s 2019, it is time to upgrade your Python plotting library for better efficiency, functionality, and aesthetics in your data science visualizations.

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）_
