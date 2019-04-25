---
layout: post
title: "Books that Junior Developers should read in 2019"
tags: udacity translate 
author: Khalil Stemmler
from: https://medium.freecodecamp.org/9-books-for-junior-developers-in-2019-e41fc7ecc586
excerpt: "These books “are basically cheat codes” for leveling up your skills and knowledge as a developer."
thumb: "/img/20190409/thumb.jpg"
---
<img src="/img/20190409/000.png" /><br><small>
</small>

Whether you’re a new developer or you’re fairly experienced as a programmer, you’ll come to realize that the amount of time you’ve worked at a job isn’t the best way to determine your skill and knowledge as a programmer (I know, tell that to the recruiters 🤫).
不管你是刚入门的新手，还是已经有了一定经验的程序员，你一定早晚会意识到，在某一个岗位上干了多长时间，并不是一个评判程序员是否优秀的好指标——因为这既不能反映出一个人的真实水平，也不能真正体现出ta工作经验的多少（是，这句话该说给hr听）。

What you do in your spare time and how you choose to take learning into your own hands is what’s going to ultimately determine your success in this industry. That’s why it’s so important for us as developers to adopt a growth mindset.
一个人能否在编程领域获得成功，最具有决定性的因素，其实就隐藏在你业余时间所做的事情中，隐藏在你如何主动学习新知识的过程中。

There are some excellent ways to learn and improve as a developer. Some of those ways are pair-programming, online courses, meetups, work experience, building projects and finding a mentor.
要想提高你的编程技术，有许多很棒的办法，比如<span class="hl">结对编程、在线学习、线下聚会，以及额外的工作经验、项目构建经验，还有找一个好导师</span>。

One of my personal favorite ways to learn is to crack open a well-written book and try to absorb something from those who have distilled years of knowledge and insight into a permanent artifact.
我个人最喜欢的学习方式，是翻开一本好书，品味字里行间闪烁着的智慧光芒，吸收多年经验积淀而成的宝贵知识。

Here are my personal recommendations that I think all developers (especially junior ones) should read at some point. These books are all highly regarded by professionals in our industry and have the potential to leave a profound impact on the quality of your work and your speed of development & learning.
以下的九本书，是我个人强烈推荐给每一位开发者（特别是新手）值得一读的好书。这些书在业内都已经产生了强烈的反响，有着广泛的好评，有可能对你的工作、学习都产生深远的影响。

Some of them stray from the technical details and focus more on giving you practical rules about what it means to be a good developer on the interpersonal and professional level.
这些书并不都是专注在技术细节上，而更多地倾向于提供一些实用的引导，帮助你处理好人际关系、提升专业水平，最终成为一名优秀的开发者。

>**Disclosure**: Some of the links below are affiliate links. But, I’ve only added those books that I personally feel are useful for a junior dev.
>**译注**：原作者 Khalil Stemmler 推荐的书籍均为英文版，为方便国内读者，译者在亚马逊等站寻找评分较高的对应中文译本，但还是鼓励有能力的读者阅读原版。

## 1. 代码整洁之道（Clean Code）
> 罗伯特·C.马丁 (Robert C. Martin) 

中文版： <https://www.amazon.cn/dp/B0031M9GHC>
英文版： <https://www.amazon.ca/gp/product/0132350882>

After you overcome the basic challenges of development and get comfortable figuring out how to write code to solve problems, it’d be a good idea to take a look at this book. It turns out that making the code work the first time is actually the easy part. The hard part is making your code read well so that others are able to understand it and change it in the future.
在克服了编程的基本挑战并熟悉如何编写代码来解决问题之后，看看这本书是个好主意。事实证明，第一次让代码正常工作实际上只是最容易的那部分。而困难的部分是让你的代码容易阅读，以便其他人能够理解它并在将来对它进行改进。

Remember the last time you had to read code like this?
想想看，如果你不得不阅读像下面这样的代码，那是一种什么体验？

