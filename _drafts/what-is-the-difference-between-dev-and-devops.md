---
layout: post
title: "What is the difference between Dev and DevOps?"
tags: udacity translate 
author: Gabriel Ruttner 
from: https://blog.udacity.com/2019/07/what-is-the-difference-between-dev-and-devops.html
excerpt: " "
thumb: "/img/20190814/thumb.jpg"
---

Traditionally, software development teams are split into two dedicated functions — Software Engineers and Operations/Information Technology (Ops/IT) Specialists. Software engineers were responsible for writing code to solve a customer problem. Once the code was ready, an Ops/IT professional would deploy it to production servers and monitor it to ensure everything was running smoothly. It’s easy to forget that there used to be physical networking equipment and servers for every project not so long ago. At the time, software groups were not equipped to handle the technical challenges of working with these physical devices.

传统上，软件开发团队被分为两个不同的职责：软件工程师和IT运维专员。在过去的认知里，软件工程师负责写代码，以解决客户的问题；当代码准备好之后，IT运维工程师负责将代码部署到生产服务器，并对其进行监控，确保一切都能顺利运行。但我们可能容易忘记，在不久之前，每个项目都有它专用的物理服务器和网络设备——在那个时候，软件开发小组没有能力应对使用这些物理设备带来的技术挑战。

These roles are now blurring with the adoption of cloud computing services, giving birth to a new discipline known as Developer Operations Engineering or DevOps. Using software as their main tool, DevOps engineers work on internal development problems. Similar to how a software engineer optimizes an algorithm, a DevOps engineer’s goal is to optimize the software engineering process. In other words, dedicated developers use software to solve customer problems and DevOps engineers use software to solve their team’s software engineering problems. Since the tools used by DevOps are usually code-based, it’s becoming a critical skill for any software developer.

随着云计算服务的不断普及，这些角色划分变得越来越模糊，从而诞生了被称为 DevOps 的新角色——所谓 Developer Operations Engineering，开发运维工程师。DevOps 工程师用软件为主要工具，解决各种内部开发问题。就像传统的软件工程师优化算法一样，DevOps 工程师的目标是优化整个软件工程的流程。换句话说，专门的开发者使用软件来解决客户的业务问题，DevOps 工程师使用软件来解决团队的软件工程问题。由于 DevOps 使用的工具通常是基于代码的，这也就成为了每一个软件开发者的关键技能。

<img src="/img/20190820/001.png" />

## Operations as development
## 开发即运维

When defining a new software system, engineers must decide what platform they’ll use to deploy. Different applications require different resources. For example, an image processing application might require specialized equipment like a graphics processing unit (GPU). These decisions have historically been made by system administrators and set up by hand. More recently, DevOps engineers have been responsible for these decisions and written template files that define the architecture. Rules can be written to scale system capabilities to address how systems should react to high volumes of user requests. Writing these files makes the system clearly defined, extensible, and reproducible. Multiple programming languages like Python, Bash, webpack, and gulp are used by DevOps teams to achieve these goals.

在着手构建一个新的软件系统时，工程师们必须决定他们将使用什么平台来部署这些代码。不同的应用程序需要不同的资源。举个栗子，要做个图形处理应用可能会需要一些专业设备，比如图形处理器（GPU）。在过去，这些都是由系统管理员来决定，并手动配置实施的。如今，DevOps 工程师负责制定这些决策，并撰写模板文件来定义项目的架构。写下的这些规则将决定系统的性能，并确定系统应当如何应对大量的用户请求。编写这些文件使得系统定义明确，具备良好的可扩展性和可重现性。DevOps 团队将会使用多种不同的编程语言，例如 Python、Bash、webpack 和 gulp 等，来实现这些目标。

In the Cloud Developer Nanodegree program, we cover a variety of technologies from databases and filestores to various computation platforms like Docker, AWS EC2, and AWS Lambda (Serverless). An understanding of these platforms is a requirement for becoming a DevOps engineer and we believe these skills are fundamental to developing on the cloud.

在云计算软件开发/DevOps纳米学位中，我们的课程涵盖了从数据库、文件存储到各种不同的计算平台（例如 Docker，AWS EC2 以及无服务器的 AWS Lambda）等各种技术。我们认为，这些技能是晕计算软件开发的基础，了解这些平台也是成为一名合格 DevOps 工程师的必要条件。

