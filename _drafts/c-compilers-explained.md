---
layout: post
title: "C++ Compilers Explained"
tags: Udacity Translate C++ Nanodegree
author: Stephen Welch
from: https://blog.udacity.com/2020/02/c-compilers-explained.html
excerpt: ""
thumb: "/img/20200320/thumb.jpg"
---

As a C++ developer, you’ve mastered a high-performance programming language used to create applications in the world’s most exciting fields—from data mining and big data to self-driving cars and robotics to gaming and video. By this point you may have tackled topics like multi-threading and parallel programming. But have you ever taken a look behind the scenes to find out what happens during compilation?

<span class="hl">C++</span> 是一门高性能编程语言，它被广泛应用于世界最前沿的技术应用当中——从数据挖掘、大数据，到自动驾驶汽车、机器人，再到电子游戏和视频处理，C++ 的身影可谓无处不在。作为一名 C++ 程序员，你已经相当精通这门语言，对多线程和并行编程等主题也有了一定的了解。但你是否曾经揭开过编译器那神秘的面纱，是否好奇过在编译期间到底发生了什么事？

The topic is worth learning about, and this article contains some of the most important details that you’ll want to know. The inner workings of the compiler can provide deep insights and improve your programming skills by helping you avoid common errors.

这是一个非常值得讨论的问题，今天这篇文章里，我们将详细聊聊你最需要了解的几个重点细节。对编译器内部工作原理的了解能帮你更深刻地理解代码，避开许多常见的“坑”，从而进一步提高你的编程水平。

![](./001.jpg)

## C++ 编译过程的阶段 Steps in the C++ compilation process

Let’s cast some light on the black box of compilation by explaining in simple terms what a C++ compiler does. Being a high-level programming language, C++ makes coding easier for programmers; the nuts-and-bolts nature of low-level machine language makes it hard to write useful programs of sufficient complexity for the modern era of computing. The compiler bridges the gap between high-level C++ and machine language by converting your C++ source code into a binary file that computers can execute. The compilation process is fairly complex and can be divided into three steps:

现在，让我们一起打开编译器的“小黑盒”，用最简明的办法来解释 C++ 编译器到底都对你的代码施了什么“魔法”吧。

作为一门高级编程语言，C++ 让程序员的编程工作变得更加容易——低级机器语言一板一眼的本性难以用于编写足够复杂的现代应用程序。编译器通过将 C++ 源码转换成计算机可以执行的二进制文件，填补了高级 C++ 语言和机器语言之间的空白。

总的来说，编译过程还比较复杂，一般可以分为三个阶段：

### 预处理 Preprocessing

Before the actual compilation, the preprocessor directives instruct the compiler to prepare the source code by temporarily expanding it. In C++, preprocessor directives begin with a # (hash) symbol; examples of some preprocessor directives are `#include`, `#define`, and `#if`. In the preprocessor stage, the compiler works with one C++ source file at a time. In the case of `#define` directives, the compiler replaces macros while with `#if`, `#ifdef`, and `#ifndef` directives, the compiler selects different parts of the text. For #include directives, it replaces the contents of the corresponding files, which are usually just declarations. Header files marked with the #include preprocessor directive can add a lot of lines to the code; the more header files you include, the longer the preprocessed output file becomes. In general, this preprocessed file is bigger than your simple C++ source code.

在实际编译工作开始之前，预处理器指令指示编译器对源码进行临时扩充，以为之后的步骤做好准备。

在 C++ 中，预处理器指令以 `#` 号开头，比如 `#include`、`#define` 和 `#if` 等。在这一阶段，编译器逐个处理 C++ 源码文件。对于 `#define` 指令，编译器将源码中的宏替换成宏定义中的内容；对于 `#if`、`#ifdef` 和 `#ifndef` 指令，编译器将有选择地跳过或选中部分源代码；而对于 `#include` 指令，编译器将把对应的库的源码插入到当前源代码中——这通常是一些通用的声明。被  `#include` 指令引入的头文件（ `.h` ）往往会包含大量的代码，你引入的越多，最后生成的预编译文件就越大。总的来说，预编译过的文件会比原来的 C++ 源码更大一些。

