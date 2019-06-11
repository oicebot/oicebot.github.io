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
source: videoblocks.com</small>

## Simply put

The goal of this project is to build a web scraper that will run and perform searches on flight prices with flexible dates (up to 3 days before and after the dates you select first), for a particular destination. It saves an excel with the results and sends an email with the quick stats. Obviously, the objective is to help us find the best deals!

If you get lost in some part, try to have a look at my article about the Instagram bot, as it uses Selenium too.

> The real life application for this is up to you. I’ve used it to search both holidays and recently also some short trips to my hometown!

If you’re serious about it, you can run the script on a server (a simple Raspberry Pi will do), and make it start once or twice each day. The results will be mailed to you, and I suggest saving the excel file to a Dropbox folder, so you can access it from anywhere, anytime.

<img src="/img/20190616/002.png" /><br><small>
I did not find any error fare yet, but I suppose it’s possible!</small>


It searches through “flexible dates” so it will look for flights up to 3 days before and after the dates you select first. Although the script works for one pair of destinations at a time, you can easily adapt it to run several inside each loop. You might even end up finding some error fares… which would be awesome!

## Yet another scraper
When I first started to do some web scraping I was not particularly interested in the topic. There… I said it! I wanted to do more projects with predictive modeling, financial analysis and maybe some sentiment analysis, but it turns out that it was a lot of fun figuring out how to build the first web crawler. As I keep learning, I realized web scraping is what makes the internet “work”.

<img src="/img/20190616/003.jpeg" /><br><small>
Yep… Just like Larry and Sergey, you can hit the jacuzzi after you initiate the scraper! (image: wired.com)</small>

You might think it’s a really bold claim, but what if I told you that Google started out with a web scraper Larry Page built with Java and Python? It crawled, and still does, the whole internet trying to provide you the best possible answer for your questions. There are endless applications for web scraping, and even if you prefer other subjects in Data Science, you’ll still need some scraping skills to get your data.

