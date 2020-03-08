---
layout: post
title: "Amazon’s Data Scientist Interview Practice Problems"
tags: Udacity Translate Data-Science Machine-Learning Python
作者： Terence Shin
from: https://towardsdatascience.com/amazon-data-scientist-interview-practice-problems-15b9b86e86c6
excerpt: "A walkthrough of some of Amazon’s interview questions!"
thumb: "/img/20200309/thumb.jpg"
---

![图片来源：Unsplash，摄影 Christian Wiediger ]({{site.cdn}}/img/20200309/001.png)

作为顶尖科技巨头，亚马逊的数据科学岗位是许多业内新人的奋斗目标，而他们的面试题也往往指明了需要重点理解掌握的数据科学领域知识。今天，优达菌给你整理了八道数据科学面试真题，一起来看看吧！

## Q: If there are 8 marbles of equal weight and 1 marble that weighs a little bit more (for a total of 9 marbles), how many weighings are required to determine which marble is the heaviest?
## 问：现有 9 颗外表完全一样的弹球，已知其中一颗的重量略大，其他 8 颗重量都相等。试问你最少需要在天平上称几次，才能找出略重的那一颗？

![](002.png)

答：至少需要称两次，见上图：

1. 先将 9 颗弹球随机分为 3 组，每组 3 颗，并任选其中两组上天平，比较其重量。如果天平平衡（第一种情况），则可知较重的一颗在未称过的分组中；如果天平不平衡（第二种情况），则可知较重的一颗在较重的那一组中。
2. 对较重的这一组中的 3 颗弹球，重复第一步的操作，也就是每组只有 1 颗。如果天平平衡，则较重的球是未上称的第三颗；如果天平不平衡，则较重的一颗就找到了。

## Q: Difference between convex 凸 and non-convex cost function; what does it mean when a cost function is non-convex?
## 问：在代价函数中，凸函数和非凸函数有什么区别；代价函数为非凸函数时，说明了什么？

![](003.png)

答：

* A **convex function** is one where a line drawn between any two points on the graph lies on or above the graph. It has one minimum.
* 凸函数：在函数图象上取任意两点，如果连接这两点的线段总在函数图象在这两点之间的部分的上方，那么这个函数就是凸函数。
* A **non-convex function** is one where a line drawn between any two points on the graph may intersect other points on the graph. It characterized as “wavy”.
* 非凸函数：在函数图象上取任意两点，连接这两点的线段可能会与函数图像相交。函数图像往往看起来是“波动起伏的”。

When a cost function is non-convex, it means that there’s a likelihood that the function may find local minima instead of the global minimum, which is typically undesired in machine learning models from an optimization perspective.
当代价函数是非凸函数时，说明模型找到的最小值有可能是局部最小值，而不一定是全局最小值。从优化的角度来说，这对机器学习模型通常是不好的。

## Q: What is overfitting?
## 问：什么是过拟合？

![](004.png)

答：过拟合是指模型过于精确地“匹配”特定数据集，导致模型的方差大、偏差小的问题。这将导致过拟合的模型无法良好地拟合新的数据点——虽然它在现有的训练数据上非常精确。
Overfitting is an error where the model ‘fits’ the data too well, resulting in a model with high variance and low bias. As a consequence, an overfit model will inaccurately predict new data points even though it has a high accuracy on the training data.

## Q: How would the change of prime membership fee affect the market?
## 问：如果调整亚马逊 Prime 会员费，会对市场产生什么样的影响？

*注：这是一道开放性问题，没有 100% 准确的答案，下面是我个人的解答，仅供参考。*

Let’s take the instance where there’s an increase in the prime membership fee — there are two parties involved, the buyers and the sellers.

答：以 Prime 会员费上涨的情况为例，将有两类群体受到影响：买家和卖家。

For the buyers, the impact of an increase in a prime membership fee ultimately depends on the price elasticity of demand for the buyers. If the price elasticity is high, then a given increase in price will result in a large drop in demand and vice versa. Buyers that continue to purchase a membership fee are likely Amazon’s most loyal and active customers — they are also likely to place a higher emphasis on products with prime.

对买家来说，会员费上涨的影响将最终取决于买家在需求上的价格弹性。当价格弹性较高时，固定的会员费上涨比例将带来较大的需求减少；当价格弹性较低时，需求的减少就没那么多。继续购买 Prime 会员的买家将可能会是亚马逊最忠实、最活跃的客户——他们也可能对支持 Prime 会员的商品更加重视。

Sellers will take a hit, as there is now a higher cost of purchasing Amazon’s basket of products. That being said, some products will take a harder hit while others may not be impacted. It is likely that premium products that Amazon’s most loyal customers purchase would not be affected as much, like electronics.

卖家会受到一定的打击，因为在这种情况下，购买亚马逊 Prime 商品的开支更高了。也就是说，有的产品将会受到更严重的打击，而有的商品可能完全不受影响。亚马逊最忠实的客户购买的那些高端产品可能不会受到太大影响，比如电子产品等。

