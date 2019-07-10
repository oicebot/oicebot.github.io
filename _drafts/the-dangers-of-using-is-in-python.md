---
layout: post
title: "The dangers of using ‘is’ in Python"
tags: udacity translate python
author: Brad Dettmer
from: https://medium.com/peloton-engineering/the-dangers-of-using-is-in-python-f42941124027
excerpt: ""
thumb: "/img/20190524/thumb.jpg"
---
This blog post covers a strange integer bug that I encountered, and it corresponds to a talk I gave at PyCon Canada. You can view the slides if that’s your preferred medium. In this post you’ll learn how the bug was discovered, understand why it’s a bug and why the bug only occurs with larger integers. Hopefully you’ll gain an appreciation of how bugs can be your best teachers and be able to prevent more bugs.

今天，让我们聊一聊我在 Python 中遇到的一个奇怪的整型数字 bug。我之前在[加拿大的 PyCon 2018](https://2018.pycon.ca/talks/talk-PC-55513/) 上也聊过这个话题，如果你喜欢，可以在[这里](https://docs.google.com/presentation/d/1mDeGnYlkYEvIuAfEGTyTk-vUaYvALkdqfnuGIRqz0Hs/edit#slide=id.p)看到在线 PPT 讲义（英文版），也可以在[这里](https://pan.baidu.com/s/1lNXBfMwtmLJRIXiLkLLUog)下载PDF版（提取码: mqbx）。

那么，接下来我就详细讲讲这个 bug 背后的原理，帮助大家理解为啥这是一个 bug，以及为啥这个 bug 只在比较数目较大的整型数字时出现。我个人认为，bug 可是初学者最好的老师，希望你们也能有所收获。

让我们开始吧！

## 起因

<img src="/img/20190524/001.png" /><br><small>
预订系统界面截图，右侧是当前可选择的预约时间</small>

I was building a reservation system so people could demo a Peloton bike when I encountered a bug. Everything was working fine, and no code changes had been made to the system in days when I got a slack message one evening.

事情是这样的。当时我搭建了一个预约试骑动感单车的网站，结果遇到了一个 bug。那时一切看起来都很正常，我甚至已经好几天没有改动系统代码了——所以，当我收到这样一条私信的时候，心里其实是不太相信的：

<img src="/img/20190524/002.png" /><br><small>
Paul 发给我的私信：“我登记了两个（预约），时间是 9 月 25 日上午 7 点。然而它返回的预约结果总是一个空数组。”</small>

Paul had booked two appointments, but they were not showing up in the admin portion of our system. I was puzzled that a bug could appear with no code changes. The code below is the loop that groups all appointments by time_slot and returns the appointments as a list to be used in the API.

让我们跳过那些“你会用吗”和“可我这是好的”的对话，直接看看这个问题的表现：用户确实提交了两个预约，然而它们并没有被记录到系统里，而且——最让我不可思议的是——在这之前这个功能是好的，这期间我甚至没有改动过代码！这到底什么情况？

经过一番排查，我终于找到了这段没有正常工作的代码，它是在一个循环中，负责根据预约的时间（ `time_slot` ）对预约申请进行分组，并返回一个列表给 API 使用：

```python
if appoint.time_slot_id is time_slot.id:
    time_slot_appointments.append(appointment)
```

出问题的地方就是这个 `is` 啦。但最诡异的是，当 `time_slot_id` 和 `time_slot.id` 都是小于等于 256 的整型数字时，这段代码一点问题都没有；只有当预约数量达到一定程度，使得 `time_slot_id` 或 `time_slot.id` 大于 256 时，问题就出现了——这个表达式永远返回 `False`。

这是为什么呢？

## 两种比较方式的区别

There are two types of comparisons I’ll cover. The `is` keyword compares by reference. A reference is like a post-it note, an address, or a pointer to an object. The `is` comparison is what bit me in this bug. The `==` operator compares by value. To know me is to know that I love dogs, I’ll use dog dollars to show you how is and `==` comparisons differ.

为了解释这个问题，我需要给大家介绍一下 Python 中的两种不同比较方式：

* 使用 `is` 关键字进行的比较是“引用比较”。这里的“引用”就相当于一个索引号，一个地址，或是指向一个对象的指针。用 `is` 进行比较正是造成这个奇怪 bug 的根源。
* 使用 `==` 操作符进行的比较是“值比较”，也就是比较两个对象的“值”。

为了直观起见，我要用我最喜欢的狗狗钞票来演示下 `is` 和 `==` 这两种比较方式的区别。

<img src="/img/20190524/003.png" /><br><small>
Paul 和 Brad 都指向同一张“1 元”狗狗钞票</small>

Paul and I both have a puppy dollar bill. When we compare our money, we have the same reference and the same value so if we compare both by `is` and by `==` our money is the same.

如上图，Paul 和我共同拥有一张狗狗钞票。如果我们要对彼此的钱进行比较，很明显我们对它的“引用”和“值”都是一样的——我有的这张也**正是**他拥有的同一张，所以 `is` 比较的结果是 `True`；同时，同一张钱的面值肯定一样，所以 `==` 比较的结果也是 `True`。

Here is another example where we have different dollars, but they happen to be the same value.

让我们看下一个例子。

<img src="/img/20190524/004.png" /><br><small>
Paul 和 Brad 分别指向一张不同的狗狗钞票，它们的面值都是“1 元”</small>

如上图，我们分别拥有一张自己的狗狗钞票，它们的面值恰好一样。

In this case when we compare our money, we have a different reference but our money still has the same value. So if we compare by `is`, our money is different but if we compare by `==` our money is the same.

在这种情况下，如果我们比一比，就会发现，我们的“引用”是不一样的——他的钱**并不是**我手里的这一张——但“值”是一样的，都是“1 元”。所以 `is` 比较的结果是 `False`，`==` 比较的结果还是 `True`。

## 这段代码的问题在哪

To understand why the bug bit me only after after more data was added, let’s step back to look at the Python Interpreter and how memory is managed.

想要理解为啥只有数字大到一定程度的时候才会出 bug，让我们回到 Python 解释器里，看看它是怎么管理内存的。

<img src="/img/20190524/005.png" /><br><small>
Python 解释器中的调用栈（Call Stack）,以及分配的内存中的私有堆（Private Heap）与 PyObject 对象。调用栈中的帧（frame）指向堆中的某个 PyObject 对象。</small>

Python is a stack based virtual machine that stores all objects on a private heap. Heap is just another way of saying chunk of memory or giant array of data. Now I’ll go into further detail about the PyObjects that live on the heap.

Python 解释器是一个基于栈的虚拟机，它将所有对象都存储在其私有堆中。你可以把这个“堆”理解成分配好的一段内存，或是一个保护数据的巨大数组。

接着，让我们看看堆里存储的这些对象：

<img src="/img/20190524/006.png" /><br><small>
私有堆里存储了一个叫做 `small_ints` 的数组，包含了从 -5 到 256 的整数
</small>

Every value assigned to a variable in Python exists as an object on the heap. It takes time to allocate these objects because our memory manager needs to do work. When an integer is assigned to a variable in Python, a corresponding PyObject needs to exist on the heap.

在 Python 中，每一个赋值给变量的值，都作为堆里的一个对象存在。定义这些对象是需要消耗资源的，因为解释器需要调用内存管理来创建/调用/销毁对象。当把一个整数赋值给 Python 中的一个变量时，堆中必须有一个和这个整数对应的 PyObject 对象存在。

A PyLong object is a type of PyObject in Python that has a numeric integer value. PyLongObjects between -5 and 256 are pre-allocated on the heap in CPython, and can be accessed in C with the `small_ints` array. `small_ints` is an optimization so the memory manager has to do less work for small integers.

在 Python 中，数值型的整型数据是以 PyObject 对象的一个子类型： PyLong 对象的形式存储的。为了减少内存管理在处理小整型数字时候的开销，在 CPython 解释器中使用了“小整数对象池”进行优化。也就是说，值为 -5 到 256 的 PyLong 对象已经预置在 CPython 解释器的私有堆中，可以通过 `small_ints` 这个数组进行访问。

Let’s do an example of compare by reference, the type of comparison that caused my bug. Again, this type of comparison is done using the `is` keyword. First, will initialize our variable `v`, with the value of -5. Then we initialize another variable `w` with a value of -5, then we compare using v and w using `is`, and the result is `True`.

让我们

<img src="/img/20190524/007.png" /><br><small>
Initialize variable v with value -5 and w with -5. Both v and w are pointing to the small_ints array on the heap, so “v is w” evaluates to “True”.
</small>

Let’s look at some of the CPython source code to understand why our comparison of small numbers using `is` equated to `True`. The following code gets an instance of a small integer.

```C
//https://github.com/python/cpython/blob/master/Objects/longobject.c#L3005-L3013
get_small_int(sdigit ival)
{
    PyObject *v;
    ...
    v = (PyObject *)&small_ints[ival + NSMALLNEGINTS];
    ...
    return v;
}
```

If our number is small, like a puppy, it’s returned from the `small_ints` array. We don’t have to allocate a new PyObject on the heap, it’s already there. It’s nice to know that when we initialize `w`, can still use our `small_ints` array and we don’t have to initialize another PyObject. Next, we’ll compare `v` and `w`.

The following CPython source code compares two pointers to PyObjects. In other words, it compares two addresses or post-it notes. A pointer is a variable whose value is the address of another variable. We know the comparison method, `PyObject_RichCompareBool` is comparing pointers or addresses because the parameters `v` and `w` have asterisks in front of them.

```C
//https://github.com/python/cpython/blob/master/Objects/object.c#L751-L777
/* Perform a rich comparison with integer result.  This wraps
   PyObject_RichCompare(), returning -1 for error, 0 for false, 1 for true. */
int
PyObject_RichCompareBool(PyObject *v, PyObject *w, int op)
{
    ...
    /* Quick result when objects are the same.
       Guarantees that identity implies equality. */
    if (v == w) {
        if (op == Py_EQ)
            return 1;
        else if (op == Py_NE)
            return 0;
    }
    ...
}
```

On a side note, CPython compares objects by reference using `==` to compare the addresses. In other words, compare by reference source code uses compare by value. If `v` and `w` are the same address, the comparison returns true. So if `v` and `w` are small integers with the same value, because they are in the `small_ints` array, they have the same address and `PyObject_RichCompareBool` will return true. At a higher level, comparing objects using is can be likened to comparing the location of the objects in the heap.

Now let’s look at a comparison of values not in the small_ints array. Since 257 is not in the range of our `small_ints` array, when we initialize our variables, we create two new PyObjects with the same value, and when we compare the reference to the objects our expression evaluates to `False`.

<img src="/img/20190524/008.png" /><br><small>
Initialize variable, x with value 257, y with 257, neither x or y are in the small_ints array, so “x is y” evaluates to False
</small>

Back to our bug. We are filtering out appointments for new time slots because our `if` clause equates to `False` with larger numbers. By checking `if appointment.time_slot_id is time_slot.id` before appending an appointment we filter everything out.

<img src="/img/20190524/009.png" />

Above is an object representation of the buggy code, the PyLongObject on the left represents `time_slot.id` and the PyLongObject on the right represents `appointment.time_slot_id`. You can see both of these are different objects. Instead of comparing values, the code was comparing PyLongObjects, and returning `False` because they were different objects. The code was comparing two different PyLongObjects that happened to have the same value.

If we were to change our comparison to checking `if time_slot.id is appointment.time_slot.id` by simply changing the last underscore to a dot, we would have been comparing the same PyLongObject.

<img src="/img/20190524/010.png" />

Since we updated the underscore to a dot, `appointment.time_slot` and `time_slot` reference the same `time_slot` object on the heap. This means all of their fields, including `id` are the same. In doggie dollar terms, `appointment.time_slot` and `time_slot` have the same doggie dollar.

<img src="/img/20190524/011.png" />

This one character fix might work, but it could also break if there are multiple instances of the same `time_slot` object.

An even better fix would be to use double equals. This whole bug could have been avoided if we had used `==` to compare instead of `is`. Compare by value looks at the contents of the objects. In doggie dollar terms, compare using `==` looks at the value of the dollar instead of the dollar itself.

The biggest takeaway here is to only use `is` for comparison when you wish to compare objects.

Also, understanding why a fix works can lead to a better understanding of the language you are using. Everything is an object in Python, so be careful when using `is` to compare.

Thank you! The Recurse Center, Peloton, write/speak/code, Jordan Ryan Reuter, Cameron Finucane, John Gerace, Paul Bouzakis, Tae Kim, Martin, Tavish, Brian, Kyle, Scott, Rose, Tom, Russell Keith-Magee, PyCon Canada conference organizers and volunteers, Elaine Wong, Allison Kaptur, Duncan, Rowan, Charlie Tran, Kevin Zetterstrom, Ben Cox, Ernest W. Durbin, and you the reader!

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）_
