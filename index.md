---
layout: default
title: 首页
---

# 欢迎

欢迎！这里是我陈列包包里的各种有趣的小东西的地方！请四处转转吧~

<img src="/img/treasure-161753.svg" width="35%" class="img-responsive" alt=""/>

## 精选文章

> 本站所有文章均由**欧剃**本人翻译或撰写，大部分投稿在优达学城、果壳网、别瞎玩等媒体，版权所有，转载请先联系。

<ul>
  {% assign my_index = 0 %}
  {% for post in site.posts %}
    {% if post.star %}
      <li>
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3> {{ post.date | date: "%Y-%m-%d" }} - {{ post.excerpt | strip_html | strip_newlines | truncate:100 }} 
        <br><br>
      </li>
      {% assign my_index = my_index | plus: 1 %}
    {% endif %}
    {% if my_index == 5 %}
      {% break %}
    {% endif %}
  {% endfor %}
  <li>
  <h3><a href="https://oicebot.github.io/blog"> 更多精选文章… </a> </h3>
  </li>
</ul>

## 全部文章

<h3><a href="https://oicebot.github.io/tags"> <<<查看全部标签 </a> 
  ◆   <a href="https://oicebot.github.io/titles"> 查看全部文章>>> </a></h3>

## 译个漫画

暂无内容

----

{% include_relative todo.md %}
