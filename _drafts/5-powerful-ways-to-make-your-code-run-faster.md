---
layout: post
title: "5 Powerful Ways to Make Your Code Run Faster."
tags: udacity translate 
author: Ravi Shankar Rajan
from: https://medium.com/swlh/5-powerful-ways-to-make-your-code-run-faster-b99ef1e20626
excerpt: "Good Code is Clean, Robust and Fast, in that order."
thumb: "/img/20190801/thumb.png"
---

<img src="/img/20190801/001.jpg"><br><small>
Image Credits: Unsplash.com Harley Davidson</small>

My 1st “**Make this code fast**”(_code optimization in technical terms_)assignment was a humongous SAP custom application having more than 30,000 lines of code.

“**让这代码跑得快一点**！！”——我碰到的第一件代码优化任务就是这么开始的。那个项目是一个巨大的 SAP 云平台应用程序，总共含有超过 3 万行的代码。

The application was very slow in loading up data and obviously, the users were not happy about it.

整个 App 加载数据的过程非常之慢，显然用户并不喜欢这种体验。

And I must admit, the application was well written. The database calls were optimally made. The loops were only used as required and modularity was well taken care of in the application. For two days, I sweated over the application, ran various tests and reviewed the code logic, but I could not find anything that made the application slow.

然而，我必须承认，这个项目的代码写的挺不错，数据库调用很合适，只在有需要的地方进行循环，模组化也实现的很到位。我花了两天时间，绞尽脑汁地进行各种测试，审查代码逻辑，但完全没发现到底是什么地方让这个程序变得如此之慢。

I was at my wit’s end. I was running out of options. Then, on the 3rd day, I found the issue.

就在第三天，在我穷尽了所有的办法，最后一点理智也快要消失的时候，我终于发现了问题所在。

And it was a Wait statement in one of the loading pages —

在其中的一个读取页面上，被塞了一个等待语句，程序到这里就停上 20 秒。

？？？

It seems some developer in the past while debugging, had inserted a wait statement and forgot to remove it before moving the code to production. That it has been called from an exit, within the standard code, further magnified the issue. I removed the statement. BINGO!!! It started working.

这大约是原来调试这段代码的程序员，在排查的过程中插入的等待命令，结果在将代码合并进生产环境的时候忘记把这行东西去掉了。而在生产代码中，每次调用读取的时候，这段等待命令都会被执行，这就进一步放大了产生的问题。

于是，我把这行代码删掉了。好家伙，一切都正常了！

## That said, Code optimization is a double-edged sword.

## 有人说，代码优化是一把双刃剑

Optimizing software is a good thing, but it is not a guaranteed good thing.

优化你的软件是一件好事，但这并不能保证它永远都会有好结果。

If you optimize your software for the wrong things, or in the wrong way, optimization can run up costs, slow down production, and actually make the software sub-optimal for its purpose.

如你是在错误的原因驱动下，或是通过错误的方法进行代码优化，这种所谓的优化往往可能增加成本，减缓生产速度，甚至可能会让软件的质量下降。

And most of the times there are serious tradeoffs involved. Improving, say, speed may cost you in resource utilization, and making more efficient use of storage easily can slow things down. You need to carefully consider what tradeoffs you are willing to make in other areas in order to achieve your primary goal.

此外，大多数时候，优化并不是没有代价的，你必须做出谨慎的权衡。例如，提高速度可能会使你在资源利用方面付出代价，更高效地利用存储则很容易减慢运行速度。你需要仔细考虑你在其他方面做出的权衡，这样你的软件才能够实现它的主要目标。

And here are a few pointers you can consider to make your code more responsive and cut down on the amount of stress you cause to your clients’ devices and their connected databases.

也许你会问，那我该怎么办？

下面是一些值得你考虑的要点，遵循这些原则，可以让你的代码更具响应性，也能减少你给用户的设备以及它们连接到的数据库带来的额外压力。