## More development and fewer operations
## 强化开发力量，减少运维成本

DevOps engineers are usually obsessed with automating the medial tasks that slow down software development. One frequent automation is a code deployment pipeline. Known as continuous integration/continuous deployment (CI/CD), these pipelines monitor version control system changes. The system checks the changes for accuracy using automated testing called “unit tests.” These tests are run in a dedicated test environment where the broken code can’t affect users. 

在软件开发过程中，许多中间任务都会拖慢整个软件的开发进度，而 DevOps 工程师的任务常常是将这些工作自动化。一种常见的自动化手段是构建代码部署管道。这些管道被称为持续集成（CI）或持续交付（CD），将会持续监控版本控制系统中的变化。系统将会使用被称为“单元测试”的自动化测试，对更改的准确性进行测试。这些测试将会在一个专用的测试环境中进行，保证有故障的代码不会影响到最终的用户。

The release process is the final step. The “CD” part of the system deploys the tested code to production servers—which provide the software product to real users. By automating this task, engineering teams can deploy multiple times a day or quickly respond to critical bug requests. Travis CI and CircleCI are some popular tools used to automate deployment.

发布过程是流程的最后一步。系统的“CD”部分将经过测试的代码部署到生产服务器，也就是将软件产品提供给真实用户。通过自动化执行这项任务，工程师团队能每天多次部署产品，或对一些关键的 Bug 请求做出快速响应。常用的自动部署工具包括 Travis CI 和 CircleCI 等。

Again, we believe DevOps skills are fundamental for any cloud developer. In my course for full-stack engineering on Amazon Web Services (AWS) in Udacity’s Cloud Developer Nanodegree program, I lay the framework for the skills you’ll need as a cloud developer to begin understanding how to practice DevOps for your cloud deployments. In the course, we build an imageboard with image style filters using modern technologies like TypeScript and Node to build the server. We cover how to write scripts to build the code for production and then use AWS Elastic Beanstalk to configure infrastructure and deploy.

同样，我们认为 DevOps 技术是每一个云计算软件开发者应该掌握的基础技能。想要理解如何在的云上部署并练习 DevOps 相关技能，在优达学城云计算软件开发纳米学位的 AWS 全栈应用开发课程中，我给出了作为一名云计算开发者所必须的技能框架。在这门课程中，我们将构建一个带有图片风格滤镜的图片板网站，并使用 TypeScript 和 Node 服务器等现代技术搭建所需的服务器。我们还将介绍如何编写脚本来构建生产代码，并使用 AWS Elastic Beanstalk 来完成配置基础架构与部署工作。

## Any Dev Can DevOps
## 你是 Dev 也就能是 DevOps

Learning necessary DevOps is a logical professional development leap for any developer:

学习必要的 DevOps 技能，对每个开发者来说，都是一个合理的专业发展与提升的过程：

* Frontend developers can ship and test features faster
* 前端开发者能更快地部署并测试功能
* Fullstack engineers can deliver updates without breakage concerns
* 全栈工程师能无缝地提交更新
* Machine learning researchers can deliver new, more accurate models and optimize infrastructure
* 机器学习研究者能提交新的、更准确的模型，并优化基础架构

Although some teams have dedicated DevOps groups, many rely on their top software engineers for this function. This shared responsibility promotes a DevOps culture across all team members. Usually, there are a few high caliber engineers who begin doing less Dev and more DevOps and assume the title DevOps Engineer. DevOps allows you to help your team reduce costs, improve collaboration, minimize downtime, and decrease the time to ship new features. We’ve taken care to design the Cloud Developer curriculum to lay out a path towards DevOps in your engineering practice.

虽然有些团队会有专门的 DevOps 小组，但大部分企业还是需要依靠他们的顶级软件工程师来实现。这项共同的责任使得 DevOps 文化在开发团队中愈加普及开来，而一些高素质的工程师将会率先从开发者（Dev）变成 DevOps 工程师，将更多的时间花在 DevOps 上，以帮助团队减少开支、改善协作，最小化停机时间，减少发布新功能的周期。

我们也精心设计了云计算开发者/DevOps纳米学位的相关课程，希望能为你通往 DevOps 工程师的职业生涯铺平道路。

现在就报名参加吧！

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) ，译者：欧剃 转载请保留此信息）_