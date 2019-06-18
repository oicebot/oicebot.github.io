---
layout: post
title: "If you like to travel, let Python help you scrape the best cheap flights!"
tags: udacity translate python
author: Fábio Neves
from: https://towardsdatascience.com/if-you-like-to-travel-let-python-help-you-scrape-the-best-fares-5a1f26213086
excerpt: ""
thumb: "/img/20190616/thumb.jpg"
---

<img src="/img/20190616/001.png" /><br><small>
图片来源: videoblocks.com</small>

## Simply put
## 目标简介

The goal of this project is to build a web scraper that will run and perform searches on flight prices with flexible dates (up to 3 days before and after the dates you select first), for a particular destination. It saves an excel with the results and sends an email with the quick stats. Obviously, the objective is to help us find the best deals!

简单地说，我们的目标是建立一个网络爬虫，帮你自动搜索飞往特定目的地，时间在一个弹性范围（在首选日期前后最多3天）内的航班价格。它会把搜索结果保存在一个 Excel 表格中，并把精炼过的统计信息通过电子邮件发送给你。显然，这一切都是为了帮我们找到最优惠的价格！

If you get lost in some part, try to have a look at my article about the Instagram bot, as it uses Selenium too.

如果你在阅读本文的时候遇到困难，建议试着看看我们的往期文章，特别是介绍用 Python 编写网络爬虫的那些。

> The real life application for this is up to you. I’ve used it to search both holidays and recently also some short trips to my hometown!

<span class="hl">在现实生活中，爬虫的用途完全取决于你。我曾经用它安排了两个假期的旅行，还搜索过一些回老家的短途旅行信息。</span>

If you’re serious about it, you can run the script on a server (a simple Raspberry Pi will do), and make it start once or twice each day. The results will be mailed to you, and I suggest saving the excel file to a Dropbox folder, so you can access it from anywhere, anytime.

如果你想要弄得专业一点，你可以把这个程序放在服务器（一个简单的树莓派就够了）上，让它一天运行上一两次。程序将会把统计结果发到你的邮箱里，我建议你把生成的 Excel 表格保存到网盘中（比如 Dropbox），这样你就能方便地在任何地方查阅数据。

It searches through “flexible dates” so it will look for flights up to 3 days before and after the dates you select first. Although the script works for one pair of destinations at a time, you can easily adapt it to run several inside each loop. You might even end up finding some error fares… which would be awesome!

它会搜索“弹性日期范围”，以便查找在你首选日期前后 3 天内的航班信息。尽管这个脚本一次只能查询一对目的地（出发-到达），但你很容以就能对它进行调整，以在每个循环内运行多次。你甚至可能发现一些标注错误的超低票价……那简直是棒极了！

<img src="/img/20190616/002.png" /><br><small>
I did not find any error fare yet, but I suppose it’s possible!
我目前还没发现这类出错的机票，不过我想我会成功的！</small>

