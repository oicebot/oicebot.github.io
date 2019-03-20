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

Obviously as developers we spend a lot of time thinking about keeping our code base clean. We implement design patterns, use our best OOP practices, discuss and implement an architecture etc. This is all fantastic, and if you can apply best practices all the time, then obviously do so.

But with times changing and expectations of a speedy delivery from our customers is becoming more apparent, I personally pay less attention to the inner workings of code these days, and try to always ensure I focus on the following instead:

**Test Driven Development**— Are we ensuring what we are building meets the expected requirements? We should be ensuring we are covering our system with regular automated tests, focusing on different types of tests depending on what we’re building.

<span class="hl"></span> 

**Extensibility** — Is it easy to quickly extend the software to do more things than what it already does? Sometimes over engineering or over architecting systems can come at a cost of extensibility. So can ignoring architecting or engineering altogether. A balance is needed depending on your software. This is a constant struggle.

**Automated Delivery** — Are we able to deploy changes to our system quickly? And are we doing this with the ability to roll back if something goes wrong?

**Measurement and Feedback** — Are we measuring how well our system is going? Are we tracking what our users are doing? Analytics is important. With it we can make decisions about how to improve the system.

**Error Management** — Are we handling any unexpected errors correctly? Are we handling expected errors correctly even? Are the right kinds of errors and error messages being returned? And are we able to track these issues reliably (ie log files, dashboards etc)?

**Performance**— Is the code we write optimised for performance? If not we need to consider alternative routes to improve what we’ve written. Load tests and the like can help pick up any performance issues.

**Scalability, Resiliency and Durability** — Can your system scale reliably if running into a heavy load? Also can your system recover quickly and reliably if something goes terribly wrong? We want to make sure our system does not go down, and if it does, it isn’t down for long.

This is not a comprehensive list of things us developers have to consider, but I feel this is the most important of the things we actually do consider. Some of these challenges I will face alone, and others my team and I will face together. But regardless of who deals with it, I know personally I will not feel comfortable with the state of the software, unless we have at least focused on these areas.

Notice I didn’t put readable code, or code maintenance in the list? If you were to ask most developers, they would put this in their top 3 as things they find the most important. I know I certainly used to. But as I have started to think more like a business man, and not solely as a developer I have come to realise, that only us developers care about code maintenance and readability. It’s to please us, and make our job easier.

Let me make myself clear. Having readable and maintainable code is definitely ideal. I’m not going to question that. In fact I do recommend that time is spent during an iteration of a sprint refactoring some of your code base, to reduce complexity where needed. Even if only half a day is spent on it. But spending time trying to constantly improve the quality of the code during development hinders throughput. As long as we have addressed the concerns listed above, it’s good enough for me.

Now sure, if you see something not quite right and it’s an easy change to make, go on ahead. Otherwise let it go for now, flag it as something that can be refactored later and move on. Lets keep those features flowing. With all our major concerns addressed, we can always come back at a later time and refactor.

Another thing I want to say about maintaining code is around political correctness and this may bother some readers, but I don’t care. Enforcing style guide rules is counter productive in my opinion. Debating over if people should use spaces or tabs, or if you put an underscore before a private variable etc is just utter nonsense. We don’t write in text editors anymore. We all for the most part use IDE’s and have intellisense built into them. We can see what is private or public, what is static and not static and what is a class and not a class etc etc, pretty quickly these days. It’s not like we are taking the code to a printer and reading it on paper. So as long as you can understand what the code is trying to achieve, leave it alone. Drop the damn ego. Stop expecting everyone to work like you do. Everyone codes differently and always will. A simple **“have you considered this”** is ok, but enforcing your concepts and practices on others is not needed. I had to accept this a while ago, and it’s time others did too. If it works they’ve done their job, regardless of whether you like how they went about it or not.

With this in mind some of you might say to me that I must also not care for code reviews. This is not true, I just think about them differently. Code reviews to me should be about the reviewer assessing the likelihood that the specific pull request could fail to meet it’s objective based on what is written. Or that it may affect some other feature in the application in a negative way. If there are doubts about how the code should operate under certain circumstances (maybe error handling is wrong or nulls have not been checked etc) we get a chance to discuss it with the person who built it, hear them out, and if you still see an issue with it, you can bring it to their attention. If you are personally not sure about how something is meant to work, then also a team discussion can occur to conclude what should be done. Code reviews also give us the time to assess if the points I have mentioned above are still going to be met after this change.

What a code review is not to me, is to point out silly things like naming variables correctly etc (unless the name of the variable confuses the reader about why it is needed). Style guide Nazis are annoying and for the most part when it comes to this topic everyone has a different opinion, so lets not concern ourselves with such things.

Bottom line is as much as I agree that it’s ideal that we have easily maintainable code, sometimes it’s just better to leave the code alone and continue onward. At the end of the day the overall objective is to deliver software as quick as we can, and to focus more on maintaining it’s health, rather than being concerned on how it was built. And I feel focusing on addressing the issues I mentioned above are way more important than the overall structure of our code.

_（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）_