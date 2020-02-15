---
layout: post
title: "Python 3.8 到来，1 分钟带你了解 6 大重要新特性"
tags: Udacity Translate Python
excerpt: "Python2已经是过去时了，你准备好了吗？"
thumb: /img/20200113/thumb.jpg
author: Eden Au
from: https://towardsdatascience.com/6-new-features-in-python-3-8-for-python-newbies-dc2e7b804acc 
---

北京时间2019年10月15日，Python 官方发布了 3.8 版本，新的 Python 3.8 版本有哪些必须知道的新特性呢？来和优达菌一起学习吧～

<img src="{{site.cdn}}/img/20200113/001.jpg"><br><small>
摄影：Priscilla Du Preez | 图片来源：Unsplash </small>

一个有活力的编程语言，总是动态变化以适应技术的发展。2020年1月1日起，Python2将不再得到官方支持，这也基本宣告了它的死亡。

在数据科学热潮的推动下，以 Python3 为主的 Python 语言依然是世界上最流行的编程语言。随着版本的更迭，它的语法不断更新，加进了许多新形式的表达式。如今，要想逐一追踪每次更改可是相当的不容易，但还是有许多让我觉得相见恨晚的超棒功能，值得你早点掌握。

于是，我们已经帮你整理好了这次 Python 3.8更新中你应该了解的六大新特性，让我们一起看看吧！

<img src="{{site.cdn}}/img/20200113/002.webp">

## 1. 赋值表达式——可读性

这个新的运算符 `:=` 被称为海象运算符，因为 `:=` 很像小眼睛长牙齿的海象。它能让你**把一行语句中的某一个表达式赋值给一个变量，同时不影响该语句的原始逻辑**。这应该是 Python 3.8 中被人讨论最多的一个新功能了。可以看下面的例子：

第 4 行中，赋值语句 `b := a**2` 将 `a` 的平方赋值给了 `b`，同时又让 `b` 参与了布尔运算 `b > 0`：

```python
a = 6
# 下面一行代码将 a 的平方赋值给 b
# 同时检查 b > 0 是否为真
if (b := a ** 2) > 0: 
    print(f'The square of {a} is {b}.') 
    # 输出：The square of 6 is 36.
```

这样的赋值语句可以让你的代码更加紧凑，同时保持良好的**可读性**。但注意不要滥用它，否则在某些情况下可能会让你的代码变得更加难懂：

```python
# 一个错误示例
a = 5
d = [b := a+1, a := b-1, a := a*2]
```
<small>（千万别这么干！）</small>

<img src="{{site.cdn}}/img/20200113/002.jpg"><br><small>
摄影：Jay Ruzesky  | 图片来源：Unsplash </small>

这个运算符在许多（古老的）编程语言中也存在，我预计有许多从其他语言切换到 Python 的程序员都会（滥）用这个新功能来给表达式赋值。

抢在别人前面熟悉这个特性吧。

## 2. 参数类型——可靠性

在 Python 中，一个函数可以接受两种不同方式指定的参数：

* **位置参数**：按其传入的顺序赋值给对应位置的参数；
* **关键字参数**：依据给定的关键字赋值给对应的参数。

在下面这个例子中，函数内 `a` 和 `b` 两个参数的值分别按照位置参数和关键字参数的方式进行指定，十分灵活。

```python
def my_func(a, b=1):
    return a+b
my_func(5,2)     # 都用位置参数
my_func(a=5,b=2) # 都用关键字参数
```

新版本的 Python 3 提供了一个额外的语法糖，用来指明某些参数必须使用仅限位置而非关键字参数的形式。具体用法为使用 / 和 * 符号对参数列表进行分隔。

> *注：后面的 `*` 语法并不是 Python 3.8 里新增的。

在下面的例子中，头两个参数 `a` 和 `b` 只能用位置参数，中间两个参数 `c` 和 `d` 可以任意使用关键字或位置方式指定，最后两个参数 `e` 和 `f` 只能用关键字参数。

```python
def my_func(a, b, /, c, d, *, e, f):
    return a+b+c+d+e+f
  
my_func(1,2,3,4,5,6)         # 报错：e 和 f 只能用关键字参数
my_func(a=1,b=2,3,4,e=5,f=6) # 报错：a 和 b 只能用位置参数
my_func(1,2,3,d=4,e=5,f=6)   # 返回 21
my_func(1,2,c=3,d=4,e=5,f=6) # 返回21
```

<img src="{{site.cdn}}/img/20200113/003.jpg"><br><small>
摄影：Austin Distel | 图片来源：Unsplash </small>

为什么需要限制这种灵活性呢？如果你的参数名没有什么意义，或者是随便取的（比如 a、b、i、j 这样），那你应该排除使用关键字传递的方式，**免得未来你重构或是修改这个函数的时候，改动参数的变量名称会让其他调用代码出错**。这样就能让你的代码更加的稳定健壮。

## 3. f 字符串 2.0 版——方便调试

Python 的 f 字符串是一个创举。它使你可以用优雅易懂的方式**格式化输出包含表达式的字符串**。它的基本语法是 `f'{expr}'` ，其中需要计算的表达式被大括号括起来，在字符串引号的前面，用字母 `f` 进行标记。

本次更新给 f 字符串带来了一个**新的格式化标记：等号“=”**。在 f 字符串里，等号跟在表达式的末尾，语法为：`f'{expr=}'`，输出的字符串将包含变量名称和其对应的值，如下面这个例子所示：

```python
pi = 3 # 我学过工程学！

print(f'π equals {pi}.') # 输出 π equals 3.
print(f'{pi=}')          # 输出 pi=3

# 爱咋咋地吧
```

这样，在调试时，我们就能方便简洁地打出变量的值，而不必写 `print('pi =',pi)` 这样重复的语句了。

## 4. 反向迭代字典——顺序

现在 dict 和 dictview 可以使用 `reversed()` 按插入顺序**反向迭代**。

## 5. 新增模块——metadata（元数据）

新增的 `importlib.metadata` 模块使你能够**从第三方包读取元数据**。例如，你能用代码取得其他包的**版本号**之类的信息。

## 6. 在 finally 中使用 Continue

由于在实现中存在问题，之前在 `finally` 子句中不允许使用 `continue` 语句。在 Python 3.8 中这个限制已经被取消了。

```python
for i in range(2):
    try:
        print(i)
    finally:
        print('A sentence.')
        continue
        print('This never shows.')

# 如果 Python <= 3.7
>> SyntaxError: 'continue' not supported inside 'finally' clause
  
# 现在的 Python 3.8
>> 0
   A sentence.
   1
   A sentence.
```

<img src="{{site.cdn}}/img/20200113/004.jpg"><br><small>
摄影：Hannah Jacobson  | 图片来源：Unsplash </small>

## 一些思考

请注意，本文并未提及Python3.8中新增的一些和普通程序员不太相关的高级特性（比如 pickle 协议，以及 `multiprocessing.shared_memory` 模块等）。

如果你只是为了做些小项目，犯不着为了那些概念费神。如果你真的好奇的话，可以在这里看到完整的更新内容说明： https://docs.python.org/zh-cn/3/whatsnew/3.8.html


上面提到的 6 个新特性，就是本次 Python 3.8 更新中对新人（初学者）比较有用的部分啦。但还是顺带提个醒，在你切换到 Python 3.8之前，请确保已经熟练掌握了最基础的 Python 概念吧！

祝编程愉快！

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 翻译：欧剃 转载请保留此信息）_
