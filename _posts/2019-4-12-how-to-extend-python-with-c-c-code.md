---
layout: post
title: "How to extend Python with C/C++ Code"
tags: udacity translate python
author: Matthias Bitzer
from: https://medium.com/@matthiasbitzer94/how-to-extend-python-with-c-c-code-aa205417b2aa
excerpt: ""
thumb: "/img/20190412/thumb.jpg"
---
<img src="/img/20190412/001.jpeg" /><br><small>
图片来源：medium.com</small>

Have you ever wondered how some calculations (for example in the NumPy library) can be executed very fast although Python (as an interpreted language) is not popular for being the fastest language. This is mainly the case because time critical code within a library is often written in C or C++.
<span style="background-color:#eaecf0">众所周知，作为解释型语言的 Python 可不是什么超级快速的语言<span><sup><small>[[来源请求]](https://zh.wikipedia.org/zh-cn/Wikipedia:%E6%9D%A5%E6%BA%90%E8%AF%B7%E6%B1%82)</small></sup>，但许多复杂的库函数（比如 `NumPy` 库）却能执行得相当快速。你有没有想过这是怎么一回事呢？嘿，这主要是因为这些库的核心代码往往是用 C 或者 C++ 写的，没想到吧！

In this short tutorial I will explain how to create a Python module (or package) by writing it in C or C++. The main source for this recipe is the [Python Documentation](https://docs.python.org/3/extending/extending.html#a-simple-example). As an example I will create a math module which has a method for calculating the factorial **n!=n*(n-1)*(n-2)…** written in C. For this purpose we need two files: A python file called `setup.py` and our C File `cmath.c` .
在这篇短文中，我们将详细聊一聊如何用 C 或者 C++ 写一个 Python 模组（或软件包），内容主要参考 [Python 官方文档](https://docs.python.org/3/extending/extending.html#a-simple-example)。作为范例，我也将用 C 写一个简单的 Python 模组，完成一个简单的数学计算：<span class="hl">n!=n*(n-1)*(n-2)…</span> 。为了实现上面的目标，我们需要两个文件：一个 Python 代码 `setup.py`，以及我们实际编写的 C 语言代码 `cmath.c`。

The `setup.py` file will be used to build our C program properly (compiling, finding the right Python C libraries, linking). 
总的来说，`setup.py` 将用于把 C 语言写的代码构建成一个 Python 包（包括编译、查找 Python C 库、连接等）。

那么，让我们开始吧！

## 原理

In order to get our program/module executed when calling it in a python script, the module needs to communicate properly with the Python Interpreter `CPython` . Therefore we need to bring it in the right structure by using several Objects from the `Python.h` Header File. 
为了让我们的程序/模组能在 Python 代码中被调用执行，模组需要和 Python 解释器 `CPython` 进行必要的通讯。因此，我们需要 `Python.h` 头文件里面的若干对象，并用它们构建出合适的结构体。

Basically what we are going to do is to build a wrapper around our actual C method which can be called through the Python Interpreter, so that we can use it in a python script like a normal python function. First we need to include the Header File in our `cmath.c` by typing
基本上，我们要做的是把实际的 C 语言方法包装起来，以便能够被 Python 解释器所调用，这样我们的 Python 代码才能够像使用普通的 Python 函数一样，调用这个方法。

## 编写算法并包装

首先，我们要在 `cmath.c` 里引入头文件：

```c
#include Python.h
```

All objects and functions we are using to bring our program in the right structure for the python interpreter are declared in the Python Header and start with the prefix `Py` . The main C object (basically an opaque object) which can represent every python object type is called `PyObject` . 

在 Python 头文件里，我们需要用来和 Python 解释器对接的对象（以及函数），都以 `Py` 开头。在这里，能代表所有 python 对象的 C 对象（基本上就是一个`opaque`——“不透明”对象）叫做 `PyObject`。

But before using these objects we need to write our method for calculating the factorial (remember that **0!=1**):
不过，在实际使用这些对象之前，我们先把求阶乘的算法写出来（注意，**0的阶乘是1**）：

```c
int fastfactorial(int n){
 if(n<=1)
 return 1;
 else
 return n * fastfactorial(n-1);
}
```

After that, we need to write a wrapper around that function. This wrapper gets a pointer to the arguments which are passed in the python script later represented as a `PyObject` and returns a pointer to the result of the calculation also represented as a `PyObject`.
接着，我们给这个函数进行一下包装。这个包裹函数接收一个 `PyObject` 类型的指针（指向今后从 Python 代码传入的参数）作为参数，再返回一个 `PyObject` 类型的指针（指向上面函数的返回值）给外部。

For this purpose we create the following wrapper method
为此，我们用以下代码来实现这个包裹函数：

```C
static PyObject* factorial(PyObject* self, PyObject* args){
int n;
if (!PyArg_ParseTuple(args,"i",&n))
  return NULL;
int result = fastfactorial(n);
return Py_BuildValue("i",result);
}
```

These wrapper methods always need a `PyObject` pointer `self` pointing to the Module object itself and a `PyObject` pointer `args` that represents the arguments which get passed in the python script later. We parse these arguments by the `PyArg_ParseTuple` method and declare that we are searching for an integer by specifying “i” in the second argument. The parsed value is than saved in the variable `n` . After that our factorial method is called `fastfactorial(n)` and the result is turned to a `PyObject*` again by using the `Py_BuildValue` method from the Python Header. In the end the result object is returned by this wrapper method.
这个函数始终需要一个指向模组对象本身的 `self` 指针，以及一个指向从 Python 代码传入参数的 `args` 指针（二者都是 `PyObject` 类型的对象）。我们用 `PyArg_ParseTuple` 方法来处理这些参数，并且声明我们需要的是整数类型（第二个参数 `"i"`)，最后将处理结果赋值到变量 `n` 中。

接着自然是调用 `fastfactorial(n)` 来计算阶乘，并用 Python 头文件里的 `Py_BuildValue` 方法把返回值塞回 `PyObject*` 类型里。最后，我们的包裹函数将指向结果的指针对象返回给外部。

## 组装模组结构

Now that we have build the wrapper method around our actual factorial function we need to create an instance of the `PyModuleDef` struct (which is also declared in the `Python.h`). This struct defines everything the Python Interpreter needs to know about a Module. One part of a module are the definitions of all its methods. This is done by another struct, the `PyMethodDef` struct, or rather an array of those structs that summarizes all methods of the Module. 
现在，我们已经把实际的阶乘函数封装完毕，接下来需要构造一个 `PyModuleDef` 结构体的实例（这个对象也是由 `Python.h` 所定义的。这个结构体定义了模组的结构，以便 Python 解释器载入调用。而模组的另一个组成部分是定义它的所有方法，这由另一个结构体 `PyMethodDef` 实现——它其实就相当于一个数组，里面列出了模组中所有的方法和对应的说明。

In our case this declaration is done through
在当前例子中，我们定义了如下的 `PyMethodDef` 对象：

```C
static PyMethodDef mainMethods[] = {
 {"factorial",factorial,METH_VARARGS,"Calculate the factorial of n"},
 {NULL,NULL,0,NULL}
};
```

which initializes the array of `PyMethodDef` structs. Besides a struct of `NULL`s that always need to be included in the array we add the struct for our wrapper method, which we named `factorial`, and specify that this method actually gets arguments through the `METH_VARARGS` constant. 
这个对象里目前共有 2 个元素——我们在最末尾加入了一个由 `NULL` 组成的结构体，做为结尾。第 0 个对象是我们定义的方法，它的结构是：先是方法名 `factorial`，其次是实际调用的函数对象，注意这里调用的是上一节定义的包裹函数；接下来指定了这个方法是从 `METH_VARARGS` 这个常量中获得它的参数；最后是一个说明字符串。

Now that we have initialized all the methods (just one in our case) that will exist in our python module, we can create an instance of `PyModuleDef`, the struct that represents our whole python module. 
于是，我们已经定义了这个 Python 模组中的所有方法（本例中就一个），我们可以创建一个 `PyModuleDef` 的实例，作为代表整个 Python 模组的对象。

This is done in our case by
代码如下：

```C
static PyModuleDef cmath = {
 PyModuleDef_HEAD_INIT,
 "cmath","Factorial Calculation",
 -1,
 mainMethods
};
```

Here we give our module the name `cmath` and pass the array of methods `mainMethods`. Additional to that, a documentation for the module can be added.
在上面的代码中，我们首先定义了模组名 `cmath` 以及简短的文档字符串，然后再把所有的方法组成的数组 `mainMethods` 放进去。

The last step is to create a method that gets executed when the python program gets called by a script to import the module. 
最后一步，我们要添加一个函数，并让 python 代码导入这个模组的时候执行这个函数。

This is done by
代码如下：

```C
PyMODINIT_FUNC PyInit_cmath(void){
 return PyModule_Create(&cmath);
}
```

The `PyMODINIT_FUNC` return type declares that the method actually returns a `PyObject` pointer. This is a pointer to the python module itself (which is in the end also a PyObject) which gets created by `PyModule_Create` . When a module is imported in a python script this method gets called and returns the pointer to the whole Module including all its methods.
函数的返回类型是 `PyMODINIT_FUNC`，这表明函数实际上返回的是一个 `PyObject` 类型的指针。这个指针指向由 `PyModule_Create` 生成的 Python 模组本身（这个模组对象本身也是一个 `PyObject` 对象）。当一个模组被 Python 代码导入时，这个方法就会被调用，并返回一个指向整个模组对象，包含了所有方法的指针。

## 编译打包模组

Now our C file is ready and has all the methods and the structure the Python Interpreter needs to load the module and execute our factorial method. Therefore we can continue building it. For building the final program the C file has to be compiled and get linked to the right libraries (here the libraries with the definitions for the methods and objects declared in the `Python` Header). To simplify that building process the `setup` and `Extension` methods from the `distutils.core` module in python can be used. The `setup` method basically takes care for the whole build process. We import both methods in our `setup.py` file, which should be located in the same folder as the `cmath.c` . 
现在我们的 C 代码文件已经准备好了，所有的方法都已经包装到位，Python 解释器导入、执行所需的结构体也已经定义完善。于是，我们可以开始构建最终的二进制文件了。在这个过程中，我们的 C 代码需要被编译、并和正确的库文件连接（本例中，我们用到的主要是 `Python` 头文件中定义的那些方法和对象）。为了简化构建过程，我们可以用到 `distutils.core` 模组里的 `setup` 和 `Extension` 方法。

简单地说，这两个方法基本上能搞定整个构建过程。我们只要把 `setup.py` 和 `cmath.c` 放在同一个文件夹里，然后引入这两个方法即可。

The setup file should look like this
这是完整的 `setup.py` 文件内容：

```python
from distutils.core import setup, Extension
factorial_module = Extension('cmath',sources = ['cmath.c'])
setup(name = 'MathExtension',version='1.0',description = 'This is a math package',ext_modules = [factorial_module])
```

First we declare the `factorial_module` as an C Extension with the C file as source. This is needed to tell the setup method which files it should build. Then we call the setup function where we define a package name, in our case `MathExtension`, a version, a short documentation of the package and finally which C Extensions/Modules should be included (here just the `factorial_module`). Now we are done in the `setup.py` file.
在上面的代码中，我们首先声明了 `factorial_module` 变量，作为一个 C 语言扩展对象，源代码 `source` 来自我们的 C 代码文件。这一行基本就是告诉 setup 方法要编译的源文件是哪个。

接下来，我们调用 `setup()` 函数，这个函数接收的参数就是将来要构建的包名（ `MathExtension` ）、版本号（1.0）、简短的描述文档，以及要包括在内的 C 语言扩展/模组对象（ `factorial_module` )。这样，`setup.py` 就写好了，是不是很简单？

Finally, we can run the `setup.py` file either with the option `build`, which only builds the module (a .so library file) and puts it in a build folder right under the current folder, or with the option `install` which puts the compiled library in a path where the python program can access it. 
最后，我们运行一下 `setup.py`。运行时可以选择两种不同的模式。如果是 `build`，程序就只编译这个模块（一个 `.so` 格式的库文件）并把编译结果放在当前文件夹里的 build 子文件夹内；如果是 `install`，则会将编译结果放在 python 的环境变量 PATH 指向的文件夹里，以便其他程序调用。

We take the build option by typing the following command in a shell
今天的例子里，我们选择 build 选项。在终端/命令提示符里输入以下命令：

```
python setup.py build
```

This finally builds our library as an `.so` extension and saves it in the `build` folder. This library can be called by the python program to execute our factorial method. 
如果一切正常，你就会在当前文件夹里看到一个 `build` 文件夹，并在里面看到编译出来的 `.so` 文件。这个库文件可以被 Python 脚本调用，并执行我们用 C 编写的阶乘函数。

## 测试结果

To test it we create a `test.py` file right in the folder where the `.so` library is (when the install option is used this is not necessary). 
让我们试一下吧。我简单地写了一个 `test.py`，并把它放在和 `.so` 文件同一个文件夹下，方便调用（当然，你如果用了 install 选项，那就无需这么做，在任意目录都能调用这个包）。

The `test.py` file looks as follows
`test.py` 文件的内容如下：

```python
from cmath import factorial
print(factorial(6))
```

and it outputs 720. Great! We made a C Extension for python and can import and execute it.
运行一下，得到结果 720。搞定！我们用 C 语言写的这个小模组成功地导入并执行啦！

<hr>

恭喜你已经看完了今天的小教程，你打算给自己的 python 增加哪些威力强大的模块呢？欢迎留言吐槽！

<img src="/img/20190412/002.jpg" /><br><small>
图片来源：unsplash.com</small>

>（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）
