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

https://docs.google.com/presentation/d/1mDeGnYlkYEvIuAfEGTyTk-vUaYvALkdqfnuGIRqz0Hs/edit#slide=id.p

<img src="/img/20190524/001.png" /><br><small>
Screenshot of reservation system with a picture of a woman riding a stationary bike on the left, with the caption ‘Ready to Ride Toronto?’, and a list of appointments on the right.</small>


I was building a reservation system so people could demo a Peloton bike when I encountered a bug. Everything was working fine, and no code changes had been made to the system in days when I got a slack message one evening.

<img src="/img/20190524/002.png" /><br><small>
Slack message from Paul with the text “I booked two (appointments) at 7am on 9/25. The appointments still return an empty array.”</small>

Paul had booked two appointments, but they were not showing up in the admin portion of our system. I was puzzled that a bug could appear with no code changes. The code below is the loop that groups all appointments by time_slot and returns the appointments as a list to be used in the API.

```python
if appoint.time_slot_id is time_slot.id:
    time_slot_appointments.append(appointment)
```

There are two types of comparisons I’ll cover. The `is` keyword compares by reference. A reference is like a post-it note, an address, or a pointer to an object. The `is` comparison is what bit me in this bug. The `==` operator compares by value. To know me is to know that I love dogs, I’ll use dog dollars to show you how is and `==` comparisons differ.

<img src="/img/20190524/003.png" /><br><small>
A diagram of Paul and Brad both pointing to the same puppy dollar, with a value of $1</small>

Paul and I both have a puppy dollar bill. When we compare our money, we have the same reference and the same value so if we compare both by `is` and by `==` our money is the same.

Here is another example where we have different dollars, but they happen to be the same value.

<img src="/img/20190524/004.png" /><br><small>
A diagram of Paul and Brad pointing to different dog dollars, both with a value of $1</small>

In this case when we compare our money, we have a different reference but our money still has the same value. So if we compare by `is`, our money is different but if we compare by `==` our money is the same.

To understand why the bug bit me only after after more data was added, let’s step back to look at the Python Interpreter and how memory is managed.

<img src="/img/20190524/005.png" /><br><small>
Python Interpreter with Call Stack, and Private Heap with PyObjects. The frames on the call stack are pointing to PyObjects on the heap
</small>

Python is a stack based virtual machine that stores all objects on a private heap. Heap is just another way of saying chunk of memory or giant array of data. Now I’ll go into further detail about the PyObjects that live on the heap.

Every value assigned to a variable in Python exists as an object on the heap. It takes time to allocate these objects because our memory manager needs to do work. When an integer is assigned to a variable in Python, a corresponding PyObject needs to exist on the heap.

<img src="/img/20190524/006.png" /><br><small>
Private Heap containing a small_ints array with values -5 to 256
</small>

A PyLong object is a type of PyObject in Python that has a numeric integer value. PyLongObjects between -5 and 256 are pre-allocated on the heap in CPython, and can be accessed in C with the `small_ints` array. `small_ints` is an optimization so the memory manager has to do less work for small integers.

Let’s do an example of compare by reference, the type of comparison that caused my bug. Again, this type of comparison is done using the `is` keyword. First, will initialize our variable `v`, with the value of -5. Then we initialize another variable `w` with a value of -5, then we compare using v and w using `is`, and the result is `True`.

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
