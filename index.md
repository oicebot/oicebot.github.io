---
title: Blog
---
# Welcome to My Blog!


## 最近文章

<ul>
  {% for post in site.posts %}
    <li>
      <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
      
      <p> {{ post.date | date: %Y-%m-%d" }} {{ post.excerpt }} </p>
    </li>
  {% endfor %}
</ul>