> Some of the techniques I use here come from an awesome book I recently bought that covers everything related with [web scraping](https://amzn.to/2K0mQGB). Plenty of simple examples and lots of practical applications. There’s even a very interesting chapter about solving reCaptcha checks which blew my mind — I was not aware of the existing tools and even services to deal with it! (Disclaimer: if you purchase the book through my link, I receive a small fee at no extra cost to you. So if you feel like buying me a coffee by the end of this article, I appreciate it!)

## “Do you like traveling?!”
This simple and innocuous question often meets a positive answer and a subsequent story or two about a previous adventure. Most of us would agree that traveling is a great way to experience new cultures and broaden our own perspectives. But if the question was “Do you like the process of searching for plane tickets?”, I’m sure the reaction would be a lot less enthusiastic…

* Python to the rescue. *


The first challenge was to choose which platform to scrape the information from. It was not easy, but I settled with *Kayak*. I tried Momondo, Skyscanner, Expedia and a few more, but the reCaptchas on those websites were ruthless. After a few attempts selecting traffic lights, crosswalks and bicycles in those “are you human” checks, I concluded Kayak was my best alternative even though it throws out a security check if you load too many pages in a short period of time. I managed to keep the bot querying the website in *4 to 6 hour intervals* and it was ok. There may be an occasional hiccup here and there, but if you start getting reCaptcha checks, either solve them manually and start the bot after that, or wait a few hours and it should reset. Feel free to adapt the code to another platform, and you’re welcome to share it in the comments section!

If you’re new to web scraping or if you don’t know why some websites go a long way to prevent it, please do yourself a big favor before writing your first line of code towards a scraper. Google “web scraping etiquette”. Your endeavour might be over much sooner than you think if you just start scraping like a madman.

## Fasten your seatbelts…
Pun intended

After importing and opening a chrome tab, we’ll define some functions that will be used inside a loop. The idea of the structure is more or less like this:

* a function will start the bot, declaring the cities and dates we want to search
* this function gets the first search results, sorted by “best” flights, and clicks the “load more results”
* another function will scrape the whole page, and return a dataframe
* it will repeat step 2 and 3 for the “cheap” and “fastest” sort types
* an email will be sent to you with a brief summary of the prices (cheapest and average), and the dataframe with the three sort types will be saved as an excel file
* all the previous steps are repeated in a loop, that runs every X hours.

* * * 

Well, every Selenium project starts with a webdriver. I’m using Chromedriver, but there are other alternatives. PhantomJS or Firefox are also popular. After downloading it, place it in a folder and that’s it. These first lines will open a blank Chrome tab.

Please bear in mind I’m not breaking new ground here. There are way more advanced ways of finding cheap deals, but I want my posts to share something simple yet practical!

These are the packages I will use for the whole project. I’ll use randint to make the bot sleep a random number of seconds between each search. That is usually a must have feature for any bot. If you ran the previous code, you should have a Chrome window open, which is where the bot will navigate.

So let’s make a quick test and go to kayak.com on a different window. Select the cities you want to fly from and to, and the dates. When selecting the dates, make sure you *select “+-3 days”*. I have written the code with that results page in mind, so there is a high chance you need to make a few adjustments if you want to search specific dates only. I’ll try to point the changes throughout the text, but if you get stuck shoot me a message in the comments.

Hit the search button and get the link in the address bar. It should look something like the link I use below, where I define the variable kayak as the url and execute the get method from the webdriver. Your search results should appear.

<img src="/img/20190616/003.png" />

Whenever I used the get command more than two or three times in a few minutes, I would be presented with a reCaptcha check. You can actually solve the reCaptcha yourself, and keep doing the tests you want before the next one comes up. From my testing, it seems to be fine for the first search all the times, so it’s really a matter of solving the puzzle yourself if you want to play with the code, and leave the code running by itself with long intervals between them. You really don’t need 10 minute updates on those prices, do you?!

## Every XPath has its puddle
So far we’ve opened a window and got a website. In order to start getting prices and other information, we have to use XPath or CSS selectors. I’ve chosen XPath and didn’t feel the need to mix it up with CSS, but it is perfectly possible to do so. Navigating the webpages with XPath can be confusing, and even if you use the methods I described in the Instagram article, where I use the “copy XPath” trick directly from the inspector view, I realized it’s really not the optimal way to get to the elements you want. Sometimes that link is so specific, that it quickly turns obsolete. The book Web Scraping with Python does a phenomenal job explaining the basics of navigating with XPath and CSS selectors.

<img src="/img/20190616/004.png" />

Moving on, let’s use Python to select the **cheapest** results. The red text in the code above is the XPath selector, and it can be seen if you right click the webpage anywhere and select *“inspect”*. Click again with the right click where you want to see the code, and inspect again.

<img src="/img/20190616/005.png" />

To illustrate my previous observation on the shortcomings of copying the path from the inspector, consider these differences:

1. This is what the copy method would return. Right click highlighted rows on the right side and select "copy > Copy XPath"
```
//*[@id="wtKI-price_aTab"]/div[1]/div/div/div[1]/div/span/span
```
2. This is what I used to define the "Cheapest" button

```
cheap_results = ‘//a[@data-code = “price”]’
```

It’s clearly visible the simplicity of the second option. It searches for an element a which has an attribute data-code equal to price. The first alternative looks for an element with an id equal to wtKI-price_aTab and follows the first div element, four more divs, and two spans. It will work… this time. I can tell you right now that the id element will change next time you load the page. The letters wtKI change dynamically every time a page loads, so your code would be useless as soon as the page reloads. **Invest a little time reading about XPath and I promise it will pay off**.

<img src="/img/20190616/006.png" />

* Nevertheless, using the copy method will work on less “sophisticated” websites, and that’s fine too! *

Building on what I displayed above, what if we wanted to get all the search results in several strings, inside a list? Simple. Each result is inside an object with the class “resultWrapper”. Fetching all the results can be achieved with a for loop like the next. **If you understand this part, you should be able to understand most of the code that will follow.** It’s basically pointing to what you want (the results wrapper), using some kind of way (XPath) to get the text there, and placing it in a readable object (first with the `flight_containers` and then with the `flights_list`).

<img src="/img/20190616/007.png" />

The first 3 rows are displayed and we can clearly see everything we need, but we have better alternatives to get the information. We need to scrape each element individually.

## Clear for take-off!
The easiest function to code is to load more results, so let’s start with that. I want to maximize the amount of flights I get, without triggering the security check, so I will click once in the “load more results” button every time a page is displayed. The only thing new is the try statement, which I added because sometimes the button was not loading properly. If it acts up with you too, simply comment it out in the `start_kayak` function that I will show ahead.

And now, after a long intro (I can get carried away at times!) we’re ready to define the function that will actually scrape the pages.

I already compiled most of the elements in the next function called `page_scrape`. Sometimes, the elements returned lists interpolating first and second legs information. I used a simple method to split them, for instance in the first `section_a_list` and `section_b_list` variables. The function also returns a dataframe `flights_df`, so we can separate the results we get in the different sorts and merge them later.

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

<img src="/img/20190616/008.png" />

If you want to learn more about Web Scraping, I strongly recommend the book [Web Scraping with Python](https://amzn.to/2YzJIR4). I really liked the examples and the clear explanation of how the code is working. And if you prefer social media scraping, there’s also an excellent book exclusively on the subject. I’m using the latter for my next article using the Twitter API, but there is stuff there to scrape even LinkedIn! (If you decide to purchase and use my links, I receive a small fee at no extra cost to you. I do need a lot of coffee to write these articles! Thanks in advance!)



> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）_
