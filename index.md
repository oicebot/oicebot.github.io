---
layout: default
title: �����˵�С����
---

# Welcome to My Blog!


## �������

<ul>
  {% for post in site.posts %}
    <li>
      <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
      
      <p> {{ post.date | date: "%Y-%m-%d" }} {{ post.excerpt }} </p>
    </li>
  {% endfor %}
</ul>

## �������

empty