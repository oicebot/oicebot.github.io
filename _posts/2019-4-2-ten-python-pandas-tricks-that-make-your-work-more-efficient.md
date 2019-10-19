---
layout: post
title: "让你事半功倍的 10 个 Pandas 秘籍"
tags: Udacity Translate Data-Science Python
author: Shiu-Tang Li
from: https://towardsdatascience.com/10-python-pandas-tricks-that-make-your-work-more-efficient-2e8e483808ba
excerpt: "也许你们已经看过许多正儿八经的教程、范例，但今天分享的几个秘技，可不是每本书里都会提到的哟~"
thumb: "/img/20190402/thumb.jpg"
---
在处理结构化数据方面, Pandas 可能是应用最广泛的 Python 库了吧。也许你们已经看过许多正儿八经的教程、范例，但今天分享的几个秘技，可不是每本书里都会提到的哟~

而且我敢保证，它们一定能让你事半功倍！

<img src="/img/20190402/001.jpeg" /><br><small>
图片来源：unsplash.com</small>

## 1. read_csv

是的，是的，这个基础函数你们早就都知道了。不过你们真的会用好它吗？如果你要载入的数据量非常大，试试 `nrows = 5` 这个参数，这样你就可以只载入表格的开头一小部分，而不是一口气读入整个表格啦。通过预览表格开头的几行，你可以对数据的特征有一定的了解，也避免了实际载入时选错分隔符的问题（毕竟有些数据并不都是用逗号隔开的）。

（此外，Linux 用户还可以用 `head` 命令来检查文本文件的头若干行，比如 `head -c 5 data.txt` 查看前 5 行。）

然后，你可以用 `df.columns.tolist()` 来获取表格的所有列的名称，进而用 `usecols = ['c1', 'c2', …]` 来载入你需要的列。而且，如果你直到某些列的数据格式，你还可以加上这样的参数来加快载入速度：`dtype = {'c1': str, 'c2': int, …}` 。一个额外的好处是，如果你数据表中的某一列既有数字又有字符串，你可以用这个方法将它们全部声明成字符串格式，这样你在合并表格的时候就可以用这一行做索引键，而不会碰到错误信息。

## 2. select_dtypes

如果你需要用 Python 做数据预处理，那你一定得用好这个函数，它能省下你不少时间。在读取表格之后，每一列都会有一个默认数据类型，比如 bool、int64、float64、object、category、timedelta64 和 datetime64 等。你可以用下面这行代码来检查具体有哪些类型：

```python
df.dtypes.value_counts()
```

接着，可以用这样的代码来选中一个只含有数字类型的子数据表：

```python
df.select_dtypes(include=['float64', 'int64'])
```

## 3. copy

这是一个很重要的函数，可以帮你避免 Python 中**对象引用**可能产生的问题。

举个栗子，如果你有这样的一些代码：

```python
import pandas as pd
df1 = pd.DataFrame({ 'a':[0,0,0], 'b': [1,1,1]})
df2 = df1
df2['a'] = df2['a'] + 1
df1.head()
```

运行后，你会发现，如果你更改 df2 中的内容，df1 也会被改变。这是因为第 3 行的赋值语句 `df2 = df1` 并<span class="hl">不是</span>把 df1 的内容复制一份并赋值给 df2，而只是把 df2 变量指向了 df1 对象。因此，对 df2 的任何改变也会影响 df1。

为了避免这个问题，你需要对 df1 进行复制，并把复制的结果赋值给 df2。例如：

```python
df2 = df1.copy() 
```
或者你可以使用 deepcopy 库：

```python
from copy import deepcopy
df2 = deepcopy(df1)
```

## 4. map

这个超酷的函数，能让你简单方便地完成数据转换，特别是分类数据的转换工作。首先，你需要定义一个字典，作为转换模板。字典对象中的键(`keys`)是要查找的旧值，而值(`values`)是替换成的新值。

```python
level_map = {1: 'high', 2: 'medium', 3: 'low'}
df['c_level'] = df['c'].map(level_map)
```

日常工作中，我们在很多情况下会用到 `map`：将布尔值 `True` 和 `False` 分别替换成 1 和 0（建立数学模型）；定义级别名称；建立用户定义的词汇编码体系等。

## 5. 是否需要 apply 自定义函数？

如果我们需要用几个不同的列的值，经过计算，生成一个新的列，那 `apply()` 函数常常会非常好用：

