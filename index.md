---
layout: default
title: 首页
---

# 欢迎

欢迎！这里是我陈列包包里的各种有趣的小东西的地方！请四处转转吧~

<img src="/img/treasure-161753.svg" width="35%" class="img-responsive" alt=""/>

> 注：本站所有文章均由**欧剃**本人翻译或撰写，大部分投稿在优达学城、果壳网、别瞎玩等媒体，版权所有，转载请先联系。


## 最新文章

<ul>
{% for post in site.posts limit:2 %}
      <li>
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3> {{ post.date | date: "%Y-%m-%d" }} - {{ post.excerpt | strip_html | strip_newlines | truncate:100 }} 
        <br><br>
      </li>
{% endfor %}
</ul>

## 精选文章

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

**译个漫画**是我发布自己翻译的漫画作品的公众号，目前正在缓慢更新一些冷掉牙的 xkcd 漫画，不知道合不合大家的口味呢。

<img src="/assets/images/wechatID.png" class="img-responsive" alt="欢迎关注！" />

----

{% include_relative todo.md %}
