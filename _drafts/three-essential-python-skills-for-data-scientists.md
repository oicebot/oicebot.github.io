---
layout: post
title: "3 Essential Python Skills for Data Scientists"
tags: udacity translate python Data-Science
author: Dario Radečić
from: https://towardsdatascience.com/3-essential-python-skills-for-data-scientists-b642a1397ae3
excerpt: "Maybe you are still not aware of everything pure Python has to offer."
thumb: "/img/20191020/thumb.jpg"
---
随着数据科学和机器学习领域的不断发展，最前沿的技术可谓层出不穷，但它们终究都是建立在 Python 的基础上的。

最近，微博上出了篇文章，说是一个英伟达工程师小姐姐，发了套名叫 python-is-cool 的“ Python 酷炫功能合集”，“里面都是‘从前没发现，或者从前不太敢用’的机器学习技巧”。或许是因为合集里的东西太过于基础，这篇文章被大 V 们嘲笑为标题党，因为“里面没有任何一条是‘机器学习’技巧，都是 Python 语法”……

好吧，我承认我也笑了。但笑过之后，我不禁扪心自问了一下，难道基础语法就没什么用吗？

不是的。

诚然，如果只会基础语法，拿不出什么像样的实用技术，那不管是作为机器学习工程师、还是数据分析师，肯定是拿不出手的。但对于刚进入这一领域的新人来说，基础语法的熟练掌握，语言特性的灵活使用，还是具有相当重要的意义——最起码，能帮你减轻许多工作量。

Learning Pandas is great. Numpy is also tons of fun. But have you maybe started using libraries **to early**? Maybe you are still not aware of everything pure Python has to offer.

是啊，我也是一个数据科学方面的新人。Pandas 牛逼，Numpy 超神，这我都知道。但你有没有想过，这些库你会不会用得**太早了**？你是不是还没意识到纯 Python 的语言特性本身就能给你带来哪些神奇的玩法？

If that sounds like you, you’ll like this article.

如果你也是这样的，那么今天这篇文章一定适合你。

<img src="/img/20191020/001.jpg" /><br><small>图片来源：Unsplash</small>


This article will cover a couple of pretty cool pure Python functionalities that I use the most often in my daily Data science job. I’m using them exhaustively through the entire data preparation phase _(a lot for data cleaning)_, and even later to aggregate data before plotting.

今天要介绍的内容其实是我在日常的数据分析工作中经常用到的几个纯 Python 语言特性或者函数。平时我在整个数据准备过程中都会超频繁地使用它们（大部分是为了数据清洗），甚至在可视化绘图前的数据整合偶尔也会用到。

对于已经将这些技巧烂熟于心的大佬，欢迎在下面留言嘲笑我。

I hope that you can also incorporate those into your projects. While there’s no runtime speed or performance benefit, you will save a lot of time then when you’re implementing this logic from scratch. So without further ado, let’s jump into the first point!

对于正在学习的新人，我个人建议你可以把这些技巧用到你自己的项目中去。虽然它们并不会带来多少运行速度或是效率提升，但起码你不用自己从头实现这些功能，能省下大把的编码时间。那么，话不多说，让我们从第一个特性开始吧！

<img src="/img/20191020/002.gif" /><br><small>图片来源：GIPHY</small>


## Lambda 表达式

Lambda functions are just so powerful. Yeah, you won’t use them when you have to clean multiple columns the same way — but that’s not something that happened to me very often — more often than not, each attribute will require its own logic behind cleaning.



Lambda functions allow you to create ‘anonymous’ functions. This basically means you can quickly make ad-hoc functions without needing to properly define a function using Pythons `def`.

With that being said, keep in mind that lambdas are designed **mainly to be one-liners** — and therefore should be used for simpler stuff. For more complex logic you will need to use regular functions.

Okay, enough with the talk, I will now show you two concrete examples with which you can see how much time you can save on your next project just by not defining a function for everything. The first example probably isn’t something you will use much in the real world, but it’s worth covering. It’s all about squaring the number.