From the aforementioned replacements and extensions, a unified output is produced by the preprocessor. The preprocessor also inserts markers into the code to tell the compiler where each line comes from, in order to generate error messages that can be helpful for your C++ code development during the debugging process. 

通过上面这些替换和插入操作，预处理器产生的是被合为一体的输出文件。预处理器还会在代码中插入记号，使编译器能分辨出每一行来自哪个文件，以便在调试过程中能生成对应的错误信息。在开发调试你的 C++ 程序时，这些错误信息能给你很多帮助。

### 编译和汇编 Compilation & assembly

In the next stage, which consists of two steps, the compiler creates an object file from the preprocessor’s output. 

在这一阶段，编译器通过两个连续的步骤，将预处理器产生的代码编译成目标文件（object file）。

First, the compiler converts the pure C++ code, now stripped of preprocessor directives, into low-level assembly code. In this parsing step, the compiler optimizes the source code by pointing out syntax errors, overload resolution errors and any other compile-time errors. Even if a declaration without a definition is used, the compiler can still produce an object file from the source code, since that object file may also refer to symbols that the source code hasn’t defined. 

首先，编译器将去除了预编处理器指令的纯 C++ 代码编译成底层汇编代码。在这一步中，编译器会对代码进行检查优化，指出语法错误、重载决议错误及其他各种编译错误。在 C++ 中，如果一个对象只声明，不进行定义，编译器仍然可以从源代码产生目标文件——因为这个对象也可以指向某些当前代码中还未定义的标识符。

Second, the assembler converts the assembly code from the previous step line by line into bit code, a.k.a. machine code. Compilation can actually be stopped at this point, useful if you wish to compile each piece of code separately. Object files from this process can be placed in archives called static libraries for later use; you don’t have to recompile all your source files if you change only one file. 

其次，汇编器将上一步生成的汇编代码逐行转换成字节码（也就是机器码）。实际上，如果你希望把代码的不同部分分开编译的话，编译过程在这一步之后就可以停止了。这一步生成的目标文件可以被放在被称为静态库的包中，以备后续使用——也就是说，如果你只修改了一个文件，你并不需要重新编译整个项目的源代码。

### 链接 Linking

The linker creates the final output from the object files generated by the compiler. In the process of linking the object files created by the compiler in the previous stage, the linker replaces all references to undefined symbols with their correct addresses. Without linking the object files, you would not have a working program—like an index to a book with no page numbers, it would be of little use. The linker’s next task is to create either a dynamic library or an executable file.

链接器利用编译器产生的目标文件，生成最终结果。

在这一阶段，编译器将把上一阶段中编译器产生的各种目标文件链接起来，将未定义标识符的引用全部替换成它们对应的正确地址。没有把目标文件链接起来，就无法生成能够正常工作的程序——就像一页没有页码的目录一样，没什么用处。完成链接工作之后，链接器根据编译目的不同，把链接的结果生成为一个动态链接库，或是一个可执行文件。

Linking may also generate errors, usually related to duplicate or missing definitions. This isn’t limited to definitions that you failed to write; a definition can also be missing when you forget to include a reference to a library or object file in which the linker can find that definition. Duplicate definition errors, in contrast, occur when two libraries or object files contain definitions for the same symbol.

链接的过程也会抛出各种异常，通常是重复定义或者缺失定义等错误。不只是没进行定义的情况，如果你忘记将对某个库或是目标文件的引用导入进来，让链接器能找到定义的话，也会发生这类错误。重复定义则刚好相反，当有两个库或目标文件中含有对同一个标识符的定义时，就可能出现重复定义错误。

## 理解编译过程有什么用？ Why understanding the compilation process is useful

With your new knowledge of the individual stages of compilation, you can better understand compiler or linker errors and avoid potential bugs in your code related to compilation. For example, if you understand preprocessing, you can make good use of header guards: code snippets used to protect the contents of the header file from multiple inclusions.

当你对编译过程的各个阶段有了新的理解，你就能更好地理解编译错误或连接错误产生的原因，并避免这些与编译相关的潜在问题。比如，如果你理解了预处理过程，你就能利用头文件保护符（用于保护头文件内容不被错误地多次包含的预编译器指令）防止一些编译错误的出现。

