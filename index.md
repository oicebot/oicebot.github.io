---
layout: default
title: 首页
---

# 欢迎

欢迎！这里是我陈列包包里的各种有趣的小东西的地方！请四处转转吧~

<img src="/img/treasure-161753.png" />

## 我的文章

<ul>
  {% for post in site.posts limit:5 %}
    <li>
      <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
      <small>{{ post.date | date: "%Y-%m-%d" }} - {{ post.excerpt | strip_html | strip_newlines | truncate:100 }}</small>
    </li>
  {% endfor %}
  <li>
    <h3><a href="https://oicebot.github.io/blog"> 查看全部文章… </a></h3>
  </li>
</ul>

## 译个漫画

* 暂无内容

{% include_relative todo.md %}
