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

The application was very slow in loading up data and obviously, the users were not happy about it.
And I must admit, the application was well written. The database calls were optimally made. The loops were only used as required and modularity was well taken care of in the application. For two days, I sweated over the application, ran various tests and reviewed the code logic, but I could not find anything that made the application slow.
I was at my wit’s end. I was running out of options. Then, on the 3rd day, I found the issue.
And it was a Wait statement in one of the loading pages —

```
WAIT FOR 20 SECONDS.
```

It seems some developer in the past while debugging, had inserted a wait statement and forgot to remove it before moving the code to production. That it has been called from an exit, within the standard code, further magnified the issue. I removed the statement. BINGO!!! It started working.

## That said, Code optimization is a double-edged sword.

Optimizing software is a good thing, but it is not a guaranteed good thing.

If you optimize your software for the wrong things, or in the wrong way, optimization can run up costs, slow down production, and actually make the software sub-optimal for its purpose.

And most of the times there are serious tradeoffs involved. Improving, say, speed may cost you in resource utilization, and making more efficient use of storage easily can slow things down. You need to carefully consider what tradeoffs you are willing to make in other areas in order to achieve your primary goal.

And here are a few pointers you can consider to make your code more responsive and cut down on the amount of stress you cause to your clients’ devices and their connected databases.

## 1. Don’t do it.

The first principle of optimization is “Don’t”.

Is the program good enough already? Knowing how the program is going to be used and the environment in which it runs, is there any benefit of making it faster? These are some questions you should ask prior to optimizing the code.

Yes. Optimization only makes sense in terms of effort and cost if the program is important and it is genuinely slow and there is some expectation that it can be made faster while maintaining robustness, correctness, and clarity.

A fast program that gets the wrong results is of no use to anybody. Effectively optimized software has more advantages than disadvantages, but if you do the optimization wrong, the opposite is true.

So the very first thing is setting the goals for optimization.

You need to start out with a clear understanding of what you’re trying to accomplish and how the various optimizations relate to those goals. This goal needs to be stated clearly and simply — simple enough that the least tech-savvy department manager can understand and articulate it — and you need to stick to those goals throughout the process.

**And the best way to start is to prioritize what you’re going to work on according to the impact it has on your goals. And whatever you are working on should be measurable. Intuition is always a very lousy guide on which to depend on.**

## 2. Use a Profiler
Don’t tune anything without profiling it first. The most common performance tuning mistake is to spend a day rewriting code that consumes a tiny portion of the overall running time.

A profile is a measurement of where the program spends its time. Some profiles list each function, the number of times it is called, and the fraction of execution time it consumes.

Others show counts of how many times each statement was executed. Statements that are executed frequently contribute more to run time, while statements which are never executed may indicate useless code or code which has not been tested properly.

And the greatest advantage of a good profiling tool is to find **hotspots** in a program, the functions or sections of code that consume most of the computing time. Most of the time you find the hotspot, you find the issue.

**The best way to use profiling is to identify the hotspot, improve them to the degree possible, and then measure again to see if a new hotspot has surfaced.**

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