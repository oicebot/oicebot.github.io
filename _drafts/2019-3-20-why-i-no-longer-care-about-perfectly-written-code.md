---
layout: post
title: "Why I no longer care about perfectly written code"
tags: udacity translate
author: Aussie Tech Tutor
from: https://medium.com/design-and-tech-co/why-i-no-longer-care-about-perfectly-written-code-bedafa2110b
excerpt: ""
thumb: "/img/20190320/thumb.jpg"
---
<img src="/img/20190320/001.jpg" />

What goes in, must come out. And in terms of a computer program, the inputs we put in, must return an expected output. How the program is written doesn’t matter to a user whatsoever. But what they expect to see when they interact with it does. As I programmer I understand this perspective, and over time I have become much more accepting that a clean code base is not as important as the final outcome.

不管什么时代，做人做事，都贵在有始有终。对计算机程序而言，事情也差不多。一个好的程序，对于各种不同的输入，都应该返回可预期的输出。对用户来说，程序里面的代码优美不优美，牛逼不牛逼完全无关紧要，真正重要的是程序运行起来是不是符合预期，是不是能满足用户的需求。作为一个程序员，我深深地理解这种观点。随着时间的推移，我越来越领悟到，代码是不是很完美跟程序最后能不能完成任务相比，其实真的不怎么重要。

Obviously as developers we spend a lot of time thinking about keeping our code base clean. We implement design patterns, use our best OOP practices, discuss and implement an architecture etc. This is all fantastic, and if you can apply best practices all the time, then obviously do so.

显然，作为开发人员，我们总会在保持代码库的整洁方面花上很多时间和精力。我们采用各种设计模式，使用我们最好的面向对象（OOP）实践，讨论和实现架构等。这些做法都非常棒，如果你可以一直采用这些最优的做法，那么显然应该继续保持下去。

But with times changing and expectations of a speedy delivery from our customers is becoming more apparent, I personally pay less attention to the inner workings of code these days, and try to always ensure I focus on the following instead:

但随着时间的推移，以及客户对快速交付的要求越来越明显，我个人开始把注意力从整理代码的内业工作中挪开，确保我能时刻专注于以下几点：

**Test Driven Development**— Are we ensuring what we are building meets the expected requirements? We should be ensuring we are covering our system with regular automated tests, focusing on different types of tests depending on what we’re building.

1. <span class="hl">测试驱动开发</span> ：我们是否能确保正在建设的产品满足预期要求？我们应该确保定期的自动化测试能够覆盖到整个系统，并根据当前正在构建的内容，将精力放在不同类型的测试上。

**Extensibility** — Is it easy to quickly extend the software to do more things than what it already does? Sometimes over engineering or over architecting systems can come at a cost of extensibility. So can ignoring architecting or engineering altogether. A balance is needed depending on your software. This is a constant struggle.

2. <span class="hl">可扩展性</span>：是否可以轻松快速地扩展现有软件以实现更多的功能？有时，过度的软件工程或过度的架构系统都可能会牺牲可扩展性。因此，必要的时候可以忽略架构和工程的要求。根据你项目的实际情况，你需要在二者间保持一种平衡。这是一个持续而且动态的过程。

**Automated Delivery** — Are we able to deploy changes to our system quickly? And are we doing this with the ability to roll back if something goes wrong?

3. <span class="hl">自动部署</span>：对系统的更改，我们是否能够快速部署？万一出现问题，是否能够回滚？

**Measurement and Feedback** — Are we measuring how well our system is going? Are we tracking what our users are doing? Analytics is important. With it we can make decisions about how to improve the system.

4. <span class="hl">测量和反馈</span>：我们是否能衡量系统运行的好坏？我们是否能跟踪用户的行为？分析非常重要。只有这样，我们才能决定如何改进。

**Error Management** — Are we handling any unexpected errors correctly? Are we handling expected errors correctly even? Are the right kinds of errors and error messages being returned? And are we able to track these issues reliably (ie log files, dashboards etc)?

5. <span class="hl">错误管理</span>：我们是否正确处理了任何未预期的错误？甚至，可预期的错误是否得到正确处理了？是否返回了正确的错误和错误消息？这些问题能不能被有效地追踪到（比如通过日志文件、控制面板等）？

