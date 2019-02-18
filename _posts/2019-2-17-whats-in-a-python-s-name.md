---
layout: post
title: 答疑解惑：Python 的 &#95;&#95;name&#95;&#95; 变量，到底是个什么东西？
tags: udacity python 
author: Bert Carremans
from: https://medium.freecodecamp.org/whats-in-a-python-s-name-506262fe61e8
excerpt: "本文详细介绍了 Python 中的内置变量 &#95;&#95;name&#95;&#95;，以及它的用法，希望对各位新近接触 Python 语言的同学能有所帮助。"
thumb: "/img/20190217/snake.svg"
---
<img src="/img/20190217/snake.svg" style="max-width:300px;" alt="" />

我想，你应该已经在很多 Python 脚本里见到过这个 `__name__` 变量了吧？它经常是以类似这样的方式出现在我们的程序里：

```python
if __name__ == '__main__':
    main()
```

今天，我就带大家详细八一八这个内置变量的用法，示范一下在你写的 Python 模组里要怎么用到它。

## 这个 \_\_name\_\_ 拿来做什么的？

<span class="hightlight_words">作为 Python 的内置变量，`__name__` 变量（前后各有两个下划线）还是挺特殊的。它是每个 Python 模块必备的属性，但它的值取决于你是如何执行这段代码的。</span>

在许多情况下，你的代码不可能全部都放在同一个文件里，或者你在这个文件里写的函数，在其他地方也可以用到。为了更高效地重用这些代码，你需要在 Python 程序中导入来自其他文件的代码。

所以，在 `__name__` 变量的帮助下，你可以判断出这时代码是被直接运行，还是被导入到其他程序中去了。

## 这个 \_\_name\_\_ 变量可能取什么值？

当你直接执行一段脚本的时候，这段脚本的  `__name__` 变量等于 `'__main__'`，当这段脚本被导入其他程序的时候，`__name__` 变量等于脚本本身的名字。

下面，让我举两个栗子来说明一下：

<img src="/img/20190217/hands-460865_640.jpg" alt="" />

## 情况 1 - 直接运行脚本

假设我们有一个 `nameScript.py`，代码如下：

```python
def myFunction():
    print('变量 __name__ 的值是 ' + __name__)
def main():
    myFunction()
if __name__ == '__main__':
    main()
```

当你直接执行 `nameScript.py` 时，流程是这样处理的：

<img src="/img/20190217/002.png" alt="" />

在所有其他代码执行之前，`__name__` 变量就被设置为 `'__main__'` 了。在此之后，通过执行 def 语句，函数 `main()` 和 `myFunction()` 的本体被载入。

接着，因为这个 if 语句后面的表达式为真 `true`，函数 `main()` 就被调用了。而 `main()` 函数又调用了 `myFunction()`，打印出变量的值 `'__main__'`。

## 情况 2 - 从其他脚本里导入

如果你需要在其他脚本里重用这个 `myFunction()` 函数，比如在 `importingScript.py` 里，我们可以将 `nameScript.py` 作为一个模组导入。

假设 `importingScript.py` 的内容如下：

```python
import nameScript as ns
ns.myFunction()
```

这时，我们就有了两个不同的作用域：一个是 `importingScript` 的，一个是 `nameScript` 的。让我画个示意图，你就能看出这和之前的区别了：

<img src="/img/20190217/003.png" alt="" />

在 `importingScript.py` 里，`__name__` 变量就被设置为 `'__main__'`。当导入 `nameScript` 的时候，Python 就在本地和环境变量 `PATH` 指向的路径中寻找对应名称的 .py 文件，找到之后，将会运行导入的文件中的代码。

但这一次，在导入的时候，它自身的 `__name__` 变量就被设置为了 `'nameScript'`，接下来还是一样，函数 `main()` 和 `myFunction()` 的本体被载入。然而，这一次 if 语句后面的表达式结果为假 `false`，所以 `main()` 函数没有被调用。

导入完毕之后，回到 `importingScript.py` 中。现在 `nameScript` 模块中的函数定义已经被导入到当前的作用域中，于是我们通过 `ns.myFunction()` 的方式调用模块中的函数，这个函数返回的是模块内的变量的值 `'nameScript'`。

如果你试着在 `importingScript` 中打印 `__name__` 变量的值，那当你直接执行 `importingScript` 的时候，它也会输出 `'__main__'`。原因在于，这个变量是在 `importingScript` 的作用域中的。

## 总结

今天我和大家一起讨论了 `__name__` 变量在模组中的特性，分析了不同的调用方式对它的值有什么影响。利用这个特性，你既可以在程序中导入模组来使用，也可以直接把模组本身作为程序来运行。

那么，大家都掌握了吗？欢迎在下面留言讨论！

_（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译&图片汉化：欧剃 转载请保留此信息）_