Knowing how C++ compilation works can help you look at the whole process differently and can give you more insight into processes you might otherwise take for granted in C++ development.

对 C++ 编译细节的充分了解，能使你从一个完全不同的角度看待整个编程过程，也让你对原先以为是理所当然的编译过程有了新的认识。

## 如何使用 C++ 编译器 How to use a C++ compiler

The basic steps for building and running a C++ program are as follows:

构建并运行一个 C++ 程序所需的基本步骤有：

1. Create a syntactically correct C++ source file with the help of an editor or programming environment (IDE).
1. 使用一个编辑器或是编程环境（IDE），构建一个语法正确的 C++ 源文件。

2. Run the compiler to produce an executable file.
2. 运行编译器对源文件进行编译，生成可执行文件。

3. Execute the resultant file.
3. 运行生成的文件。

Compilers’ features vary widely, even between versions of the same compiler, as do their options for example code generation, debugging, floating-point behavior, library handling, and more. 

编译器的特性差异很大，即使在同一个编译器的不同版本之间也是这样；同样，它们的选项也非常丰富，比如在代码生成、调试、浮点数行为、库处理等方面，都有着相当多的选项。

## C++ 编译器总览 Overview of C++ compilers
Now that you’re ready to compile your C++ program, which C++ compiler should you use?
In general, one can group compilers by their licensing (free vs. paid), by how they are used (locally installed vs. accessed online) or by operating system (Windows, OS X, Linux).
Here are a few suggestions:


* If you are running Linux, the **GNU Compiler Collection** (GCC) is a popular choice. It’s free, of course, and typically available in your Linux distribution’s package repositories.
* On macOS, **Clang** is the default choice, installed with the Xcode command-line tools. Using Clang is free.
* The **Cygwin project** provides a collection of Linux tools, including GCC, for the Windows operating system. You can use Cygwin to run GCC or Clang, but take note that code produced this way will require Cygwin to run. 
* Another option for Windows is **MinGW**, which doesn’t require Cygwin and produces executables that run natively on Windows.

Some IDEs include a compiler along with a code editor, such as Xcode on macOS and Visual Studio on Windows. There are many specialized compilers like **Intel’s C++ compiler** that provide special features for niche uses. For example, Intel’s compiler makes better use of the multi-core architecture in Intel processors and produces code that runs faster on Intel hardware. Such specialized compilers, however, often require the user to purchase an expensive license in order to use them.

Bjarne Stroustrup, the creator of C++, offers an [incomplete list of C++ compilers](http://www.stroustrup.com/compilers.html) on his website.

If you find yourself considering a compiler that’s not very popular, take standards compliance seriously. Avoid compilers that do not comply with ISO standards or that do not provide a solid implementation of the standard library—an extensive library C++ comes with. A library file, in turn, is a collection of precompiled code that has been “packaged” for reuse in other programs.

Some compilers are embedded in the frameworks of software development tools (IDEs) along with libraries. These frameworks can be useful, but it can be difficult to switch away from them if you ever decide to replace your tooling.

## Online C++ compilers

An online compiler can be a useful tool for quickly compiling code without having to install a full compiler on the computer. They make it easy for a developer to play with the latest language features, to share code snippets online, to do collaborative live editing, and to test out various compilers. Beyond compilation in the strict sense, most online compilers also execute the compiled program and display its output.

Just like offline compilers, the features and C++ standard version support offered by online compilers vary widely, from using flags to parameterize the compilation to handling standard inputs to passing in command-line and runtime parameters.

A few popular online C++ compilers:

* Compile Explorer
* Repl.it
* IDEone
* Codepad

Check out this list of[ other online C++ compilers](https://arnemertz.github.io/online-compilers) organized by features.

## Summary

In this article, we walked through the stages of C++ compilation to understand the process in more detail. In learning how to use a C++ compiler and through this article’s overview of various C++ compilers, you got a glimpse behind the compilation curtain and gained some hopefully helpful insights.

Want to learn more about the C++ compilation process? Check out the articles from Toptal and Freelancer that include examples of how the compiler works with different parts of the program.

Looking to learn more about C++? Sign up to earn a C++ Nanodegree program.

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 翻译：欧剃 转载请保留此信息）_