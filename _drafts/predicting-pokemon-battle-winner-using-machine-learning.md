---
layout: post
title: "Predicting Pokemon Battle Winner using Machine Learning"
tags: udacity translate Machine-Learning
author: Saurabh Charde
from: https://medium.com/ai-enigma/predicting-pokemon-battle-winner-using-machine-learning-d1ed055ac50
excerpt: ""
thumb: "/img/20190520/thumb.jpg"
---
<img src="/img/20190520/001.jpeg" /><br><small>
Image Source : The Verge</small>

In this article we are going to use Machine Learning to predict the winner of a Pokemon battle. This is going to be exciting because we are going to predict the results of the battles we have never seen before. If you want to follow along then the links to the Jupyter notebook containing code is linked here. Finally feel free to show it to your friends and become a Pokemon wizard by predicting Pokemon battle results like a pro!

https://github.com/saurabhcharde/Pokemon_Battle_Winner_Prediction_using_ML


## Introduction

We are all familiar with the popular Pokemon series that made an amazing part of our childhood. Recently the Pokemon Go game brought back the same craze for Pokemon within us. Now the problem in our hand is that given some features about each Pokemon such as its attack, defense or its speed value,etc we need to predict the winner of a random Pokemon battle which has never occurred before. Sounds Interesting!!

But before beginning lets get familiar with the background.

## Machine Learning

The difficulty in predicting the winners lies in fact that, we only know about a handful of Pokemon but in fact there are currently around 800 species of Pokemon present in the Pokemon world. That’s a lot of Pokemon. Now in order to predict the winner of a battle we need to study about all those 800 Pokemon, watch their moves, their special attacks, their matches, etc. In short there is a lot of things (data) to take in account and hence will require us days to acquire sufficient knowledge to correctly predict the winners of a battle. (Convinced?)

This is where Machine Learning becomes useful. When you have a lot of data and you need to make some prediction (Predicting today's weather, Predicting disease based on symptoms,etc.) from it we use Machine Learning (Pretty simple!).

## A Look at the Dataset

<img src="/img/20190520/002.png" /><br><small>
First 5 rows of the dataset</small>

A dataset is the collection of large amount of data on a specific topic(here Pokemon). This dataset provides us with information like the Hit Points, attack, Special Defense and weather the Pokemon is legendary(1) or not(0). The figure shows the data of the first 5 Pokemon , but there are a total of 800 Pokemon (means 800 rows) in the dataset.

Now having seen the dataset, get ready to apply some Machine Learning on it.

## How to apply Machine Learning
Building a complete ML model involves 3 steps:

1. Build the classifier

2. Train the classifier

3. Test the classifier

## Build the Classifier
_Note: A classifier is used to classify or separate the data into classes. For eg. Given an image classify it as a Dog or a Cat._

In order to learn from data we need to use some ML models(classifiers) which generally are algorithms which find patterns in the given data to help them in making predictions(Confusing? just keep reading).

For this task we will be using a Random Forest Classifier which is a better implementation of a Decision Tree Classifier.

## Knowing about them

### Decision Trees

<img src="/img/20190520/003.png" /><br><small>
A simple Decision Tree for classifying an animal</small>

Suppose we have a task of predicting the animal based on the features like type , height ,weight, or speed of the animal. This task can be easily modeled using a decision tree as shown in fig. So at each point of the decision tree we ask a question and depending on the answer we further divide the tree into sub trees. This process is repeated until we predict an animal. So given a dataset, a Decision Tree Classifier will ask the right questions(increasing the Information Gain) at each point so as to divide the tree in a way to increase confidence for each prediction (increasing purity of result).

> Time Complexity = O(depth)

## Random Forests

<img src="/img/20190520/004.png" /><br><small>
A simple Random Forest visualization</small>

As forests are collection of trees, hence Random Forest Classifier uses multiple Decision Trees and finally combines the results from each decision tree to predict its final result. We can think of it as combining the things learnt by multiple trees into a single one. This method is found to give better results than using a single Decision tree.

```python
# Forest with 100 decision trees
clf = RandomForestClassifier(n_estimators=100)
```

Finally we build a random forest classifier as follows. The `n_estimators` gives the Number of decision trees(here 100) used to make the forest.

## Train the classifier

Reiterating the task, two Pokemon with their set of features(speed,attack,etc) which one is going to win.

```python
model = clf.fit(x_train, y_train)
pred = model.predict(x_test)
print('Accuracy of ', accuracy_score(pred, y_test)*100)
# Accuracy of  95.008
```

Training & Predicting accuracy of classifier

We train(or fit) the classifier on the dataset of Pokemon(i.e `x_train`) and minimize the loss between the predicted and the actual values(`y_train`) on the training set. Training here means finding the relations between different features in dataset to make predictions.

We then calculate the accuracy of our classifier which is found to be 95% (means say our classifier will predict right results for 95 matches out of 100) which is a pretty good accuracy to start with.

By now, we have completed all the required steps from building a classifier to training it and now we are ready to test it on some real stuff.

## Test the Classifier
At last the time has came .Lets just give some random Pokemon matches to the classifier and let it predict for us who is going to win. We have stored all these random matches in another dataset called the test_data.

It looks like this:

<img src="/img/20190520/005.png" /><br><small>
Test dataset with sample matches</small>

The two columns correspond to the Pokemon that are going to compete. We are feeding these two Pokemon into the classifier and it will return the most likely winner for that battle. Remember the classifier is not just randomly predicting the winner. In fact it is analyzing several parameters carefully to reach at the right decision.(That’s the power of ML)

So ready to see the winners.

Now who do you think should win among **Onix** and **Pidgey**?

<img src="/img/20190520/006.png" /><br><small>
Image Source : Google Images</small>

Let’s use our Machine Learning Model to predict it for us.

<img src="/img/20190520/007.png" />

That was quite obvious. Now lets give it some tricky ones.

**Mr. Mime** vs **Psyduck** what do you think?

<img src="/img/20190520/008.png" /><br><small>
Image Source : Google Images</small>

As a matter of fact these matches has never occured in the pokemon series before, and we are predicting there results(Feels good!).

So who is going to win ?

<img src="/img/20190520/009.png" />

If you carefully study it , then Mr. Mime has a better chance of winning it.

## Last words
We have seen a pretty basic problem which can be solved using ML. The concepts covered in this article forms the basis of most ML approaches. I have tried to explain the concepts in the most simplest way so that everyone can get a fair understanding of how ML works and can be used in real world.

Finally I would like to hear your suggestions on this article so that I can bring more quality content in future.

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 编译：欧剃 转载请保留此信息）_

