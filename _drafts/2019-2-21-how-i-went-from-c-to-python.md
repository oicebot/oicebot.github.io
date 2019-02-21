---
layout: post
title: "How I went from C++ to Python: a conceptual change"
tags: udacity python 
author: asya f
from: https://medium.freecodecamp.org/how-i-went-from-c-to-python-a-conceptual-change-8bf29d059428
excerpt: ""
thumb: "/img/20190221/thumb.jpg"
---
<img src="/img/20190221/001.jpg" />



## 介绍

People say that coding in Python is so easy that even a 6 year old can do it. This was the thought that I had in mind when I started coding in Python at work. I had been a full-time software developer for 4 years at that time, writing mainly in C++ on Linux, heavily using the QT library. However, I wrote bad Python code at first.

有人说，用 Python 写代码实在太简单了，就连 6 岁小孩子都能搞定。

It has been around 3 years since I’ve made that switch and I think that it’s a good point to sum-up the progress that I’ve made during this time. When looking back, I didn’t only change my main programming language, but also changed my work environment and the way I think about code.

I won’t go into the details and differences between C++ and Python, as there are [numerous resources online](https://www.educba.com/python-vs-c-plus-plus/), but rather will describe my own experience. I hope that this post would be useful for people going through the same transition that I did.

<img src="/img/20190221/002.jpg" />

## C++ is diving, Python is snorkeling

C++ feels like diving into the magical mysteries of the sea - it is beautiful, but requires more learning and practice, and overall, the distance that you cover is not that big. Python is a bit like snorkeling - you see the beauty as soon as you stick your head into the water, but you don’t go much further down. You keep on swimming in shallow waters, and can cover a long distance easily. From this description it is clear, that each of these languages should be used at its right place and time.

## Diving into C++ and surviving it

C++ is more strict and penalizes you more harshly on your mistakes. It’s not an effective coding session if you haven’t gotten a surprising **Segmentation fault** at least once. Therefore, it requires a deeper understanding of the computer, the compiler and the language. When you go deeper, you can really see and be impressed by beautiful things, like the compilation process and memory management.

As a C++ programmer I cared more about syntax tweaks and weird examples. I always knew where I allocated memory and how I was releasing it. The programs I wrote were more stand-alone as I preferred to know what was happening inside my code. The main idea was, that code that someone else wrote was less reliable, more error-prone, and might blow-up your memory usage.

My main everyday tools were `Vim` with numerous plugins for writing code, `GDB` for debugging and `Valgrind` for analyzing my memory usage and errors. I compiled with `g++` and wrote my own `Makefiles`. Back then, I didn’t feel that an IDE would benefit me, but would rather slow things down and make me lose touch with my code. In retrospect, I relied heavily on the compiler for finding my type errors.

<img src="/img/20190221/003.jpg" />

## Shallow swimming in Python

One of the first things that you need to learn when switching to Python is how to let go - you don’t know what is happening under the hood, where memory is allocated and released, and it’s OK. You are also encouraged to use code that was written by others, packed into libraries, as it saves you time and helps you code faster. It doesn’t mean that you need to write code that is dog-slow and relies on unmaintained and nonfunctional libraries, but the focus is definitely different.

When I started coding in Python, I first wrote C++ code in Python. It worked, but I didn’t gain any benefit from the language. My coding improved when I started writing in a more “Pythonic” fashion and started using libraries, and more advanced concepts such as generators, decorators and contexts.

As a Python developer I tend to look first for the library that solves the issue at hand. Python has a rich library ecosystem and community that supports it. There are libraries for doing practically anything. Here are some handy ones that I use on a daily basis: `NumPy` for numerical calculations, `OpenCV` for computer vision, `json` for reading json files, `SciPy` for scientific calculations, `sqlite3` for databases.

My everyday tool is `PyCharm` (yes, an IDE) with `IdeaVim` plugin. I started using it mainly due to the fact that it’s a powerful debugger, which is much friendlier than the default Python debugger, `pdb`. I also use `pip` for installing libraries that I need. I don’t monitor my memory usage anymore unless I really have to.

<img src="/img/20190221/004.jpg" />

## Some Practical Tips

If you are a C++ developer, and you consider starting to code in Python, here are my advice for you:

* **Get rid of old habits** — Stop using the C++ compiler as a debugger. Don’t over-optimize memory usage. Avoid writing C++-like code. And by all means, try not to rely on types.
* **Get new habits** — Start using libraries. Write Pythonic code (but don’t overdo it). Keep things readable. Use more complex concepts such as generators/decorators/contexts. Try PyCharm.
* **Use C++ and Python common libraries** — Some C++ libraries, like OpenCV and QT, have a Python interface. It is easy to start using the same library in Python rather than learning a new library from scratch.
* **Don’t forget your origins** — Sometimes Python is just too slow or not optimal for the task. This is when your C++ knowledge kicks in. The are many ways (`SIP`, `ctypes` etc) to use C++ code inside Python.

## Bottom Line

No matter what other people say, switching to a different programming language, especially to a language that is fundamentally different than the one you are used to, is not easy. Take the time to learn, to dig in, to discover. But most importantly, understand that not only the language should change, but also your coding style and work methodology.

Good luck!

_（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）_