## 1. Don’t do it.

## 1. **不要**进行优化

The first principle of optimization is “Don’t”.

代码优化的第一条原则就是，“不要”优化它。

Is the program good enough already? Knowing how the program is going to be used and the environment in which it runs, is there any benefit of making it faster? These are some questions you should ask prior to optimizing the code.

这个程序是不是已经足够好了？你要去理解这个程序将会被如何使用，知道它是在怎样的环境下运行的，明白如果让它运行的更快到底有没有好处。在真正开始代码优化之前，你必须要问自己这几个问题。

Yes. Optimization only makes sense in terms of effort and cost if the program is important and it is genuinely slow and there is some expectation that it can be made faster while maintaining robustness, correctness, and clarity.

没错，代码优化所耗费的经历和成本，只有在这样的情况下是有意义的：

1. 这个软件很重要
2. 它运行的确实很慢
3. 在保证代码健壮、正确、清楚的情况下，它确实还有改进的余地

A fast program that gets the wrong results is of no use to anybody. Effectively optimized software has more advantages than disadvantages, but if you do the optimization wrong, the opposite is true.

一个程序，就算它运行得再快，如果无法得到正确的结果，那就毫无用处。有效的优化，给软件带来的好处应该总要比坏处多。但如果你的优化走错了路，那往往还不如别动它。

So the very first thing is setting the goals for optimization.

所以，你要做的第一件事，应该是设置一个合理的优化目标。

You need to start out with a clear understanding of what you’re trying to accomplish and how the various optimizations relate to those goals. This goal needs to be stated clearly and simply — simple enough that the least tech-savvy department manager can understand and articulate it — and you need to stick to those goals throughout the process.

首先，你需要清楚地了解你要达成的目标是什么，以及各种优化手段与这个目标之间的关系。

其次，你需要明确而简单地说明这个目标，简单到就算技术理解能力最差的部门经理也能够理解和复述它。

最后，你需要在整个过程中坚持这些目标。

**And the best way to start is to prioritize what you’re going to work on according to the impact it has on your goals. And whatever you are working on should be measurable. Intuition is always a very lousy guide on which to depend on.**

<span class="hl">要开始这项工作，最好的办法是，根据对目标的影响确定每项任务的优先顺序。你要做的每一件事情，都必须是可计量的。不要相信直觉，它基本上总是把你引向非常糟糕的方向。</span>

## 2. Use a Profiler

## 2. 使用一个分析器

Don’t tune anything without profiling it first. The most common performance tuning mistake is to spend a day rewriting code that consumes a tiny portion of the overall running time.

在没有经过分析之前，不要贸然调整任何东西。最常见的错误做法就是，花了一整天去重构优化一段代码，结果在运行的时候发现，这段代码平时根本用不到。

A profile is a measurement of where the program spends its time. Some profiles list each function, the number of times it is called, and the fraction of execution time it consumes.

分析器能精确地测量出你的程序把时间都花在什么步骤上了。有些分析器能列出每一个函数，包括它们被调用的次数，以及每次执行的时候耗时的占比等。

Others show counts of how many times each statement was executed. Statements that are executed frequently contribute more to run time, while statements which are never executed may indicate useless code or code which has not been tested properly.

还有的分析器能列出每个命令的执行次数，被频繁执行的那些命令，在总占用时间上的权重肯定更高，而完全没被运行的那些命令，往往就是一些无用的代码，或者没有经过合适测试的代码。

And the greatest advantage of a good profiling tool is to find **hotspots** in a program, the functions or sections of code that consume most of the computing time. Most of the time you find the hotspot, you find the issue.

一个好的分析工具，最有用的地方就是能让你发现软件中的“<span class="hl">热点</span>”，也就是消耗了最多运行时间的那些函数或者命令语句。基本上如果你发现了一个热点，你也就发现了问题所在。

