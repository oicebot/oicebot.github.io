---
layout: default
title: 首页
---

# 欢迎

<img src="/assets/images/treasure-161753.svg" width="25%" class="img-responsive" alt=""/> 
<br>欢迎！这里是我陈列包包里的各种有趣的小东西的地方！请四处转转吧~

本站所有文章均由<b><a href="{{ site.url -}}/about">欧剃</a></b>本人翻译或撰写，大部分投稿在优达学城、果壳网、别瞎玩等媒体，版权所有，转载请先联系。

<div class="info-list" style="padding-top: 0px">
<div style="float:left;"><h2>最新文章</h2></div>
<div style="float:right;text-align:right;"><a href="{{ site.url -}}/titles"> 阅读更多>>> </a></div>
 <ul class="list-a">
{% for post in site.posts limit:2 %}
    <li><div class="only-info">
      <div class="art-img"><a href="{{ post.url }}">
      {% if post.thumb %}
        <img width="100%" src="{{ post.thumb }}" alt="{{post.title}}">
      {% else %}
        <img width="100%" height="120px" src="{{ site.thumb }}" alt="{{post.title}}">
      {% endif %}
      </a></div>
      </div>
      <div class="rt-tit-box">
        <h3><a href="{{ post.url }}">{{ post.title }}</a>
        <sup><small>
              {% if post.origin %}
                <span class="origin"> 原创 </span>
              {% endif %}        
              {% if post.star %}
                <span class="star">精选</span>
              {% endif %}</small></sup>
        </h3>
          <div class="vice"><span class="v_date">{{ post.date | date: "%Y-%m-%d" }}</span><span>{{ post.excerpt | strip_html | strip_newlines | truncate:100 }}</span></div>
      </div></li>
{% endfor %}
</ul></div>


<div class="info-list"> <ul class="list-a">
<div style="float:left;"><h2>精选文章</h2></div>
<div style="float:right;text-align:right;"><a href="{{ site.url -}}/blog"> 阅读更多>>> </a></div>
  {% assign my_index = 0 %}
  {% for post in site.posts %}
    {% if post.star %}
      <li><div class="only-info">
        <div class="art-img"><a href="{{ post.url }}">
        {% if post.thumb %}
          <img width="100%" src="{{ post.thumb }}" alt="{{post.title}}">
        {% else %}
          <img width="100%" height="120px" src="{{ site.thumb }}" alt="{{post.title}}">
        {% endif %}
        </a></div>
        </div>
        <div class="rt-tit-box">
          <h3><a href="{{ post.url }}">{{ post.title }}</a>
          <sup><small>
              {% if post.origin %}
                <span class="origin"> 原创 </span>
              {% endif %}        
              {% if post.star %}
                <span class="star">精选</span>
              {% endif %}</small></sup>
          </h3>
            <div class="vice"><span class="v_date" >{{ post.date | date: "%Y-%m-%d" }}</span><span>{{ post.excerpt | strip_html | strip_newlines | truncate:130 }}</span></div>
        </div></li>
      {% assign my_index = my_index | plus: 1 %}
    {% endif %}
    {% if my_index == 5 %}
      {% break %}
    {% endif %}
 {% endfor %}
    <li><div class="only-info">
    <div class="art-img" ><a href="{{ site.url -}}/blog">
      <img width="100%" height="120px" src="/assets/images/beaker-2026885.svg" alt="更多精选文章">
    </a></div>
    </div>
    <div class="rt-tit-box">
      <h3><a href="{{ site.url -}}/blog"> 更多精选文章… </a> </h3>
      <div class="vice"><span>自 2017 年以来，我陆续为果壳网、优达学城等媒体供稿，主要为翻译/编译，以介绍国外科技新闻和编程技术为主，偶尔也动笔写写科普文章。欢迎约稿~ 😊</span></div>
    </div></li>  
</ul></div>

## 全部文章

<h3><a href="{{ site.url -}}/tags"> <<<查看全部标签 </a> 
  ◆   <a href="{{ site.url -}}/titles"> 查看全部文章>>> </a></h3>

## 译个漫画

**译个漫画**是我发布自己翻译的漫画作品的公众号，目前正在缓慢更新一些冷掉牙的 xkcd 漫画，不知道合不合大家的口味呢。

<img src="/assets/images/wechatID.png" class="img-responsive" alt="欢迎关注！" />

----

{% include_relative todo.md %}