```python
def rule(x, y):
    if x == 'high' and y > 10:
         return 1
    else:
         return 0
df = pd.DataFrame({ 'c1':[ 'high' ,'high', 'low', 'low'], 'c2': [0, 23, 17, 4]})
df['new'] = df.apply(lambda x: rule(x['c1'], x['c2']), axis =  1)
df.head()
```

在上面的代码中，我们定义了一个处理两个输入数据的函数，然后用 `apply()` 函数把它应用到 `c1` 和 `c2` 两列的所有数据上，以此新增了一个 `new` 列。

但要注意， **apply() 函数的问题在于，它运行起来速度比较慢**。

比如，你想要得到 c1 和 c2 两列中每一行的最大值，你确实可以这样用 `apply()`：

```python
df['maximum'] = df.apply(lambda x: max(x['c1'], x['c2']), axis = 1)
```

但用内置的 `max` 速度会快得多，可读性也更好：

```python
df['maximum'] = df[['c1','c2']].max(axis =1)
```

<span class="hl">划重点</span>：如果能用内置函数完成的工作，就尽量别用 apply() 自定义函数的方法来搞，内置函数的速度一般都快得多。

再举个例子：如果你要把 `c` 列全部取整成 int 类型，用 `round(df['c']),0)` 比自己写个函数来取整快多了。

## 6. value_counts

这是一个能计算数值分布情况的函数。例如，你想统计 `c` 列中可能出现的数值和每个数据的出现频率，只需要这样：

```python
df['c'].value_counts()
```

这个函数有几个超有用的参数：

 1. **normalize = True**: 统计出现频率而不是计数；
 2. **dropna = False**: 把空值也纳入统计；
 3. **sort = False**: 按值排序，而不是按计数的数量排序；
 4. **df['c'].value_counts().reset_index()**: 将结果转换成 pandas 的数据表，以便进一步处理。


## 7. 处理数据与缺失值

在构建模型的时候，你或许会需要排除那些缺失值太多的行（甚至有些行整行都是空的）。在这种情况下，你可以用 `.isnull()` 和 `.sum()` 来统计特定列里的缺失值数量。

```python
import pandas as pd
import numpy as np
df = pd.DataFrame({ 'id': [1,2,3], 'c1':[0,0,np.nan], 'c2': [np.nan,1,1]})
df = df[['id', 'c1', 'c2']]
df['num_nulls'] = df[['c1', 'c2']].isnull().sum(axis=1)
df.head()
```

## 8. 根据 ID 选择特定的行

在 SQL 里，我们可以用这样的语句来按照 ID 选择记录： `SELECT * FROM … WHERE ID in ('A001', 'C022', …)` 。在 pandas 里，我们也可以做类似的操作：

```python
df_filter = df['ID'].isin(['A001','C022',...])
df[df_filter]
```

## 9. 按百分比进行数据分组

假设你有一列数值型的数据，你想要按相对大小进行分组，比如数字最大的前 5% 分到第一组，5%-20% 到第二组，20%-50% 第三组，最低的 50% 分到第四组。当然，你可以用 `pandas.cut` 来切分，但我个人有一个挺不错的小技巧来达到这个效果：

```python
import numpy as np
cut_points = [np.percentile(df['c'], i) for i in [50, 80, 95]]
df['group'] = 1
for i in range(3):
    df['group'] = df['group'] + (df['c'] < cut_points[i])
# 或者 <= cut_points[i]
```

因为不需要 `apply()`，所以这样做的处理速度更快。

## 10. to_csv

没错，这个函数大家都耳熟能详了。但我这里有两个很棒的小窍门，供你参考。

首先，你可以用这样的命令，查看表格被转换后要写入文件的前5行内容：

```python
print(df[:5].to_csv())
```

其次，你可以同时处理混有整数（int）类型和缺失值的数据。如果一列数据同时含有缺失值和整数，它的数据类型可能还是浮点数（float），而不是整数。这种情况下，你可以在输出的时候加上 `float_format='%.0f'` 参数，这样所有输出的类型都会抹去小数点后面的数字，你就可以得到一张只有整数类型数据的表格啦。

<img src="/img/20190402/002.jpg" /><br><small>
图片来源：unsplash.com</small>

怎么样，这些小技巧，你都掌握了吗？

>（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）