```python

# regular function
def square_number(x):
    res = x ** 2
    return res
    
# lambda function
square = lambda x: x ** 2

# results
print('square_number(4): {}'.format(square_number(4)))
print('square lambda: {}'.format(square(4)))

>>> square_number(4): 16
>>> square lambda: 16
```

The snippet above contains the implementation of the same logic in regular way, and in a lambda way. The results are same, obviously, but just look at the beauty of that one-liner!

The second example will cover the process of checking is the number even or not:

```python

# regular function
def is_even(x):
    if x % 2 == 0:
        return True
    else:
        return False
 
# lambda function
even = lambda x: x % 2 == 0

# results
print('is_even(4): {}'.format(is_even(4)))
print('is_even(3): {}'.format(is_even(3)))
print('even(4): {}'.format(even(4)))
print('even(3): {}'.format(even(3)))

>>> is_even(4): True
>>> is_even(3): False
>>> even(4): True
>>> even(3): False

```

Once again, the same logic is implemented in two ways. You decide which one you prefer.

## List Comprehensions

Explained in a most simple way, list comprehensions allow you to create lists using a different notation. **You can think of it as essentially a one-line for loop built inside of brackets.**

I use list comprehensions pretty much always when doing feature engineering. For example, If I’m analyzing email titles for spam detection, I’m curious to see if question mark appears more often in spam email. That’s a really trivial task to accomplish with list comprehensions.

And that’s pretty much it, there’s no need for further theoretical explanation. Examples are what matters the most.

I’ve chosen to declare a regular function that will check for the items in a list which start with a certain character — ‘a’ in this case. Once implemented, I’ll do the same but with list comprehensions. _Guess which one will be faster to write_.

```python

lst = ['Acer', 'Asus', 'Lenovo', 'HP']
# regular function
def starts_with_a(lst):
    valids = []
 
    for word in lst:
        if word[0].lower() == 'a':
            valids.append(word)
 
    return valids
 
 
# list comprehension
lst_comp = [word for word in lst if word[0].lower() == 'a']

# results
print('starts_with_a: {}'.format(starts_with_a(lst)))
print('list_comprehension: {}'.format(lst_comp))

>>> starts_with_a: ['Acer', 'Asus']
>>> list_comprehension: ['Acer', 'Asus']
```

The syntax can be a bit confusing if you’re seeing this for the firsts time. But as you write them daily, they kind of start drawing you in to see how much complexity can you put inside.

## Zip

This one of many built-in Python methods that I see so rarely in practice. From a data scientists perspective, it enables you to **iterate over two or more lists at the same time**. This can come in handy when working with dates and times.

For example, I use it daily in my job when I have an attribute which represents the starting time of some event, and the second attribute representing the ending time of that event. For further analysis, it’s almost always necessary to compute the time difference between those, and `zip` is so far the easiest way to accomplish it.

For the example, I’ve decided to compare a week of sales date from some fictional company and fictional regions:

```python
sales_north = [350, 287, 550, 891, 241, 653, 882]
sales_south = [551, 254, 901, 776, 105, 502, 976]
for s1, s2 in zip(sales_north, sales_south):
    print(s1 — s2)

>>> -201
    33
    -351
    115
    136
    151
    -94
```

Just take a look at how stupidly simple this was. You can apply the same logic for iterating over 3 arrays at the same time, you would only need to add ‘s3’ and some other list name into brackets.

## The final words

Pure Python is so powerful. Make sure you are aware of its capabilities. You don’t need a specialized library for everything. I mean it helps, but **this will make you a better programmer**.

Practice these skills, master them, and apply them to your daily work, whether it's just for fun, for college, or for your job. You won’t regret it.

What are your thoughts? Do you consider something else from pure Python to be essential for a data scientist? Let me know.

_（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 译者：欧剃 转载请保留此信息）_