**Performance**— Is the code we write optimised for performance? If not we need to consider alternative routes to improve what we’ve written. Load tests and the like can help pick up any performance issues.

5. <span class="hl">性能</span>：我们的代码是否针对性能进行了优化？如果不是，我们需要考虑重构，或是换种实现方式来改善代码性能。负载测试之类的方法可以帮助我们发现各种性能问题。

**Scalability, Resiliency and Durability** — Can your system scale reliably if running into a heavy load? Also can your system recover quickly and reliably if something goes terribly wrong? We want to make sure our system does not go down, and if it does, it isn’t down for long.

7. <span class="hl">可伸缩性（Scalability），容错性/韧性（Resiliency）和持久性（Durability）</span>：、

This is not a comprehensive list of things us developers have to consider, but I feel this is the most important of the things we actually do consider. Some of these challenges I will face alone, and others my team and I will face together. But regardless of who deals with it, I know personally I will not feel comfortable with the state of the software, unless we have at least focused on these areas.

Notice I didn’t put readable code, or code maintenance in the list? If you were to ask most developers, they would put this in their top 3 as things they find the most important. I know I certainly used to. But as I have started to think more like a business man, and not solely as a developer I have come to realise, that only us developers care about code maintenance and readability. It’s to please us, and make our job easier.

Let me make myself clear. Having readable and maintainable code is definitely ideal. I’m not going to question that. In fact I do recommend that time is spent during an iteration of a sprint refactoring some of your code base, to reduce complexity where needed. Even if only half a day is spent on it. But spending time trying to constantly improve the quality of the code during development hinders throughput. As long as we have addressed the concerns listed above, it’s good enough for me.

Now sure, if you see something not quite right and it’s an easy change to make, go on ahead. Otherwise let it go for now, flag it as something that can be refactored later and move on. Lets keep those features flowing. With all our major concerns addressed, we can always come back at a later time and refactor.

Another thing I want to say about maintaining code is around political correctness and this may bother some readers, but I don’t care. Enforcing style guide rules is counter productive in my opinion. Debating over if people should use spaces or tabs, or if you put an underscore before a private variable etc is just utter nonsense. We don’t write in text editors anymore. We all for the most part use IDE’s and have intellisense built into them. We can see what is private or public, what is static and not static and what is a class and not a class etc etc, pretty quickly these days. It’s not like we are taking the code to a printer and reading it on paper. So as long as you can understand what the code is trying to achieve, leave it alone. Drop the damn ego. Stop expecting everyone to work like you do. Everyone codes differently and always will. A simple **“have you considered this”** is ok, but enforcing your concepts and practices on others is not needed. I had to accept this a while ago, and it’s time others did too. If it works they’ve done their job, regardless of whether you like how they went about it or not.

With this in mind some of you might say to me that I must also not care for code reviews. This is not true, I just think about them differently. Code reviews to me should be about the reviewer assessing the likelihood that the specific pull request could fail to meet it’s objective based on what is written. Or that it may affect some other feature in the application in a negative way. If there are doubts about how the code should operate under certain circumstances (maybe error handling is wrong or nulls have not been checked etc) we get a chance to discuss it with the person who built it, hear them out, and if you still see an issue with it, you can bring it to their attention. If you are personally not sure about how something is meant to work, then also a team discussion can occur to conclude what should be done. Code reviews also give us the time to assess if the points I have mentioned above are still going to be met after this change.

What a code review is not to me, is to point out silly things like naming variables correctly etc (unless the name of the variable confuses the reader about why it is needed). Style guide Nazis are annoying and for the most part when it comes to this topic everyone has a different opinion, so lets not concern ourselves with such things.

Bottom line is as much as I agree that it’s ideal that we have easily maintainable code, sometimes it’s just better to leave the code alone and continue onward. At the end of the day the overall objective is to deliver software as quick as we can, and to focus more on maintaining it’s health, rather than being concerned on how it was built. And I feel focusing on addressing the issues I mentioned above are way more important than the overall structure of our code.

_（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）_