---
layout: post
title: "Five Command Line Tools for Data Science"
tags: udacity translate python Data-Science 
author: Rebecca Vickery
from: https://towardsdatascience.com/five-command-line-tools-for-data-science-29f04e5b9c16
excerpt: "You can do more data science than you think from the terminal"
thumb: "/img/20190722/thumb.png"
---

<img src="/img/20190722/001.jpg">

> One of the most frustrating aspects of data science can be the constant switching between different tools whilst working. You can be editing some code in a Jupyter Notebook, having to install a new tool on the command line and maybe editing a function in an IDE all whilst working on the same task. Sometimes it is nice to find ways of doing more things in the same piece of software.

In the following post, I am going to list some of the best tools I have found for doing data science on the command line. It turns out there are many tasks that can be completed via simple terminal commands than I first thought and I wanted to share some of those here.

## cURL

This is a useful tool for obtaining data from any server via a variety of protocols including HTTP.

I’ll give a couple of example use cases for obtaining publically available data sets. The [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/index.php?source=post_page) is an excellent resource for obtaining datasets for machine learning projects. I am going to use a simple curl command to download a data set taken from the blood transfusion centre in Hsin-Chu City, Taiwan. If we simply run `curl [url]` which in our example will be:
 `curl https://archive.ics.uci.edu/ml/machine-learning-databases/blood-transfusion/transfusion.data` 
 this will print the data to the terminal.

Adding some additional arguments will download and save the data using a specified filename. The file will now be available in your current working directory.

```
curl -o data_dl.csv https://archive.ics.uci.edu/ml/machine-learning-databases/blood-transfusion/transfusion.data
```

