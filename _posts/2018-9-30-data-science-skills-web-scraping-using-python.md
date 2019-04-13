---
layout: post
title: "数据科学必备技能：用 Python 爬取网页"
tags: udacity translate python Data-Science
from: https://towardsdatascience.com/data-science-skills-web-scraping-using-python-d1a85ef607ed
author: Kerry Parker
thumb: "/img/20180930/thumb.jpg"
star: true
excerpt: "网页爬取，就是用脚本将从网站上获取信息的过程自动化，不但能节省手动整理的时间，还能将所有数据整理在一个结构化的文件里，方便进一步分析查询。"
---
<img src="/img/20180930/001.jpg" alt="K Parker 博士的数据科学教程" />

我作为数据科学家的第一个任务，就是做网页爬取。那时候，我对使用代码从网站上获取数据这项技术完全一无所知，它偏偏又是最有逻辑性并且最容易获得的数据来源。在几次尝试之后，网页爬取对我来说就几乎是种本能行为了。如今，它更成为了我几乎每天都要用到的少数几个技术之一。

在今天的文章中，我将会用几个简单的例子，向大家展示如何爬取一个网站——比如从 [Fast Track](http://www.fasttrack.co.uk/) 上获取 2018 年 100 强企业的信息。用脚本将获取信息的过程自动化，不但能节省手动整理的时间，还能将所有企业数据整理在一个结构化的文件里，方便进一步分析查询。

<span class="hl">太长不看版</span>：如果你只是想要一个最基本的 Python 爬虫程序的示例代码，本文中所用到的全部代码都放在 [GitHub](https://github.com/kaparker/tutorials/blob/master/pythonscraper/websitescrapefasttrack.py) ，欢迎自取。

## 准备工作

每一次打算用 Python 搞点什么的时候，你问的第一个问题应该是：<span class="hl">“我需要用到什么库”</span>。

网页爬取方面，有好几个不同的库可以用，包括：
* Beautiful Soup
* Requests
* Scrapy
* Selenium

今天我们打算用 Beautiful Soup 库。你只需要用 `pip`（Python包管理工具）就能很方便地将它装到电脑上：

```python
pip install BeautifulSoup4
```

安装完毕之后，我们就可以开始啦！

## 检查网页

为了明确要抓取网页中的什么元素，你需要先检查一下网页的结构。

以 [Tech Track 100强企业](http://www.fasttrack.co.uk/league-tables/tech-track-100/league-table/) 这个页面为例，你在表格上点右键，选择“检查”。在弹出的“开发者工具”中，我们就能看到页面中的每个元素，以及其中包含的内容。

<img src="/img/20180930/002.png" alt="选择检查" /><br>

<img src="/img/20180930/003.png" alt="查看元素的内容" /><br><small>
右键点击你想要查看的网页元素，选择“检查”，就能看到具体的 HTML 元素内容</small>

既然数据都保存在表格里，那么只需要简单的几行代码就能直接获取到完整信息。如果你希望自己练习爬网页内容，这就是一个挺不错的范例。但请记住，实际情况往往不会这么简单。

这个例子里，所有的100个结果都包含在同一个页面中，还被 `<tr> ` 标签分隔成行。但实际抓取过程中，许多数据往往分布在多个不同的页面上，你需要调整每页显示的结果总数，或者遍历所有的页面，才能抓取到完整的数据。

在表格页面上，你可以看到一个包含了所有100条数据的表格，右键点击它，选择“检查”，你就能很容易地看到这个 HTML 表格的结构。包含内容的表格本体是在这样的标签里：

```html
<table class="tableSorter">
```

每一行都是在一个 `<tr> ` 标签里，也就是我们不需要太复杂的代码，只需要一个循环，就能读取到所有的表格数据，并保存到文件里。

> 附注：你还可以通过检查当前页面是否发送了 HTTP GET 请求，并获取这个请求的返回值，来获取显示在页面上的信息。因为 HTTP GET 请求经常能返回已经结构化的数据，比如 JSON 或者 XML 格式的数据，方便后续处理。你可以在开发者工具里点击 Network 分类（有必要的话可以仅查看其中的 XHR 标签的内容）。这时你可以刷新一下页面，于是所有在页面上载入的请求和返回的内容都会在 Network 中列出。此外，你还可以用某种 REST 客户端（比如[ Insomnia](https://insomnia.rest/)）来发起请求，并输出返回值。

<img src="/img/20180930/004.png" alt="刷新查看内容" /><br><small>
刷新页面后，Network 标签页的内容更新了</small>

## 用 Beautiful Soup 库处理网页的 HTML 内容

在熟悉了网页的结构，了解了需要抓取的内容之后，我们终于要拿起代码开工啦～

首先要做的是导入代码中需要用到的各种模块。上面我们已经提到过 `BeautifulSoup`，这个模块可以帮我们处理 HTML 结构。接下来要导入的模块还有 `urllib`，它负责连接到目标地址，并获取网页内容。最后，我们需要能把数据写入 CSV 文件，保存在本地硬盘上的功能，所以我们要导入 `csv` 库。当然这不是唯一的选择，如果你想要把数据保存成 json 文件，那相应的就需要导入 `json` 库。

```python
# 导入需要的模块
from bs4 import BeautifulSoup
import urllib.request
import csv
```

下一步我们需要准备好需要爬取的目标网址。正如上面讨论过的，这个网页上已经包含了所有我们需要的内容，所以我们只需要把完整的网址复制下来，赋值给变量就行了：

```python
# 把网址 URL 存在变量里
urlpage =  'http://www.fasttrack.co.uk/league-tables/tech-track-100/league-table/'
```

接下来，我们就可以用 `urllib` 连上这个URL，把内容保存在 `page` 变量里，然后用 BeautifulSoup 来处理页面，把处理结果存在 `soup` 变量里：

```python
# 获取网页内容，把 HTML 数据保存在 page 变量中
page = urllib.request.urlopen(urlpage)
# 用 Beautiful Soup 解析 html 数据，
# 并保存在 soup 变量里
soup = BeautifulSoup(page, 'html.parser')
```

这时候，你可以试着把 `soup` 变量打印出来，看看里面已经处理过的 html 数据长什么样：

```python
print(soup)
```

如果变量内容是空的，或者返回了什么错误信息，则说明可能没有正确获取到网页数据。你也许需要用一些错误捕获代码，配合 [urllib.error](https://docs.python.org/3/library/urllib.error.html) 模块，来发现可能存在的问题。

## 查找 HTML 元素

既然所有的内容都在表格里（`<table> ` 标签），我们可以在 `soup` 对象里搜索需要的表格，然后再用 `find_all` 方法，遍历表格中的每一行数据。

如果你试着打印出所有的行，那应该会有 101 行 —— 100 行内容，加上一行表头。

```python
# 在表格中查找数据
table = soup.find('table', attrs={'class': 'tableSorter'})
results = table.find_all('tr')
print('Number of results', len(results))
```

看看打印出来的内容，如果没问题的话，我们就可以用一个循环来获取所有数据啦。

如果你打印出 soup 对象的前 2 行，你可以看到，每一行的结构是这样的：

```html
<tr>
<th>Rank</th>
<th>Company</th>
<th class="">Location</th>
<th class="no-word-wrap">Year end</th>
<th class="" style="text-align:right;">Annual sales rise over 3 years</th>
<th class="" style="text-align:right;">Latest sales £000s</th>
<th class="" style="text-align:right;">Staff</th>
<th class="">Comment</th>
<!--                            <th>FYE</th>-->
</tr>
<tr>
<td>1</td>
<td><a href="http://www.fasttrack.co.uk/company_profile/wonderbly-3/"><span class="company-name">Wonderbly</span></a>Personalised children's books</td>
<td>East London</td>
<td>Apr-17</td>
<td style="text-align:right;">294.27%</td>
<td style="text-align:right;">*25,860</td>
<td style="text-align:right;">80</td>
<td>Has sold nearly 3m customisable children’s books in 200 countries</td>
<!--                                            <td>Apr-17</td>-->
</tr>
```

可以看到，表格中总共有 8 列，分别是 Rank（排名）、Company（公司）、Location（地址）、Year End（财年结束）、Annual Sales Rise（年度销售增长）、Latest Sales（本年度销售额）、Staff（员工数）和 Comments（备注）。

这些都是我们所需要的数据。

这样的结构在整个网页中都保持一致（不过在其他网站上可能就没这么简单了！），所以我们可以再次使用 `find_all` 方法，通过搜索 `<td>` 元素，逐行提取出数据，存储在变量中，方便之后写入 csv 或 json 文件。

## 循环遍历所有的元素并存储在变量中

在 Python 里，如果要处理大量数据，还需要写入文件，那列表对象是很有用的。我们可以先声明一个空列表，填入最初的表头（方便以后CSV文件使用），而之后的数据只需要调用列表对象的 `append` 方法即可。

```python
# 创建一个列表对象，并且把表头数据作为列表的第一个元素
rows = []
rows.append(['Rank', 'Company Name',
             'Webpage', 'Description',
             'Location', 'Year end',
             'Annual sales rise over 3 years', 'Sales £000s',
             'Staff', 'Comments']
             )
print(rows)
```

这样就将打印出我们刚刚加到列表对象 `rows` 中的第一行表头。

你可能会注意到，我输入的表头中比网页上的表格多写了几个列名，比如 `Webpage`（网页）和 `Description`（描述），请仔细看看上面打印出的 soup 变量数据——第二行第二列的数据里，可不只有公司名字，还有公司的网址和简单描述。所以我们需要这些额外的列来存储这些数据。

下一步，我们遍历所有100行数据，提取内容，并保存到列表中。

循环读取数据的方法：

```python
# 遍历所有数据
for result in results:
    # 找到每一个 td 单元格的内容
    data = result.find_all('td')
    # 如果该单元格无数据，则跳过
    if len(data) == 0: 
        continue
```

因为数据的第一行是 html 表格的表头，所以我们可以跳过不用读取它。因为表头用的是 `<th>` 标签，没有用 `<td>` 标签，所以我们只要简单地查询 `<td>` 标签内的数据，并且抛弃空值即可。

接着，我们将 data 的内容读取出来，赋值到变量中：

```python
    # 接上图，将单元格内容保存到变量中
    rank = data[0].getText()
    company = data[1].getText()
    location = data[2].getText()
    yearend = data[3].getText()
    salesrise = data[4].getText()
    sales = data[5].getText()
    staff = data[6].getText()
    comments = data[7].getText()
```

如上面的代码所示，我们按顺序将 8 个列里的内容，存储到 8 个变量中。当然，有些数据的内容还需有额外的清理，去除多余的字符，导出所需的数据。

## 数据清理

如果我们打印出 `company` 变量的内容，就能发现，它不但包含了公司名称，还包括和描述。如果我们打印出 `sales` 变量的内容，就能发现它还包括一些备注符号等需要清除的字符。

```python
    print('Company is', company)
    # Company is WonderblyPersonalised children's books          
    print('Sales', sales)
    # Sales *25,860
```

我们希望把 `company` 变量的内容分割成公司名称和描述两部分。这用几行代码就能搞定。再看看对应的 html 代码，你会发现这个单元格里还有一个 `<span>` 元素，这个元素里只有公司名称。另外，还有一个 `<a>` 链接元素，包含一个指向该公司详情页面的链接。我们一会也会用到它！

```html
<td>
    <a href="http://www.fasttrack.co.uk/company_profile/wonderbly-3/">
        <span class="company-name">Wonderbly</span>
    </a>
    Personalised children's books
</td>
```

为了区分公司名称和描述两个字段，我们再用 `find` 方法把 `<span>` 元素里的内容读取出来，然后删掉或替换 `company` 变量中的对应内容，这样变量里就只会留下描述了。

要删除 `sales` 变量中的多余字符，我们用一次 `strip` 方法即可。

```python
    # 提取公司名字    
    companyname = data[1].find('span', attrs={'class':'company-name'}).getText()    
    description = company.replace(companyname, '')
    
    # 删除多余的字符
    sales = sales.strip('*').strip('†').replace(',','')
```

最后我们要保存的是公司网站的链接。就像上面说的，第二列中有一个指向该公司详情页面的链接。每一个公司的详情页都有一个表格，大部分情况下，表格里都有一个公司网站的链接。

<img src="/img/20180930/005.png" alt="表格中的链接" /><br><small>
检查公司详情页里，表格中的链接</small>

为了抓取每个表格中的网址，并保存到变量里，我们需要执行以下几个步骤：

* 在最初的 fast track 网页上，找到需要访问的公司详情页的链接。
* 发起一个对公司详情页链接的请求
* 用 Beautifulsoup 处理一下获得的 html 数据
* 找到需要的链接元素

正如上面的截图那样，看过几个公司详情页之后，你就会发现，公司的网址基本上就在表格的最后一行。所以我们可以在表格的最后一行里找 `<a>` 元素。

```python
    # 获取链接，并发出访问请求
    url = data[1].find('a').get('href')
    page = urllib.request.urlopen(url)
    # 处理 HTML 数据
    soup = BeautifulSoup(page, 'html.parser')
    # 找到表格最后的一行，尝试获取 <a> 元素的内容
    try:
        tableRow = soup.find('table').find_all('tr')[-1]
        webpage = tableRow.find('a').get('href')
    except:
        webpage = None
```

同样，有可能出现最后一行没有链接的情况。所以我们增加了 `try... except` 语句，如果没有发现网址，则将变量设置成 `None`。当我们把所有需要的数据都存在变量中的以后（还在循环体内部），我们可以把所有变量整合成一个列表，再把这个列表 `append` 到上面我们初始化的 rows 对象的末尾。

```python
    # 接上图，将变量添加到 rows 对象里
    rows.append([rank, companyname,
                 webpage, description, 
                 location, yearend, 
                 salesrise, sales, 
                 staff, comments]
                 )
    # 注意这里退出了循环体

print(rows)
```

上面代码的最后，我们在结束循环体之后打印了一下 rows 的内容，这样你可以在把数据写入文件前，再检查一下。

## 写入外部文件

最后，我们把上面获取的数据写入外部文件，方便之后的分析处理。在 Python 里，我们只需要简单的几行代码，就可以把列表对象保存成文件。

```python
# 创建一个 csv 文件，并将 rows 对象写入这个文件中
with open('techtrack100.csv','w', newline='') as f_output:
    csv_output = csv.writer(f_output)
    csv_output.writerows(rows)
```

最后我们来运行一下这个 python 代码，如果一切顺利，你就会发现一个包含了 100 行数据的 csv 文件出现在了目录中，你可以很容易地用 python 读取和处理它。

## 总结

这篇简单的 Python 教程中，我们一共采取了下面几个步骤，来爬取网页内容：

* 连接并获取一个网页的内容
* 用 BeautifulSoup 处理获得的 html 数据
* 在 soup 对象里循环搜索需要的 html 元素
* 进行简单的数据清理
* 把数据写入 csv 文件中

如果有什么没说清楚的，欢迎大家在下面留言，我会尽可能给大家解答的！

附： [本文全部代码](https://github.com/kaparker/tutorials/blob/master/pythonscraper/websitescrapefasttrack.py) 

祝你的爬虫之旅有一个美好的开始！

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」并发表。 原作： [{{ page.author }}]({{ page.from }}) 译者：欧剃 转载请保留此信息）_