```js
function calculateIt (a, b) {
 if (a.delta < b.element.x) {
   var x = b.element.x;
   return x - b.delta.x
 } else {
   var y = b.next.y;
   var h = b.element.y * 2;
   return y - h
 }
}
```
> 源码见：[hell-code.js](https://gist.github.com/stemmlerjs/f761df79b27dddf28c40244642dee55f#file-hell-code-js)

Who knows what it really does. Code like this might work, but the moment we need to change it, we have to hope the author of the code is still in the company and pray that they are somehow able to decipher what they wrote potentially years ago.
谁知道它到底是做什么的。像这样的代码可能会起作用，但是当我们需要修改它时，我们不得不希望代码的原作者既没有跳槽，也没有进 ICU，并祈祷他们能够以某种方式“破译”自己多年前写下的东西。

When careful attention isn’t taken to write code that’s readable and maintainable, we end up with pockets of code like this that everyone is afraid to touch, and if it ever breaks, we’re in trouble.
如果不小心注意编写易于阅读和维护的代码，我们最终会得到像这样“让人不敢碰”的代码。如果某天它不工作了，那我们就会有大麻烦了。

Uncle Bob’s “Clean Code” teaches you how to identify what clean code looks like compared to bad code, and it teaches you how to transform it into good code. A task like this sounds trivial to most, but you’d be surprised at how turning a just a few clean software design principles into habits can help you write much more professional and scalable code.
马丁的《代码整洁之道》将教你认识干净的代码，鉴别出“坏”的代码，并教你如何将其转换为优秀的代码。像这样的任务对大多数人来说听起来微不足道，但当你将这几条简洁的软件设计原则转化为工作习惯之后，这些习惯能让你更加高效地编写出更专业和可扩展的代码。

We’re software craftspeople, you know. Building a house is not much different than building an application in principle. We need to pay attention to the details or else it can all become very expensive to fix in the future if not done right first time.
你知道，我们就是软件行业的手工匠人。构建软件的原则，和建设房子的原则没有什么太大差别——我们都需要注意细节，否则如果第一次没有做好，将来都要花费昂贵的代价去修复之前犯下的错误。

## 2. 代码整洁之道：程序员的职业素养(The Clean Coder)
> 罗伯特·C.马丁 (Robert C.Martin)

中文版：<https://www.amazon.cn/dp/B01LZJ8L9J>
英文版：<https://www.amazon.ca/gp/product/0137081073>

This book is not necessarily a technical book as it is a book for teaching you how to be a professional in this industry. Professionals are those who, when faced with challenges, uncertainty and pressure, will continue to treat creating software as a craft and will be determined to adhere to their professional values.
本书并不算是一本技术书籍，因为它是一本教你如何成为这个行业专业人士的书。专业人士在面对挑战、不确定性和压力时，将继续将软件开发视为一种手工艺，并将不懈地坚持他们的专业价值观。

The Clean Coder is full of practical advice on estimation, refactoring, testing, dealing with conflict, schedules, avoiding burnout, and much more. Trusted advice from someone who has spent decades doing this stuff.
本书在评估、重构、测试、处理冲突、时间表、避免职业倦怠等方面提供了大量实用建议。这些都是来自几十年来一直在做这些事情的人的，值得信赖的建议。

One of the best things it teaches, is how to have integrity as a developer, when to say “No” and how to say it.
它教给我们的最棒的东西之一，就是如何做一名诚信的开发者，何时该说“不”以及如何去说。

A book about professionalism.
亚马逊网站的编辑推荐语是：“汇聚编程大师40余年编程生涯的心得体会”。

## 3. 重构：改善既有代码的设计(Refactoring)
> 马丁·福勒 (Martin Fowler)
中文版： <https://www.amazon.cn/dp/B07PKP87K5>
英文版： <https://www.amazon.ca/gp/product/0134757599>

Martin Fowler is one of my favorite authors. The first reason is that he’s hilarious. His approach to writing software books is unmistakably “Fowler”. The other reason is that he’s incredibly good at explaining complex topics, and doing so very simply, in a way that doesn’t fatigue you as a reader.
马丁·福勒是我最喜欢的作家之一。原因之一是他很搞笑，他编写的软件书籍无疑有着个人的强烈风格。另一个原因是他非常擅长用简单的方式来解释复杂的主题，而不会让你疲惫不堪。

Refactoring is a book that the creator of Ruby on Rails once said that you should “read before you write another line of code”. Fowler guides you through refactoring a simple application, introducing you to a number of techniques that he’s accumulated and cataloged over his years of consulting.
Ruby on Rails 的作者曾经说过，你应该“在写下另一行代码之前先阅读”《重构》这本书。在书中，福勒会指导你重构一个简单的应用程序，以此向你介绍他在多年的职业生涯中积累和归纳出的一些技巧。

Fowler shows you how to flip between coding and refactoring, how often you should be committing your code and when you should be writing your tests. Highly recommended. The latest version of this book was updated to present the examples in JavaScript, which was an added plus for me since it’s my favorite language.
福勒在书中展示了如何在写代码和重构代码之间进行切换，应该多久提交一次代码以及何时编写测试等经验之谈。强烈推荐。本书的最新版本已更新，添加了大量 JavaScript 的范例，这对我来说是一个额外的加分项，因为 JavaScript 是我最喜欢的语言。

## 4. Design Patterns: Elements of Reusable Object-Oriented Software
> by Erich Gamma, Richard Helm, Ralph Johnson, & John Vlissides
中文版： <https://www.amazon.cn/dp/B001130JN8>
英文版： <https://www.amazon.ca/dp/0201633612>

This is the seminal book on Design Patterns. What are design patterns, you ask? Design Patterns are well-known solutions to commonly occurring problems in software development. If you’re familiar with the patterns, you’ll find that you’ll be able to greatly reduce the amount of time it takes you to put forth the solutions to those problems.

Having a good awareness of design patterns also allows you to communicate your solutions effectively with other developers.

<span class="hl">“Yeah, I just used a Facade overtop of whichever database Adapter gets loaded from the Strategy.”</span>

<span class="hl">“Ahh! Gotcha.”</span>

Yeah, it’s an older book. But it’s still one of the best for reference. If you’d like something on this topic that’s a bit more recent and friendly, I’d also recommend the good “Head First Design Patterns: A Brain-Friendly Guide” by Eric Freeman.

## 5. Domain-Driven Design: Tackling Complexity in the Heart of Software
> by Eric Evans

In order for large code bases to continue to scale, we need to logically split up code into different parts. The idea is to partition your code in a way such that it would be possible for separate teams to work on those parts of your system without affecting anyone else.

The underlying concept that enables moving your code base in this direction is Domain-Driven Design (DDD). It’s an approach to software development where we model the problems that exist in the “problem domain” (the real world) to a number of solution domains.

DDD is incredibly important when a code base gets sufficiently large. Large enterprise companies employ DDD in order to assign teams to parts of the company’s code base.

<img src="/img/20190409/001.png" /><br><small>
Image showing when an anemic model becomes cumbersome; from Vladimir Khorikov’s course on “Refactoring an Anemic Domain Model to a Rich One”.</small>

Eric Evan’s coined the term “Ubiquitous Language”, which is the term for building a common, all-encompassing language between the developers, the domain experts and any other users or actors in the domain. By using this Ubiquitous Language, it ensures that the most important domain concepts are well understood and get modeled in the software.

The book is a little more technical and challenging than the others, but if you get familiar with these concepts, you’ll be very well off in understanding how today’s largest companies keep their code bases manageable and scalable.

## 6. Soft Skills: The Software Developer’s Life Manual
> by John Sonmez

We should strive to stay well-balanced as a software developer. Unfortunately, being well-balanced is not a trait that most people affiliate with software developers. The truth is, it’s incredibly important to invest in your learning, health and overall well-being as a developer.

“Soft skills” is about the important stuff that matters outside of actually coding, like productivity, career goals and personal finance. Sonmez also goes into investing, how he retired at 33, fitness hacking tips and maintaining relationships - things rarely addressed in the programming community.

It’s written in such a way that you can jump into the book at whichever chapter you think is most relevant to you today.

## 7. Clean Architecture
> by Robert C. Martin (Uncle Bob)

What? Uncle Bob writes good books, ok?

In school, there’s a lot of focus on algorithms and less focus on software design principles. I think it’s kind of unfortunate because in reality, you don’t encounter that many algorithm challenges too often. Instead, it’s more common that you’ll be faced with the challenge of structuring your code in a way that’s modular, flexible, readable and will allow you to add new features quickly when requirements change.

Clean Architecture is about the essential software design principles and patterns that you’ll be able to use in order to face these challenges.

<img src="/img/20190409/002.png" /><br><small>
The “Clean Architecture”, thanks Robert!</small>

Some of the best takeaways from this book are the cost of dependencies, stable vs. non-stable code and the SOLID principles: a way to write code so that it’s more understandable, flexible and maintainable.

Other aspects of this book that were incredibly useful were concepts of “screaming architecture” and “packaging by component” which are opinions on how to organize your modules so that it practically screams to the reader exactly what the project is all about.

This book goes well hand-in-hand with Domain-Driven Design, which is enabled through the use of a “Layered Architecture” or as Uncle Bob calls it, “The Clean Architecture” (also known as Ports and Adapters). A great book for anyone who wants to up their architecture chops and learn how to effectively design a system at a high level, and do the dance of dependencies at the detail level.

## 8. The Effective Engineer
> by Edmond Lau

Time is our single most valuable asset in life, and we should aim to be more efficient with it. It’s easy to get bogged down and spend a lot of time fixing bugs and wasting effort. Doing repeated work. Bleh. The Effective Engineer is all about getting more done in less time and removing repeated work.

We can mitigate wasted time and effort on repetitive tasks through a framework called “leverage”.

Leverage helps you identify the activities that you can do that produce the most disproportionate results- per unit of time invested. It’s a framework that can apply to anything, whether that be how you learn, how you code, how you debug… anything!

## 9. The Pragmatic Programmer
> by Andrew Hunt & David Thomas

Praised for being easy to follow and understand, The Pragmatic Programmer is a book that should be on the desktop of developers of all levels. Andrew and David are programmers that not only spent many years doing what they do, but paying attention to what they were doing **as they were doing it**, and then **trying to determine if they could do that better**.

What came out of their years of introspection was this book, which introduces a number of essential programmer philosophies to follow throughout your career, like “programmers should have a “do it once, or automate” philosophy”.

It includes simple yet detailed advice that you should carry with you in the back of your mind before you write another line of code or start a new project.

Final Words
Books really are some of the best tools to improve your knowledge and skills as a new programmer or Junior Developer. Books tend to have a really high return on investment; did you know you can make a lot of money programming? 😉

These are just a few of the best books out there right now in 2019! None of them are really new, but that’s because programming has maintained the same general philosophies and best practices for years. As a professor I once had to say, **“you can make a lot of money in this industry, you just have to read the damn manual”**.

Have you read any of these books? What did you think? Any books not on this list that you think newer developers would really benefit from reading? Let us know in the comments!

Additional Resources
Here’s a list of some really excellent articles that cover some of the topics from these books. If you don’t quite have the time to invest in fully blown books right now, familiarizing yourself with these concepts might assist you in your journey to become a better developer!

* Refactoring.guru https://refactoring.guru/
* SOLID Design Principles https://stackify.com/solid-design-principles/
* DRY (Don’t Repeat Yourself) https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
* NodeJS and Good Practices https://blog.codeminer42.com/nodejs-and-good-practices-354e7d76362
* Implementing the SOLID and the onion architecture in Node.js https://dev.to/remojansen/implementing-the-onion-architecture-in-nodejs-with-typescript-and-inversifyjs-10ad
* Better Software Design with Clean Architecture https://fullstackmark.com/post/11/better-software-design-with-clean-architecture
* The Clean Architecture http://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

Keep growing, and have fun while you’re at it!

<img src="/img/20190409/003.jpg" /><br><small>
</small>

>（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）
