---
layout: post
title: "I was looking for a house, so I built a web scraper in Python!"
tags: udacity translate python
author: Fábio Neves
from: https://towardsdatascience.com/looking-for-a-house-build-a-web-scraper-to-help-you-5ab25badc83e
excerpt: "要找"
thumb: "/img/20190306/thumb.jpg"
---
<img src="/img/20190306/001.jpg" />
image: trillionairesclub.net


In a few months I’ll have to leave my rented apartment and look for a new one. As painful as this experience can be, especially as a real estate bubble looms in the horizon, I decided to use it as yet another incentive to improve my Python skills! In the end I want to be able to do two things:

* Scrape all the search results from one of the main real estate websites in Portugal (where I live) and build a database

* Use the database to perform some EDA, and ultimately try to find undervalued properties

The website I will be scraping is the real estate portal from Sapo, one of the oldest and most visited websites in Portugal. Chance are you are using a different website, but you should be able to adapt the code very easily.

Before we begin with the code snippets, let me just give you a summary of what I will be doing. I will use the results page from a simple search in Sapo website where I can specify some parameters beforehand (like zone, price filters, number of rooms, etc) to reduce the task time, or simply query the whole list of results in Lisbon.

We then need to use a command to reach ask a response from the website. The result will be some html code, which we will then use to get the elements we want for our final table. After deciding what to take from each search result property, we need a for loop to open each of the search pages and perform the scraping.

## That sounds pretty easy, where do I start?

Like most projects, we need to import the modules to be used. I will use Beautiful Soup to take care of the html’s we will be fetching. Always make sure the site you are trying to access allows scraping. You can easily do that if you add “/robots.txt” to the original domain. Inside this file you can see if there are guidelines regarding what is allowed to scrape.

```python
from bs4 import BeautifulSoup
from requests import get
import pandas as pd
import itertools
import matplotlib.pyplot as plt
import seaborn as sns
sns.set()
```

Some websites automatically block any kind of scraping, and that’s why I’ll define a header to pass along the get command, which will basically make our queries to the website look like they are coming from an actual browser. When we run the program, I’ll have a sleep command between pages, so we can mimic a “more human” behavior and don’t overload the site with several requests per second. You will get blocked if you scrape too aggressively, so it’s a nice policy to be polite while scraping.

```python
headers = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'})
```

Then we define the base url to be used when querying the website. For this purpose I will just limit my search to Lisbon and sort by creation date. The address bar quickly updates and gives me the parameters sa=11 for Lisbon, and or=10 for the sorting, which I will use in the sapo variable.

```python
sapo = "https://casa.sapo.pt/Venda/Apartamentos/?sa=11&or=10"
response = get(sapo, headers=headers)
```

<img src="/img/20190306/002.jpg" />
casa.sapo.pt

And now we can test if we can communicate with the website. You can get several codes from this command, but if you get “200” it’s usually a sign that you’re good to go. You can see a list of these codes here.

We can print the response and the first 1000 characters of the text.

<img src="/img/20190306/003.jpg" />
don’t be scared just yet… it will all make sense in a while!

Alright, we’re all set to start exploring whatever we get from the website. We need to define the Beautiful Soup object that will help us read this html. That’s what BS does: it picks the text from the response and parses the information in a way that makes it easier for you to navigate in its structure and get its contents.

## Time to make some Soup!

```python
html_soup = BeautifulSoup(response.text, 'html.parser')
```

A big part of building a web scraping tool is navigating through the source code of the web pages we’re scraping from. The chunk of text above is just a part of the whole page. You can check it out in your browser, if you right click the page and select View Source Code (I know Chrome has this option, I believe most of the modern browsers have this feature). You can also find out the position in the html document, of a particular object like the price of the properties. Right click it and select inspect.

<img src="/img/20190306/004.jpg" />
the price is inside a `<span>` tag but there are other tags before it

If you have no clue about html code, don’t worry. It is useful to know some basics but not essential! In a very simplistic way, all you have to understand is that every web page in the world is built this way and it’s a language built on blocks. Each block has it’s own tags to inform the browsers how to read them. That’s the only way the browser can show you a table as a proper table, or a paragraph of text inside a specific container and an image in the other. If you think of html code as a waterfall of tags that you must decipher in order to get the value you need you should be fine!

Before extracting the price, we want to be able to identify each result in the page. In order to know what tags we need to call, we can follow them from the price tag to the top until we reach something that looks like the main container for each result. We can see it below:

<img src="/img/20190306/005.jpg" />
from the price down at the bottom to the `<div>` identifier that contains each result and has class searchResultProperty

```python
house_containers = html_soup.find_all('div', class_="searchResultProperty")
```

We now have an object that can be iterated while we scrape the results in each search page. Let’s try and get the price we saw before. I’ll define the variable first which will be the structure of our first house (picked up from the `house_containers` variable).

```python
first = house_containers[0]
first.find_all('span')
```

<img src="/img/20190306/006.jpg" />
the price is in the 3rd `<span>` tag, which means position 2 in the index

So the price is quite easily obtainable, but there are some special characters along the text. A simple way to take care of it is to simply replace the special character with nothing. I’ll break it down below, as I transform the string into an integer.

<img src="/img/20190306/007.jpg" />

In this last step, itertools helped me retrieve only the digits from the second step. We just scraped our first price! The other fields we want to get are: Title, Size, Date posted, location, condition status, short description, link for the property and link to a thumbnail.

I’ll give some examples below before we build the amazing for loop that will get us every result from every page.

