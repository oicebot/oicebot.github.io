---
layout: default
title: 首页
---

# 欢迎

<img src="/img/treasure-161753.svg" width="25%" class="img-responsive" alt=""/> 
<br>欢迎！这里是我陈列包包里的各种有趣的小东西的地方！请四处转转吧~

本站所有文章均由<b><a href="https://oicebot.github.io/about">欧剃</a></b>本人翻译或撰写，大部分投稿在优达学城、果壳网、别瞎玩等媒体，版权所有，转载请先联系。

自 2017 年以来，我陆续为果壳网、优达学城等媒体供稿，主要为翻译/编译，以介绍国外科技新闻和编程技术为主，偶尔也动笔写写科普文章。欢迎约稿~ 😊

## 最新文章

<ul>
{% for post in site.posts limit:2 %}
      <li>
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3><span style="color:dodgerblue;">{{ post.date | date: "%Y-%m-%d" }}</span> {{ post.excerpt | strip_html | strip_newlines | truncate:70 }} 
        <br><br>
      </li>
{% endfor %}
</ul>

## 精选文章

<table>
  {% assign my_index = 0 %}
  {% for post in site.posts %}
    {% if post.star %}
      <tr width="100%"><td width="96px">
          {% if post.thumb %}
          <img width="100%" src="{{ post.thumb }}" alt="{{post.title}}">
          {% else %}
          <img width="100%" src="{{ site.thumb }}" alt="{{post.title}}">
          {% endif %}
      </td>
      <td>
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        </td>
      </tr>
      <tr><td colspan="2"><span style="color:dodgerblue;">{{ post.date | date: "%Y-%m-%d" }}</span> {{ post.excerpt | strip_html | strip_newlines | truncate:100 }} </td></tr>
      {% assign my_index = my_index | plus: 1 %}
    {% endif %}
    {% if my_index == 5 %}
      {% break %}
    {% endif %}
  {% endfor %}
  </table>
  <br>
  <h3><a href="https://oicebot.github.io/blog"> 更多精选文章… </a> </h3>


## 全部文章

<h3><a href="https://oicebot.github.io/tags"> <<<查看全部标签 </a> 
  ◆   <a href="https://oicebot.github.io/titles"> 查看全部文章>>> </a></h3>

## 译个漫画

**译个漫画**是我发布自己翻译的漫画作品的公众号，目前正在缓慢更新一些冷掉牙的 xkcd 漫画，不知道合不合大家的口味呢。

<img src="/assets/images/wechatID.png" class="img-responsive" alt="欢迎关注！" />

----

{% include_relative todo.md %}