## Q: Describe Tree, SVM and Random forest. Talk about their advantage and disadvantages.
## 问：简述决策树、SVM 和“随机森林”的定义，并说出他们的优缺点。

答：

Decision Trees: a tree-like model used to model decisions based on one or more conditions.

**决策树**：一个树形的预测模型，使模型基于一个或多个状况，选择不同的决策。

* Pros: easy to implement, intuitive, handles missing values
* Cons: high variance, inaccurate

* 优点：容易实现，直观，能处理缺失值
* 缺点：偏差大，不准确

Support Vector Machines: a classification technique that finds a **hyperplane** or a boundary between the two classes of data that maximizes the margin between the two classes. There are many planes that can separate the two classes, but only one plane can maximize the margin or distance between the classes.

**SVM**：支持向量机（Support Vector Machine）是一种分类技术，它能在两类数据中找到一个区分度最好的**超平面**或是边界，以将两类数据区分开来。对于两类数据来说，可能有多个平面可以进行分类，但只有一个平面能最大化它们的区别。

* Pros: accurate in high dimensionality
* Cons: prone to over-fitting, does not directly provide probability estimates

* 优点：在高维度下很准确
* 缺点：有过拟合倾向，不能直接得出概率预测

Random Forests: an ensemble learning technique that builds off of decision trees. Random forests involve creating multiple decision trees using bootstrapped datasets of the original data and randomly selecting a subset of variables at each step of the decision tree. The model then selects the mode of all of the predictions of each decision tree.

**随机森林**：一个包含多个决策树的集成学习技术。随机森林算法使用原始数据集的一些样本数据训练许多不同的决策树，并在决策树的每一步中随机选择变量的子集。最后随机森林将选择所有决策树的预测结果中数量最多的结果。

* Pros: can achieve higher accuracy, handle missing values, feature scaling not required, can determine feature importance.
* Cons: black box, computationally intensive

* 优点：能得到更高的准确率，能处理缺失值，无需特征选择，能判断特征的重要程度
* 缺点：是个黑箱过程，计算密集度高

## Q: Why is dimension reduction important?
## 问：为什么降维操作很重要？

答：降维是减少数据集里特征数量的过程，它的重要性在于，你需要减少模型中变量的数量，以避免过度拟合。

Dimensionality reduction is the process of reducing the number of features in a dataset. This is important mainly in the case when you want to reduce variance in your model (overfitting).

Wikipedia states four advantages of dimensionality reduction (see here):

维基百科上列出了降维操作的四大优势（[全文](https://en.wikipedia.org/wiki/Dimensionality_reduction#Advantages_of_dimensionality_reduction)）：

1. It reduces the time and storage space required
2. Removal of multi-collinearity improves the interpretation of the parameters of the machine learning model
3. It becomes easier to visualize the data when reduced to very low dimensions such as 2D or 3D
4. It avoids the curse of dimensionality

1. 降维能减少算法所需的时间和存储空间。
2. 剔除多重共线性，使机器学习模型参数更容易被解释。
3. 降维到足够低维度后的数据（例如 2D 或 3D）更容易被可视化。
4. 避免了维数灾难现象。

## Q: The probability that item an item at location A is 0.6, and 0.8 at location B. What is the probability that item would be found on Amazon website?

## 问：列出一件商品的概率，在 A 处为 0.6，而 B 处为 0.8，则该物品在亚马逊网站上显示的概率是多少？


We need to make some assumptions about this question before we can answer it. **Let’s assume that there are two possible places to purchase a particular item on Amazon and the probability of finding it at location A is 0.6 and B is 0.8. The probability of finding the item on Amazon can be explained as so**:

答：假设在亚马逊网站上，有两个地方都能买到同一件商品，其中在 A 处能找到的概率为 0.6，而 B 处为 0.8。那么在整个网站上能找到这个商品的概率可以如下分析：

We can reword the above as P(A) = 0.6 and P(B) = 0.8. Furthermore, let’s assume that these are independent events, meaning that the probability of one event is not impacted by the other. We can then use the formula…

设找到物品的概率为 P，则 P(A) = 0.6，P(B) = 0.8，假设它们是相互独立的（也就是两个事件发生的概率彼此不影响），则有下列公式：

* P(A 或 B) = P(A) + P(B) — P(A 和 B 同时发生)
* P(A 或 B) = 0.6 + 0.8 - (0.6*0.8)
* P(A 或 B) = 0.92
  

## Q: What is boosting?
## 问：Boosting 是什么？

Boosting is an ensemble method to improve a model by reducing its bias and variance, ultimately converting weak learners to strong learners. The general idea is to train a weak learner and sequentially iterate and improve the model by learning from the previous learner. You can learn more about it here.

Boosting，即提升算法，是降低模型偏差和差异性以改善模型的集成算法。它本质上是对弱学习算法进行训练，通过向之前的算法学习，进行不断迭代并改进，最终将弱学习算法转变为强学习算法的过程。

## 结语

好了，上面就是今天要介绍的 8 道亚马逊数据科学面试题和对应的解答，希望能对你有所帮助！欢迎在下面留言发表你的感想！


> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) 翻译：欧剃 转载请保留此信息）_