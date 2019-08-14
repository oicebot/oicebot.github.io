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

传统上，软件开发团队被分为两个不同的职责：软件工程师和IT运维专员。在过去的认知里，软件工程师负责写代码，以解决客户的问题；当代码准备好之后，IT运维工程师负责将代码部署到生产服务器，并对其进行监控，确保一切都能顺利运行。但容易被忘记的是，在不久之前，每个项目都有它专用的物理服务器和网络设备——在那个时候，软件开发小组没有能力应对使用这些物理设备带来的技术挑战。

These roles are now blurring with the adoption of cloud computing services, giving birth to a new discipline known as Developer Operations Engineering or DevOps. Using software as their main tool, DevOps engineers work on internal development problems. Similar to how a software engineer optimizes an algorithm, a DevOps engineer’s goal is to optimize the software engineering process. In other words, dedicated developers use software to solve customer problems and DevOps engineers use software to solve their team’s software engineering problems. Since the tools used by DevOps are usually code-based, it’s becoming a critical skill for any software developer.

随着云计算服务的不断普及，这些角色划分变得越来越模糊，从而诞生了被称为 DevOps 的新也就是把 Development 和 Operations 组合在一起Developer Operations Engineering，开发运维工程师）

<img src="/img/20190820/001.png" />

## Operations as development

When defining a new software system, engineers must decide what platform they’ll use to deploy. Different applications require different resources. For example, an image processing application might require specialized equipment like a graphics processing unit (GPU). These decisions have historically been made by system administrators and set up by hand. More recently, DevOps engineers have been responsible for these decisions and written template files that define the architecture. Rules can be written to scale system capabilities to address how systems should react to high volumes of user requests. Writing these files makes the system clearly defined, extensible, and reproducible. Multiple programming languages like Python, Bash, webpack, and gulp are used by DevOps teams to achieve these goals.

In the Cloud Developer Nanodegree program, we cover a variety of technologies from databases and filestores to various computation platforms like Docker, AWS EC2, and AWS Lambda (Serverless). An understanding of these platforms is a requirement for becoming a DevOps engineer and we believe these skills are fundamental to developing on the cloud.

## More development and fewer operations

DevOps engineers are usually obsessed with automating the medial tasks that slow down software development. One frequent automation is a code deployment pipeline. Known as continuous integration/continuous deployment (CI/CD), these pipelines monitor version control system changes. The system checks the changes for accuracy using automated testing called “unit tests.” These tests are run in a dedicated test environment where the broken code can’t affect users. 

The release process is the final step. The “CD” part of the system deploys the tested code to production servers—which provide the software product to real users. By automating this task, engineering teams can deploy multiple times a day or quickly respond to critical bug requests. Travis CI and CircleCI are some popular tools used to automate deployment.

Again, we believe DevOps skills are fundamental for any cloud developer. In my course for full-stack engineering on Amazon Web Services (AWS) in Udacity’s Cloud Developer Nanodegree program, I lay the framework for the skills you’ll need as a cloud developer to begin understanding how to practice DevOps for your cloud deployments. In the course, we build an imageboard with image style filters using modern technologies like TypeScript and Node to build the server. We cover how to write scripts to build the code for production and then use AWS Elastic Beanstalk to configure infrastructure and deploy.

## Any Dev Can DevOps
Learning necessary DevOps is a logical professional development leap for any developer:

* Frontend developers can ship and test features faster
* Fullstack engineers can deliver updates without breakage concerns
* Machine learning researchers can deliver new, more accurate models and optimize infrastructure

Although some teams have dedicated DevOps groups, many rely on their top software engineers for this function. This shared responsibility promotes a DevOps culture across all team members. Usually, there are a few high caliber engineers who begin doing less Dev and more DevOps and assume the title DevOps Engineer. DevOps allows you to help your team reduce costs, improve collaboration, minimize downtime, and decrease the time to ship new features. We’ve taken care to design the Cloud Developer curriculum to lay out a path towards DevOps in your engineering practice.

Enroll Now!

> _（本文已投稿给「[优达学城](https://cn.udacity.com)」。 原作： [{{ page.author }}]({{ page.from }}) ，译者：欧剃 转载请保留此信息）_