Another common method of obtaining data for data science projects is via an API. This tool also supports both `GET` and `POST` requests for interacting with an API. Running the following command will obtain a single record from the [OpenWeatherMap API](https://openweathermap.org/api?source=post_page) and save as a JSON file named `weather.json` . For a more comprehensive tutorial on cURL see this excellent article by Zaiste.

```bash
curl -o weather.json -X GET \
'https://api.openweathermap.org/data/2.5/weather?lat=37.3565982&lon=-121.9689848&units=imperial&appid=fd4698c940c6d1da602a70ac34f0b147' \
-H 'Postman-Token: dcf3c17f-ef3f-4711-85e1-c2d928e1ea1a' \
-H 'cache-control: no-cache'
```

## csvkit

csvkit is a set of command line tools for working with CSV files. The tasks that it can execute can be divided into three areas: input, processing and output. Let’s look at a quick real-world example of how you can use this.
Firstly let’s install the tool using pip install.

```
pip install csvkit
```

For the purposes of this example, I am going to be using the same CSV file I created from the UCI Machine Learning Repository via a curl command above.

First, let’s use `csvclean` to make sure that our CSV file is in the correct format. This function will automatically fix common CSV errors and remove any bad rows. A useful aspect of this function is that it automatically outputs a new cleaned version of the CSV file so that the raw data is preserved. The new file always has the following naming convention `[filename]_out.csv`. If you would prefer for the original file to be overwritten you can add the optional -n argument.

```
csvclean data_dl.csv
```

In the example file I have, there are no errors but this can be a really useful way to reduce errors further down the line when working with CSV files.

Now let’s say we want to quickly inspect the file. We can use `csvcut` and csvgrep to do this.

Firstly let’s print out the column names.

```
csvcut -n data_dl_out.csv | cut -c6-
Recency (months)
Frequency (times)
Monetary (c.c. blood)
Time (months)
whether he/she donated blood in March 2007
```

Let’s now determine how many classes there are in the target column `whether he/she donated blood in March 2007`.

```
csvcut -c "whether he/she donated blood in March 2007" data_dl_out.csv | sed 1d | sort | uniq
0
1
```

The `csvgrep` function allows you to filter CSV files based on regular expression matching.

Let’s use this function to extract only the rows that match class 1.

```
csvgrep -c "whether he/she donated blood in March 2007" -m 1 data_dl_out.csv
```

You can also use `csvkit` to perform simple data analysis using the csvstat function.

Simply running `csvstat data_dl_out.csv` prints descriptive statistics for the entire file to the command line. You can also just request the result of only one statistic with an optional command.

```
csvstat --mean data_dl_out.csv
1. a: 373.5
2. Recency (months): 9.507
3. Frequency (times): 5.515
4. Monetary (c.c. blood): 1,378.676
5. Time (months): 34.282
6. whether he/she donated blood in March 2007: None
```

## IPython

IPython gives access to enhanced interactive python from the shell. In essence, it means you can do most of the things that you can do in a Jupyter Notebook from the command line.

You can follow these [steps](https://ipython.org/ipython-doc/3/install/install.html) to install it if you do not already have it available in your terminal.

To initiate IPython simply type `ipython` at the command line. You are now in the interactive shell. Here you can import python installed libraries and I find this tool most useful for doing some quick data analysis on the command line.

Let’s perform some basic tasks on the data set we have already been using. First I will import pandas, read in the file and inspect the first few rows of data.

```python
import pandas as pd
data = pd.read_csv('data_dl_out.csv')
data.head()
```

The file column names are quite long so next, I am going to use pandas to rename them, and then export the resulting dataframe to a new CSV file for later use.

```python
data = data.rename(columns={'Recency (months)': 'recency',
             'Frequency (times)': 'frequency',
             'Monetary (c.c. blood)': 'volumne',
             'Time (months)': 'time',
             'whether he/she donated blood in March 2007': 'target'})
data.to_csv('data_clean.csv')
```

As a final exercise let’s inspect the correlation between the features and the target variable using the pandas `corr()` function.

```python
corr_matrix = data.corr()
corr_matrix['target'].sort_values(ascending=False)
```

<img src="/img/20190722/002.png">

To exit IPython simply type `exit` .

## csvsql

At times you may also want to obtain a data set via a SQL query on a database. The tool csvsql, which is also part of the csvkit tool, supports querying, writing and creating tables directly on a database. It also supports SQL statements for querying a CSV file. Let’s run an example query on the cleaned dataset.

```
csvsql --query  "select frequency, count(*) as rows from data_clean where target = 1 group by frequency order by 2 desc" data_clean.csv
```

## SciKit-Learn Laboratory

Yes, you can perform machine learning at the command line! There are a few tools for this but SciKit-Learn Laboratory is probably one of the most accessible. Let’s build a model using our blood donations data set.

SciKit-Learn laboratory relies on the correct files being placed in consistently named directories. So to begin with we will make a directory named train and copy, move and rename the data file to `features.csv` .

```bash
mkdir train
cp data_clean.csv train/features.csv
```

Next, we need to create a config file named predict-donations.cfg and place it in our data directory.

```ini
[General]
experiment_name = Blood_Donations
task = cross_validate
[Input]
train_directory = train
featuresets = [["features.csv"]]
learners = ["RandomForestClassifier", "DecisionTreeClassifier", "SVC", "MultinomialNB"]
label_col = target
[Tuning]
grid_search = false
objective = accuracy
[Output]
log = output
results = output
predictions = output
```

Then we simply run this command `run_experiment -l predict-donations.cfg` .

This automatically runs the experiment and creates an output folder containing the results.

We can run a SQL query to summarise the results in the `Blood_Donations_summary.tsv` file.

```
cd output
< Blood_Donations_summary.tsv csvsql --query "SELECT learner_name, accuracy FROM stdin "\
> "WHERE fold = 'average' ORDER BY accuracy DESC" | csvlook
```

There are many other command line tools that can be useful for data science but I wanted to highlight here those that I had found useful in my work. For a really comprehensive view of data science at the command line, I found the book **Data Science at the Command Line** which is freely available online to be extremely useful.

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) ，有删改，编译：欧剃 转载请保留此信息）_