> 译注：本文的完整源代码可以在[作者的 Github 页面上](https://github.com/fnneves/flight_scraper/blob/master/FlightScraper%20python%20bot%20for%20kayak.ipynb)下载到，有需要的读者可以对照代码阅读本文，以方便理解。

## Yet another scraper
## 又一个爬虫？

When I first started to do some web scraping I was not particularly interested in the topic. There… I said it! I wanted to do more projects with predictive modeling, financial analysis and maybe some sentiment analysis, but it turns out that it was a lot of fun figuring out how to build the first web crawler. As I keep learning, I realized web scraping is what makes the internet “work”.

当我第一次开始做网络抓取工作的时候，我对这个方面并不是太感兴趣。没错，这是真心话。我那时候更希望搞些预测性的建模，或是金融分析，甚至一些语义情绪分析之类的项目。但事实证明，想方设法编写出第一个网络爬虫的过程，还是相当有趣的。随着我学习的不断深入，我逐渐意识到，网络抓取正是驱动互联网“工作”的主要推手。

<img src="/img/20190616/003.jpeg" /><br><small>
Yep… Just like Larry and Sergey, you can hit the jacuzzi after you initiate the scraper! (image: wired.com)
没错，就像 Larry 和 Sergey 一样，等爬虫开始工作之后，你就可以躺在按摩浴缸里享受人生了！（图片来源：wired.com）</small>

You might think it’s a really bold claim, but what if I told you that Google started out with a web scraper Larry Page built with Java and Python? It crawled, and still does, the whole internet trying to provide you the best possible answer for your questions. There are endless applications for web scraping, and even if you prefer other subjects in Data Science, you’ll still need some scraping skills to get your data.

你可能觉得我是章口就莱，但如果你知道，Google 最开始就是建立在 Larry Page 用 Java 和 Python 写的一个爬虫上的呢？这个爬虫差不多是字面意义上地把整个互联网都抓了下来（即使现在也是如此），以便当你在搜索框里输入关键字的时候，能够给你提供最佳的答案。网络爬虫在互联网上的实际应用几乎是无穷无尽的，即使你可能更喜欢数据科学中的其他领域，你仍然需要一些网络抓取技能来帮你获取数据。

> 本教程中涉及到的一些技巧，在我往期的文章中有所涉猎，例如《[数据科学必备技能：用 Python 爬取网页](https://oicebot.github.io/2018/09/30/data-science-skills-web-scraping-using-python.html)》。也欢迎你在下面留言，共同探讨这方面的技巧。

## “Do you like traveling?!”
## “你喜欢旅行吗？”

This simple and innocuous question often meets a positive answer and a subsequent story or two about a previous adventure. Most of us would agree that traveling is a great way to experience new cultures and broaden our own perspectives. But if the question was “Do you like the process of searching for plane tickets?”, I’m sure the reaction would be a lot less enthusiastic…

这个简单而无害的问题，常常能得到一个肯定的答复，偶尔还会收获一两个之前的冒险故事。我想大部分人应该都同意，旅行是体验新文化，拓展自己眼界的好办法。但是，如果问题变成“你喜欢订机票的过程吗？”，我想大家的热情一定会打上许多折扣吧…

<span class="hl"> Python to the rescue. 
这就是 Python 大显身手的时候啦。</span>

The first challenge was to choose which platform to scrape the information from. It was not easy, but I settled with *Kayak*. I tried Momondo, Skyscanner, Expedia and a few more, but the reCaptchas on those websites were ruthless. After a few attempts selecting traffic lights, crosswalks and bicycles in those “are you human” checks, I concluded Kayak was my best alternative even though it throws out a security check if you load too many pages in a short period of time. I managed to keep the bot querying the website in *4 to 6 hour intervals* and it was ok. There may be an occasional hiccup here and there, but if you start getting reCaptcha checks, either solve them manually and start the bot after that, or wait a few hours and it should reset. Feel free to adapt the code to another platform, and you’re welcome to share it in the comments section!

第一个挑战是，该选择从哪个平台获取信息。这并不是个容易的决定。最后，我选择了 Kayak。在这个过程中，我也考虑过 Momondo、Skyscanner、Expedia 以及一些其他的网站，不过对初学者来说，这些网站的人机验证实在是……比较无情。在选过几次“哪个是红绿灯，哪个是人行道和自行车”，点过几次“我不是机器人”之后，我觉得还是 Kayak 比较友好一点——虽然如果你在短时间内同时读取太多页面的话，它也会给你弹一些安全检查什么的。

我目前让脚本大约**每隔 4 到 6 个小时**就抓一次网页，虽然偶尔会出现一些小问题，但总体上还是比较 OK 的。如果你发现脚本开始碰到验证码，你可以试着手动提交验证然后重启脚本，也可以等上几个小时再访问这个网站，那时候验证码应该就消失了。

你也可以试着把这些代码用在其他平台上，也欢迎大家在下面留言分享你的成果！

If you’re new to web scraping or if you don’t know why some websites go a long way to prevent it, please do yourself a big favor before writing your first line of code towards a scraper. Google “web scraping etiquette”. Your endeavour might be over much sooner than you think if you just start scraping like a madman.

如果你还不熟悉网络抓取，或者如果你不知道为什么某些网站费尽全力要阻止爬虫，那么在你写下第一行爬虫代码之前，请先 Google 一下“网络爬虫礼仪”。 如果你像疯子一样开始扒别人的网站，你的努力可能很快就全白费了。

## Fasten your seatbelts…
## 系紧安全带

> 准备加速出发！

After importing and opening a chrome tab, we’ll define some functions that will be used inside a loop. The idea of the structure is more or less like this:

在你导入所需的库，并打开一个 Chrome 页面之后，我们需要定义一些之后会在循环中调用的函数。主要的程序结构应该差不多类似这样：

1.  a function will start the bot, declaring the cities and dates we want to search
1.  一个函数负责启动爬虫，指出我们需要查找的城市和日期
1.  this function gets the first search results, sorted by “best” flights, and clicks the “load more results”
1.  这个函数获取到最初的搜索结果，按照“最优”方式排序航班列表，然后点击“载入更多”
1.  another function will scrape the whole page, and return a dataframe
1.  另外一个函数爬取整个页面，返回一个 dataframe 数据表对象
1.  it will repeat step 2 and 3 for the “cheap” and “fastest” sort types
1.  重复上面的步骤 2 和 3，用“最便宜”和“最快速”的方式排序列表
1.  an email will be sent to you with a brief summary of the prices (cheapest and average), and the dataframe with the three sort types will be saved as an excel file
1.  简单地对价格进行统计（最低价、平均价），然后形成简要汇总表，发送到指定邮箱，并把对应的 dataframe 保存成 Excel 表格文件，放在指定目录中
1.  all the previous steps are repeated in a loop, that runs every X hours.
1.  每隔 X 小时就重复一遍上面的每一步

---

Well, every Selenium project starts with a webdriver. I’m using Chromedriver, but there are other alternatives. PhantomJS or Firefox are also popular. After downloading it, place it in a folder and that’s it. 

那么，每一个 Selenium 项目都是从一个网页驱动框架（webdriver）开始的。我现在用的是 Chromedriver，它使用的是 Chrome 内核。当然，你也可以选择其他的选项，比如无头浏览器 PhantomJS，或者干脆是火狐，都很不错。下载完，往文件夹里一丢就完事了。

Please bear in mind I’m not breaking new ground here. There are way more advanced ways of finding cheap deals, but I want my posts to share something simple yet practical!

请各位大佬读者注意，我写这篇文章并不是为了展示什么新技术。没错，已经有更先进的方法来寻找更便宜的机票，然而我只希望我的文章能给初学者带来一些简单而实用的东西！

```python
from time import sleep, strftime
from random import randint
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import smtplib
from email.mime.multipart import MIMEMultipart
```

These are the packages I will use for the whole project. I’ll use randint to make the bot sleep a random number of seconds between each search. That is usually a must have feature for any bot. 

上面这些就是我们的脚本所需的代码库啦。我将用 `randint()`  让爬虫在每次搜索之间暂停上随机的几秒钟，这是基本上每个爬虫都会有的功能。

```python
driver = webdriver.Chrome(executable_path=chromedriver_path)
sleep(2)
```

These first lines will open a blank Chrome tab.If you ran the previous code, you should have a Chrome window open, which is where the bot will navigate.

开头这几行将会打开一个空白的 Chrome 页面。当你运行它的时候，你将会看到一个空白的 Chrome 浏览器窗口出现了，我们接下来就将让爬虫在这个窗口里工作。

So let’s make a quick test and go to kayak.com on a different window. Select the cities you want to fly from and to, and the dates. When selecting the dates, make sure you *select “+-3 days”*. I have written the code with that results page in mind, so there is a high chance you need to make a few adjustments if you want to search specific dates only. I’ll try to point the changes throughout the text, but if you get stuck shoot me a message in the comments.

那么，先让我们在另外一个窗口中手动打开 kayak.com 检查一下吧。选择你的出发和到达城市，以及出发日期。在选择日期的时候，记得选上“± 3 天”的选项。我写代码的时候是按这个选项来调试的，所以如果只想搜索某个指定日期的话，需要对代码进行一些调整。

<img src="/img/20190616/003.png" />

我会试着说明需要调整的地方，不过如果你在尝试的时候遇到问题，欢迎在下面留言哈。

Hit the search button and get the link in the address bar. It should look something like the link I use below, where I define the variable kayak as the url and execute the get method from the webdriver. Your search results should appear.

接下来，我们按下搜索按钮，把地址栏里的链接地址复制下来。这个地址长得应该类似下面代码中的那个字符串。我把这个字符串赋值给 `kayak` 变量，并用 webdriver 的 get 方法来访问这个地址。

```python
kayak = "https://www.kayak.com/flights/LTS-SIN/2019-07-29-flexible/2019-08-15-flexible?sort=bestflight_a"
driver.get(kayak)
sleep(3)
```

这时你的搜索结果页面应该出现了。

Whenever I used the get command more than two or three times in a few minutes, I would be presented with a reCaptcha check. You can actually solve the reCaptcha yourself, and keep doing the tests you want before the next one comes up. From my testing, it seems to be fine for the first search all the times, so it’s really a matter of solving the puzzle yourself if you want to play with the code, and leave the code running by itself with long intervals between them. You really don’t need 10 minute updates on those prices, do you?!

如果我在几分钟内连续执行这个命令两三次，网站就会弹出一个验证码，阻止后续的访问。 这种情况下，你可以直接手动完成验证，并继续测试你需要搜索的内容，直到下一个验证码跳出来为止。

就我个人的测试而言，头一次的搜索总是不会有问题的，所以如果你还没有跳过验证码的能力，你可以试着先手动完成验证，然后再让爬虫以较低的频率执行搜索操作。——毕竟你完全没必要每隔10分钟就搜索一次价格，对吧？

## Every XPath has its puddle
## XPath：一个萝卜一个坑

So far we’ve opened a window and got a website. In order to start getting prices and other information, we have to use XPath or CSS selectors. I’ve chosen XPath and didn’t feel the need to mix it up with CSS, but it is perfectly possible to do so. Navigating the webpages with XPath can be confusing, and even if you use the methods I described in the Instagram article, where I use the “copy XPath” trick directly from the inspector view, I realized it’s really not the optimal way to get to the elements you want. Sometimes that link is so specific, that it quickly turns obsolete. The book Web Scraping with Python does a phenomenal job explaining the basics of navigating with XPath and CSS selectors.

目前，我们打开了一个窗口，读取了一个网页，为了能确切地获取到价格和其他信息，我们需要用到 XPath 或者 CSS 的选择器。今天的例子中，我选择用 XPath 来定位页面上的元素，因为我觉得这个例子里并不是太需要用到 CSS－－当然，如果你能做到混合使用 CSS 来进行定位，那当然更完美。用 XPath 来在页面中进行跳转有的时候还是容易把人搞晕，即使你用了网上那些文章中的技巧，比如在“检查元素”中直接右键“复制 XPath”等方式来获取对应网页元素的 XPath 信息，也不见得就是最佳的办法－－有的时候，这样获取的链接太特殊了，很快就不能再用了。

> 译注：这里个人推荐一下我个人之前买过的《Python 爬虫开发从入门到实战》（谢乾坤 著），里面比较详细地介绍了 XPath 语法，以及如何构造 XPath 的知识，当然 Selenium 的模拟登录和处理验证码等黑科技的介绍也少不了。建议学有余力的同学可以看一看。

```python
cheap_results = '//a[@data-code = "price"]'
driver.find_element_by_xpath(cheap_results).click()
```

Moving on, let’s use Python to select the **cheapest** results. The red text in the code above is the XPath selector, and it can be seen if you right click the webpage anywhere and select *“inspect”*. Click again with the right click where you want to see the code, and inspect again.

那么，让我们用 Python 来选中**最便宜**的搜索结果。上面的代码中，那个字符串就是 XPath 选择器。你可以在网页中任意元素上点击右键，选择 `检查`，当开发者工具弹出时，你就可以在窗口中看到你选中的元素的代码了。

<img src="/img/20190616/004.png" />

To illustrate my previous observation on the shortcomings of copying the path from the inspector, consider these differences:

为了说明一下我前面提到过的，直接在开发者工具中复制 XPath 可能存在的问题，大家可以对比一下这两个 XPath 代码：

1. This is what the copy method would return. Right click highlighted rows on the right side and select "copy > Copy XPath"

1. 这是在开发者工具中，右键点击并选择 `复制 XPath` 命令后，你得到的 XPath 字符串：

    ```python
    '//*[@id="wtKI-price_aTab"]/div[1]/div/div/div[1]/div/span/span'
    ```
2. This is what I used to define the "Cheapest" button
2. 这是我实际使用的定位“最便宜”结果的 XPath 语句：

    ```python
    cheap_results = '//a[@data-code = "price"]'
    ```

看出问题了吗？

It’s clearly visible the simplicity of the second option. It searches for an element a which has an attribute data-code equal to price. The first alternative looks for an element with an id equal to wtKI-price_aTab and follows the first div element, four more divs, and two spans. It will work… this time. I can tell you right now that the id element will change next time you load the page. The letters wtKI change dynamically every time a page loads, so your code would be useless as soon as the page reloads. **Invest a little time reading about XPath and I promise it will pay off**.

很明显，后面这种写法更简明易懂。它在网页上搜索，并定位一个 `data-code` 属性等于 `"price"` 的元素。

而前面这种写法，它先定位一个 ID 是 `wtKI-price_aTab` 的元素，然后找它的第一个子 `div` 然后往下找 4 层 `div` 以及 2 层 `span` …… 怎么说呢，它这次应该是会成功的吧，但一旦网页层次有变化，你的代码就废了。

还是回到上面这个例子，这个 ID 是 `wtKI-price_aTab` 的元素，只要你刷新一下页面，它的 ID 就变了——事实上，这个 `wtKI` 是自动生成的字符串，它在每次搜索的时候都会不一样。也就是说，只要一刷新页面，你这段代码就没法正常工作了。

所以，我的忠告是：<span class="hl">花点时间认真了解网页结构特征，熟悉 XPath，肯定不亏</span>。

<img src="/img/20190616/005.png" />

> Nevertheless, using the copy method will work on less “sophisticated” websites, and that’s fine too!
> 不过，在没那么“复杂”的网站上，直接用复制 XPath 也是可以的完成任务的。具体问题具体分析吧！

Building on what I displayed above, what if we wanted to get all the search results in several strings, inside a list? Simple. Each result is inside an object with the class “resultWrapper”. Fetching all the results can be achieved with a for loop like the next. **If you understand this part, you should be able to understand most of the code that will follow.** It’s basically pointing to what you want (the results wrapper), using some kind of way (XPath) to get the text there, and placing it in a readable object (first with the `flight_containers` and then with the `flights_list`).

在完成了上面的这些步骤之后，搜索结果应该已经显示出来了。那么，如果我们要把所有搜索结果的字符串都读取出来，保存在一个列表对象里面，该怎么做呢？小菜一碟。观察这个页面，我们能看出，每一个搜索结果都属于 `resultWrapper` 类下的一个对象。那么，我们只需要用 xpath 把所有包含这个类的元素都抓下来，再弄个循环把它们塞进列表里就完事了。<span class="hl">如果你能理解这个部分，那接下来的绝大部分代码应该都难不住你啦。</span>

基本上，它的工作方式就是指向你想要的某个对象（比如这里的 `resultWrapper` ），用某种方式（XPath 选择器）把文字都抓下来，然后把内容都放在某个方便读取的对象（先是 `flight_containers`，接着是 `flights_list` ）中，就搞定咯。

这段的代码类似这样：

```python
xp_results_table = '//*[@class = "resultWrapper"]'
flight_containers = driver.find_elements_by_xpath(xp_results_table)
flights_list = [flight.text for flight in flight_containers]

# 列出前 3 个结果
flights_list[0:3]
```

运行结果如下：

<img src="/img/20190616/006.png" />

The first 3 rows are displayed and we can clearly see everything we need, but we have better alternatives to get the information. We need to scrape each element individually.

我把前三行显示出来，这样我们就能比较直观地看出程序有没有正确地获取到我们需要的信息。不过，为了方便处理多页数据，我打算单独爬取每个页面上的每个元素，最后再整合进数据表中。

## Clear for take-off!
## 准备起飞！

The easiest function to code is to load more results, so let’s start with that. I want to maximize the amount of flights I get, without triggering the security check, so I will click once in the “load more results” button every time a page is displayed. The only thing new is the try statement, which I added because sometimes the button was not loading properly. If it acts up with you too, simply comment it out in the `start_kayak` function that I will show ahead.

首先，也是最容易的函数，就是实现「加载更多」功能。我们的目标是，在一页里尽可能多地获取航班信息，同时又不触发验证码检查。所以，我的做法是，在一页内容载入进来之后，点一下（就一下！）页面上的「加载更多结果」按钮。这基本上和我们上面讲过的代码没啥区别，只多了一个 `try` 语句——我加上这行是因为有的时候这个按钮会没能正确加载，而我不希望程序在这种情况下就此崩溃。

要开启这个功能，你只需要在 `start_kayak` 函数中把 `# load_more()` 前面的注释去掉就行啦。

And now, after a long intro (I can get carried away at times!) we’re ready to define the function that will actually scrape the pages.

那么，在拉拉杂杂地说了这么多之后（有的时候我真的容易跑题），我们终于到了实际抓取页面内容的函数啦！

I already compiled most of the elements in the next function called `page_scrape`. Sometimes, the elements returned lists interpolating first and second legs information. I used a simple method to split them, for instance in the first `section_a_list` and `section_b_list` variables. The function also returns a dataframe `flights_df`, so we can separate the results we get in the different sorts and merge them later.

我把大部分

I’ve tried to make the names clear to follow. Remember that the variables with a are related with the first leg of the trip, and b with the second. On to the next function.

## Wait, there’s more?!
So far we have a function to load more results, and a function to scrape those results. I could end the article here and you would still be able to use these manually and use the scraping function on a page you browsed by yourself, but I did mention something about sending an email to yourself and some other information! That is all inside the next function `start_kayak`!

It requires you to declare the cities and the dates. From there, it will open the address in the `kayak` string, which goes directly to the sort by “best” results page. After the first scrape, I took the liberty of getting the top matrix with the prices. It will be used to calculate an average and a minimum, to be sent in the email along with Kayak’s prediction (in the page it should be on the top left). This is one of the things that could cause an error on a single date search since there is no matrix element there.

I tested this using an Outlook account (hotmail.com). Although I did not test it using a Gmail account to send the email, there are lots of alternatives you can search, and the book I mentioned earlier has other ways to do it too. If you already have a Hotmail account, it should work if you replace your details.

> If you want to explore what some parts of the script are doing, please copy it and use it outside the functions. That is the only way you will fully understand it

## Using everything we just created
After all this, we might as well come up with a simple loop to start using the functions we just created and keep them busy. Completed with four “fancy” prompts for you to actually write the cities and dates (the inputs). Since when we’re testing, we don’t want to type these variables every time, alternate it with the explicit way below them when needed.

If you made it this far, **congratulations**! There are plenty of improvements I can think of, like integrating with Twilio to send you a text message instead of an email. You can also use VPN’s or more obscure ways to grind the search results from several servers at the same time. There’s the captcha issue, that may pop up from time to time, but there are workarounds for these sorts of things. I think you have some pretty solid basis here, and I encourage you to try and add some extra features. Maybe you want the excel file sent as an attachment. I always welcome constructive feedback, so feel free to leave a comment below. I try to respond to every one!

>By popular request in the comments section, here’s the [link](https://github.com/fnneves/flight_scraper) to a full Jupyter Notebook with all the code!

<img src="/img/20190616/007.png" />

If you want to learn more about Web Scraping, I strongly recommend the book [Web Scraping with Python](https://amzn.to/2YzJIR4). I really liked the examples and the clear explanation of how the code is working. And if you prefer social media scraping, there’s also an excellent book exclusively on the subject. I’m using the latter for my next article using the Twitter API, but there is stuff there to scrape even LinkedIn! (If you decide to purchase and use my links, I receive a small fee at no extra cost to you. I do need a lot of coffee to write these articles! Thanks in advance!)

https://github.com/fnneves/flight_scraper/blob/master/FlightScraper%20python%20bot%20for%20kayak.ipynb

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）_
