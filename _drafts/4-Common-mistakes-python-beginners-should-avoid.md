---
layout: post
title: "4 Common Mistakes Python Beginners should Avoid"
tags: Udacity Translate Python
author: Eden Au
from: https://towardsdatascience.com/4-common-mistakes-python-beginners-should-avoid-89bcebd2c628
excerpt: "I learned them the hard way, but you don’t need to"
thumb: "/img/20200302/thumb.jpg"
---

![]({{site.cdn}}/img/20200302/001.jpg)

<span class="hl">Let’s face it. It is hard to learn programming.</span>

Many people would agree, but some do not. I did not believe that.
This was because I could always discover **subtle** approaches to do whatever I would like in different programming languages. I thought I had mastered them. But I was wrong. You can do anything in your codes, but you should not do anything you want.

I soon realized that those ‘subtle’ methods I tried were bad practices. But how can a working piece of code be bad? I get used to adopting these bad (and subtle) practices and it came back to haunt me. I learned that the hard way.

Before sharing 4 common mistakes that every Python newbie should know, make sure you are familiar with some Python built-in features in the following article.

## 1. Not using iterators

Every Python newbie does this, regardless of their proficiency in other programming languages. There is no escape.

Given a list list_, how would you access elements in the list one by one using a for-loop? We know that lists in Python are **indexed**, and therefore we can access the i-th element by `list_[i]`. We can then create an **iterator for integers** ranging from 0 to `len(list_)` for the for-loop as shown below:

```python
for i in range(len(list_)):
    foo(list_[i])
```

It works. There are no problems with the codes. This is also the standard way to construct a for-loop in other languages such as C. But we can actually do better in Python.

**HOW?**

Do you know that lists in Python are **iterable**? We can produce much more readable codes by leveraging its iterable nature as shown below:

```python
for element in list_:
    foo(element)
```

![]({{site.cdn}}/img/20200302/002.jpg)

**Traversing multiple lists in parallel** in a for-loop can be achieved by `zip` function, whereas `enumerate` can be helpful if you insist on getting the index number (i.e. counter) while iterating over an iterable object. They are both introduced and explained in _5 Python features I wish I had known earlier_.


## 2. Using globals

A global variable is a variable declared in the main script with a global scope, whereas a **local** one is a variable declared within a function with a local scope. Using the `global` keyword in Python allows you to access and make changes to global variables locally in a function. Here is an example:

```python
a = 1 # a variable    

def increment():
    a += 1
    return a

def increment2():
    global a # can make changes to global variable "a"
    a += 1 
    return a
  
increment()  # UnboundLocalError: local variable 'a' referenced before assignment
increment2() # returns 2
```

Many beginners love it, as using `global` seems to save you from passing all the arguments you need for the function. **But this is actually not true**. It simply hides the actions.

Using `globals` is also bad for **debugging** purpose. Functions should be treated as **block boxes**, and should be **reusable**. Functions that amend global variables might bring **side effects** to the main scripts that are very difficult to spot, and it is likely to cause complex spaghetti code and is much harder to debug.

Modifying global variables in a local function is a **poor** programming practice. You should pass the variable in as an argument, modify it, and have it be returned at the end of the function.

![]({{site.cdn}}/img/20200302/003.jpg)

> *Not to confuse global variables with global constants, as using the latter is perfectly fine in most scenarios.

## 3. Not understanding mutable objects

This is perhaps the most common surprise for new Python learners, as this feature is quite unique in this language.

There are two kinds of objects in Python. Mutable objects can change their states or contents **during runtime**, whereas immutable ones cannot. Many built-in object types are immutable, including `int`, `float`, `string`, `bool`, and `tuple`.

```python
st = 'A string' 
st[0] = 'B' # You cannot do this in Python
```

On the other hand, data types like `list`, `set`, and `dict` are mutable. So you can change the contents of elements in a list e.g. `list_[0] = 'new'`.

When **default arguments** in functions are mutable, something unexpected would happen. Let’s take the following function as an example where a *mutable* **empty list** is the default value of the parameter `list_`.

```python
def foo(element, list_=[]):
    list_.append(element)
    return list_
```

Let’s call the function **twice** without feeding an argument for `list_` such that it takes its default value. Ideally, a new empty list would be created every time the function is called if a second argument is not provided.

```python
a = foo(1) # returns [1]
b = foo(2) # returns [1,2], not [2]! WHY?
```

**WHAT?**

It turns out that default arguments in Python are **evaluated once at the time where the function is defined**. That means calling the function does **not** refresh its default arguments.

![]({{site.cdn}}/img/20200302/004.jpg)

Therefore, if the default argument is mutable, and it is mutated every time the function is called. The mutated default argument would **stick** for all future function calls. The ‘standard’ **fix** is to use (immutable) `None` as the default value as shown below.

```python
def foo(element, list_=None):
    if list_ is None:
        list_ = []
    list_.append(element)
    return list_
```

## 4. Not copying
The concept of copy might be **foreign** or even **counterintuitive** for learners. Let’s say you have a list `a = [[0,1],[2,3]]`, and then you declare a new list by `b = a`. You now have two lists with the same elements. By changing some elements in list b, it should not have any (side) effect on list `a`, right?

**Wrong.**

```python

a = [[0,1],[2,3]]
b = a

b[1][1] = 100

print(a,b) 
# [[0, 1], [2, 100]] [[0, 1], [2, 100]]
print(id(a)==id(b))
# True
```

When you ‘copy’ a list using **assignment statement** i.e. `b = a`, any modification made on the elements of one list is visible in both. The assignment operator only creates **bindings** between a target and an object, and therefore both lists `a` and `b` in the example share the same **reference**, i.e. `id()` in Python.

**How can I copy objects?**

If you want to ‘copy’ objects and only modify values in the new (or the old) object without the bindings, there are two methods to create copies: **shallow copy** and **deep copy**. Two objects will have different references.

![]({{site.cdn}}/img/20200302/005.jpg)

Using our previous example, you can create a shallow copy of `a` by `b = copy.copy(a)`. A shallow copy creates a new object which stores the **reference** of the original elements. This might sound complicated, but let’s take a look at the following example:

```python

import copy

a = [[0,1],[2,3]]
b = copy.copy(a)

print(id(a)==id(b))
# False

b[1] = 100
print(a,b)
# [[0, 1], [2, 3]] [[0, 1], 100]

b[0][0] = -999
print(a,b)
# [[-999, 1], [2, 3]] [[-999, 1], 100]
print(id(a[0]) == id(b[0]))
# True
```

Right after creating a shallow copy of a **nested list** `a`, which we call it `b`, two lists have different references `id(a) != id(b)`, with notation `!=` denotes ‘not equal’. However, their elements have the same references, and thus `id(a[0]) == id(b[0])`.

This means changing the elements inside `b` does not affect list `a`, but amending the elements inside `b[1]` does affect `a[1]`, and therefore this copy is shallow.

In short, **any changes made on elements within nested objects in `b` will appear in `a` if `b` is a shallow copy of `a`**.

If you want to copy a nested object without any bindings between their elements whatsoever, you need a deep copy of a by `b = copy.deepcopy(a)`. A deep copy creates a new object and **recursively** creates **copies of nested objects** in the original elements.

<span class='hl'>In short, deep copy copies everything without any bindings.</span>

![]({{site.cdn}}/img/20200302/006.jpg)

## The Takeaways

There you are — 4 common mistakes Python beginners should avoid. I learned them the hard way, but you do not need to. You can sign up for my newsletter to receive updates on my new articles. If you are interested in Python, you might find the following articles useful:

**Happy Coding!**