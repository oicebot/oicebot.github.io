---
layout: post
title: "3 Essential Python Skills for Data Scientists"
tags: udacity translate python Data-Science
author: Dario Radečić
from: https://towardsdatascience.com/3-essential-python-skills-for-data-scientists-b642a1397ae3
excerpt: "Maybe you are still not aware of everything pure Python has to offer."
thumb: "/img/20191020/thumb.jpg"
---

Learning Pandas is great. Numpy is also tons of fun. But have you maybe started using libraries **to early**? Maybe you are still not aware of everything pure Python has to offer.

If that sounds like you, you’ll like this article.

<img src="/img/20191020/001.jpg" /><small>Photo by fabio on Unsplash</small>


This article will cover a couple of pretty cool pure Python functionalities that I use the most often in my daily Data science job. I’m using them exhaustively through the entire data preparation phase _(a lot for data cleaning)_, and even later to aggregate data before plotting.


I hope that you can also incorporate those into your projects. While there’s no runtime speed or performance benefit, you will save a lot of time then when you’re implementing this logic from scratch. So without further ado, let’s jump into the first point!

<img src="/img/20191020/002.gif" /><small>By GIPHY</small>


## Lambda Functions

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