<img src="/img/20190306/008.jpg" />

These examples should be enough for you to do your own research. I learned a lot just by messing around with the html structure and manipulating the values that were being returned until I got what I wanted.

Try to replicate the code above backwards (remove the `[xx:xx]` and the `[0]` parts) and inspect the results and how I got the final code. I’m sure there are more than a dozen more ways I could have come up with the same results, but I also didn’t want to over complicate it.

<img src="/img/20190306/009.jpg" />

These two last fields are totally optional, but I wanted to keep a link to the property and a link to an image because I’m considering building an alert system or tracker for specific properties. Perhaps a project for a new article, so I’ll leave it here for the sake of examples diversity.

### Enough with tags, let’s scrape some pages already!

Once your’re comfortable with the fields to extract and you found a way to extract them all from each result container, it’s time to setup the base of our crawler. The following lists will be created to handle our data and later be used to put together the dataframe.

```python
# setting up the lists that will form our dataframe with all the results
titles = []
created = []
prices = []
areas = []
zone = []
condition = []
descriptions = []
urls = []
thumbnails = []
```

From a quick check on the original web page, I see there are 871 pages of results. We can give it a little more room and set the loop for 900 iterations. We’ll add something to break the loop if it finds a page without any house container. The page command is the `&pn=x` in the end of the address, where x is the results page number.

The code is made up with two for loops, which navigate through every house in the page, for every page possible.

If you follow along, you can notice we’re simply collecting the data we already explored above as we cycle through results. The `price` field turned out more complicated as there were cases containing both Sell and Rent prices separated by a “/”. In some results, the index 2 returned “Contacte Anunciante” so I had to update the code with an if statement to look for the price in the next index position.

```python
%%time

n_pages = 0

for page in range(0,900):
    n_pages += 1
    sapo_url = 'https://casa.sapo.pt/Venda/Apartamentos/?sa=11&lp=10000&or=10'+'&pn='+str(page)
    r = get(sapo_url, headers=headers)
    page_html = BeautifulSoup(r.text, 'html.parser')
    house_containers = page_html.find_all('div', class_="searchResultProperty")
    if house_containers != []:
        for container in house_containers:
            
            # Price            
            price = container.find_all('span')[2].text
            if price == 'Contacte Anunciante':
                price = container.find_all('span')[3].text
                if price.find('/') != -1:
                    price = price[0:price.find('/')-1]
            if price.find('/') != -1:
                price = price[0:price.find('/')-1]
            
            price_ = [int(price[s]) for s in range(0,len(price)) if price[s].isdigit()]
            price = ''
            for x in price_:
                price = price+str(x)
            prices.append(int(price))

            # Zone
            location = container.find_all('p', class_="searchPropertyLocation")[0].text
            location = location[7:location.find(',')]
            zone.append(location)

            # Title
            name = container.find_all('span')[0].text
            titles.append(name)

            # Status
            status = container.find_all('p')[5].text
            condition.append(status)

            # Area
            m2 = container.find_all('p')[9].text
            if m2 != '-':
                m2 = m2.replace('\xa0','')
                m2 = float("".join(itertools.takewhile(str.isdigit, m2)))
                areas.append(m2)
                
            else:
                m2 = container.find_all('p')[7].text
                if m2 != '-':
                    m2 = m2.replace('\xa0','')
                    m2 = float("".join(itertools.takewhile(str.isdigit, m2)))
                    areas.append(m2)
                else:
                    areas.append(m2)

            # Creation date
            date = pd.to_datetime(container.find_all('div', class_="searchPropertyDate")[0].text[21:31])
            created.append(date)

            # Description
            desc = container.find_all('p', class_="searchPropertyDescription")[0].text[7:-6]
            descriptions.append(desc)

            # url
            link = 'https://casa.sapo.pt/' + container.find_all('a')[0].get('href')[1:-6]
            urls.append(link)

            # image
            img = str(container.find_all('img')[0])
            img = img[img.find('data-original_2x=')+18:img.find('id=')-2]
            thumbnails.append(img)
    else:
        break
    
    sleep(randint(1,2))
    
print('You scraped {} pages containing {} properties.'.format(n_pages, len(titles)))
```
filename: sapo1.py 
GitHub Gist: https://gist.github.com/fnneves/761cfcbf0d94ae99085b8f62c8901468#file-sapo1-py 

I’ve added the sleep command in the end, to make it wait between 1 or 2 seconds between pages.

`You scraped 871 pages containing 23442 properties.`

Remember, you don’t need to scrape the whole 871 pages. You can change the variable `sapo_url` in the loop to include certain filters. Simply do the filters you want in the browser and search. The address bar will refresh and show you the new url with the filters. In the loop I posted above, I actually limited the results to prices higher than 10.000 euros (`&lp=10000`).

## One final transformation

We should now save all this variables in a single dataframe so we can save it as a csv or excel file and access it later without having to repeat the process above.

I’ll define the names for the columns, and merge everything together in a single dataframe. I add the `[cols]` in the end so the columns get out in that order.


Later we can use that last commented line to read the data. For now, since I don’t want to make this article too big, I’ll leave the exploratory analysis for a later article. We scraped more than 20k properties and now have an original dataset! There’s still some cleaning and pre processing to do, but we already aced the complicated part.


Thanks for reading! If you liked this article, I invite you to check my other stories. I’m mainly interested in Data Science, Python, Blockchain and digital currencies, technology, and a few other things like photography! If you’d like to get in touch, you can contact me here or simply reply to the article below.

_（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）_