**The best way to use profiling is to identify the hotspot, improve them to the degree possible, and then measure again to see if a new hotspot has surfaced.**

<span class="hl">性能分析的最佳使用方法就是识别出“热点”，然后尽可能地优化它们，接着再次测量，以查看是不是有新的热点冒了出来。</span>

## 3. Enable Compiler Optimizations

Usually, one sure shot way to optimize is to turn on whatever optimizations the compiler provides inbuilt.

Compiler optimizations usually improve runtime from a few percents to a factor of 2. Sometimes it may also slow the product so just measure carefully before taking the final call. Modern compilers however do sufficiently well in this regard as they obviate much of the need for small scale changes by programmers.

And some modern compilers also have global optimizers which analyze the entire program for potential improvements. If such a compiler is available in your system, try it by all means. It might reduce a few more seconds.

**The point is that the more aggressively the compiler optimizes, the more likely it might introduce bugs in the compiled program. So it is always advisable to rerun regression tests after enabling the compiler optimization to prevent any surprises.**

## 4. Tuning the Code

There are several techniques we can use to tune the code once the hotspot is found. However, these should be used with care, considering the fact that compiler might be doing a majority of things for you and you might be further complicating the program by your efforts. Whatever you try, make sure to measure its impact before proceeding. Here are a few tuning suggestions.

### Collect common subexpressions.
If an expensive computation occurs in multiple places, it is better to compute in one place and remember the result. Don’t put such computations within a loop unless required.

### Replace expensive operations by Cheap ones.
String manipulation is probably one of the most common operations in any program. However, it can be an expensive operation if done incorrectly. Similarly, in some cases, you can improve performance by replacing multiplication with a series of shift operations. Even where this is effective (and it isn’t always) it produces very confusing code. So take the decision considering the readability of code also.

### Eliminate Loops.
Loops are mostly overheads. Try to avoid loops wherever possible if iterations are not much.

### Cache frequently used values.
Caching takes advantage of locality, the tendency of programs and people to reuse recently used data. Caching just the most used character or data significantly improves the performance of the program.

### Rewrite in a lower-level language.
This should be the last resort. Lower level languages tend to be more efficient, although more time consuming from the programmer’s point of view. Occasionally we get significant improvements by rewriting crucial code in lower-level languages but this comes at the cost of reduced portability and maintenance becomes very hard. So take the decision carefully.

**Remember in optimization, the selection is perhaps 90% of the game. It’s worth taking the time to decide what you’re doing and to do it right. Of course: That’s also where the black magic lies!**

## 5. And Lastly, Include Code Inspection into your Governance Models
This is for both managers and developers. Managers should ensure code inspections as part of project hygiene and developers should include it as part of best coding practices.

Inefficient code doesn’t affect the daily running of a system all that much. Because of this obvious flaw, we tend to let inefficient code slide past because it’s not really harming anyone, right? Wrong. Code inefficiency adds up over time and this leads to a slower execution and overly-long processing times for clients.

Incorporating regular code checks to remove inefficient snippets will do a lot over the long term, even though chances are you won’t appreciate it unless you left that inefficient code in there and have to wonder later down the line why your code’s taking such a long time to execute. Don’t let past you lead to suffering for future you. Inspect your code for efficiency when you can.

Have someone code review your work. Ideally, the person is a developer that you admire, but almost any developer will do. If someone can’t understand parts of your code, that’s a red flag.

Remember improving any code starts with you. And there is no way to code something perfectly from the first pass. There are always changes to be done to code, bugs to be worked out and sometimes your code just doesn’t work the way you want it to. That’s fine, it’s all part of being a programmer.

And most of the times, all it needs is a little cleaning for your code to stop working like a jalopy and start working like a finely tuned Bugatti. Make cleaning code a habit and that is it!!!

As Kent Beck has rightly said.

> “I’m not a great programmer; I’m just a good programmer with great habits.”

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) ，译者：欧剃 转载请保留此信息）_