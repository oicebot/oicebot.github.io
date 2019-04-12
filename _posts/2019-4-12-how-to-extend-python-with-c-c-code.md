---
layout: post
title: "如何用 C 语言武装你的 Python 代码"
tags: udacity translate python
author: Matthias Bitzer
from: https://medium.com/@matthiasbitzer94/how-to-extend-python-with-c-c-code-aa205417b2aa
excerpt: "作为解释型语言的 Python 可不是什么超级快速的语言，但许多复杂的库函数却能执行得相当快速。你有没有想过这是怎么一回事呢？"
thumb: "/img/20190412/thumb.jpg"
---
<img src="/img/20190412/001.jpeg" /><br><small>
图片来源：medium.com</small>

<span style="background-color:#eaecf0;color:#222222">众所周知，作为解释型语言的 Python 可不是什么超级快速的语言</span><sup><small>[[来源请求]](https://zh.wikipedia.org/zh-cn/Wikipedia:%E6%9D%A5%E6%BA%90%E8%AF%B7%E6%B1%82)</small></sup>，但许多复杂的库函数（比如 `NumPy` 库）却能执行得相当快速。这主要是因为这些库的核心代码往往是用 C 或者 C++ 写好，并经过了编译，比解释执行的 Python 代码有更快的执行速度。

在这篇短文中，我们将详细聊一聊如何用 C 或者 C++ 写一个 Python 模组（或软件包），内容主要参考 [Python 官方文档](https://docs.python.org/3/extending/extending.html#a-simple-example)。作为范例，我也将用 C 写一个简单的 Python 模组，完成一个简单的数学计算：<span class="hl"> n!=n*(n-1)*(n-2)… </span> 。为了实现上面的目标，我们需要两个文件：一个 Python 代码 `setup.py`，以及我们实际编写的 C 语言代码 `cmath.c`。

总的来说，我们将用 `setup.py` 把 C 语言写的代码 `cmath.c` 构建成一个 Python 库（这其中包括编译代码、查找 Python C 库、连接等操作）。

那么，让我们开始吧！

## 原理

为了让我们的程序/模组能在 Python 代码中被调用执行，模组需要和 Python 解释器 `CPython` 进行必要的通讯。因此，我们需要 `Python.h` 头文件里面的若干对象，并用它们构建出合适的结构体。

基本上，我们要做的是把实际的 C 语言方法包装起来，以便能够被 Python 解释器所调用，这样我们的 Python 代码才能够像使用普通的 Python 函数一样，调用这个方法。

## 编写算法并包装

首先，我们要在 `cmath.c` 里引入头文件：

```c
#include Python.h
```

在 Python 头文件里，我们需要用来和 Python 解释器对接的对象（以及函数），都以 `Py` 开头。在这里，能代表所有 python 对象的 C 对象（基本上就是一个`opaque`——“不透明”对象）叫做 `PyObject`。

不过，在实际使用这些对象之前，我们先把求阶乘的算法写出来（注意，**0的阶乘是1**）：

```c
int fastfactorial(int n){
 if(n<=1)
 return 1;
 else
 return n * fastfactorial(n-1);
}
```

接着，我们给这个函数进行一下包装。这个包裹函数接收一个 `PyObject` 类型的指针（指向今后从 Python 代码传入的参数）作为参数，再返回一个 `PyObject` 类型的指针（指向上面函数的返回值）给外部。

为此，我们用以下代码来实现这个包裹函数：

```c
static PyObject* factorial(PyObject* self, PyObject* args){
int n;
if (!PyArg_ParseTuple(args,"i",&n))
  return NULL;
int result = fastfactorial(n);
return Py_BuildValue("i",result);
}
```

这个函数始终需要一个指向模组对象本身的 `self` 指针，以及一个指向从 Python 代码传入参数的 `args` 指针（二者都是 `PyObject` 类型的对象）。我们用 `PyArg_ParseTuple` 方法来处理这些参数，并且声明我们需要的是整数类型（第二个参数 `"i"`)，最后将处理结果赋值到变量 `n` 中。

接着自然是调用 `fastfactorial(n)` 来计算阶乘，并用 Python 头文件里的 `Py_BuildValue` 方法把返回值塞回 `PyObject*` 类型里。最后，我们的包裹函数将指向结果的指针对象返回给外部。

## 组装模组结构

现在，我们已经把实际的阶乘函数封装完毕，接下来需要构造一个 `PyModuleDef` 结构体的实例（这个对象也是由 `Python.h` 所定义的。这个结构体定义了模组的结构，以便 Python 解释器载入调用。而模组的另一个组成部分是定义它的所有方法，这由另一个结构体 `PyMethodDef` 实现——它其实就相当于一个数组，里面列出了模组中所有的方法和对应的说明。

在当前例子中，我们定义了如下的 `PyMethodDef` 对象：

```c
static PyMethodDef mainMethods[] = {
 {"factorial",factorial,METH_VARARGS,"Calculate the factorial of n"},
 {NULL,NULL,0,NULL}
};
```

这个对象里目前共有 2 个元素——我们在最末尾加入了一个由 `NULL` 组成的结构体，做为结尾。第 0 个对象是我们定义的方法，它的结构是：先是方法名 `factorial`，其次是实际调用的函数对象，注意这里调用的是上一节定义的包裹函数；接下来指定了这个方法是从 `METH_VARARGS` 这个常量中获得它的参数；最后是一个说明字符串。

于是，我们已经定义了这个 Python 模组中的所有方法（本例中就一个），我们可以创建一个 `PyModuleDef` 的实例，作为代表整个 Python 模组的对象。

代码如下：

```c
static PyModuleDef cmath = {
 PyModuleDef_HEAD_INIT,
 "cmath","Factorial Calculation",
 -1,
 mainMethods
};
```

在上面的代码中，我们首先定义了模组名 `cmath` 以及简短的文档字符串，然后再把所有的方法组成的数组 `mainMethods` 放进去。

最后一步，我们要添加一个函数，并让 python 代码导入这个模组的时候执行这个函数。

代码如下：

```c
PyMODINIT_FUNC PyInit_cmath(void){
 return PyModule_Create(&cmath);
}
```

函数的返回类型是 `PyMODINIT_FUNC`，这表明函数实际上返回的是一个 `PyObject` 类型的指针。这个指针指向由 `PyModule_Create` 生成的 Python 模组本身（这个模组对象本身也是一个 `PyObject` 对象）。当一个模组被 Python 代码导入时，这个方法就会被调用，并返回一个指向整个模组对象，包含了所有方法的指针。

## 编译打包模组

现在我们的 C 代码文件已经准备好了，所有的方法都已经包装到位，Python 解释器导入、执行所需的结构体也已经定义完善。于是，我们可以开始构建最终的二进制文件了。在这个过程中，我们的 C 代码需要被编译、并和正确的库文件连接（本例中，我们用到的主要是 `Python` 头文件中定义的那些方法和对象）。为了简化构建过程，我们可以用到 `distutils.core` 模组里的 `setup` 和 `Extension` 方法。

简单地说，这两个方法基本上能搞定整个构建过程。我们只要把 `setup.py` 和 `cmath.c` 放在同一个文件夹里，然后引入这两个方法即可。

这是完整的 `setup.py` 文件内容：

```python
from distutils.core import setup, Extension
factorial_module = Extension('cmath',sources = ['cmath.c'])
setup(name = 'MathExtension',
      version='1.0',
      description = 'This is a math package',
      ext_modules = [factorial_module]
     )
```

在上面的代码中，我们首先声明了 `factorial_module` 变量，作为一个 C 语言扩展对象，源代码 `source` 来自我们的 C 代码文件。这一行基本就是告诉 setup 方法要编译的源文件是哪个。

接下来，我们调用 `setup()` 函数，这个函数接收的参数就是将来要构建的包名（ `MathExtension` ）、版本号（1.0）、简短的描述文档，以及要包括在内的 C 语言扩展/模组对象（ `factorial_module` )。这样，`setup.py` 就写好了，是不是很简单？

最后，我们运行一下 `setup.py`。运行时可以选择两种不同的模式。如果是 `build`，程序就只编译这个模块（一个 `.so` 格式的库文件）并把编译结果放在当前文件夹里的 build 子文件夹内；如果是 `install`，则会将编译结果放在 python 的环境变量 PATH 指向的文件夹里，以便其他程序调用。

今天的例子里，我们选择 build 选项。在终端/命令提示符里输入以下命令：

```BASH
python setup.py build
```

如果一切正常，你就会在当前文件夹里看到一个 `build` 文件夹，并在里面看到编译出来的 `.so` 文件。这个库文件可以被 Python 脚本调用，并执行我们用 C 编写的阶乘函数。

## 测试结果

让我们试一下吧。我简单地写了一个 `test.py`，并把它放在和 `.so` 文件同一个文件夹下，方便调用（当然，你如果用了 install 选项，那就无需这么做，在任意目录都能调用这个包）。

`test.py` 文件的内容如下：

```python
from cmath import factorial
print(factorial(6))
```

运行一下，得到结果 720。搞定！我们用 C 语言写的这个小模组成功地导入并执行啦！

<hr>

恭喜你已经看完了今天的小教程，你打算给自己的 python 增加哪些威力强大的模块呢？欢迎留言吐槽！

<img src="/img/20190412/002.jpg" /><br><small>
图片来源：unsplash.com</small>

>（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）
